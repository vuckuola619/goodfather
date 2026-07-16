import os
import json
import pytest
from app import app, calculate_dimensions, determine_result_type, BACKUP_FILE

@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client

def test_calculate_dimensions():
    # Test case where father scores perfectly on positive statements and low on negative statements
    answers = {
        "sectionC": {
            "c1": "< 30 menit", # score 5
            "c3": "sudah konsisten", # score 5
            "c4": "belum" # score 5
        },
        "sectionD": {
            "d1": 5, "d2": 5, "d3": 5, "d4": 1, "d5": 5, "d6": 5
        },
        "sectionE": {
            "e1": 5, "e2": 5, "e3": 5, "e4": 5, "e5": 1, "e6": 5
        },
        "sectionB": [],
        "sectionF": []
    }
    
    scores = calculate_dimensions(answers)
    
    assert scores["connection"] == 5.0
    assert scores["selfRegulation"] == 5.0
    assert scores["faithAdab"] == 5.0
    assert scores["digitalSafety"] == 5.0
    assert scores["devAwareness"] == 5.0
    assert scores["characterGrowth"] == 5.0

def test_determine_result_type():
    # Connection is lowest
    scores1 = {"connection": 2.0, "selfRegulation": 4.0, "digitalSafety": 4.0, "faithAdab": 4.0}
    assert determine_result_type(scores1, "3–5 tahun", []) == "Ayah Perlu Reconnect"

    # Self-regulation is lowest
    scores2 = {"connection": 4.0, "selfRegulation": 2.0, "digitalSafety": 4.0, "faithAdab": 4.0}
    assert determine_result_type(scores2, "3–5 tahun", []) == "Anak Butuh Routine & Boundaries"

    # Digital safety is lowest
    scores3 = {"connection": 4.0, "selfRegulation": 4.0, "digitalSafety": 2.0, "faithAdab": 4.0}
    assert determine_result_type(scores3, "3–5 tahun", []) == "Digital Safety Priority"

    # Faith & adab is lowest
    scores4 = {"connection": 4.0, "selfRegulation": 4.0, "digitalSafety": 4.0, "faithAdab": 2.0}
    assert determine_result_type(scores4, "3–5 tahun", []) == "Faith & Adab Foundation"

    # Pre-teen communication case
    scores5 = {"connection": 4.0, "selfRegulation": 4.0, "digitalSafety": 4.0, "faithAdab": 4.0}
    assert determine_result_type(scores5, "13–17 tahun", ["sering melawan"]) == "Pre-Teen / Teen Communication"

def test_api_health(client):
    res = client.get("/api/health")
    assert res.status_code == 200
    data = res.get_json()
    assert data["status"] == "healthy"
    assert data["app"] == "GoodFather"

def test_api_score(client):
    payload = {
        "answers": {
            "sectionC": {"c1": "1–2 jam", "c3": "kadang", "c4": "pernah didampingi"},
            "sectionD": {"d1": 3, "d2": 3, "d3": 3, "d4": 3, "d5": 3, "d6": 3},
            "sectionE": {"e1": 3, "e2": 3, "e3": 3, "e4": 3, "e5": 3, "e6": 3},
            "sectionB": ["tantrum / ledakan emosi"],
            "sectionF": ["capek kerja"]
        },
        "ageGroup": "3–5 tahun",
        "concerns": ["tantrum / ledakan emosi"]
    }
    res = client.post("/api/score", json=payload)
    assert res.status_code == 200
    data = res.get_json()
    assert data["success"] is True
    assert "scores" in data
    assert "resultType" in data

def test_api_backup(client):
    # Ensure backup file is removed before testing
    if os.path.exists(BACKUP_FILE):
        os.remove(BACKUP_FILE)

    # Fetch initial backup (should be empty object)
    res_get1 = client.get("/api/backup")
    assert res_get1.status_code == 200
    assert res_get1.get_json() == {}

    # Save backup
    backup_data = {"profiles": [{"name": "Hasan", "ageGroup": "3-5"}]}
    res_post = client.post("/api/backup", json=backup_data)
    assert res_post.status_code == 200
    assert res_post.get_json()["success"] is True

    # Read back backup
    res_get2 = client.get("/api/backup")
    assert res_get2.status_code == 200
    assert res_get2.get_json() == backup_data

    # Cleanup backup file
    if os.path.exists(BACKUP_FILE):
        os.remove(BACKUP_FILE)

def test_api_backup_with_history(client):
    # Ensure backup file is removed before testing
    if os.path.exists(BACKUP_FILE):
        os.remove(BACKUP_FILE)

    backup_data = {
        "profiles": [
            {
                "id": "child-123",
                "name": "Ahmad",
                "ageGroup": "3–5 tahun",
                "scores": {"connection": 4.5, "selfRegulation": 3.8, "digitalSafety": 4.0},
                "completedMissions": [1, 2],
                "activeQuestDay": 3,
                "completedMissionsHistory": [
                    {
                        "id": "1",
                        "title": "Hadir Tanpa HP",
                        "type": "quest",
                        "timestamp": "2026-07-03T10:00:00Z",
                        "reflection": "Bermain balok bersama Ahmad tanpa HP terasa tenang.",
                        "reference": {
                          "islamic": "HR. Bukhari 5997",
                          "research": "Harvard Center"
                        }
                    }
                ],
                "streakStats": {
                    "currentStreak": 2,
                    "lastCompletionDate": "2026-07-03",
                    "longestStreak": 2
                },
                "badges": [
                    {
                        "id": "istiqamah",
                        "unlocked": False,
                        "progress": "2/3"
                    }
                ]
            }
        ]
    }

    # Save backup
    res_post = client.post("/api/backup", json=backup_data)
    assert res_post.status_code == 200
    assert res_post.get_json()["success"] is True

    # Read back backup
    res_get = client.get("/api/backup")
    assert res_get.status_code == 200
    assert res_get.get_json() == backup_data

    # Cleanup backup file
    if os.path.exists(BACKUP_FILE):
        os.remove(BACKUP_FILE)

