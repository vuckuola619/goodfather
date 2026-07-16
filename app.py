import os
import json
import time
from typing import Dict, Any, List, Optional
from flask import Flask, jsonify, render_template, request, Response

app = Flask(__name__, static_folder=".", template_folder=".", static_url_path="")

BACKUP_FILE = "goodfather_backup.json"

def calculate_dimensions(answers: Dict[str, Any]) -> Dict[str, Any]:
    """
    Calculates the 6 parenting dimensions based on the assessment answers.
    Answers expects keys corresponding to the survey sections.
    Calculates averages dynamically based on provided keys.
    """
    # Initialize defaults
    scores = {
        "connection": 3.0,
        "selfRegulation": 3.0,
        "faithAdab": 3.0,
        "digitalSafety": 3.0,
        "devAwareness": 3.0,
        "characterGrowth": 3.0
    }
    
    try:
        # Section D: Relasi Ayah-Anak (1-5 values)
        d_answers = answers.get("sectionD", {})
        
        # Calculate connection score based on provided keys among [d1, d2, d3, d6]
        connection_keys = ["d1", "d2", "d3", "d6"]
        connection_vals = []
        for k in connection_keys:
            if k in d_answers and d_answers[k] is not None and d_answers[k] != "":
                connection_vals.append(float(d_answers[k]))
        scores["connection"] = round(sum(connection_vals) / len(connection_vals), 2) if connection_vals else 3.0

        # Calculate selfRegulation score based on provided keys among [d4 (reversed), d5]
        self_reg_vals = []
        if "d4" in d_answers and d_answers["d4"] is not None and d_answers["d4"] != "":
            self_reg_vals.append(6.0 - float(d_answers["d4"]))
        if "d5" in d_answers and d_answers["d5"] is not None and d_answers["d5"] != "":
            self_reg_vals.append(float(d_answers["d5"]))
        scores["selfRegulation"] = round(sum(self_reg_vals) / len(self_reg_vals), 2) if self_reg_vals else 3.0

        # Section E: Pendidikan Iman & Adab (1-5 values)
        e_answers = answers.get("sectionE", {})
        faith_keys = ["e1", "e2", "e3", "e4", "e6"]
        faith_vals = []
        for k in faith_keys:
            if k in e_answers and e_answers[k] is not None and e_answers[k] != "":
                faith_vals.append(float(e_answers[k]))
        if "e5" in e_answers and e_answers["e5"] is not None and e_answers["e5"] != "":
            faith_vals.append(6.0 - float(e_answers["e5"]))
        scores["faithAdab"] = round(sum(faith_vals) / len(faith_vals), 2) if faith_vals else 3.0

        # Section C: Screen & AI Exposure
        # C1: Screen time per hari (<30m: 5, 30-60m: 4, 1-2h: 3, 2-4h: 2, >4h: 1)
        # C3: Aturan screen-free (sudah: 5, kadang: 3, belum: 1)
        # C4: AI exposure (belum: 5, pernah didampingi: 4, pernah sendiri: 2, tidak tahu: 3)
        c_answers = answers.get("sectionC", {})
        c1_val = c_answers.get("c1", "< 30 menit")
        c3_val = c_answers.get("c3", "belum")
        c4_val = c_answers.get("c4", "belum")

        c1_score = 3.0
        if c1_val == "< 30 menit": c1_score = 5.0
        elif c1_val == "30–60 menit": c1_score = 4.0
        elif c1_val == "1–2 jam": c1_score = 3.0
        elif c1_val == "2–4 jam": c1_score = 2.0
        elif c1_val == "> 4 jam": c1_score = 1.0

        c3_score = 1.0
        if c3_val == "sudah konsisten": c3_score = 5.0
        elif c3_val == "kadang": c3_score = 3.0
        elif c3_val == "belum": c3_score = 1.0

        c4_score = 3.0
        if c4_val == "belum": c4_score = 5.0
        elif c4_val == "pernah didampingi": c4_score = 4.0
        elif c4_val == "tidak tahu": c4_score = 3.0
        elif c4_val == "pernah sendiri": c4_score = 2.0

        scores["digitalSafety"] = round((c1_score + c3_score + c4_score) / 3.0, 2)

        # Section B: Kondisi Anak Saat Ini (Concerns)
        b_concerns = answers.get("sectionB", [])
        concern_count = len(b_concerns)
        
        dev_score = max(1.0, 5.0 - (concern_count * 0.5))
        scores["devAwareness"] = round(dev_score, 2)

        # Section F: Kondisi Ayah (Fokus Ayah / Challenges)
        f_challenges = answers.get("sectionF", [])
        challenge_count = len(f_challenges)
        char_score = max(1.0, 5.0 - (challenge_count * 0.4))
        scores["characterGrowth"] = round(char_score, 2)

    except Exception as e:
        print(f"Error calculating dimensions: {e}")
        
    return scores

def determine_result_type(scores: Dict[str, float], age_group: str, concerns: List[str]) -> str:
    """
    Determines Result Type based on lowest dimensions, child's age, and current concerns.
    """
    conn = scores.get("connection", 3.0)
    self_reg = scores.get("selfRegulation", 3.0)
    dig_safe = scores.get("digitalSafety", 3.0)
    faith = scores.get("faithAdab", 3.0)

    if age_group in ["10–12 tahun", "13–17 tahun"] and any(item in concerns for item in ["sering melawan"]):
        return "Pre-Teen / Teen Communication"

    lowest_val = min(conn, self_reg, dig_safe, faith)

    if lowest_val == conn:
        return "Ayah Perlu Reconnect"
    elif lowest_val == self_reg:
        return "Anak Butuh Routine & Boundaries"
    elif lowest_val == dig_safe:
        return "Digital Safety Priority"
    else:
        return "Faith & Adab Foundation"


@app.route("/")
def index() -> str:
    """Serves the landing dashboard SPA."""
    return render_template("index.html")

@app.route("/api/score", methods=["POST"])
def post_score() -> Response:
    """
    Computes scores and returns results based on the submitted answers.
    Expects JSON body with 'answers', 'ageGroup', and 'concerns'.
    """
    try:
        data = request.get_json() or {}
        answers = data.get("answers", {})
        age_group = data.get("ageGroup", "3–5 tahun")
        concerns = data.get("concerns", [])
        
        scores = calculate_dimensions(answers)
        result_type = determine_result_type(scores, age_group, concerns)
        
        return jsonify({
            "success": True,
            "scores": scores,
            "resultType": result_type
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route("/api/backup", methods=["GET"])
def get_backup() -> Response:
    """Loads backup data from local goodfather_backup.json."""
    if os.path.exists(BACKUP_FILE):
        try:
            with open(BACKUP_FILE, "r", encoding="utf-8") as f:
                return jsonify(json.load(f))
        except Exception as e:
            return jsonify({"error": f"Failed to read backup: {str(e)}"}), 500
    return jsonify({})

@app.route("/api/backup", methods=["POST"])
def post_backup() -> Response:
    """Saves backup data to local goodfather_backup.json."""
    try:
        data = request.get_json() or {}
        with open(BACKUP_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        return jsonify({"success": True, "message": "Backup saved successfully."})
    except Exception as e:
        return jsonify({"success": False, "error": f"Failed to save backup: {str(e)}"}), 500

@app.route("/api/health", methods=["GET"])
def health_check() -> Response:
    """Self-health status check."""
    return jsonify({
        "status": "healthy",
        "timestamp": time.time(),
        "app": "GoodFather"
    })

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    debug = os.getenv("FLASK_ENV", "development") == "development"
    app.run(host="0.0.0.0", port=port, debug=debug)
