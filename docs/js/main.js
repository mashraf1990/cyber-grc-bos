/**
 * M.A.A. Consulting — Main JavaScript v4.0
 * Theme (system/dark/light), i18n (EN/AR), admin edit mode,
 * scroll-to-top, content visibility
 */

const ADMIN_SESSION_KEY = 'maa_session';

function getAdminSession() {
  try { return JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY)); } catch { return null; }
}

function isAdminLoggedIn() {
  const s = getAdminSession();
  return s && s.role === 'admin';
}

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. THEME MANAGEMENT (system / light / dark)
  // ============================================================
  const themeToggle = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function getTheme() { return localStorage.getItem('theme') || 'system'; }

  function setTheme(theme) {
    localStorage.setItem('theme', theme);
    applyTheme(theme);
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    root.removeAttribute('data-theme');
    root.removeAttribute('data-prefers-color-scheme');
    if (theme === 'light') root.setAttribute('data-theme', 'light');
    else if (theme === 'dark') root.setAttribute('data-theme', 'dark');
    else if (prefersDark.matches) root.setAttribute('data-prefers-color-scheme', 'dark');
  }

  function cycleTheme() {
    const c = getTheme();
    if (c === 'system') setTheme('dark');
    else if (c === 'dark') setTheme('light');
    else setTheme('system');
  }

  applyTheme(getTheme());
  if (themeToggle) themeToggle.addEventListener('click', cycleTheme);
  prefersDark.addEventListener('change', () => {
    if (getTheme() === 'system') applyTheme('system');
  });

  // ============================================================
  // 2. LANGUAGE TOGGLE (EN / AR)
  // ============================================================
  const langToggle = document.getElementById('langToggle');
  let currentLang = localStorage.getItem('lang') || 'en';
  const htmlTag = document.documentElement;
  const rtlStyleId = 'rtl-css';

  const i18n = {
    en: {
      heroSub: 'Helping organizations navigate complex cybersecurity and compliance challenges.',
      explore: 'Explore Services', schedule: 'Book a Consultation',
      readMore: 'Read More', editMode: 'Edit'
    },
    ar: {
      editMode: 'تعديل',
      heroSub: 'مساعدة المؤسسات على التعامل مع تحديات الأمن السيبراني والامتثال المعقدة.',
      explore: 'استعرض الخدمات', schedule: 'احجز استشارة',
      readMore: 'اقرأ المزيد'
    }
  };

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    if (langToggle) langToggle.textContent = lang === 'en' ? 'AR' : 'EN';
    if (lang === 'ar') {
      htmlTag.setAttribute('lang', 'ar');
      htmlTag.setAttribute('dir', 'rtl');
      if (!document.getElementById(rtlStyleId)) {
        const link = document.createElement('link');
        link.id = rtlStyleId; link.rel = 'stylesheet'; link.href = 'css/rtl.css';
        document.head.appendChild(link);
      }
    } else {
      htmlTag.setAttribute('lang', 'en');
      htmlTag.removeAttribute('dir');
      const existing = document.getElementById(rtlStyleId);
      if (existing) existing.remove();
    }
    const dict = i18n[lang] || i18n.en;
    Object.keys(dict).forEach(key => {
      document.querySelectorAll(`[data-i18n="${key}"]`).forEach(el => {
        el.textContent = dict[key];
      });
    });
    document.querySelectorAll('[data-edit]').forEach(el => {
      if (el.tagName === 'IMG') {
        const saved = localStorage.getItem('admin_navPhoto');
        if (saved) el.src = saved;
        return;
      }
      if (el.dataset.edit) {
        const saved = localStorage.getItem('admin_' + el.dataset.edit);
        if (saved) el.textContent = saved;
      }
    });
  }

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      applyLanguage(currentLang === 'en' ? 'ar' : 'en');
    });
    applyLanguage(currentLang);
  }

  // ============================================================
  // 3. HAMBURGER MENU
  // ============================================================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ============================================================
  // 4. ADMIN SESSION CHECK — SHOW EDIT MODE BUTTON
  // ============================================================
  if (isAdminLoggedIn()) {
    const navActions = document.querySelector('.nav-actions');
    if (navActions) {
      const editBtn = document.createElement('button');
      editBtn.className = 'nav-icon-btn admin-edit-btn';
      editBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Edit';
      editBtn.setAttribute('data-i18n', 'editMode');
      editBtn.title = 'Toggle Edit Mode';
      navActions.insertBefore(editBtn, navActions.querySelector('#langToggle'));
      let editMode = false;
      editBtn.addEventListener('click', () => {
        editMode = !editMode;
        editBtn.classList.toggle('editing', editMode);
        editBtn.innerHTML = editMode
          ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg> Done'
          : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Edit';
        document.querySelectorAll('[data-edit]').forEach(el => {
          if (el.tagName === 'IMG') {
            el.classList.toggle('editable-active', editMode);
            if (editMode) {
              el.onclick = () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    el.src = ev.target.result;
                    localStorage.setItem('admin_navPhoto', ev.target.result);
                  };
                  reader.readAsDataURL(file);
                };
                input.click();
              };
            } else {
              el.onclick = null;
            }
            return;
          }
          el.contentEditable = editMode;
          el.classList.toggle('editable-active', editMode);
          if (!editMode && el.dataset.edit) {
            localStorage.setItem('admin_' + el.dataset.edit, el.innerText);
          }
        });
      });
      document.querySelectorAll('[data-edit]').forEach(el => {
        if (el.tagName === 'IMG') {
          const saved = localStorage.getItem('admin_navPhoto');
          if (saved) el.src = saved;
          return;
        }
        const saved = localStorage.getItem('admin_' + el.dataset.edit);
        if (saved) el.innerText = saved;
      });
    }
  }

  // ============================================================
  // 5. ACTIVE NAV ON SCROLL
  // ============================================================
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (scrollY >= s.offsetTop - 250) current = s.getAttribute('id');
    });
    navItems.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });

  // ============================================================
  // 6. SCROLL TO TOP BUTTON
  // ============================================================
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (scrollBtn) {
    let scrollRaf = null;
    window.addEventListener('scroll', () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollBtn.classList.toggle('visible', window.scrollY > 400);
        scrollRaf = null;
      });
    }, { passive: true });
    scrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================
  // 7. LAZY LOAD IMAGES
  // ============================================================
  document.querySelectorAll('img:not([loading])').forEach(img => {
    img.setAttribute('loading', 'lazy');
  });

  // ============================================================
  // 8. CONTENT VISIBILITY ON BELOW-FOLD SECTIONS
  // ============================================================
  document.querySelectorAll('.section').forEach(el => {
    el.style.contentVisibility = 'auto';
  });

  console.log('M.A.A. Consulting v4.0 loaded.');
});
