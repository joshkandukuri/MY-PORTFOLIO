/**
 * ============================================================================
 * JOSH PORTFOLIO - CORE INTERACTION & DYNAMIC UI ENGINE
 * ============================================================================
 */

(function () {
  'use strict';

  // State
  let soundEnabled = false;
  let audioCtx = null;

  document.addEventListener('DOMContentLoaded', function () {
    // 1. Bind Dynamic Data from portfolio-data.js
    if (typeof PORTFOLIO_DATA !== 'undefined') {
      renderPortfolioData(PORTFOLIO_DATA);
    }

    // 2. Setup Navigation & Scrollspy
    setupNavigation();

    // 3. Setup 3D Mouse Tilt for Hero Portrait & Cards
    setupPortraitTilt();
    setupCardTilts();

    // 4. Setup Audio Feedback System
    setupAudioSystem();

    // 5. Setup Interactive Terminal Widget
    setupTerminalTabs();

    // 6. Setup Modals (Certificates & Resume)
    setupModals();

    // 7. Setup Copy-to-Clipboard Actions
    setupCopyActions();

    // 8. Setup Contact Form
    setupContactForm();

    // 9. Setup Skill Progress Bar Animation on Scroll
    setupSkillAnimations();
  });

  // ==========================================================================
  // 1. RENDER PORTFOLIO DATA FROM portfolio-data.js
  // ==========================================================================
  function renderPortfolioData(data) {
    const p = data.personal;
    const c = data.contact;

    // Profile Photo
    const profileImg = document.getElementById('hero-profile-img');
    if (profileImg) {
      profileImg.src = p.profilePhoto;
      profileImg.alt = p.profileAlt;
      // Fallback if user moves/renames the image
      profileImg.onerror = function () {
        console.warn('Profile image not found at', p.profilePhoto, '- using fallback avatar');
        this.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
      };
    }

    // Contact Links & Displays
    setElementText('contact-phone-display', c.phoneDisplay);
    setElementAttr('contact-phone-link', 'href', c.phoneTelLink);
    setElementAttr('hero-phone-link', 'href', c.phoneTelLink);
    setElementAttr('contact-whatsapp-link', 'href', c.whatsappLink);

    setElementText('contact-email-display', c.email);
    setElementAttr('contact-email-link', 'href', c.emailMailtoLink);
    setElementAttr('hero-email-link', 'href', c.emailMailtoLink);

    setElementText('contact-linkedin-display', c.linkedinDisplay);
    setElementAttr('contact-linkedin-link', 'href', c.linkedin);
    setElementAttr('hero-linkedin-link', 'href', c.linkedin);

    setElementText('contact-github-display', c.githubDisplay);
    setElementAttr('contact-github-link', 'href', c.github);
    setElementAttr('hero-github-link', 'href', c.github);

    // Resume links
    const resumeBtns = document.querySelectorAll('.download-resume-trigger');
    resumeBtns.forEach(btn => {
      btn.setAttribute('href', p.resumeFile);
      btn.setAttribute('download', 'Josh_Kandukuri_Resume.pdf');
    });

    // Render Projects
    renderProjects(data.projects);

    // Render Hackathons
    renderHackathons(data.hackathons);

    // Render Certificates
    renderCertificates(data.certificates);

    // Render Learning Journey Timeline
    renderTimeline(data.timeline);

    // Render Skills Matrix
    renderSkills(data.skills);
  }

  function setElementText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function setElementAttr(id, attr, val) {
    const el = document.getElementById(id);
    if (el) el.setAttribute(attr, val);
  }

  // ==========================================================================
  // RENDER DYNAMIC LISTS
  // ==========================================================================
  function renderProjects(projects) {
    const container = document.getElementById('projects-grid-container');
    if (!container) return;

    let html = '';
    projects.forEach(project => {
      const tagsHtml = project.tags.map(tag => `<span class="tag-badge">${tag}</span>`).join('');
      const highlightsHtml = project.highlights ? project.highlights.map(h => `<li><i class="fas fa-chevron-right"></i> ${h}</li>`).join('') : '';

      html += `
        <article class="project-card tilt-element" data-project-id="${project.id}">
          <div class="project-image-wrapper">
            <img src="${project.image}" alt="${project.title}" class="project-img" loading="lazy">
            <span class="project-status-pill"><i class="fas fa-bolt"></i> ${project.status}</span>
          </div>
          <div class="project-content">
            <span class="project-category">${project.category}</span>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            ${highlightsHtml ? `<ul class="project-highlights-list">${highlightsHtml}</ul>` : ''}
            <div class="project-tags">${tagsHtml}</div>
            <div class="project-links">
              <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link-btn">
                <i class="fab fa-github"></i> Source Code
              </a>
              ${project.liveDemoUrl && project.liveDemoUrl !== '#' ? `
                <a href="${project.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="project-link-btn" style="margin-left: auto; color: var(--neon-violet);">
                  <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
              ` : ''}
            </div>
          </div>
        </article>
      `;
    });

    // Helper card for adding new projects
    html += `
      <div class="add-project-card">
        <div class="add-project-icon">
          <i class="fas fa-plus"></i>
        </div>
        <h4 style="color: #fff; font-size: 1.15rem; margin-bottom: 8px;">Add Your Next Project</h4>
        <p style="color: var(--text-secondary); font-size: 0.88rem; max-width: 260px; margin-bottom: 16px;">
          Simply open <code>js/portfolio-data.js</code> and add your new AI/ML project to the projects array.
        </p>
        <span class="section-badge" style="font-size: 0.72rem; margin-bottom: 0;">Template Ready</span>
      </div>
    `;

    container.innerHTML = html;
  }

  function renderHackathons(hackathons) {
    const container = document.getElementById('hackathons-grid-container');
    if (!container) return;

    let html = '';
    hackathons.forEach(hack => {
      const techTags = hack.technologies.map(t => `<span class="tag-badge">${t}</span>`).join('');
      html += `
        <article class="hackathon-card tilt-element">
          <div class="hackathon-header">
            <div>
              <h3 class="hackathon-name">${hack.name}</h3>
              <div class="hackathon-role">${hack.role}</div>
            </div>
            <span class="hackathon-badge ${hack.badgeType}">${hack.badge}</span>
          </div>
          <div class="hackathon-meta">
            <span><i class="fas fa-calendar-alt"></i> ${hack.date}</span>
            <span><i class="fas fa-map-marker-alt"></i> ${hack.location}</span>
          </div>
          <p class="hackathon-summary">${hack.summary}</p>
          <div class="project-tags" style="margin-bottom: 14px;">${techTags}</div>
          <div class="hackathon-outcome">
            <strong style="color: var(--neon-cyan);"><i class="fas fa-trophy"></i> Status:</strong> ${hack.outcome}
          </div>
        </article>
      `;
    });
    container.innerHTML = html;
  }

  function renderCertificates(certs) {
    const container = document.getElementById('certificates-grid-container');
    if (!container) return;

    let html = '';
    certs.forEach((cert, idx) => {
      html += `
        <div class="cert-card tilt-element" data-cert-index="${idx}">
          <div class="cert-preview-img-wrapper">
            <img src="${cert.image}" alt="${cert.title}" class="cert-img" loading="lazy">
            <div class="cert-hover-overlay">
              <span class="cert-view-badge"><i class="fas fa-search-plus"></i> View Credential</span>
            </div>
          </div>
          <div class="cert-content">
            <h4 class="cert-title">${cert.title}</h4>
            <div class="cert-issuer">${cert.issuer}</div>
            <div class="cert-meta-bar">
              <span>ID: ${cert.credentialId}</span>
              <span>${cert.issueDate}</span>
            </div>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;

    // Attach click handlers to open certificate modal
    const cards = container.querySelectorAll('.cert-card');
    cards.forEach(card => {
      card.addEventListener('click', function () {
        const index = parseInt(this.getAttribute('data-cert-index'), 10);
        openCertModal(certs[index]);
      });
    });
  }

  function renderTimeline(timelineItems) {
    const container = document.getElementById('timeline-items-container');
    if (!container) return;

    let html = '';
    timelineItems.forEach(item => {
      const bullets = item.points.map(pt => `<li><i class="fas fa-circle-notch"></i> ${pt}</li>`).join('');
      const statusBadge = item.status === 'current'
        ? '<span class="timeline-status-badge">⚡ Current Milestone</span>'
        : item.status === 'upcoming'
        ? '<span class="timeline-status-badge" style="border-color: var(--neon-violet); color: var(--neon-violet); background: rgba(168,85,247,0.1);">🎯 Target Milestone</span>'
        : '<span class="timeline-status-badge" style="border-color: #64748b; color: #94a3b8; background: rgba(255,255,255,0.05);">🚀 Future Horizon</span>';

      html += `
        <div class="timeline-item ${item.status}">
          <div class="timeline-node-dot">
            <div class="timeline-node-inner"></div>
          </div>
          <div class="timeline-card">
            <div class="timeline-header-flex">
              <span class="timeline-year-tag">${item.year}</span>
              ${statusBadge}
            </div>
            <h4 class="timeline-stage-title">${item.stage}</h4>
            <div class="timeline-inst"><i class="fas fa-university"></i> ${item.institution}</div>
            <ul class="timeline-bullets">${bullets}</ul>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  function renderSkills(skills) {
    const container = document.getElementById('skills-grid-container');
    if (!container) return;

    let html = '';
    skills.forEach(cat => {
      const itemsHtml = cat.items.map(item => `
        <div class="skill-item">
          <div class="skill-item-header">
            <span class="skill-name">${item.name}</span>
            <span class="skill-tag-pill">${item.tag}</span>
          </div>
          <div class="skill-bar-track">
            <div class="skill-bar-fill" data-progress="${item.level}"></div>
          </div>
        </div>
      `).join('');

      html += `
        <div class="skill-category-card tilt-element">
          <div class="skill-card-top">
            <div class="skill-category-icon">
              <i class="fas ${cat.icon}"></i>
            </div>
            <div>
              <h3 class="skill-category-title">${cat.category}</h3>
            </div>
          </div>
          <p class="skill-category-desc">${cat.description}</p>
          <div class="skill-items-list">${itemsHtml}</div>
        </div>
      `;
    });
    container.innerHTML = html;
  }

  // ==========================================================================
  // 2. NAVIGATION & SCROLLSPY
  // ==========================================================================
  function setupNavigation() {
    const header = document.querySelector('.site-header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileClose = document.getElementById('mobile-drawer-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    // Header scroll background
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Scrollspy active state
      let currentSectionId = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 140;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }, { passive: true });

    // Mobile Drawer Open / Close
    if (mobileToggle && mobileDrawer) {
      mobileToggle.addEventListener('click', function () {
        mobileDrawer.classList.add('open');
        playUiSound('click');
      });
    }
    if (mobileClose && mobileDrawer) {
      mobileClose.addEventListener('click', function () {
        mobileDrawer.classList.remove('open');
        playUiSound('click');
      });
    }
    mobileLinks.forEach(link => {
      link.addEventListener('click', function () {
        mobileDrawer.classList.remove('open');
        playUiSound('click');
      });
    });

    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        playUiSound('click');
      });
    }
  }

  // ==========================================================================
  // 3. 3D MOUSE TILT FOR HERO PORTRAIT & CARDS
  // ==========================================================================
  function setupPortraitTilt() {
    const card = document.querySelector('.portrait-3d-card');
    if (!card) return;

    const wrapper = card.closest('.hero-portrait-wrapper') || card;

    wrapper.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateX = -(y / (rect.height / 2)) * 14;
      const rotateY = (x / (rect.width / 2)) * 14;

      card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    wrapper.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  function setupCardTilts() {
    const tiltElements = document.querySelectorAll('.tilt-element');
    tiltElements.forEach(el => {
      el.addEventListener('mousemove', function (e) {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const rotateX = -(y / (rect.height / 2)) * 6;
        const rotateY = (x / (rect.width / 2)) * 6;

        el.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      });

      el.addEventListener('mouseleave', function () {
        el.style.transform = '';
      });
    });
  }

  // ==========================================================================
  // 4. AUDIO FEEDBACK SYSTEM (Web Audio API Synthesizer)
  // ==========================================================================
  function setupAudioSystem() {
    const toggleBtn = document.getElementById('audio-toggle-btn');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', function () {
      if (!audioCtx) {
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          audioCtx = new AudioContext();
        } catch (e) {
          console.warn('Web Audio not supported');
        }
      }

      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      soundEnabled = !soundEnabled;
      toggleBtn.classList.toggle('active', soundEnabled);

      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.className = soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
      }

      showToast(soundEnabled ? 'Cyber Sound FX Enabled' : 'Audio Muted', 'volume');
      if (soundEnabled) playUiSound('activate');
    });

    // Attach subtle sounds to interactive buttons
    document.querySelectorAll('.btn, .nav-link, .social-icon-btn, .copy-action-btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => playUiSound('hover'));
      btn.addEventListener('click', () => playUiSound('click'));
    });
  }

  function playUiSound(type) {
    if (!soundEnabled || !audioCtx) return;

    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.08);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'activate') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(960, now + 0.16);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
        osc.start(now);
        osc.stop(now + 0.16);
      }
    } catch (e) {
      // Audio error suppressed gracefully
    }
  }

  // ==========================================================================
  // 5. INTERACTIVE TERMINAL WIDGET TABS
  // ==========================================================================
  function setupTerminalTabs() {
    const tabs = document.querySelectorAll('.terminal-tab');
    const outputs = {
      profile: `
        <div class="term-line"><span class="term-prompt">josh@nit-kolhapur:~$</span> <span class="term-cmd">whoami</span></div>
        <div class="term-output">
          <p><span class="term-highlight">Name:</span> Josh Kandukuri</p>
          <p><span class="term-highlight">Degree:</span> B.Tech in CS (AI &amp; Data Science)</p>
          <p><span class="term-highlight">Institution:</span> National Institute of Technology (NIT), Kolhapur</p>
          <p><span class="term-highlight">Academic Year:</span> 1st Year (Class of 2029)</p>
          <p><span class="term-highlight">Location:</span> Kolhapur, Maharashtra, India</p>
        </div>
      `,
      tech: `
        <div class="term-line"><span class="term-prompt">josh@nit-kolhapur:~$</span> <span class="term-cmd">cat skills.json</span></div>
        <div class="term-output">
          <p>{ <span class="term-violet">"primary_languages"</span>: ["Python", "C", "C++", "JavaScript"],</p>
          <p>&nbsp;&nbsp;<span class="term-violet">"ai_stack"</span>: ["NumPy", "Pandas", "Scikit-Learn", "Neural Networks"],</p>
          <p>&nbsp;&nbsp;<span class="term-violet">"specialties"</span>: ["Mathematical Foundations", "Algorithms", "3D WebGL"] }</p>
        </div>
      `,
      academics: `
        <div class="term-line"><span class="term-prompt">josh@nit-kolhapur:~$</span> <span class="term-cmd">cat coursework.log</span></div>
        <div class="term-output">
          <p>• [ACTIVE] Data Structures &amp; Algorithmic Analysis</p>
          <p>• [ACTIVE] Linear Algebra &amp; Multivariate Calculus for AI</p>
          <p>• [ACTIVE] Object-Oriented System Architecture</p>
          <p>• [ACTIVE] Discrete Mathematics &amp; Computational Logic</p>
        </div>
      `,
      aspirations: `
        <div class="term-line"><span class="term-prompt">josh@nit-kolhapur:~$</span> <span class="term-cmd">./run_aspirations.sh</span></div>
        <div class="term-output">
          <p><span class="term-highlight">[READY]</span> Competing in National AI Hackathons</p>
          <p><span class="term-highlight">[GOAL]</span> Contributing to High-Performance ML Kernels</p>
          <p><span class="term-highlight">[STATUS]</span> Open for summer AI/ML research internships &amp; collaborative builds</p>
        </div>
      `
    };

    const terminalBody = document.getElementById('terminal-content-body');
    if (!terminalBody) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', function () {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        const key = this.getAttribute('data-tab');
        if (outputs[key]) {
          terminalBody.innerHTML = outputs[key] + `<div class="term-line" style="margin-top: 14px;"><span class="term-prompt">josh@nit-kolhapur:~$</span> <span class="term-cursor"></span></div>`;
        }
        playUiSound('click');
      });
    });
  }

  // ==========================================================================
  // 6. MODALS (Certificates & Resume)
  // ==========================================================================
  function setupModals() {
    const modal = document.getElementById('cert-modal');
    const closeBtn = document.getElementById('modal-close-btn');

    if (modal && closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('open');
        playUiSound('click');
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
      });

      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
          modal.classList.remove('open');
        }
      });
    }

    // Resume modal preview trigger
    const previewResumeBtn = document.getElementById('view-resume-modal-btn');
    if (previewResumeBtn) {
      previewResumeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.open('assets/resume.html', '_blank');
        playUiSound('click');
      });
    }
  }

  function openCertModal(cert) {
    const modal = document.getElementById('cert-modal');
    if (!modal) return;

    document.getElementById('modal-cert-title').textContent = cert.title;
    document.getElementById('modal-cert-issuer').textContent = cert.issuer + ' • ' + cert.issueDate;
    document.getElementById('modal-cert-id').textContent = 'Credential ID: ' + cert.credentialId;
    document.getElementById('modal-cert-desc').textContent = cert.description;

    const img = document.getElementById('modal-cert-image');
    if (img) img.src = cert.image;

    modal.classList.add('open');
    playUiSound('click');
  }

  // ==========================================================================
  // 7. COPY TO CLIPBOARD ACTIONS
  // ==========================================================================
  function setupCopyActions() {
    document.querySelectorAll('.copy-trigger').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const textToCopy = this.getAttribute('data-copy');
        if (!textToCopy) return;

        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`, 'check');
          playUiSound('click');
        }).catch(() => {
          showToast(`Copied: ${textToCopy}`, 'check');
        });
      });
    });

    // Handle resume download feedback
    document.querySelectorAll('.download-resume-trigger').forEach(btn => {
      btn.addEventListener('click', function () {
        showToast('Initiating Resume Download...', 'download');
        playUiSound('click');
      });
    });
  }

  // ==========================================================================
  // 8. CONTACT FORM
  // ==========================================================================
  function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all fields.', 'exclamation-circle');
        return;
      }

      // Prepare mailto link as instant fallback
      const subject = encodeURIComponent(`Portfolio Message from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoUrl = `mailto:joshkandukuri08@gmail.com?subject=${subject}&body=${body}`;

      showToast(`Thank you ${name}! Launching your email client...`, 'paper-plane');
      playUiSound('activate');

      setTimeout(() => {
        window.location.href = mailtoUrl;
        form.reset();
      }, 1000);
    });
  }

  // ==========================================================================
  // 9. ANIMATE SKILL PROGRESS BARS ON SCROLL
  // ==========================================================================
  function setupSkillAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.skill-bar-fill');
          fills.forEach(fill => {
            const p = fill.getAttribute('data-progress');
            if (p) fill.style.width = p + '%';
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) observer.observe(skillsSection);
  }

  // ==========================================================================
  // TOAST NOTIFICATIONS
  // ==========================================================================
  function showToast(message, iconName = 'check') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas fa-${iconName}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }
})();
