// GoodFather Single Page Application Logic
document.addEventListener("DOMContentLoaded", () => {

  // -----------------------------------------
  // Confetti Particle Engine
  // -----------------------------------------
  class ConfettiEngine {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.active = false;
      this.colors = ['#C27B66', '#C86A5E', '#708A83', '#7A9EB2', '#8E849E']; // Gold, Coral, Mint, Sky, Lavender

      window.addEventListener('resize', () => this.resize());
      this.resize();
    }

    resize() {
      if (this.canvas) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      }
    }

    spawn(count = 120) {
      if (!this.canvas) return;
      this.active = true;
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: window.innerWidth / 2,
          y: window.innerHeight + 10,
          vx: (Math.random() - 0.5) * 16,
          vy: -Math.random() * 18 - 12,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          radius: Math.random() * 4 + 3,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 8,
          opacity: 1
        });
      }
      if (this.particles.length === count) {
        this.animate();
      }
    }

    animate() {
      if (!this.active || !this.ctx) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.45;
        p.vx *= 0.98;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.012;

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = Math.max(0, p.opacity);
        this.ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);
        this.ctx.restore();

        if (p.opacity <= 0 || p.y > this.canvas.height + 20) {
          this.particles.splice(i, 1);
        }
      }

      if (this.particles.length > 0) {
        requestAnimationFrame(() => this.animate());
      } else {
        this.active = false;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }

  const confetti = new ConfettiEngine("celebration-canvas");

  // -----------------------------------------
  // 3D Card Tilt Interaction (using GSAP)
  // -----------------------------------------
  function applyTiltEffect(element) {
    if (!window.gsap) return;

    element.addEventListener("mousemove", (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const angleX = (yc - y) / 8; // Adjust divisor to change sensitivity
      const angleY = (x - xc) / 8;

      window.gsap.to(element, {
        rotateX: angleX,
        rotateY: angleY,
        y: -4,
        transformPerspective: 500,
        ease: "power1.out",
        duration: 0.1,
        overwrite: "auto"
      });
    });

    element.addEventListener("mouseleave", () => {
      window.gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        y: 0,
        ease: "power2.out",
        duration: 0.4,
        overwrite: "auto"
      });
    });
  }

  // -----------------------------------------
  // Custom Dialog Overlay System (Alert & Confirm Overrides)
  // -----------------------------------------
  window.alert = function(message) {
    return new Promise((resolve) => {
      const overlay = document.createElement("div");
      overlay.className = "modal-overlay active";
      overlay.style.zIndex = "99999";
      
      let iconName = "info";
      let titleText = "Pemberitahuan";
      let titleColor = "var(--color-olive)";
      let headerBg = "transparent";
      let borderBottomColor = "var(--border-color)";
      
      const msgLower = message.toLowerCase();
      if (msgLower.includes("berhasil") || msgLower.includes("selamat")) {
        iconName = "check-circle";
        titleText = "Sukses";
        titleColor = "var(--color-olive)";
      } else if (msgLower.includes("mohon") || msgLower.includes("pilih") || msgLower.includes("silakan") || msgLower.includes("estimasi")) {
        iconName = "alert-circle";
        titleText = "Perhatian";
        titleColor = "var(--color-gold)";
      } else if (msgLower.includes("gagal") || msgLower.includes("kesalahan") || msgLower.includes("error") || msgLower.includes("terjadi")) {
        iconName = "shield-alert";
        titleText = "Kesalahan";
        titleColor = "var(--color-coral)";
        headerBg = "rgba(200, 106, 94, 0.05)";
        borderBottomColor = "rgba(200, 106, 94, 0.2)";
      }
      
      const container = document.createElement("div");
      container.className = "assessment-container";
      container.style.maxWidth = "420px";
      container.style.width = "90%";
      container.style.boxShadow = "var(--shadow-soft)";
      container.style.border = "1px solid var(--border-color)";
      container.style.borderRadius = "var(--radius-lg)";
      container.style.backgroundColor = "var(--bg-card)";
      container.style.backdropFilter = "blur(12px)";
      container.style.overflow = "hidden";
      
      const header = document.createElement("div");
      header.className = "assessment-header";
      header.style.padding = "16px 20px";
      header.style.backgroundColor = headerBg;
      header.style.borderBottom = `1px solid ${borderBottomColor}`;
      
      const titleEl = document.createElement("h3");
      titleEl.style.margin = "0";
      titleEl.style.fontSize = "1.2rem";
      titleEl.style.color = titleColor;
      titleEl.style.display = "flex";
      titleEl.style.alignItems = "center";
      titleEl.style.gap = "8px";
      titleEl.innerHTML = `<i data-lucide="${iconName}" style="width: 20px; height: 20px;"></i> ${titleText}`;
      
      const closeBtn = document.createElement("button");
      closeBtn.className = "close-assessment";
      closeBtn.innerHTML = "&times;";
      
      header.appendChild(titleEl);
      header.appendChild(closeBtn);
      
      const body = document.createElement("div");
      body.className = "assessment-body";
      body.style.padding = "24px 20px";
      body.style.fontSize = "0.95rem";
      body.style.color = "var(--text-main)";
      body.style.lineHeight = "1.6";
      body.textContent = message;
      
      const footer = document.createElement("div");
      footer.className = "assessment-footer";
      footer.style.padding = "16px 20px";
      footer.style.justifyContent = "flex-end";
      
      const okBtn = document.createElement("button");
      okBtn.className = "btn btn-primary";
      okBtn.style.padding = "8px 24px";
      okBtn.style.fontSize = "0.9rem";
      okBtn.textContent = "OK";
      
      footer.appendChild(okBtn);
      container.appendChild(header);
      container.appendChild(body);
      container.appendChild(footer);
      overlay.appendChild(container);
      document.body.appendChild(overlay);
      
      if (window.lucide) {
        window.lucide.createIcons();
      }
      
      if (window.gsap) {
        window.gsap.fromTo(container,
          { scale: 0.9, opacity: 0, y: 15 },
          { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.5)" }
        );
      }
      
      function closePopup() {
        if (window.gsap) {
          window.gsap.to(container, {
            scale: 0.95, opacity: 0, y: 10, duration: 0.2, ease: "power2.in",
            onComplete: () => {
              overlay.remove();
              resolve();
            }
          });
        } else {
          overlay.remove();
          resolve();
        }
      }
      
      okBtn.addEventListener("click", closePopup);
      closeBtn.addEventListener("click", closePopup);
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          closePopup();
        }
      });
    });
  };

  window.confirm = function(message) {
    return new Promise((resolve) => {
      const overlay = document.createElement("div");
      overlay.className = "modal-overlay active";
      overlay.style.zIndex = "99999";
      
      const container = document.createElement("div");
      container.className = "assessment-container";
      container.style.maxWidth = "420px";
      container.style.width = "90%";
      container.style.boxShadow = "var(--shadow-soft)";
      container.style.border = "1px solid var(--border-color)";
      container.style.borderRadius = "var(--radius-lg)";
      container.style.backgroundColor = "var(--bg-card)";
      container.style.backdropFilter = "blur(12px)";
      container.style.overflow = "hidden";
      
      const header = document.createElement("div");
      header.className = "assessment-header";
      header.style.padding = "16px 20px";
      header.style.borderBottom = "1px solid var(--border-color)";
      
      const titleEl = document.createElement("h3");
      titleEl.style.margin = "0";
      titleEl.style.fontSize = "1.2rem";
      titleEl.style.color = "var(--color-gold)";
      titleEl.style.display = "flex";
      titleEl.style.alignItems = "center";
      titleEl.style.gap = "8px";
      titleEl.innerHTML = `<i data-lucide="help-circle" style="width: 20px; height: 20px;"></i> Konfirmasi`;
      
      const closeBtn = document.createElement("button");
      closeBtn.className = "close-assessment";
      closeBtn.innerHTML = "&times;";
      
      header.appendChild(titleEl);
      header.appendChild(closeBtn);
      
      const body = document.createElement("div");
      body.className = "assessment-body";
      body.style.padding = "24px 20px";
      body.style.fontSize = "0.95rem";
      body.style.color = "var(--text-main)";
      body.style.lineHeight = "1.6";
      body.textContent = message;
      
      const footer = document.createElement("div");
      footer.className = "assessment-footer";
      footer.style.padding = "16px 20px";
      footer.style.justifyContent = "flex-end";
      footer.style.gap = "12px";
      
      const cancelBtn = document.createElement("button");
      cancelBtn.className = "btn btn-outline";
      cancelBtn.style.padding = "8px 20px";
      cancelBtn.style.fontSize = "0.9rem";
      cancelBtn.textContent = "Batal";
      
      const confirmBtn = document.createElement("button");
      confirmBtn.className = "btn btn-primary";
      confirmBtn.style.padding = "8px 24px";
      confirmBtn.style.fontSize = "0.9rem";
      confirmBtn.textContent = "Ya";
      
      footer.appendChild(cancelBtn);
      footer.appendChild(confirmBtn);
      container.appendChild(header);
      container.appendChild(body);
      container.appendChild(footer);
      overlay.appendChild(container);
      document.body.appendChild(overlay);
      
      if (window.lucide) {
        window.lucide.createIcons();
      }
      
      if (window.gsap) {
        window.gsap.fromTo(container,
          { scale: 0.9, opacity: 0, y: 15 },
          { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: "back.out(1.5)" }
        );
      }
      
      function closePopup(value) {
        if (window.gsap) {
          window.gsap.to(container, {
            scale: 0.95, opacity: 0, y: 10, duration: 0.2, ease: "power2.in",
            onComplete: () => {
              overlay.remove();
              resolve(value);
            }
          });
        } else {
          overlay.remove();
          resolve(value);
        }
      }
      
      confirmBtn.addEventListener("click", () => closePopup(true));
      cancelBtn.addEventListener("click", () => closePopup(false));
      closeBtn.addEventListener("click", () => closePopup(false));
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          closePopup(false);
        }
      });
    });
  };

  // -----------------------------------------
  // State variables
  // -----------------------------------------
  let activeView = "home";
  let activeChildId = null;
  let childProfiles = [];
  let editingProfileId = null;
  
  // Assessment Stepper State
  let currentStep = 1;
  const totalSteps = 6;
  let assessmentAnswers = {
    name: "",
    gender: "",
    ageGroup: "",
    sectionB: [], // concerns
    sectionC: { c1: "", c3: "", c4: "" }, // screen/AI
    sectionD: { d1: null, d2: null, d4: null }, // scales
    sectionE: { e1: null, e2: null, e5: null }, // scales
    sectionF: [] // father challenges
  };

  // Focus Offline Mode Timer State
  let focusInterval = null;
  let focusSecondsRemaining = 1200; // 20 minutes default
  let breathingTimeline = null;

  // Initialize Lucide Icons
  lucide.createIcons();

  // Load Theme
  const savedTheme = localStorage.getItem("goodfather_theme") || "cream";
  const initialTheme = (savedTheme === "light" || savedTheme === "dark") ? "cream" : savedTheme;
  document.documentElement.setAttribute("data-theme", initialTheme);

  // Load Data from LocalStorage
  loadLocalProfiles();
  
  // Fetch server backup on startup as fallback
  if (childProfiles.length === 0) {
    syncBackupFromServer();
  } else {
    renderDashboard();
  }

  // -----------------------------------------
  // Routing Navigation Handlers
  // -----------------------------------------
  const navLinks = document.querySelectorAll(".nav-link");
  const pageViews = document.querySelectorAll(".page-view");

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.id.replace("link-", "view-");
      switchView(targetId.replace("view-", ""));
    });
  });

  document.getElementById("nav-logo").addEventListener("click", (e) => {
    e.preventDefault();
    switchView("home");
  });

  document.getElementById("cta-view-guides").addEventListener("click", () => {
    switchView("guides");
  });

  // Edit Profile Button Click
  const editProfileBtn = document.getElementById("btn-edit-profile");
  if (editProfileBtn) {
    editProfileBtn.addEventListener("click", () => {
      if (activeChildId) {
        editChildProfile(activeChildId);
      }
    });
  }

  // Delete Profile Button Click
  const deleteProfileBtn = document.getElementById("btn-delete-profile");
  if (deleteProfileBtn) {
    deleteProfileBtn.addEventListener("click", () => {
      if (activeChildId) {
        deleteActiveChildProfile();
      }
    });
  }

  function switchView(viewName) {
    activeView = viewName;
    
    // Update nav links active class
    navLinks.forEach(link => {
      if (link.id === `link-${viewName}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Toggle pages visibility
    pageViews.forEach(view => {
      if (view.id === `view-${viewName}`) {
        view.classList.add("active");
        
        // GSAP transition for entering view
        gsap.fromTo(view, { opacity: 0, y: 15 }, { 
          opacity: 1, 
          y: 0, 
          duration: 0.4, 
          ease: "power2.out",
          onComplete: () => {
            if (typeof ScrollTrigger !== "undefined") {
              ScrollTrigger.refresh();
            }
          }
        });
      } else {
        view.classList.remove("active");
      }
    });

    // Special view triggers
    if (viewName === "dashboard") {
      renderDashboard();
    } else if (viewName === "guides") {
      renderGuides();
    } else if (viewName === "journal") {
      renderJournalLogs();
    } else if (viewName === "progress") {
      renderProgressView();
    }
  }

  // Theme Dropdown Selector Logic
  const themeDropdownBtn = document.getElementById("theme-dropdown-btn");
  const themeDropdownContainer = document.getElementById("theme-selector-container");
  const themeDropdownMenu = document.getElementById("theme-dropdown-menu");
  const currentThemeName = document.getElementById("current-theme-name");
  const themeMenuItems = document.querySelectorAll(".theme-menu-item");

  const themeNames = {
    cream: "Kertas Krem",
    sunset: "Senja Hangat",
    ocean: "Samudra Tenang",
    forest: "Hutan Syahdu"
  };

  if (themeDropdownBtn) {
    themeDropdownBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      themeDropdownContainer.classList.toggle("open");
    });
  }

  document.addEventListener("click", () => {
    if (themeDropdownContainer) {
      themeDropdownContainer.classList.remove("open");
    }
  });

  themeMenuItems.forEach(item => {
    item.addEventListener("click", () => {
      const selectedTheme = item.getAttribute("data-theme-val");
      setAppTheme(selectedTheme);
    });
  });

  function setAppTheme(theme) {
    let finalTheme = theme;
    if (theme === "dark" || theme === "light") {
      finalTheme = "cream";
    }

    document.documentElement.setAttribute("data-theme", finalTheme);
    localStorage.setItem("goodfather_theme", finalTheme);

    themeMenuItems.forEach(item => {
      if (item.getAttribute("data-theme-val") === finalTheme) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    if (currentThemeName) {
      currentThemeName.textContent = themeNames[finalTheme] || "Kertas Krem";
    }
  }

  // Initialize theme UI state
  setAppTheme(initialTheme);

  // -----------------------------------------
  // Profile & Backup Storage Helpers
  // -----------------------------------------
  function getDefaultBadges() {
    return [
      { id: "istiqamah", title: "Istiqamah", icon: "repeat", unlocked: false, progress: 0, target: 3, unit: "hari", desc: "Konsisten mendampingi anak dengan menyelesaikan misi harian selama 3 hari berturut-turut.", ref: "Amalan yang paling dicintai Allah adalah yang terus-menerus meskipun sedikit (HR. Bukhari & Muslim)." },
      { id: "amanah", title: "Aman & Hadir", icon: "heart", unlocked: false, progress: 0, target: 3, unit: "misi", desc: "Hadir secara utuh dengan menyelesaikan 3 misi kategori Koneksi/Bonding.", ref: "Membangun rasa aman anak (Harvard Center: Serve & Return; Teladan Rasulullah memeluk cucu-cucunya)." },
      { id: "fitrah", title: "Tameng Fitrah", icon: "shield", unlocked: false, progress: 0, target: 3, unit: "misi", desc: "Melindungi fitrah digital anak dengan menyelesaikan 3 misi kategori Digital & AI Safety.", ref: "Menjaga amanah teknologi dan batasan sehat sesuai dengan WHO Guidelines dan prinsip moral Islam." },
      { id: "luqman", title: "Luqman Al-Hakim", icon: "book-open", unlocked: false, progress: 0, target: 3, unit: "misi", desc: "Menanamkan pondasi iman dan adab dengan menyelesaikan 3 misi kategori Iman & Adab.", ref: "Nasihat Luqmanul Hakim mendidik tauhid dan adab santun kepada anaknya (QS. Luqman: 13-19)." },
      { id: "rahmah", title: "Rahmah & Sabar", icon: "smile", unlocked: false, progress: 0, target: 3, unit: "misi", desc: "Mengendalikan amarah dan memimpin dengan kasih sayang dengan menyelesaikan 3 misi kategori Regulasi Diri/Sabar.", ref: "Orang kuat adalah yang mampu menahan dirinya ketika marah (Sahih al-Bukhari; Model regulasi emosi)." }
    ];
  }

  function ensureProfileFields(profile) {
    if (!profile.completedMissionsHistory) {
      profile.completedMissionsHistory = [];
    }
    if (!profile.streakStats) {
      profile.streakStats = { currentStreak: 0, lastCompletionDate: "", longestStreak: 0 };
    }
    if (!profile.badges || profile.badges.length === 0) {
      profile.badges = getDefaultBadges();
    }
    // Upgrading logic for old badge formats
    if (profile.badges && profile.badges.length > 0 && !profile.badges[0].icon) {
      profile.badges = getDefaultBadges();
    }
    return profile;
  }

  function loadLocalProfiles() {
    try {
      const data = localStorage.getItem("goodfather_profiles");
      if (data) {
        childProfiles = jsonParseSafe(data, []);
        childProfiles.forEach(ensureProfileFields);
        if (childProfiles.length > 0 && !activeChildId) {
          activeChildId = childProfiles[0].id;
        }
      }
    } catch (e) {
      console.error("Failed to load local profiles", e);
    }
  }

  function saveLocalProfiles() {
    localStorage.setItem("goodfather_profiles", JSON.stringify(childProfiles));
  }

  function jsonParseSafe(str, fallback) {
    try {
      return JSON.parse(str) || fallback;
    } catch (e) {
      return fallback;
    }
  }

  // Backup Sync APIs
  const backupBtn = document.getElementById("btn-backup-sync");
  backupBtn.addEventListener("click", () => {
    syncBackupToServer();
  });

  function syncBackupToServer() {
    backupBtn.disabled = true;
    const btnSpan = backupBtn.querySelector("span");
    btnSpan.textContent = "Syncing...";
    
    fetch("/api/backup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profiles: childProfiles })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        btnSpan.textContent = "Synced";
        setTimeout(() => { btnSpan.textContent = "Sync"; backupBtn.disabled = false; }, 2000);
      } else {
        alert("Gagal melakukan sinkronisasi data: " + data.error);
        btnSpan.textContent = "Sync";
        backupBtn.disabled = false;
      }
    })
    .catch(err => {
      console.error(err);
      btnSpan.textContent = "Gagal";
      setTimeout(() => { btnSpan.textContent = "Sync"; backupBtn.disabled = false; }, 2000);
    });
  }

  function syncBackupFromServer() {
    fetch("/api/backup")
    .then(res => res.json())
    .then(data => {
      if (data && data.profiles && data.profiles.length > 0) {
        childProfiles = data.profiles;
        childProfiles.forEach(ensureProfileFields);
        activeChildId = childProfiles[0].id;
        saveLocalProfiles();
        renderDashboard();
      }
    })
    .catch(err => console.error("Failed to fetch backup from server", err));
  }

  // -----------------------------------------
  // Assessment Modal Stepper Flow
  // -----------------------------------------
  const startAssessmentBtn = document.getElementById("cta-start-assessment");
  const emptyAddProfileBtn = document.getElementById("btn-empty-add-profile");
  const addProfileBtn = document.getElementById("btn-add-profile");
  const assessmentModal = document.getElementById("assessment-modal");
  const closeAssessmentBtn = document.getElementById("close-assessment-modal");
  const prevStepBtn = document.getElementById("btn-prev-step");
  const nextStepBtn = document.getElementById("btn-next-step");
  const assessmentSteps = document.querySelectorAll(".assessment-step");
  const progressFill = document.getElementById("assessment-progress-fill");

  const assessmentTriggers = [startAssessmentBtn, emptyAddProfileBtn, addProfileBtn];
  assessmentTriggers.forEach(btn => {
    if (btn) {
      btn.addEventListener("click", () => {
        resetAssessment();
        openModal(assessmentModal);
      });
    }
  });

  closeAssessmentBtn.addEventListener("click", () => {
    closeModal(assessmentModal);
  });

  function openModal(modal) {
    modal.classList.add("active");
    gsap.fromTo(modal.querySelector(".assessment-container"), 
      { scale: 0.9, y: 30, opacity: 0 }, 
      { scale: 1, y: 0, opacity: 1, duration: 0.3, ease: "back.out(1.2)" }
    );
  }

  function closeModal(modal) {
    gsap.to(modal.querySelector(".assessment-container"), {
      scale: 0.9, y: 20, opacity: 0, duration: 0.2, ease: "power2.in",
      onComplete: () => {
        modal.classList.remove("active");
      }
    });
  }

  function resetAssessment() {
    currentStep = 1;
    const titleEl = document.querySelector("#assessment-modal h4");
    if (titleEl) {
      titleEl.textContent = "Buat Peta Ayah";
    }
    assessmentAnswers = {
      name: "",
      gender: "",
      ageGroup: "",
      sectionB: [],
      sectionC: { c1: "", c3: "", c4: "" },
      sectionD: { d1: null, d2: null, d4: null },
      sectionE: { e1: null, e2: null, e5: null },
      sectionF: []
    };
    
    // Clear selections in UI
    document.getElementById("child-name-input").value = "";
    document.querySelectorAll(".option-btn, .scale-btn").forEach(btn => {
      btn.classList.remove("selected");
    });
    
    showStep(1);
  }

  // Handle single option button selections (Fields mapping)
  document.querySelectorAll(".option-btn[data-field]").forEach(btn => {
    btn.addEventListener("click", () => {
      const field = btn.getAttribute("data-field");
      const value = btn.getAttribute("data-val");
      
      // Toggle selected class within brothers
      const parent = btn.parentElement;
      parent.querySelectorAll(`.option-btn[data-field="${field}"]`).forEach(sibling => {
        sibling.classList.remove("selected");
      });
      btn.classList.add("selected");
      
      // Update answers object
      if (["gender", "age"].includes(field)) {
        if (field === "gender") assessmentAnswers.gender = value;
        else assessmentAnswers.ageGroup = value;
      } else if (["c1", "c3", "c4"].includes(field)) {
        assessmentAnswers.sectionC[field] = value;
      }
    });
  });

  // Handle scale button selections (1 to 5 values)
  document.querySelectorAll(".scale-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const scaleVal = parseInt(btn.getAttribute("data-val"), 10);
      const row = btn.closest(".scale-row");
      const field = row.getAttribute("data-field");
      
      row.querySelectorAll(".scale-btn").forEach(s => s.classList.remove("selected"));
      btn.classList.add("selected");

      if (field.startsWith("d")) {
        assessmentAnswers.sectionD[field] = scaleVal;
      } else if (field.startsWith("e")) {
        assessmentAnswers.sectionE[field] = scaleVal;
      }
    });
  });

  // Multi-select for Child Concerns (Section B)
  const concernsGrid = document.getElementById("concerns-multiselect");
  concernsGrid.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const val = btn.getAttribute("data-val");
      
      if (val === "belum ada masalah spesifik") {
        // Toggle sole selection
        concernsGrid.querySelectorAll(".option-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        assessmentAnswers.sectionB = [val];
      } else {
        // Remove "no concern"
        const noConcernBtn = concernsGrid.querySelector('[data-val="belum ada masalah spesifik"]');
        if (noConcernBtn) noConcernBtn.classList.remove("selected");
        assessmentAnswers.sectionB = assessmentAnswers.sectionB.filter(c => c !== "belum ada masalah spesifik");

        if (btn.classList.contains("selected")) {
          btn.classList.remove("selected");
          assessmentAnswers.sectionB = assessmentAnswers.sectionB.filter(c => c !== val);
        } else {
          if (assessmentAnswers.sectionB.length >= 3) {
            alert("Pilih maksimal 3 concern utama.");
            return;
          }
          btn.classList.add("selected");
          assessmentAnswers.sectionB.push(val);
        }
      }
    });
  });

  // Multi-select for Father Challenges (Section F)
  const challengesGrid = document.getElementById("challenges-multiselect");
  challengesGrid.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const val = btn.getAttribute("data-val");
      if (btn.classList.contains("selected")) {
        btn.classList.remove("selected");
        assessmentAnswers.sectionF = assessmentAnswers.sectionF.filter(c => c !== val);
      } else {
        if (assessmentAnswers.sectionF.length >= 3) {
          alert("Pilih maksimal 3 kondisi terberat Anda.");
          return;
        }
        btn.classList.add("selected");
        assessmentAnswers.sectionF.push(val);
      }
    });
  });

  // Stepper Progression Logic
  nextStepBtn.addEventListener("click", () => {
    if (validateCurrentStep()) {
      if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
      } else {
        submitAssessment();
      }
    }
  });

  prevStepBtn.addEventListener("click", () => {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
    }
  });

  function showStep(stepNum) {
    assessmentSteps.forEach(step => {
      if (parseInt(step.getAttribute("data-step"), 10) === stepNum) {
        step.classList.add("active");
        // GSAP animate step transition
        gsap.fromTo(step, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3 });
      } else {
        step.classList.remove("active");
      }
    });

    // Update Progress Fill
    const pct = ((stepNum - 1) / (totalSteps - 1)) * 100;
    progressFill.style.width = `${pct}%`;

    // Footer buttons styling
    prevStepBtn.style.visibility = stepNum === 1 ? "hidden" : "visible";
    nextStepBtn.textContent = stepNum === totalSteps ? "Selesai" : "Lanjut";
  }

  function validateCurrentStep() {
    if (currentStep === 1) {
      const name = document.getElementById("child-name-input").value.trim();
      if (!name) {
        alert("Mohon masukkan nama panggilan anak Anda.");
        return false;
      }
      assessmentAnswers.name = name;

      if (!assessmentAnswers.gender) {
        alert("Mohon pilih gender anak.");
        return false;
      }
      if (!assessmentAnswers.ageGroup) {
        alert("Mohon pilih tahapan usia anak.");
        return false;
      }
    } else if (currentStep === 2) {
      if (assessmentAnswers.sectionB.length === 0) {
        alert("Mohon pilih minimal 1 kondisi saat ini (atau pilih 'Belum Ada Masalah Spesifik').");
        return false;
      }
    } else if (currentStep === 3) {
      if (!assessmentAnswers.sectionC.c1 || !assessmentAnswers.sectionC.c3 || !assessmentAnswers.sectionC.c4) {
        alert("Mohon jawab seluruh pertanyaan screen & AI exposure.");
        return false;
      }
    } else if (currentStep === 4) {
      if (assessmentAnswers.sectionD.d1 === null || assessmentAnswers.sectionD.d2 === null || assessmentAnswers.sectionD.d4 === null) {
        alert("Mohon jawab seluruh pertanyaan skala relasi ayah-anak.");
        return false;
      }
    } else if (currentStep === 5) {
      if (assessmentAnswers.sectionE.e1 === null || assessmentAnswers.sectionE.e2 === null || assessmentAnswers.sectionE.e5 === null) {
        alert("Mohon jawab seluruh pertanyaan skala pendidikan iman & adab.");
        return false;
      }
    } else if (currentStep === 6) {
      if (assessmentAnswers.sectionF.length === 0) {
        alert("Mohon pilih minimal 1 kondisi yang dirasakan ayah.");
        return false;
      }
    }
    return true;
  }

  // -----------------------------------------
  // Local Calculation Engine (Fallback)
  // -----------------------------------------
  function calculateDimensionsLocal(answers) {
    const scores = {
      connection: 3.0,
      selfRegulation: 3.0,
      faithAdab: 3.0,
      digitalSafety: 3.0,
      devAwareness: 3.0,
      characterGrowth: 3.0
    };

    try {
      // Section D: Relasi Ayah-Anak (1-5 values)
      const d_answers = answers.sectionD || {};
      const connection_keys = ["d1", "d2", "d3", "d6"];
      const connection_vals = [];
      connection_keys.forEach(k => {
        if (d_answers[k] !== undefined && d_answers[k] !== null && d_answers[k] !== "") {
          connection_vals.push(parseFloat(d_answers[k]));
        }
      });
      if (connection_vals.length > 0) {
        const sum = connection_vals.reduce((a, b) => a + b, 0);
        scores.connection = Math.round((sum / connection_vals.length) * 100) / 100;
      }

      const self_reg_vals = [];
      if (d_answers.d4 !== undefined && d_answers.d4 !== null && d_answers.d4 !== "") {
        self_reg_vals.push(6.0 - parseFloat(d_answers.d4));
      }
      if (d_answers.d5 !== undefined && d_answers.d5 !== null && d_answers.d5 !== "") {
        self_reg_vals.push(parseFloat(d_answers.d5));
      }
      if (self_reg_vals.length > 0) {
        const sum = self_reg_vals.reduce((a, b) => a + b, 0);
        scores.selfRegulation = Math.round((sum / self_reg_vals.length) * 100) / 100;
      }

      // Section E: Pendidikan Iman & Adab (1-5 values)
      const e_answers = answers.sectionE || {};
      const faith_keys = ["e1", "e2", "e3", "e4", "e6"];
      const faith_vals = [];
      faith_keys.forEach(k => {
        if (e_answers[k] !== undefined && e_answers[k] !== null && e_answers[k] !== "") {
          faith_vals.push(parseFloat(e_answers[k]));
        }
      });
      if (e_answers.e5 !== undefined && e_answers.e5 !== null && e_answers.e5 !== "") {
        faith_vals.push(6.0 - parseFloat(e_answers.e5));
      }
      if (faith_vals.length > 0) {
        const sum = faith_vals.reduce((a, b) => a + b, 0);
        scores.faithAdab = Math.round((sum / faith_vals.length) * 100) / 100;
      }

      // Section C: Screen & AI Exposure
      const c_answers = answers.sectionC || {};
      const c1_val = c_answers.c1 || "< 30 menit";
      const c3_val = c_answers.c3 || "belum";
      const c4_val = c_answers.c4 || "belum";

      let c1_score = 3.0;
      if (c1_val === "< 30 menit") c1_score = 5.0;
      else if (c1_val === "30–60 menit") c1_score = 4.0;
      else if (c1_val === "1–2 jam") c1_score = 3.0;
      else if (c1_val === "2–4 jam") c1_score = 2.0;
      else if (c1_val === "> 4 jam") c1_score = 1.0;

      let c3_score = 1.0;
      if (c3_val === "sudah konsisten") c3_score = 5.0;
      else if (c3_val === "kadang") c3_score = 3.0;
      else if (c3_val === "belum") c3_score = 1.0;

      let c4_score = 3.0;
      if (c4_val === "belum") c4_score = 5.0;
      else if (c4_val === "pernah didampingi") c4_score = 4.0;
      else if (c4_val === "tidak tahu") c4_score = 3.0;
      else if (c4_val === "pernah sendiri") c4_score = 2.0;

      scores.digitalSafety = Math.round(((c1_score + c3_score + c4_score) / 3.0) * 100) / 100;

      // Section B: Concerns
      const b_concerns = answers.sectionB || [];
      const concern_count = b_concerns.length;
      const dev_score = Math.max(1.0, 5.0 - (concern_count * 0.5));
      scores.devAwareness = Math.round(dev_score * 100) / 100;

      // Section F: Challenges
      const f_challenges = answers.sectionF || [];
      const challenge_count = f_challenges.length;
      const char_score = Math.max(1.0, 5.0 - (challenge_count * 0.4));
      scores.characterGrowth = Math.round(char_score * 100) / 100;

    } catch (e) {
      console.error("Error calculating local scores:", e);
    }

    return scores;
  }

  function determineResultTypeLocal(scores, ageGroup, concerns) {
    const conn = scores.connection !== undefined ? scores.connection : 3.0;
    const self_reg = scores.selfRegulation !== undefined ? scores.selfRegulation : 3.0;
    const dig_safe = scores.digitalSafety !== undefined ? scores.digitalSafety : 3.0;
    const faith = scores.faithAdab !== undefined ? scores.faithAdab : 3.0;

    const formattedAgeGroup = ageGroup ? ageGroup.toLowerCase() : "";
    const listConcerns = concerns || [];

    if ((formattedAgeGroup === "10–12 tahun" || formattedAgeGroup === "13–17 tahun") && listConcerns.includes("sering melawan")) {
      return "Pre-Teen / Teen Communication";
    }

    const lowest_val = Math.min(conn, self_reg, dig_safe, faith);

    if (lowest_val === conn) {
      return "Ayah Perlu Reconnect";
    } else if (lowest_val === self_reg) {
      return "Anak Butuh Routine & Boundaries";
    } else if (lowest_val === dig_safe) {
      return "Digital Safety Priority";
    } else {
      return "Faith & Adab Foundation";
    }
  }

  // -----------------------------------------
  // Child Profile CRUD Operations
  // -----------------------------------------
  function editChildProfile(profileId) {
    const profile = childProfiles.find(p => p.id === profileId);
    if (!profile) return;

    editingProfileId = profileId;
    resetAssessment();

    // Pre-fill Name
    document.getElementById("child-name-input").value = profile.name;
    assessmentAnswers.name = profile.name;

    // Pre-fill Gender
    if (profile.gender) {
      assessmentAnswers.gender = profile.gender;
      const btn = document.querySelector(`.option-btn[data-field="gender"][data-val="${profile.gender}"]`);
      if (btn) btn.classList.add("selected");
    }

    // Pre-fill Age
    if (profile.ageGroup) {
      assessmentAnswers.ageGroup = profile.ageGroup;
      const btn = document.querySelector(`.option-btn[data-field="age"][data-val="${profile.ageGroup}"]`);
      if (btn) btn.classList.add("selected");
    }

    // If raw answers exist, pre-fill them as well
    if (profile.answers) {
      assessmentAnswers.sectionB = [...(profile.answers.sectionB || [])];
      assessmentAnswers.sectionC = { ...(profile.answers.sectionC || {}) };
      assessmentAnswers.sectionD = { ...(profile.answers.sectionD || {}) };
      assessmentAnswers.sectionE = { ...(profile.answers.sectionE || {}) };
      assessmentAnswers.sectionF = [...(profile.answers.sectionF || [])];

      // Highlight concern buttons (Section B)
      assessmentAnswers.sectionB.forEach(val => {
        const btn = document.querySelector(`#concerns-multiselect .option-btn[data-val="${val}"]`);
        if (btn) btn.classList.add("selected");
      });

      // Highlight Section C options
      Object.keys(assessmentAnswers.sectionC).forEach(field => {
        const val = assessmentAnswers.sectionC[field];
        const btn = document.querySelector(`.option-btn[data-field="${field}"][data-val="${val}"]`);
        if (btn) btn.classList.add("selected");
      });

      // Highlight Section D scales
      Object.keys(assessmentAnswers.sectionD).forEach(field => {
        const val = assessmentAnswers.sectionD[field];
        if (val !== null) {
          const btn = document.querySelector(`.scale-row[data-field="${field}"] .scale-btn[data-val="${val}"]`);
          if (btn) btn.classList.add("selected");
        }
      });

      // Highlight Section E scales
      Object.keys(assessmentAnswers.sectionE).forEach(field => {
        const val = assessmentAnswers.sectionE[field];
        if (val !== null) {
          const btn = document.querySelector(`.scale-row[data-field="${field}"] .scale-btn[data-val="${val}"]`);
          if (btn) btn.classList.add("selected");
        }
      });

      // Highlight Section F challenges
      assessmentAnswers.sectionF.forEach(val => {
        const btn = document.querySelector(`#challenges-multiselect .option-btn[data-val="${val}"]`);
        if (btn) btn.classList.add("selected");
      });
    }

    // Open Modal
    openModal(assessmentModal);
    // Change title of the modal to reflect Edit mode
    const titleEl = document.querySelector("#assessment-modal h4");
    if (titleEl) {
      titleEl.textContent = `Edit Peta Ayah — ${profile.name}`;
    }
  }

  async function deleteActiveChildProfile() {
    const activeProfile = childProfiles.find(p => p.id === activeChildId);
    if (!activeProfile) return;

    // Use custom designed window.confirm modal dialog
    const confirmed = await window.confirm(`Apakah Ayah yakin ingin menghapus profil "${activeProfile.name}"? Semua data jurnal, progres, dan lencananya akan terhapus secara permanen.`);
    
    if (confirmed) {
      childProfiles = childProfiles.filter(p => p.id !== activeChildId);
      
      if (childProfiles.length > 0) {
        activeChildId = childProfiles[0].id;
      } else {
        activeChildId = null;
      }
      
      saveLocalProfiles();
      syncBackupToServer();
      renderDashboard();
      
      alert(`Profil "${activeProfile.name}" berhasil dihapus.`);
    }
  }

  function submitAssessment() {
    nextStepBtn.disabled = true;
    nextStepBtn.textContent = "Memproses...";

    // POST answers to server to get computed scores
    fetch("/api/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        answers: {
          sectionC: assessmentAnswers.sectionC,
          sectionD: assessmentAnswers.sectionD,
          sectionE: assessmentAnswers.sectionE,
          sectionB: assessmentAnswers.sectionB,
          sectionF: assessmentAnswers.sectionF
        },
        ageGroup: assessmentAnswers.ageGroup,
        concerns: assessmentAnswers.sectionB
      })
    })
    .then(res => res.json())
    .then(resData => {
      nextStepBtn.disabled = false;
      nextStepBtn.textContent = "Selesai";

      if (resData.success) {
        if (editingProfileId) {
          // Editing mode
          const profile = childProfiles.find(p => p.id === editingProfileId);
          if (profile) {
            profile.name = assessmentAnswers.name;
            profile.gender = assessmentAnswers.gender;
            profile.ageGroup = assessmentAnswers.ageGroup;
            profile.scores = resData.scores;
            profile.resultType = resData.resultType;
            profile.answers = JSON.parse(JSON.stringify(assessmentAnswers)); // Update raw answers
          }
          editingProfileId = null;
        } else {
          // Creating mode
          const newId = generateUUID();
          const newProfile = {
            id: newId,
            name: assessmentAnswers.name,
            gender: assessmentAnswers.gender,
            ageGroup: assessmentAnswers.ageGroup,
            scores: resData.scores,
            resultType: resData.resultType,
            answers: JSON.parse(JSON.stringify(assessmentAnswers)), // Save raw answers
            activeQuestDay: 1,
            completedMissions: [],
            journals: [],
            completedMissionsHistory: [],
            streakStats: { currentStreak: 0, lastCompletionDate: "", longestStreak: 0 },
            badges: getDefaultBadges()
          };

          childProfiles.push(newProfile);
          activeChildId = newId;
        }

        saveLocalProfiles();
        
        // Auto-backup to server
        syncBackupToServer();

        closeModal(assessmentModal);
        switchView("dashboard");
      } else {
        alert("Terjadi kesalahan memproses asesmen: " + resData.error);
      }
    })
    .catch(err => {
      console.error(err);
      alert("Koneksi gagal. Menyimpan dengan kalkulasi lokal...");
      
      // Dynamic local calculation when server is offline
      const computedScores = calculateDimensionsLocal({
        sectionC: assessmentAnswers.sectionC,
        sectionD: assessmentAnswers.sectionD,
        sectionE: assessmentAnswers.sectionE,
        sectionB: assessmentAnswers.sectionB,
        sectionF: assessmentAnswers.sectionF
      });
      
      const computedResultType = determineResultTypeLocal(
        computedScores,
        assessmentAnswers.ageGroup,
        assessmentAnswers.sectionB
      );

      if (editingProfileId) {
        // Editing mode offline
        const profile = childProfiles.find(p => p.id === editingProfileId);
        if (profile) {
          profile.name = assessmentAnswers.name;
          profile.gender = assessmentAnswers.gender;
          profile.ageGroup = assessmentAnswers.ageGroup;
          profile.scores = computedScores;
          profile.resultType = computedResultType;
          profile.answers = JSON.parse(JSON.stringify(assessmentAnswers)); // Update raw answers
        }
        editingProfileId = null;
      } else {
        // Creating mode offline
        const newId = generateUUID();
        const newProfile = {
          id: newId,
          name: assessmentAnswers.name,
          gender: assessmentAnswers.gender,
          ageGroup: assessmentAnswers.ageGroup,
          scores: computedScores,
          resultType: computedResultType,
          answers: JSON.parse(JSON.stringify(assessmentAnswers)), // Save raw answers
          activeQuestDay: 1,
          completedMissions: [],
          journals: [],
          completedMissionsHistory: [],
          streakStats: { currentStreak: 0, lastCompletionDate: "", longestStreak: 0 },
          badges: getDefaultBadges()
        };

        childProfiles.push(newProfile);
        activeChildId = newId;
      }

      saveLocalProfiles();

      nextStepBtn.disabled = false;
      nextStepBtn.textContent = "Selesai";
      closeModal(assessmentModal);
      switchView("dashboard");
    });
  }

  function generateUUID() {
    return 'uuid-' + Math.random().toString(36).substr(2, 9);
  }

  // -----------------------------------------
  // Dashboard Rendering Logic
  // -----------------------------------------
  function renderDashboard() {
    const chipsContainer = document.getElementById("dashboard-profile-chips");
    const contentArea = document.getElementById("dashboard-content-area");
    const emptyState = document.getElementById("dashboard-empty-state");
    const editBtn = document.getElementById("btn-edit-profile");
    const deleteBtn = document.getElementById("btn-delete-profile");

    chipsContainer.innerHTML = "";

    if (childProfiles.length === 0) {
      contentArea.style.display = "none";
      emptyState.style.display = "flex";
      if (editBtn) editBtn.style.display = "none";
      if (deleteBtn) deleteBtn.style.display = "none";
      return;
    }

    contentArea.style.display = "grid";
    emptyState.style.display = "none";
    if (editBtn) editBtn.style.display = "inline-flex";
    if (deleteBtn) deleteBtn.style.display = "inline-flex";

    // Select first profile if active one is deleted or invalid
    const activeProfile = childProfiles.find(p => p.id === activeChildId) || childProfiles[0];
    activeChildId = activeProfile.id;

    // Render Profile Chips
    childProfiles.forEach(p => {
      const chip = document.createElement("button");
      chip.className = `profile-chip ${p.id === activeChildId ? 'active' : ''}`;
      chip.textContent = p.name;
      chip.addEventListener("click", () => {
        activeChildId = p.id;
        renderDashboard();
      });
      chipsContainer.appendChild(chip);
    });

    // Populate Father Map Card details
    document.getElementById("map-child-name").textContent = `Peta Ayah ${activeProfile.name}`;
    document.getElementById("map-child-phase").textContent = `Fase: ${activeProfile.ageGroup} / ${GOODFATHER_CONTENT.childPhases[activeProfile.ageGroup]?.title || ''}`;
    
    const resultTypeNode = document.getElementById("map-result-type");
    resultTypeNode.textContent = activeProfile.resultType;

    // Map Dimensions progress bars
    const dimList = document.getElementById("map-dimensions-list");
    dimList.innerHTML = "";

    const labelsMapping = {
      connection: { name: "Koneksi Emosional", color: "var(--color-sky)" },
      selfRegulation: { name: "Regulasi Amarah Ayah", color: "var(--color-coral)" },
      faithAdab: { name: "Keteladanan Iman & Adab", color: "var(--color-gold)" },
      digitalSafety: { name: "Digital & AI Safety", color: "var(--color-mint)" }
    };

    Object.keys(labelsMapping).forEach(key => {
      const score = activeProfile.scores[key] || 3.0;
      const pct = (score / 5.0) * 100;
      
      const barItem = document.createElement("div");
      barItem.className = "dim-bar-wrapper";
      barItem.innerHTML = `
        <div class="dim-info">
          <span>${labelsMapping[key].name}</span>
          <span>${score} / 5.0</span>
        </div>
        <div class="dim-bar-bg">
          <div class="dim-bar-fill" style="width: 0%; background-color: ${labelsMapping[key].color};"></div>
        </div>
      `;
      dimList.appendChild(barItem);

      // Animate progress fill with GSAP
      gsap.to(barItem.querySelector(".dim-bar-fill"), { width: `${pct}%`, duration: 0.8, delay: 0.1 });
    });

    // Priority Description Text
    const prioritiesDesc = {
      "Ayah Perlu Reconnect": "Fokus utama Anda minggu ini adalah membangun jembatan rasa aman. Anak lebih mudah dipandu setelah ia merasakan kehadiran fisik dan tatapan hangat dari sang ayah.",
      "Anak Butuh Routine & Boundaries": "Anak membutuhkan batasan tegas yang disampaikan secara konsisten. Fokuslah pada penyusunan rutinitas tidur, makan, serta pilihan terbatas.",
      "Digital Safety Priority": "Fokus pada pembatasan paparan media digital. Buat kesepakatan tertulis screen-free di meja makan serta dampingi anak saat menggunakan teknologi.",
      "Faith & Adab Foundation": "Utamakan pengajaran adab makan, jujur, serta salat berjamaah melalui keteladanan visual ayah yang langsung disaksikan oleh anak.",
      "Pre-Teen / Teen Communication": "Kondisi pra-remaja membutuhkan ayah sebagai mentor pendengar yang aman. Hindari menceramahi dengan nada tinggi, dengarkan dulu sebelum mengoreksi."
    };
    document.getElementById("map-focus-description").textContent = prioritiesDesc[activeProfile.resultType] || "Jalankan misi harian secara teratur.";

    // Populate Gender Guide Card details
    const genderGuideCard = document.getElementById("gender-guide-card");
    if (genderGuideCard) {
      if (activeProfile.gender) {
        genderGuideCard.style.display = "block";
        const genderKey = activeProfile.gender === "Laki-laki" ? "boys" : "girls";
        const genderGuide = GOODFATHER_CONTENT.genderGuides[genderKey];
        if (genderGuide) {
          const genderTitle = document.getElementById("gender-guide-title");
          const genderIcon = genderKey === "boys" ? "user" : "user-check";
          genderTitle.innerHTML = `<i data-lucide="${genderIcon}" style="color: var(--color-gold); vertical-align: middle;"></i> Panduan Anak ${activeProfile.gender} (${activeProfile.name})`;
          
          document.getElementById("gender-guide-role").textContent = genderGuide.role;
          
          // Focus list
          const focusList = document.getElementById("gender-guide-focus");
          focusList.innerHTML = "";
          genderGuide.focus.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            focusList.appendChild(li);
          });
          
          // Phrase
          const phraseContent = document.getElementById("gender-guide-phrase");
          const phrases = genderGuide.phrases;
          if (phraseContent && phrases && phrases.length > 0) {
            // Keep phrase stable based on profile ID
            const seed = activeProfile.id ? activeProfile.id.length : 0;
            const index = seed % phrases.length;
            phraseContent.textContent = `"${phrases[index]}"`;
          }

          // Missions list
          const missionsList = document.getElementById("gender-guide-missions");
          missionsList.innerHTML = "";
          genderGuide.missions.forEach(missionText => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>Alternatif:</strong> ${missionText}`;
            missionsList.appendChild(li);
          });
        }
      } else {
        genderGuideCard.style.display = "none";
      }
    }

    // Render Quest Path Timeline
    renderQuestTimeline(activeProfile);

    // Render Today's Daily Mission
    renderActiveMission(activeProfile);

    // Recommended Readings links
    renderRecommendedReadings(activeProfile);
    
    lucide.createIcons();
  }

  function renderQuestTimeline(profile) {
    const timeline = document.getElementById("dashboard-timeline");
    timeline.innerHTML = "";

    const questMissionsList = [
      { day: 1, title: "Hadir Tanpa HP", desc: "Temani anak bermain 10 menit tanpa HP." },
      { day: 2, title: "Mendengarkan Cerita", desc: "Dengarkan cerita anak 3 menit tanpa menyela." },
      { day: 3, title: "Pelukan Hangat", desc: "Peluk anak minimal 20 detik secara tulus." },
      { day: 4, title: "Batas Aturan", desc: "Buat 1 aturan screen-free kecil yang disepakati." },
      { day: 5, title: "Doakan Terdengar", desc: "Doakan anak dengan suara terdengar langsung olehnya." },
      { day: 6, title: "Bermain Bebas", desc: "Ikuti permainan anak tanpa mengatur." },
      { day: 7, title: "Jurnal Refleksi", desc: "Tuliskan refleksi harian Anda malam ini." }
    ];

    questMissionsList.forEach(q => {
      const isCompleted = profile.completedMissions.includes(q.day);
      const isActive = profile.activeQuestDay === q.day;
      
      const item = document.createElement("div");
      item.className = `timeline-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`;
      item.innerHTML = `
        <div class="timeline-star">
          <i data-lucide="${isCompleted ? 'check-circle-2' : (isActive ? 'compass' : 'circle')}"></i>
        </div>
        <div class="timeline-content">
          <div class="timeline-text">
            <span class="timeline-day">HARI ${q.day}</span>
            <span class="timeline-title">${q.title}</span>
            <p style="font-size: 0.8rem; margin: 0;">${q.desc}</p>
          </div>
          ${isCompleted ? '<span style="font-size: 0.8rem; font-weight: 700; color: var(--color-olive);">Selesai</span>' : ''}
        </div>
      `;
      timeline.appendChild(item);
    });
  }

  function renderActiveMission(profile) {
    const day = profile.activeQuestDay;
    const missionCardNode = document.getElementById("dashboard-mission-card");
    
    // Check if the 7-day quest is fully completed
    const allMissionsCompleted = profile.completedMissions.length === 7;
    
    if (allMissionsCompleted) {
      missionCardNode.classList.add("quest-complete");
      missionCardNode.innerHTML = `
        <div class="quest-complete-celebration">
          <div class="quest-complete-badge">🏆</div>
          <div class="quest-complete-title">Quest Selesai!</div>
          <p style="color: rgba(255, 255, 255, 0.9); font-size: 0.95rem; line-height: 1.6; max-width: 320px; margin: 0 auto;">
            Maa syaa Allah, Ayah <strong>${profile.name}</strong> telah menyelesaikan 7 hari quest hadir secara penuh! Terus jaga habit baik ini tanpa distraksi HP demi fitrah anak.
          </p>
          <div style="margin-top: 8px;">
            <button class="btn btn-accent" id="btn-restart-quest" style="padding: 10px 20px; font-size: 0.85rem;">
              <i data-lucide="rotate-ccw"></i> Ulang Quest 7 Hari
            </button>
          </div>
        </div>
      `;
      
      // Add event listener to restart quest button
      document.getElementById("btn-restart-quest").addEventListener("click", () => {
        profile.completedMissions = [];
        profile.activeQuestDay = 1;
        saveLocalProfiles();
        renderDashboard();
        syncBackupToServer();
      });
      
      lucide.createIcons();
      return;
    }
    
    // Remove class if it was set previously
    missionCardNode.classList.remove("quest-complete");
    
    // Restore original mission card HTML layout
    missionCardNode.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 700; color: var(--color-gold); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em;"><i data-lucide="moon"></i> Misi Hari Ini</span>
        <span class="map-badge" id="mission-status-badge" style="background-color: rgba(255,255,255,0.1); color: #fff;">Belum Selesai</span>
      </div>
      <h3 id="mission-title" style="margin-top: 8px;">Misi Harian</h3>
      <p id="mission-description"></p>
      <div class="mission-phrase-box" id="mission-phrase-area">
        <span style="font-weight: 700; display: block; margin-bottom: 4px; color: var(--color-gold);">Kalimat Ayah:</span>
        <span id="mission-phrase-content"></span>
      </div>
      <div style="display: flex; gap: 12px; margin-top: 12px;">
        <button class="btn btn-accent" id="btn-complete-mission" style="flex-grow: 1;">
          <i data-lucide="check"></i> Selesai
        </button>
        <button class="btn btn-outline" id="btn-start-focus" style="color: #fff; border-color: rgba(255,255,255,0.3);" title="Mulai Ayah Offline Mode">
          <i data-lucide="timer"></i> Offline Mode
        </button>
      </div>
    `;
      // Rebind event listeners
    document.getElementById("btn-complete-mission").addEventListener("click", () => {
      const activeProfile = childProfiles.find(p => p.id === activeChildId);
      if (!activeProfile) return;
      const d = activeProfile.activeQuestDay;
      const mission = missionDescriptions[d] || missionDescriptions[1];

      triggerMissionCompletion(
        d.toString(),
        mission.title,
        mission.desc,
        mission.reference,
        mission.category,
        "quest",
        () => {
          if (!activeProfile.completedMissions.includes(d)) {
            activeProfile.completedMissions.push(d);
          }
          if (activeProfile.activeQuestDay < 7) {
            activeProfile.activeQuestDay++;
          }
        }
      );
    });
    
    document.getElementById("btn-start-focus").addEventListener("click", () => {
      startOfflineMode();
    });

    const missionDescriptions = {
      1: { 
        title: "Hadir Tanpa HP", 
        desc: "Temani anak Anda bermain penuh selama 10 menit. Singkirkan HP Anda sepenuhnya. Berikan tatapan mata hangat, sentuhan fisik, dan ajak ia berbicara.", 
        phrase: "Abi sekarang ada di samping kamu sepenuhnya. Kamu mau main apa?",
        reference: {
          islamic: "Rasulullah ﷺ mencium cucu-cucunya dan bersabda: 'Siapa yang tidak menyayangi, tidak akan disayangi' (Sahih al-Bukhari 5997).",
          research: "Harvard Center on the Developing Child - Interaksi timbal balik 'Serve and Return' membentuk koneksi saraf otak anak."
        },
        category: "connection"
      },
      2: { 
        title: "Dengar Tanpa Koreksi", 
        desc: "Tanyakan kepada anak tentang perasaannya atau aktivitasnya hari ini. Dengarkan ocehannya selama 3 menit penuh tanpa membantah, menceramahi, atau memotong kalimatnya.", 
        phrase: "Cerita ke Abi dong sayang, hari ini bagian paling seru di sekolah apa?",
        reference: {
          islamic: "Keteladanan Rasulullah ﷺ menyimak dan mendengarkan anak-anak kecil secara sabar dan antusias (HR. Bukhari).",
          research: "UNICEF Positive Parenting - Active listening menumbuhkan rasa percaya diri, ketenangan emosional, dan ikatan aman (secure attachment)."
        },
        category: "connection"
      },
      3: { 
        title: "Pelukan Sadar 20 Detik", 
        desc: "Dekati anak Anda secara lembut, peluk dia secara hangat minimal selama 20 detik untuk merangsang produksi hormon oksitosin yang meredakan stres anak.", 
        phrase: "Abi sayang sekali sama kamu. Makasih ya sudah menjadi anak baik hari ini.",
        reference: {
          islamic: "Rasulullah ﷺ sering merangkul, menggendong cucunya di punggung, dan mencium mereka dengan kehangatan (Sahih al-Bukhari).",
          research: "American Academy of Pediatrics (AAP) - Sentuhan fisik/pelukan hangat teratur memicu hormon oksitosin dan menekan kortisol (hormon stres)."
        },
        category: "connection"
      },
      4: { 
        title: "Buat 1 Batas Aturan Kecil", 
        desc: "Sepakati satu aturan kecil terkait gadget dengan anak Anda secara hangat (misal: tidak ada HP di meja makan atau HP ditaruh di kotak sebelum tidur).", 
        phrase: "Sesuai kesepakatan kita ya, sebelum tidur HP diistirahatkan di keranjang ini.",
        reference: {
          islamic: "Tanggung jawab memelihara fitrah suci keluarga dan amanah pengasuhan (QS. At-Tahrim: 6).",
          research: "WHO Screen-Time Guidelines - Menyarankan pembatasan layar yang konsisten demi kualitas tidur dan perkembangan sosial motorik."
        },
        category: "fitrah"
      },
      5: { 
        title: "Doa yang Didengar Anak", 
        desc: "Sebelum anak tidur malam ini, usap kepalanya dengan lembut dan bacakan doa perlindungan 'ain dan setan (HR. Bukhari 3371) secara lirih langsung di telinganya.", 
        phrase: "أُعِيذُكَ بِكَلِمَاتِ اللَّهِ التَّامَّةِ، مِنْ كُلِّ شَيْطَانٍ وَهَامَّةٍ، وَمِنْ كُلِّ عَيْنٍ لَامَّةٍ (U'idhuka bi-kalimatillahit-tammati min kulli shaitanin wa hammatin wa min kulli 'ainin lammatin)",
        reference: {
          islamic: "HR. Bukhari no. 3371 - Doa tahshin/perlindungan untuk anak keturunan.",
          research: "Child Development - Mendengar suara tenang ayah mendoakan dengan kelembutan memicu relaksasi saraf vagus dan menurunkan stres anak menjelang tidur."
        },
        category: "luqman"
      },
      6: { 
        title: "Main Mengikuti Anak", 
        desc: "Bermain bersama anak dengan membiarkan anak yang memimpin permainannya (misal: menyusun balok, masak-masakan), ayah bertindak sebagai asistennya.", 
        phrase: "Wah, bagus sekali kastil yang kamu bangun. Abi bantu ambilkan balok warna hijau ya?",
        reference: {
          islamic: "Ali bin Abi Thalib meriwayatkan rumus pengasuhan: 'Bermainlah bersama mereka pada 7 tahun pertama.'",
          research: "Harvard Developing Child Guide - Bermain bebas terpimpin (child-led play) memupuk kemampuan adaptabilitas kognitif dan inisiatif anak."
        },
        category: "connection"
      },
      7: { 
        title: "Refleksi di Jurnal Malam", 
        desc: "Luangkan waktu 3 menit setelah anak tertidur malam ini untuk menuliskan jurnal refleksi tentang apa saja perbaikan emosional ayah minggu ini.", 
        phrase: "Alhamdulillah, hari ini Abi belajar lebih tenang mendengarkan alasan tantrum anak.",
        reference: {
          islamic: "Prinsip Muhasabah (evaluasi diri) dalam Islam untuk terus menyempurnakan akhlak (HR. Tirmidzi).",
          research: "CASEL SEL Framework - Kesadaran diri orang tua (self-awareness) adalah prasyarat utama keberhasilan regulasi emosi pengasuhan."
        },
        category: "rahmah"
      }
    };

    const mission = missionDescriptions[day] || missionDescriptions[1];
    
    document.getElementById("mission-title").textContent = `Hari ${day}: ${mission.title}`;
    document.getElementById("mission-description").textContent = mission.desc;
    document.getElementById("mission-phrase-content").textContent = `"${mission.phrase}"`;
  }

  function renderRecommendedReadings(profile) {
    const readingsArea = document.getElementById("dashboard-readings");
    readingsArea.innerHTML = "";

    // Filters articles based on resultType mapping
    const mapCategoryMapping = {
      "Ayah Perlu Reconnect": "Foundation",
      "Anak Butuh Routine & Boundaries": "Foundation",
      "Digital Safety Priority": "Digital & AI",
      "Faith & Adab Foundation": "Iman & Adab",
      "Pre-Teen / Teen Communication": "Father Self-Work"
    };

    const targetCategory = mapCategoryMapping[profile.resultType] || "Foundation";
    
    // Refine to prioritize child's age group or "Semua Usia"
    let recommended = GOODFATHER_CONTENT.articles.filter(a => 
      a.category === targetCategory && 
      (a.age === "Semua Usia" || a.age.toLowerCase() === profile.ageGroup.toLowerCase())
    );
    
    // Fallback if no matching age group articles exist in that category
    if (recommended.length === 0) {
      recommended = GOODFATHER_CONTENT.articles.filter(a => a.category === targetCategory);
    }

    recommended.forEach(art => {
      const link = document.createElement("div");
      link.className = "pain-card";
      link.style.padding = "16px";
      link.style.cursor = "pointer";
      link.innerHTML = `
        <div style="font-size: 0.8rem; font-weight: 700; color: var(--color-gold);">${art.category}</div>
        <h5 style="margin: 4px 0;">${art.title}</h5>
        <span style="font-size: 0.8rem; color: var(--text-muted);"><i data-lucide="clock" style="width: 12px; height: 12px; vertical-align: middle;"></i> Bacaan ${art.readTime}</span>
      `;
      link.addEventListener("click", () => {
        openArticleReader(art);
      });
      readingsArea.appendChild(link);
    });
  }

  // -----------------------------------------
  // Focus Offline Mode Timer (GSAP Breathing)
  // -----------------------------------------
  const startFocusBtn = document.getElementById("btn-start-focus");
  const cancelFocusBtn = document.getElementById("btn-cancel-focus");
  const focusOverlay = document.getElementById("focus-overlay");
  const focusTimerNode = document.getElementById("focus-timer");
  const focusInstructionNode = document.getElementById("focus-instruction");
  const breathingOuterCircle = document.getElementById("focus-breathing-outer");
  const focusCircleText = document.getElementById("focus-circle-text");

  // Replaced by dynamic listener inside renderActiveMission

  cancelFocusBtn.addEventListener("click", () => {
    stopOfflineMode();
  });

  function triggerRadialRipple() {
    const container = document.querySelector(".breathing-container");
    if (!container) return;

    const ripple = document.createElement("div");
    ripple.className = "breathing-ripple";
    ripple.style.width = "180px";
    ripple.style.height = "180px";
    
    container.appendChild(ripple);

    gsap.fromTo(ripple, 
      { scale: 1, opacity: 0.8 }, 
      { 
        scale: 2.2, 
        opacity: 0, 
        duration: 3.5, 
        ease: "power1.out",
        onComplete: () => ripple.remove() 
      }
    );
  }

  function startOfflineMode() {
    focusSecondsRemaining = 1200; // 20 mins
    updateTimerText();
    focusOverlay.classList.add("active");
    
    // Animate Breathing circle with GSAP timeline
    breathingTimeline = gsap.timeline({ repeat: -1 });
    
    breathingTimeline
      .to(breathingOuterCircle, { 
        scale: 1.35, 
        backgroundColor: "rgba(122, 158, 178, 0.18)", // Muted Ice Blue
        duration: 4, 
        ease: "sine.inOut",
        onStart: () => {
          focusCircleText.textContent = "Tarik Napas";
          focusInstructionNode.textContent = "Tarik napas perlahan... Hadir seutuhnya.";
          triggerRadialRipple();
        }
      })
      .to(breathingOuterCircle, { 
        duration: 2, // Hold
        onStart: () => {
          focusCircleText.textContent = "Tahan";
          focusInstructionNode.textContent = "Tahan napas sebentar... Rasakan ketenangan.";
        }
      })
      .to(breathingOuterCircle, { 
        scale: 0.85, 
        backgroundColor: "rgba(110, 138, 131, 0.15)", // Soft Slate Green
        duration: 4, 
        ease: "sine.inOut",
        onStart: () => {
          focusCircleText.textContent = "Hembuskan";
          focusInstructionNode.textContent = "Hembuskan napas lambat... Lepaskan lelah.";
          triggerRadialRipple();
        }
      })
      .to(breathingOuterCircle, { 
        duration: 2, // Hold
        onStart: () => {
          focusCircleText.textContent = "Tahan";
          focusInstructionNode.textContent = "Tahan sejenak... Rasakan kehangatan rumah.";
        }
      });

    focusInterval = setInterval(() => {
      focusSecondsRemaining--;
      updateTimerText();
      
      if (focusSecondsRemaining <= 0) {
        stopOfflineMode();
        alert("Selamat! Anda telah fokus hadir tanpa HP selama 20 menit.");
      }
    }, 1000);
  }

  function stopOfflineMode() {
    if (focusInterval) {
      clearInterval(focusInterval);
      focusInterval = null;
    }
    if (breathingTimeline) {
      breathingTimeline.kill();
      breathingTimeline = null;
    }
    gsap.set(breathingOuterCircle, { scale: 1, backgroundColor: "rgba(255, 244, 227, 0.05)" });
    focusOverlay.classList.remove("active");
  }

  function updateTimerText() {
    const mins = Math.floor(focusSecondsRemaining / 60);
    const secs = focusSecondsRemaining % 60;
    focusTimerNode.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // -----------------------------------------
  // Floating Crisis Mode Overlay
  // -----------------------------------------
  const floatingCrisisBtn = document.getElementById("floating-crisis-btn");
  const crisisModal = document.getElementById("crisis-modal");
  const closeCrisisBtn = document.getElementById("close-crisis-modal");
  const crisisMenuList = document.getElementById("crisis-menu-list");
  const crisisContent = document.getElementById("crisis-content-details");

  floatingCrisisBtn.addEventListener("click", () => {
    openCrisisPanel();
  });

  closeCrisisBtn.addEventListener("click", () => {
    closeModal(crisisModal);
  });

  function openCrisisPanel() {
    // Generate menu buttons
    crisisMenuList.innerHTML = "";
    
    GOODFATHER_CONTENT.crisisGuides.forEach((g, idx) => {
      const btn = document.createElement("button");
      btn.className = `crisis-menu-btn ${idx === 0 ? 'active' : ''}`;
      btn.textContent = g.title;
      btn.addEventListener("click", () => {
        // Toggle active menu class
        crisisMenuList.querySelectorAll(".crisis-menu-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderCrisisGuide(g);
      });
      crisisMenuList.appendChild(btn);
    });

    // Render first guide by default
    renderCrisisGuide(GOODFATHER_CONTENT.crisisGuides[0]);
    openModal(crisisModal);
  }

  function renderCrisisGuide(guide) {
    crisisContent.innerHTML = "";

    // Generate steps list HTML
    let stepsHtml = "";
    guide.steps.forEach(step => {
      stepsHtml += `<li>${step}</li>`;
    });

    let dontsHtml = "";
    guide.donts.forEach(d => {
      dontsHtml += `<li>${d}</li>`;
    });

    crisisContent.innerHTML = `
      <div>
        <span style="font-size: 0.8rem; font-weight: 700; color: var(--color-coral); text-transform: uppercase;">${guide.duration}</span>
        <h2 style="margin: 4px 0 16px;">${guide.title}</h2>
      </div>

      <div class="mission-phrase-box" style="background-color: rgba(255, 138, 101, 0.05); border-color: var(--color-coral);">
        <span style="font-weight: 700; color: var(--color-coral); display: block; margin-bottom: 4px;"><i data-lucide="message-square"></i> Contoh Kalimat Ayah:</span>
        <p style="font-style: italic; font-size: 1.05rem; font-weight: 500; color: var(--text-main); font-family: var(--font-sans);">"${guide.fatherPhrase}"</p>
      </div>

      <div>
        <h4 class="article-section-title">Apa Yang Ayah Lakukan:</h4>
        <ol style="padding-left: 20px; display: flex; flex-direction: column; gap: 8px; font-size: 0.95rem;">
          ${stepsHtml}
        </ol>
      </div>

      <div>
        <h4 class="article-section-title" style="color: var(--color-coral); border-color: var(--color-coral);">Jangan Lakukan (Red Alert):</h4>
        <ul class="list-donts" style="font-size: 0.95rem;">
          ${dontsHtml}
        </ul>
      </div>
    `;

    lucide.createIcons();
    gsap.fromTo(crisisContent, { opacity: 0, x: 15 }, { opacity: 1, x: 0, duration: 0.25 });
  }

  // -----------------------------------------
  // Guides Library Rendering & Searching
  // -----------------------------------------
  const searchInput = document.getElementById("guide-search-input");
  const filtersContainer = document.getElementById("library-filters-container");
  const articleGrid = document.getElementById("library-article-grid");
  let activeCategoryFilter = "all";

  // Category filter click handler
  filtersContainer.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      filtersContainer.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategoryFilter = btn.getAttribute("data-category");
      renderGuides();
    });
  });

  searchInput.addEventListener("input", () => {
    renderGuides();
  });

  function renderGuides() {
    articleGrid.innerHTML = "";
    const query = searchInput.value.toLowerCase().trim();

    const filtered = GOODFATHER_CONTENT.articles.filter(a => {
      // Category Match
      const categoryMatch = activeCategoryFilter === "all" || a.category === activeCategoryFilter;
      
      // Search query Match (Title, Quick Answer, Category)
      const textMatch = !query || 
        a.title.toLowerCase().includes(query) ||
        a.category.toLowerCase().includes(query) ||
        a.content.quickAnswer.toLowerCase().includes(query);

      return categoryMatch && textMatch;
    });

    if (filtered.length === 0) {
      articleGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px; border: 1px dashed var(--border-color); border-radius: var(--radius-lg);">
          <p>Tidak ada artikel yang cocok dengan pencarian Anda.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(art => {
      const card = document.createElement("div");
      card.className = "article-card";
      card.innerHTML = `
        <div class="article-meta">
          <span>${art.category}</span>
          <span>${art.age}</span>
        </div>
        <h3>${art.title}</h3>
        <p style="font-size: 0.9rem; line-height: 1.5; color: var(--text-muted);">${art.content.quickAnswer}</p>
        <div style="font-size: 0.8rem; font-weight: 600; color: var(--color-olive); display: flex; align-items: center; gap: 4px; margin-top: auto;">
          <i data-lucide="book-open" style="width: 14px; height: 14px;"></i> Baca Selengkapnya (${art.readTime})
        </div>
      `;
      card.addEventListener("click", () => {
        openArticleReader(art);
      });
      articleGrid.appendChild(card);
    });

    lucide.createIcons();
  }

  // Article Reader Modal
  const articleModal = document.getElementById("article-modal");
  const closeArticleBtn = document.getElementById("close-article-modal");
  const articleReaderCategory = document.getElementById("article-reader-category");
  const articleReaderBody = document.getElementById("article-reader-body");
  const acceptArticleMissionBtn = document.getElementById("btn-accept-article-mission");

  closeArticleBtn.addEventListener("click", () => {
    closeModal(articleModal);
  });

  function openArticleReader(article) {
    articleReaderCategory.textContent = `${article.category} • Panduan Usia: ${article.age}`;
    
    let dosHtml = "";
    article.content.whatToDo.forEach(todo => {
      dosHtml += `<li>${todo}</li>`;
    });

    let dontsHtml = "";
    article.content.donts.forEach(dont => {
      dontsHtml += `<li>${dont}</li>`;
    });

    let refsHtml = "";
    article.content.references.forEach(ref => {
      refsHtml += `<span style="background-color: var(--bg-accent); font-size: 0.75rem; padding: 4px 8px; border-radius: 40px; font-weight: 500;">${ref}</span>`;
    });

    articleReaderBody.innerHTML = `
      <h2 style="margin-bottom: 8px;">${article.title}</h2>
      <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 24px;"><i data-lucide="clock" style="width: 14px; height: 14px; vertical-align: middle;"></i> Estimasi Bacaan: ${article.readTime}</div>

      <div style="background-color: var(--bg-app); padding: 18px; border-radius: var(--radius-md); border-left: 4px solid var(--color-gold); margin-bottom: 24px;">
        <span style="font-weight: 700; color: var(--color-gold); display: block; margin-bottom: 4px;">Jawaban Kilat:</span>
        <p style="font-size: 0.95rem; font-weight: 600; color: var(--text-main); font-family: var(--font-sans);">${article.content.quickAnswer}</p>
      </div>

      <div>
        <h4 class="article-section-title">Kenapa Ini Penting?</h4>
        <p style="font-size: 0.95rem; margin-bottom: 12px;">${article.content.whyImportant}</p>
        <p style="font-size: 0.95rem; font-style: italic; border-left: 2px solid var(--border-color); padding-left: 10px;">${article.content.childLens}</p>
      </div>

      <div class="mission-phrase-box" style="background-color: rgba(216, 168, 78, 0.05); border-color: var(--color-gold); margin: 24px 0;">
        <span style="font-weight: 700; color: var(--color-gold); display: block; margin-bottom: 4px;"><i data-lucide="message-square"></i> Contoh Kalimat Ayah:</span>
        <p style="font-style: italic; font-size: 1.05rem; font-weight: 500; font-family: var(--font-sans);">"${article.content.fatherPhrases}"</p>
      </div>

      <div>
        <h4 class="article-section-title">Langkah Praktis Ayah Hari Ini:</h4>
        <ul class="list-dos" style="font-size: 0.95rem; margin-bottom: 24px;">
          ${dosHtml}
        </ul>
      </div>

      <div>
        <h4 class="article-section-title" style="color: var(--color-coral); border-color: var(--color-coral);">Jangan Lakukan:</h4>
        <ul class="list-donts" style="font-size: 0.95rem; margin-bottom: 24px;">
          ${dontsHtml}
        </ul>
      </div>

      <div class="alert-box alert-warning" style="margin-bottom: 24px;">
        <h5 style="margin-bottom: 4px; font-weight: 700;"><i data-lucide="shield-alert" style="vertical-align: middle;"></i> KAPAN PERLU BANTUAN</h5>
        <p style="font-size: 0.85rem;">${article.content.redFlags}</p>
      </div>

      <div style="border-top: 1px solid var(--border-color); padding-top: 16px;">
        <span style="font-size: 0.85rem; font-weight: 700; display: block; margin-bottom: 8px; color: var(--text-muted);">Sumber / Referensi Ilmiah:</span>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          ${refsHtml}
        </div>
      </div>
    `;

    // Set article mission binding
    acceptArticleMissionBtn.onclick = () => {
      closeModal(articleModal);
      
      // Load this mission as dashboard mission temporarily
      const activeProfile = childProfiles.find(p => p.id === activeChildId);
      if (activeProfile) {
        document.getElementById("mission-title").textContent = `Misi Mandiri: ${article.title}`;
        document.getElementById("mission-description").textContent = article.content.dailyMission;
        document.getElementById("mission-phrase-content").textContent = `"${article.content.fatherPhrases}"`;
        
        // Reset complete button
        const completeBtn = document.getElementById("btn-complete-mission");
        completeBtn.disabled = false;
        completeBtn.textContent = "Selesai Jalankan Misi";
        
        const statusBadge = document.getElementById("mission-status-badge");
        statusBadge.textContent = "Misi Artikel";
        statusBadge.style.backgroundColor = "rgba(216, 168, 78, 0.2)";
        statusBadge.style.color = "var(--color-gold)";

        // Change complete button function specifically for article mission
        completeBtn.onclick = () => {
          const catMap = {
            "Foundation": "connection",
            "Iman & Adab": "luqman",
            "Digital & AI": "fitrah",
            "Father Self-Work": "rahmah"
          };
          const category = catMap[article.category] || "connection";

          triggerMissionCompletion(
            article.id,
            article.title,
            article.content.dailyMission,
            {
              islamic: article.content.islamicLens || "Nasihat Syariat Islami.",
              research: article.content.references ? article.content.references.join(", ") : "Riset Psikologi Anak."
            },
            category,
            "article",
            () => {
              completeBtn.disabled = true;
              completeBtn.textContent = "Misi Artikel Selesai";
              statusBadge.textContent = "Selesai";
              statusBadge.style.backgroundColor = "rgba(143, 220, 194, 0.2)";
              statusBadge.style.color = "var(--color-mint)";
              
              // Reset back to normal quest state on dashboard refresh after delay
              setTimeout(() => { renderDashboard(); }, 2500);
            }
          );
        };

        // Scroll back to dashboard view
        switchView("dashboard");
      }
    };

    lucide.createIcons();
    openModal(articleModal);
  }

  // -----------------------------------------
  // Journal Refleksi Logging System
  // -----------------------------------------
  const saveJournalBtn = document.getElementById("btn-save-journal");
  const journalLogContainer = document.getElementById("journal-logs-container");

  saveJournalBtn.addEventListener("click", () => {
    const activeProfile = childProfiles.find(p => p.id === activeChildId);
    if (!activeProfile) {
      alert("Silakan buat profil anak terlebih dahulu sebelum mencatat jurnal.");
      return;
    }

    const presence = document.getElementById("journal-q-presence").value.trim();
    const anger = document.getElementById("journal-q-anger").value.trim();
    const need = document.getElementById("journal-q-need").value.trim();
    const prayer = document.getElementById("journal-q-prayer").value.trim();

    if (!presence || !need) {
      alert("Mohon isi minimal pertanyaan hadir dan kebutuhan anak.");
      return;
    }

    const newLog = {
      date: new Date().toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      timestamp: Date.now(),
      presence: presence,
      anger: anger || "Tidak terpancing amarah hari ini.",
      need: need,
      prayer: prayer || "Semoga dilindungi oleh Allah."
    };

    activeProfile.journals.unshift(newLog);
    saveLocalProfiles();
    
    // Sync backup automatically
    syncBackupToServer();

    // Reset Form
    document.getElementById("journal-q-presence").value = "";
    document.getElementById("journal-q-anger").value = "";
    document.getElementById("journal-q-need").value = "";
    document.getElementById("journal-q-prayer").value = "";

    alert("Jurnal refleksi berhasil disimpan!");
    renderJournalLogs();
  });

  function renderJournalLogs() {
    journalLogContainer.innerHTML = "";
    const activeProfile = childProfiles.find(p => p.id === activeChildId);

    // Update Jurnal child profile subtitle indicator
    const journalIndicator = document.getElementById("journal-child-name-indicator");
    if (journalIndicator) {
      if (activeProfile) {
        journalIndicator.innerHTML = `Mencatat catatan refleksi harian untuk tumbuh kembang anak: <strong style="color: var(--color-gold);">${activeProfile.name}</strong>.`;
      } else {
        journalIndicator.textContent = "Silakan buat profil anak terlebih dahulu di Peta Ayah.";
      }
    }

    if (!activeProfile || !activeProfile.journals || activeProfile.journals.length === 0) {
      journalLogContainer.innerHTML = `
        <div style="text-align: center; padding: 32px; border: 1px dashed var(--border-color); border-radius: var(--radius-lg);">
          <p>Belum ada catatan jurnal. Mulai tulis satu kalimat refleksi malam ini.</p>
        </div>
      `;
      return;
    }

    activeProfile.journals.forEach(log => {
      const card = document.createElement("div");
      card.className = "journal-card";
      card.innerHTML = `
        <div class="journal-header">
          <span style="color: var(--color-gold); font-weight: 700;"><i data-lucide="calendar" style="width: 12px; height: 12px; vertical-align: middle;"></i> ${log.date}</span>
          <span style="color: var(--text-muted);">Oleh: Ayah ${activeProfile.name}</span>
        </div>
        <div class="journal-row">
          <span class="journal-row-label">Hadir Bersama Anak:</span>
          <p class="journal-row-val">${log.presence}</p>
        </div>
        <div class="journal-row">
          <span class="journal-row-label">Tantangan Amarah:</span>
          <p class="journal-row-val">${log.anger}</p>
        </div>
        <div class="journal-row">
          <span class="journal-row-label">Kebutuhan Anak:</span>
          <p class="journal-row-val">${log.need}</p>
        </div>
        <div class="journal-row">
          <span class="journal-row-label">Doa Harian:</span>
          <p class="journal-row-val" style="font-style: italic;">"${log.prayer}"</p>
        </div>
      `;
      journalLogContainer.appendChild(card);
    });

    lucide.createIcons();
  }

  function renderProgressView() {
    const activeProfile = childProfiles.find(p => p.id === activeChildId);
    
    // Update Progress child profile header indicator
    const progressIndicator = document.getElementById("progress-profile-indicator");
    if (progressIndicator) {
      if (activeProfile) {
        progressIndicator.innerHTML = `Memantau konsistensi dan lencana pengasuhan untuk anak Anda: <strong style="color: var(--color-gold);">${activeProfile.name}</strong>.`;
      } else {
        progressIndicator.textContent = "Silakan buat profil anak terlebih dahulu di Peta Ayah.";
        return;
      }
    }

    if (!activeProfile) return;

    ensureProfileFields(activeProfile);

    // Update Stats Card Values
    document.getElementById("stat-current-streak").textContent = activeProfile.streakStats.currentStreak;
    document.getElementById("stat-longest-streak").textContent = activeProfile.streakStats.longestStreak;
    document.getElementById("stat-total-missions").textContent = activeProfile.completedMissionsHistory.length;

    // Render Badges list
    const badgesContainer = document.getElementById("progress-badges-container");
    if (badgesContainer) {
      badgesContainer.innerHTML = "";
      
      activeProfile.badges.forEach(badge => {
        const isUnlocked = badge.unlocked;
        const pct = Math.min(100, Math.round((badge.progress / badge.target) * 100));

        const badgeCard = document.createElement("div");
        badgeCard.className = `badge-card ${isUnlocked ? 'unlocked' : 'locked'}`;

        badgeCard.innerHTML = `
          <div class="badge-icon-wrap">
            <i data-lucide="${badge.icon}"></i>
          </div>
          <div class="badge-details" style="flex-grow: 1;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <h4 class="badge-title">${badge.title}</h4>
              <span class="badge-status-text">
                ${isUnlocked ? 'Unlocked' : `${badge.progress}/${badge.target} ${badge.unit}`}
              </span>
            </div>
            <p class="badge-desc">${badge.desc}</p>
            
            ${!isUnlocked ? `
              <div class="badge-progress-bg">
                <div class="badge-progress-fill" style="width: ${pct}%;"></div>
              </div>
            ` : `
              <p class="badge-quote"><i data-lucide="quote" style="width: 10px; height: 10px; display: inline-block;"></i> ${badge.ref}</p>
            `}
          </div>
        `;
        applyTiltEffect(badgeCard);
        badgesContainer.appendChild(badgeCard);
      });
    }

    // Render History Log
    const historyContainer = document.getElementById("progress-history-container");
    if (historyContainer) {
      historyContainer.innerHTML = "";

      if (activeProfile.completedMissionsHistory.length === 0) {
        historyContainer.innerHTML = `
          <div style="text-align: center; padding: 32px; border: 1px dashed var(--border-color); border-radius: var(--radius-lg); color: var(--text-muted);">
            <p>Belum ada misi yang diselesaikan. Mulai selesaikan misi harian atau artikel untuk merekam jejak istiqamah Ayah.</p>
          </div>
        `;
      } else {
        activeProfile.completedMissionsHistory.forEach(item => {
          const dateStr = new Date(item.timestamp).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
          });
          const histItem = document.createElement("div");
          histItem.className = "history-item-card";

          histItem.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 6px;">
              <span class="history-item-badge ${item.type}">${item.type === 'quest' ? 'Quest Harian' : 'Misi Artikel'}</span>
              <span class="history-item-date">${dateStr}</span>
            </div>
            <h4 class="history-item-title">${item.title}</h4>
            
            ${item.reflection ? `
              <div class="history-item-reflection">
                "${item.reflection}"
              </div>
            ` : ''}
            
            <div class="history-item-ref-box" style="margin-top: 10px; border-top: 1px solid var(--border-color); padding-top: 8px;">
              <button class="btn-toggle-ref" style="background: none; border: none; padding: 0; font-size: 0.75rem; color: var(--color-olive); cursor: pointer; display: flex; align-items: center; gap: 4px;">
                <i data-lucide="info" style="width: 12px; height: 12px;"></i> Lihat Rujukan Validasi
              </button>
              <div class="history-item-refs" style="display: none;">
                <div style="margin-bottom: 6px;"><strong style="color: var(--color-olive);">Syariat:</strong> <span style="color: var(--text-main);">${item.reference.islamic}</span></div>
                <div><strong style="color: var(--color-coral);">Riset Psikologi:</strong> <span style="color: var(--text-main);">${item.reference.research}</span></div>
              </div>
            </div>
          `;
          
          // Wire up toggle reference button
          const toggleBtn = histItem.querySelector(".btn-toggle-ref");
          const refsDiv = histItem.querySelector(".history-item-refs");
          toggleBtn.addEventListener("click", () => {
            const isVisible = refsDiv.style.display === "block";
            refsDiv.style.display = isVisible ? "none" : "block";
            toggleBtn.innerHTML = isVisible ? 
              `<i data-lucide="info" style="width: 12px; height: 12px;"></i> Lihat Rujukan Validasi` : 
              `<i data-lucide="chevron-up" style="width: 12px; height: 12px;"></i> Sembunyikan Rujukan`;
            lucide.createIcons();
          });

          historyContainer.appendChild(histItem);
        });
      }
    }

    lucide.createIcons();

    // GSAP animations for entering view
    gsap.fromTo("#view-progress .stat-box", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out" });
    gsap.fromTo("#view-progress .badge-card", { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: "power2.out", delay: 0.1 });
    gsap.fromTo("#view-progress .history-item-card", { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: "power2.out", delay: 0.2 });
  }

  // -----------------------------------------
  // Motionsites.ai Premium Animations (GSAP)
  // -----------------------------------------
  
  // 1. Initial Mockup Dim Progress Bars
  const mockupBars = document.querySelectorAll(".main-mockup .mockup-dim-fill");
  mockupBars.forEach(bar => {
    const w = bar.getAttribute("data-width") || "0";
    gsap.to(bar, { width: `${w}%`, duration: 1.4, ease: "power3.out", delay: 0.8 });
  });

  // 2. Hero Text Slide-up Reveal
  gsap.fromTo(".split-child", 
    { yPercent: 105 }, 
    { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.12, delay: 0.25 }
  );

  // Subtitle and Buttons reveal
  gsap.fromTo(".hero-content-left p", 
    { opacity: 0, y: 20 }, 
    { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.65 }
  );
  
  gsap.fromTo(".hero-actions", 
    { opacity: 0, y: 20 }, 
    { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.85 }
  );

  // 3. Interactive Mouse-movement Parallax on Hero Mockup
  const heroMockup = document.getElementById("hero-mockup");
  if (heroMockup) {
    heroMockup.addEventListener("mousemove", (e) => {
      const rect = heroMockup.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Rotate main card
      gsap.to(".main-mockup", {
        rotateY: -12 + (x * 0.04),
        rotateX: 8 - (y * 0.04),
        duration: 0.4,
        ease: "power2.out"
      });
      
      // Move floating layers by depth factor
      const floatCards = heroMockup.querySelectorAll(".floating-card");
      floatCards.forEach(card => {
        const depth = parseFloat(card.getAttribute("data-depth") || "0.1");
        gsap.to(card, {
          x: x * depth * 1.6,
          y: y * depth * 1.6,
          duration: 0.5,
          ease: "power2.out"
        });
      });
    });
    
    // Smooth reset on mouse leave
    heroMockup.addEventListener("mouseleave", () => {
      gsap.to(".main-mockup", {
        rotateY: -12,
        rotateX: 8,
        rotateZ: 2,
        duration: 0.8,
        ease: "power3.out"
      });
      
      const floatCards = heroMockup.querySelectorAll(".floating-card");
      floatCards.forEach(card => {
        gsap.to(card, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });
    });
  }

  // 4. Constant Idle Float loops for Floating Cards
  gsap.to(".mission-card-float", {
    y: "+=12",
    rotation: "-=1",
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
  });
  
  gsap.to(".offline-card-float", {
    y: "-=10",
    rotation: "+=2",
    duration: 3.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.3
  });
  
  gsap.to(".badge-card-float", {
    y: "+=8",
    duration: 2.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 0.15
  });

  // 5. ScrollTrigger Card Entrance animations
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // Staggered reveal for pain-cards
    gsap.fromTo("#view-home .pain-card", 
      {
        opacity: 0,
        y: 40
      },
      {
        scrollTrigger: {
          trigger: "#view-home .pain-grid",
          start: "top 85%",
          toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power2.out",
        clearProps: "opacity,transform"
      }
    );
    
    // Staggered reveal for step-items
    gsap.fromTo("#view-home .step-item", 
      {
        opacity: 0,
        y: 30
      },
      {
        scrollTrigger: {
          trigger: "#view-home .step-list",
          start: "top 85%",
          toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power2.out",
        clearProps: "opacity,transform"
      }
    );
    
    // Staggered reveal for pillar-cards
    gsap.fromTo("#view-home .pillar-card", 
      {
        opacity: 0,
        scale: 0.96,
        y: 35
      },
      {
        scrollTrigger: {
          trigger: "#view-home .pillar-grid",
          start: "top 85%",
          toggleActions: "play none none none"
        },
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power2.out",
        clearProps: "opacity,transform,scale"
      }
    );
  }

  // 6. Magnetic Button Interactive Hover (Only for pointer devices supporting hover)
  if (window.matchMedia("(hover: hover)").matches) {
    const magneticBtns = document.querySelectorAll(".btn-lg, .btn-primary, .btn-outline");
    magneticBtns.forEach(btn => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
          x: x * 0.32,
          y: y * 0.32,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "elastic.out(1, 0.3)"
        });
      });
    });
  }

  // -----------------------------------------
  // Mission Completion Modal & Calculation Engine
  // -----------------------------------------
  function triggerMissionCompletion(missionId, missionTitle, missionDesc, references, category, type, onCompleteCallback) {
    const mcModal = document.getElementById("mission-complete-modal");
    const nameNode = document.getElementById("mc-mission-name");
    const descNode = document.getElementById("mc-mc-mission-desc") || document.getElementById("mc-mission-desc");
    const refIslamicNode = document.getElementById("mc-ref-islamic");
    const refResearchNode = document.getElementById("mc-ref-research");
    const reflectionInput = document.getElementById("mc-reflection-text");
    const submitBtn = document.getElementById("btn-submit-mc");
    const cancelBtn = document.getElementById("btn-cancel-mc");
    const closeBtn = document.getElementById("close-mc-modal");

    // Populate modal content
    if (nameNode) nameNode.textContent = missionTitle;
    if (descNode) descNode.textContent = missionDesc;
    if (refIslamicNode) refIslamicNode.textContent = references.islamic || "Nasihat Syariat Islami.";
    if (refResearchNode) refResearchNode.textContent = references.research || "Riset Psikologi Anak.";
    if (reflectionInput) reflectionInput.value = ""; // Reset textarea

    // Open modal
    mcModal.classList.add("active");

    // Clean up function for listeners
    function cleanupListeners() {
      submitBtn.onclick = null;
      cancelBtn.onclick = null;
      closeBtn.onclick = null;
    }

    // Submit handler
    submitBtn.onclick = () => {
      const reflectionText = reflectionInput ? reflectionInput.value.trim() : "";
      
      saveCompletedMission(missionId, missionTitle, missionDesc, references, category, type, reflectionText);
      
      mcModal.classList.remove("active");
      cleanupListeners();

      // Trigger Confetti Blast!
      if (window.confetti || typeof confetti !== "undefined") {
        confetti.spawn(140);
      }

      // Trigger GSAP scale & bounce celebration on dashboard mission card
      gsap.to("#dashboard-mission-card", {
        scale: 1.05,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: "bounce.out",
        onComplete: () => {
          if (onCompleteCallback) onCompleteCallback();
          saveLocalProfiles();
          renderDashboard();
          syncBackupToServer();
        }
      });
    };

    // Cancel / Close handler
    const handleClose = () => {
      mcModal.classList.remove("active");
      cleanupListeners();
    };

    if (cancelBtn) cancelBtn.onclick = handleClose;
    if (closeBtn) closeBtn.onclick = handleClose;
  }

  function saveCompletedMission(missionId, missionTitle, missionDesc, references, category, type, reflectionText) {
    const activeProfile = childProfiles.find(p => p.id === activeChildId);
    if (!activeProfile) return;

    ensureProfileFields(activeProfile);

    // Create history entry
    const newEntry = {
      id: missionId,
      title: missionTitle,
      type: type,
      timestamp: new Date().toISOString(),
      reflection: reflectionText,
      reference: references,
      category: category
    };

    activeProfile.completedMissionsHistory.unshift(newEntry); // Newest first

    // Run Streak Calculation
    updateStreaks(activeProfile);

    // Run Badge Evaluation
    updateBadges(activeProfile);
  }

  function updateStreaks(profile) {
    const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD local format
    const stats = profile.streakStats;

    if (stats.lastCompletionDate === today) {
      // Already completed a mission today, streak is unaffected
      return;
    }

    // Get yesterday in local format
    const yesterdayDateObj = new Date();
    yesterdayDateObj.setDate(yesterdayDateObj.getDate() - 1);
    const yesterday = yesterdayDateObj.toLocaleDateString('en-CA');

    if (stats.lastCompletionDate === yesterday) {
      stats.currentStreak += 1;
    } else {
      stats.currentStreak = 1;
    }

    stats.lastCompletionDate = today;
    if (stats.currentStreak > stats.longestStreak) {
      stats.longestStreak = stats.currentStreak;
    }
  }

  function updateBadges(profile) {
    const history = profile.completedMissionsHistory || [];
    
    profile.badges.forEach(badge => {
      if (badge.id === "istiqamah") {
        badge.progress = profile.streakStats.currentStreak;
      } else {
        // Map badge id to categories
        const badgeCategoryMap = {
          "amanah": "connection",
          "fitrah": "fitrah",
          "luqman": "luqman",
          "rahmah": "rahmah"
        };
        const targetCategory = badgeCategoryMap[badge.id];
        if (targetCategory) {
          // Count unique completed missions in this category
          const uniqueCompletedInCat = new Set();
          history.forEach(item => {
            if (item.category === targetCategory) {
              uniqueCompletedInCat.add(item.id);
            }
          });
          badge.progress = uniqueCompletedInCat.size;
        }
      }

      // Check if unlocked
      if (badge.progress >= badge.target) {
        if (!badge.unlocked) {
          badge.unlocked = true;
          badge.unlockedAt = new Date().toISOString();
        }
      } else {
        badge.unlocked = false;
      }
    });
  }

  // Open Doa Shahih helper link from Jurnal page
  const linkHelperDoa = document.getElementById("link-helper-doa");
  if (linkHelperDoa) {
    linkHelperDoa.addEventListener("click", (e) => {
      e.preventDefault();
      const doaArticle = GOODFATHER_CONTENT.articles.find(a => a.id === "doa-anak-shahih");
      if (doaArticle) {
        openArticleReader(doaArticle);
      }
    });
  }

});
