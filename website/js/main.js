/**
 * M.A.A. Consulting — Main JavaScript v2.0
 * Theme (system/dark/light), i18n (EN/AR), admin panel,
 * modals, FAQ accordion, testimonial carousel, particles,
 * floating labels, contact form, scroll animations
 */

// ============================================================
// ADMIN AUTH & INLINE EDIT MODE
// ============================================================
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
      home: 'Home', about: 'About', skills: 'Competencies', experience: 'Engagements', services: 'Services', industries: 'Industries',
      caseStudies: 'Case Studies', insights: 'Insights', plans: 'Plans', contact: 'Contact', login: 'Login',
      heroBadge: 'Principal Cybersecurity & GRC Consultant',
      heroSub: 'Enterprise governance, risk, and compliance consulting for organizations that treat security as a competitive advantage \u2014 not a checkbox.',
      explore: 'Explore Services', schedule: 'Book a Consultation',
      years: 'Years Experience', frameworks: 'Frameworks', countries: 'Countries', gapReduction: 'Avg. Gap Reduction',
      trustedBy: 'Trusted by leading organizations across the Middle East and North America',
      snb: 'Banking & Financial Services', diriyah: 'Government & Public Sector', nvits: 'SaaS & Technology', parentApp: 'FinTech', healthcare: 'Healthcare',
      aboutLabel: 'About', aboutTitle: 'Turning Compliance Into Competitive Advantage',
      aboutP1: 'I help organizations solve their most complex cybersecurity and compliance challenges. With more than a decade of experience across banking, government, healthcare, and technology, I bring a rare combination: deep technical knowledge and executive communication skills.',
      aboutP2: 'My work spans 5 countries \u2014 Saudi Arabia, UAE, Egypt, USA, and Canada \u2014 and covers the full spectrum of GRC: from policy development and risk management to technical security architecture and audit readiness.',
      aboutP3: 'I do not sell checklists. I build programs that reduce risk, enable growth, and earn the trust of regulators, auditors, and boards.',
      viewWork: 'View Selected Engagements',
      h1: 'Bank-Grade Experience', h1d: 'Former supervisor at the National Bank of Egypt. Led PCI DSS compliance for Saudi National Bank.',
      h2: 'International Reach', h2d: 'Delivered engagements across MENA and North America. Culturally fluent. Globally capable.',
      h3: 'Educator & Mentor', h3d: 'Certified EC-Council instructor. Designed cybersecurity curricula for universities and enterprises.',
      servicesLabel: 'What I Do', servicesTitle: 'Cybersecurity & Compliance Consulting',
      servicesDesc: 'Every engagement is tailored to your industry, regulatory environment, and business objectives.',
      tabCompliance: 'Compliance', tabRisk: 'Risk & Governance', tabTechnical: 'Technical Security', tabTraining: 'Training', tabVCISO: 'vCISO',
      pciTitle: 'Payment Card Industry Compliance', isoTitle: 'ISMS Design & Certification', soc2Title: 'SOC 2 Readiness & Compliance',
      nistTitle: 'NIST Cybersecurity Framework', samaTitle: 'SAMA CSF Implementation', ncaTitle: 'NCA Essential Cybersecurity Controls',
      riskTitle: 'Cyber Risk Assessment', gapTitle: 'Gap Assessment', auditTitle: 'Internal Audit', policyTitle: 'Policy & Documentation',
      archTitle: 'Security Architecture Review', configTitle: 'Security Configuration Review', bcrTitle: 'BC & Incident Response',
      awarnesTitle: 'Security Awareness & Workshops', currTitle: 'Curriculum Development',
      vcisoTitle: 'Executive Cybersecurity Leadership',
      inq: 'Inquire',
      fwLabel: 'Framework Expertise', fwTitle: 'Every Major Standard, One Integrated Approach',
      fwDesc: 'I do not silo compliance. I build unified programs that satisfy multiple frameworks simultaneously.',
      indLabel: 'Who I Serve', indTitle: 'Industry-Specific Expertise',
      indDesc: 'Every sector has its own regulatory pressures, operational realities, and risk profiles.',
      indBank: 'Banking & Financial Services', indFintech: 'FinTech', indHealth: 'Healthcare', indGov: 'Government', indSaaS: 'SaaS & Technology', indInsure: 'Insurance',
      outLabel: 'What to Expect', outTitle: 'Business Outcomes, Not Just Reports',
      outDesc: 'Every engagement is measured against the outcomes that matter to your business.',
      methodLabel: 'How I Work', methodTitle: 'The GRCA Methodology',
      methodDesc: 'A proven, repeatable framework refined over a decade of engagements across industries and geographies.',
      step1: 'Assess', step2: 'Plan', step3: 'Build', step4: 'Operate', step5: 'Audit', step6: 'Sustain',
      whyLabel: 'Why Organizations Choose Me', whyTitle: 'Experience That Speaks for Itself',
      csLabel: 'Case Studies', csTitle: 'Proven Results for Complex Organizations',
      csDesc: 'These engagements reflect real outcomes. Client names are disclosed only with permission.',
      testLabel: 'Client Feedback', testTitle: 'What Clients Say',
      insightLabel: 'Insights', insightTitle: 'Cybersecurity Resources & Analysis',
      insightDesc: 'Practical guidance on compliance strategy, risk management, and governance best practices.',
      faqLabel: 'FAQ', faqTitle: 'Frequently Asked Questions',
      contactLabel: 'Contact', contactTitle: "Let's Start a Conversation",
      contactDesc: 'Whether you need a gap assessment, full compliance program, or executive advisory.',
      emailLabel: 'Email', phoneLabel: 'Phone', locationLabel: 'Location', availability: 'Availability',
      availVal: 'Remote & On-site | MENA & North America',
      formName: 'Full Name', formEmail: 'Email Address', formCompany: 'Company', formSelect: 'Select Service Interest', formMessage: 'Tell me about your project or question',
      sendMessage: 'Send Message',
      tagline: 'Govern with confidence.',
      footerDesc: 'Enterprise cybersecurity governance, risk, and compliance consulting across the Middle East and North America.',
      services: 'Services', quickLinks: 'Quick Links', connect: 'Connect', footerNote: 'Based in Riyadh, serving clients worldwide.',
      footerLegal: 'This site is for informational purposes. Client references are disclosed with permission or anonymized.',
      modalWelcome: 'Welcome to M.A.A. Consulting', modalSub: 'Select your role to continue',
      viewPortfolio: 'View Portfolio', viewPortSub: 'Browse case studies, services, and credentials',
      adminDashboard: 'Admin Dashboard', adminSub: 'Manage site content, services, and settings',
      addPortfolio: 'Add Your Portfolio', subSub: 'Join the network of cybersecurity professionals',
      subTitle: 'Join Our Network', subDesc: 'Submit your portfolio for review to join our professional directory.',
      subBio: 'Your portfolio / bio', submitProfile: 'Submit Profile',
      readMore: 'Read More', editMode: 'Edit',
      downloadCV: 'Download Capability Statement',
      skillsLabel: 'Core Competencies', skillsTitle: 'Framework & Domain Expertise', skillsDesc: 'Deep technical and regulatory expertise built over a decade of enterprise consulting.',
      expLabel: 'Professional History', expTitle: 'Selected Consulting Engagements', expDesc: 'A track record of delivering enterprise-scale cybersecurity and compliance programs.',
      subSecLabel: 'Plans', subSecTitle: 'Choose Your Plan', subSecDesc: 'Join the M.A.A. Consulting professional network. Get listed, get discovered, and grow your practice.',
      subBasicName: 'Basic', perMonth: '/mo', subBasicDesc: 'Single profile listing',
      subBasicF1: 'Portfolio listing in directory', subBasicF2: 'Basic profile page', subBasicF3: 'Contact form enabled', subBasicF4: 'Standard support',
      subChoose: 'Choose Basic', popular: 'Most Popular',
      subProName: 'Professional', subProDesc: 'Full portfolio management',
      subProF1: 'Everything in Basic', subProF2: 'Custom branding', subProF3: 'Service showcase (up to 10)', subProF4: 'Testimonials display',
      subProF5: 'Analytics dashboard', subProF6: 'Priority support',
      subChoosePro: 'Choose Professional',
      subEntName: 'Enterprise', subEntDesc: 'Multi-profile & team',
      subEntF1: 'Everything in Professional', subEntF2: 'Up to 5 team profiles', subEntF3: 'Admin panel access', subEntF4: 'Custom domain',
      subEntF5: 'API access', subEntF6: 'Dedicated account manager',
      subChooseEnt: 'Choose Enterprise',
      subModalTitle: 'Subscribe', subPayBtn: 'Subscribe Now',
      subFootnote: 'Secure payment via Stripe. No card details stored here.',
      subSuccess: 'Subscription request submitted! We\'ll reach out within 24 hours.'
    },
    ar: {
      editMode: 'تعديل',
      home: 'الرئيسية', about: 'عني', skills: 'المهارات', experience: 'الخبرات', services: 'الخدمات', industries: 'الصناعات',
      caseStudies: 'دراسات الحالة', insights: 'رؤى', plans: 'الباقات', contact: 'اتصل بي', login: 'تسجيل الدخول',
      heroBadge: 'كبير مستشاري الحوكمة والمخاطر والامتثال السيبراني',
      heroSub: 'استشارات حوكمة، مخاطر، وامتثال على مستوى المؤسسات للمنظمات التي تعتبر الأمن ميزة تنافسية \u2014 لا مجرد مربع اختيار.',
      explore: 'استعرض الخدمات', schedule: 'احجز استشارة',
      years: 'سنوات خبرة', frameworks: 'إطار عمل', countries: 'دول', gapReduction: 'متوسط تخفيض الفجوات',
      trustedBy: 'موثوق به من منظمات رائدة في الشرق الأوسط وأمريكا الشمالية',
      snb: 'الخدمات المصرفية والمالية', diriyah: 'القطاع الحكومي', nvits: 'التقنية والحلول السحابية', parentApp: 'التقنية المالية', healthcare: 'الرعاية الصحية',
      aboutLabel: 'عني', aboutTitle: 'تحويل الامتثال إلى ميزة تنافسية',
      aboutP1: 'أساعد المؤسسات على حل تحديات الأمن السيبراني والامتثال الأكثر تعقيداً. مع أكثر من عقد من الخبرة في القطاعات المصرفية والحكومية والصحية والتقنية.',
      aboutP2: 'يمتد عملي عبر 5 دول \u2014 السعودية، الإمارات، مصر، أمريكا، وكندا \u2014 ويغطي كامل طيف الحوكمة والمخاطر والامتثال.',
      aboutP3: 'لا أبيع قوائم مراجعة. أبني برامج تقلل المخاطر، وتمكن النمو، وتكسب ثقة الجهات التنظيمية.',
      viewWork: 'اطلع على الأعمال',
      h1: 'خبرة مصرفية', h1d: 'مشرف سابق بالبنك الأهلي المصري. قيادة برنامج PCI DSS للبنك الأهلي السعودي.',
      h2: 'انتشار دولي', h2d: 'مهام استشارية في الشرق الأوسط وأمريكا الشمالية.',
      h3: 'معلم ومرشد', h3d: 'مدرب معتمد من EC-Council. تصميم مناهج للأمن السيبراني.',
      servicesLabel: 'ماذا أقدم', servicesTitle: 'استشارات الأمن السيبراني والامتثال',
      servicesDesc: 'كل مهمة مصممة خصيصاً لصناعتك وبيئتك التنظيمية وأهدافك التجارية.',
      tabCompliance: 'الامتثال', tabRisk: 'المخاطر والحوكمة', tabTechnical: 'الأمن التقني', tabTraining: 'التدريب', tabVCISO: 'كبير أمن رقمي',
      pciTitle: 'امتثال PCI DSS', isoTitle: 'تصميم وشهادة ISO 27001', soc2Title: 'جاهزية SOC 2',
      nistTitle: 'إطار NIST للأمن السيبراني', samaTitle: 'تطبيق SAMA CSF', ncaTitle: 'ضوابط الأمن السيبراني NCA',
      riskTitle: 'تقييم المخاطر', gapTitle: 'تقييم الفجوات', auditTitle: 'التدقيق الداخلي', policyTitle: 'السياسات والتوثيق',
      archTitle: 'مراجعة البنية الأمنية', configTitle: 'مراجعة التكوين الأمني', bcrTitle: 'استمرارية الأعمال والاستجابة',
      awarnesTitle: 'التوعية وورش العمل', currTitle: 'تطوير المناهج',
      vcisoTitle: 'قيادة أمنية تنفيذية',
      inq: 'استفسر',
      fwLabel: 'خبرة الأطر', fwTitle: 'كل معيار رئيسي بنهج متكامل',
      indLabel: 'من أخدم', indTitle: 'خبرة خاصة بكل صناعة',
      outLabel: 'توقعات النتائج', outTitle: 'نتائج أعمال، وليس فقط تقارير',
      methodLabel: 'كيف أعمل', methodTitle: 'منهجية GRCA',
      csLabel: 'دراسات الحالة', csTitle: 'نتائج مثبتة لمنظمات معقدة',
      testLabel: 'آراء العملاء', testTitle: 'ماذا يقول العملاء',
      insightLabel: 'رؤى', insightTitle: 'موارد وتحليلات الأمن السيبراني',
      faqLabel: 'الأسئلة الشائعة', faqTitle: 'أسئلة متكررة',
      contactLabel: 'اتصل بي', contactTitle: 'لنبدأ محادثة',
      emailLabel: 'البريد الإلكتروني', phoneLabel: 'الهاتف', locationLabel: 'الموقع', availability: 'التوفر',
      formName: 'الاسم الكامل', formEmail: 'البريد الإلكتروني', formCompany: 'الشركة', formSelect: 'اختر الخدمة', formMessage: 'أخبرني عن مشروعك',
      sendMessage: 'إرسال الرسالة',
      footerDesc: 'استشارات على مستوى المؤسسات في الحوكمة والمخاطر والامتثال عبر الشرق الأوسط وأمريكا الشمالية.',
      services: 'الخدمات', quickLinks: 'روابط سريعة', connect: 'تواصل',
      modalWelcome: 'مرحباً بك', modalSub: 'اختر دورك للمتابعة',
      viewPortfolio: 'عرض الأعمال', adminDashboard: 'لوحة الإدارة', addPortfolio: 'أضف ملفك',
      subTitle: 'انضم لشبكتنا', subDesc: 'قدم ملفك للمراجعة للانضمام إلى دليلنا المهني.',
      submitProfile: 'إرسال الملف',
      readMore: 'اقرأ المزيد', editMode: 'تعديل',
      downloadCV: 'تحميل كفاءة الخدمات',
      skillsLabel: 'الكفاءات الأساسية', skillsTitle: 'خبرات الأطر والمجالات', skillsDesc: 'خبرة تقنية وتنظيمية عميقة بنيت على مدى عقد من الاستشارات المؤسسية.',
      expLabel: 'السيرة المهنية', expTitle: 'المشاريع الاستشارية', expDesc: 'سجل حافل من تنفيذ برامج الأمن السيبراني والامتثال على مستوى المؤسسات.',
      subSecLabel: 'الباقات', subSecTitle: 'اختر باقتك', subSecDesc: 'انضم لشبكة M.A.A. للاستشارات المهنية. أدرج ملفك وكن مرئياً.',
      subBasicName: 'الأساسية', perMonth: '/شهر', subBasicDesc: 'إدراج ملف شخصي واحد',
      subBasicF1: 'إدراج في دليل المحترفين', subBasicF2: 'صفحة تعريفية أساسية', subBasicF3: 'تفعيل نموذج التواصل', subBasicF4: 'دعم عادي',
      subChoose: 'اختر الأساسية', popular: 'الأكثر طلباً',
      subProName: 'المهنية', subProDesc: 'إدارة كاملة للملف',
      subProF1: 'كل مزايا الأساسية', subProF2: 'علامة تجارية مخصصة', subProF3: 'عرض الخدمات (حتى 10)', subProF4: 'عرض آراء العملاء',
      subProF5: 'لوحة تحليلات', subProF6: 'دعم أولوية',
      subChoosePro: 'اختر المهنية',
      subEntName: 'المؤسسية', subEntDesc: 'ملف متعدد وفريق',
      subEntF1: 'كل مزايا المهنية', subEntF2: 'حتى 5 ملفات فريق', subEntF3: 'دخول لوحة الإدارة', subEntF4: 'نطاق مخصص',
      subEntF5: 'API والوصول', subEntF6: 'مدير حساب مخصص',
      subChooseEnt: 'اختر المؤسسية',
      subModalTitle: 'اشترك الآن', subPayBtn: 'اشترك الآن',
      subFootnote: 'دفع آمن عبر Stripe. لا تُخزن بيانات البطاقة هنا.',
      subSuccess: 'تم تقديم طلب الاشتراك! سنتواصل معك خلال 24 ساعة.'
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
    // After applying i18n, overlay any admin-edited values
    document.querySelectorAll('[data-edit]').forEach(el => {
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
  // 4. SERVICE TABS
  // ============================================================
  const tabs = document.querySelectorAll('.service-tab');
  const panels = {
    compliance: document.getElementById('panel-compliance'),
    risk: document.getElementById('panel-risk'),
    technical: document.getElementById('panel-technical'),
    training: document.getElementById('panel-training'),
    vciso: document.getElementById('panel-vciso')
  };
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      Object.values(panels).forEach(p => { if (p) p.classList.remove('active'); });
      const target = panels[tab.dataset.tab];
      if (target) target.classList.add('active');
    });
  });

  // ============================================================
  // 5. FAQ ACCORDION
  // ============================================================
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.faq-question').forEach(b => b.setAttribute('aria-expanded', 'false'));
      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
  });

  // ============================================================
  // 6. TESTIMONIAL CAROUSEL
  // ============================================================
  const carousel = document.getElementById('testCarousel');
  const dotsContainer = document.getElementById('carouselDots');
  if (carousel && dotsContainer) {
    const slides = carousel.querySelectorAll('.testimonial-card');
    let currentSlide = 0;
    slides.forEach((slide, i) => {
      slide.style.display = i === 0 ? 'block' : 'none';
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });
    function goTo(index) {
      slides.forEach(s => s.style.display = 'none');
      slides[index].style.display = 'block';
      dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === index);
      });
      currentSlide = index;
    }
    // Auto-rotate
    setInterval(() => {
      const next = (currentSlide + 1) % slides.length;
      goTo(next);
    }, 6000);
  }

  // ============================================================
  // 7. ANIMATED COUNTERS (hero stats)
  // ============================================================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector('.hero-card-bar-fill');
        if (bar) bar.style.width = bar.style.width; // triggers transition
      }
    });
  }, { threshold: 0.5 });
  const cardBar = document.querySelector('.hero-card-bar');
  if (cardBar) observer.observe(cardBar.closest('.hero-card') || cardBar);

  // ============================================================
  // 8. ADMIN SESSION CHECK — SHOW EDIT MODE BUTTON
  // ============================================================
  if (isAdminLoggedIn()) {
    const navActions = document.querySelector('.nav-actions');
    if (navActions) {
      const editBtn = document.createElement('button');
      editBtn.className = 'nav-icon-btn admin-edit-btn';
      editBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Edit';
      editBtn.setAttribute('data-i18n', 'editMode');
      editBtn.title = 'Toggle Edit Mode';
      navActions.insertBefore(editBtn, navActions.querySelector('#loginBtn'));
      let editMode = false;
      editBtn.addEventListener('click', () => {
        editMode = !editMode;
        editBtn.classList.toggle('editing', editMode);
        editBtn.innerHTML = editMode
          ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg> Done'
          : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Edit';
        document.querySelectorAll('[data-edit]').forEach(el => {
          el.contentEditable = editMode;
          el.classList.toggle('editable-active', editMode);
          if (!editMode && el.dataset.edit) {
            localStorage.setItem('admin_' + el.dataset.edit, el.innerText);
          }
        });
      });
      // Load saved values on page
      document.querySelectorAll('[data-edit]').forEach(el => {
        const saved = localStorage.getItem('admin_' + el.dataset.edit);
        if (saved) el.innerText = saved;
      });
    }
  }

  // ============================================================
  // 9. LOGIN MODAL
  // ============================================================
  const loginBtn = document.getElementById('loginBtn');
  const loginModal = document.getElementById('loginModal');
  const modalClose = document.getElementById('modalClose');
  const viewerBtn = document.getElementById('loginViewer');
  const adminBtn = document.getElementById('loginAdmin');
  const subBtn = document.getElementById('loginSubscriber');

  if (loginBtn && loginModal) {
    loginBtn.addEventListener('click', () => loginModal.classList.add('active'));
    const closeModal = () => loginModal.classList.remove('active');
    if (modalClose) modalClose.addEventListener('click', closeModal);
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) closeModal();
    });
    if (viewerBtn) {
      viewerBtn.addEventListener('click', () => {
        loginModal.classList.remove('active');
        document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' });
      });
    }
    if (adminBtn) {
      adminBtn.addEventListener('click', () => {
        loginModal.classList.remove('active');
        window.location.href = 'pages/admin.html';
      });
    }
    if (subBtn) {
      subBtn.addEventListener('click', () => {
        loginModal.classList.remove('active');
        const oldSub = document.getElementById('subModal');
        if (oldSub) oldSub.classList.add('active');
      });
    }
  }

  // ============================================================
  // 9b. PAYMENT SUBSCRIPTION MODAL (from plans section)
  // ============================================================
  const paymentModal = document.getElementById('paymentModal');
  const paymentClose = document.getElementById('paymentModalClose');

  function openSubModal(plan) {
    const prices = { basic: 29, professional: 79, enterprise: 199 };
    const names = { basic: 'Basic', professional: 'Professional', enterprise: 'Enterprise' };
    const price = prices[plan] || 79;
    const name = names[plan] || 'Professional';
    document.getElementById('paymentPlan').value = plan;
    document.getElementById('paymentAmount').value = price;
    document.getElementById('paymentPlanName').textContent = name;
    document.getElementById('paymentPlanPrice').textContent = '$' + price;
    const btn = document.getElementById('paymentSubmitBtn');
    const span = btn.querySelector('span');
    const suffix = currentLang === 'ar' ? ' — $' + price + '/شهر' : ' — $' + price + '/mo';
    if (span) span.textContent = (i18n[currentLang]?.subPayBtn || 'Subscribe Now') + suffix;
    document.getElementById('paymentResultMsg').style.display = 'none';
    document.getElementById('paymentForm').style.display = 'block';
    if (paymentModal) paymentModal.classList.add('active');
  }

  // Landing page plan buttons
  document.querySelectorAll('.sub-choose-btn').forEach(btn => {
    btn.addEventListener('click', () => openSubModal(btn.dataset.plan));
  });

  if (paymentModal) {
    if (paymentClose) paymentClose.addEventListener('click', () => paymentModal.classList.remove('active'));
    paymentModal.addEventListener('click', (e) => {
      if (e.target === paymentModal) paymentModal.classList.remove('active');
    });
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
      paymentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('paymentName').value.trim();
        const email = document.getElementById('paymentEmail').value.trim();
        const company = document.getElementById('paymentCompany').value.trim();
        const plan = document.getElementById('paymentPlan').value;
        const amount = document.getElementById('paymentAmount').value;

        // Save subscription request to localStorage
        const subs = JSON.parse(localStorage.getItem('maa_subscribers') || '[]');
        subs.push({
          id: Date.now(),
          name, email, company, plan, amount,
          status: 'pending',
          createdAt: new Date().toISOString()
        });
        localStorage.setItem('maa_subscribers', JSON.stringify(subs));

        // Show success
        document.getElementById('paymentForm').style.display = 'none';
        const msg = document.getElementById('paymentResultMsg');
        msg.style.display = 'block';
        msg.className = 'form-msg form-msg-success';
        msg.textContent = currentLang === 'ar'
          ? 'تم تقديم طلب الاشتراك! سنتواصل معك خلال 24 ساعة.'
          : 'Subscription request submitted! We\'ll reach out within 24 hours with payment instructions.';

        // Stripe integration ready — uncomment below when backend is available:
        // const stripe = Stripe('pk_test_YOUR_KEY');
        // const res = await fetch('/api/create-checkout-session', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ plan, email, name, company })
        // });
        // const session = await res.json();
        // await stripe.redirectToCheckout({ sessionId: session.id });

        paymentForm.reset();
      });
    }
  }

  // ============================================================
  // 9c. PORTFOLIO SUBMISSION MODAL (login modal > Add Your Portfolio)
  // ============================================================
  const oldSub = document.getElementById('subModal');
  const oldSubClose = document.getElementById('subModalClose');
  if (oldSub) {
    if (oldSubClose) oldSubClose.addEventListener('click', () => oldSub.classList.remove('active'));
    oldSub.addEventListener('click', (e) => {
      if (e.target === oldSub) oldSub.classList.remove('active');
    });
    const oldForm = document.getElementById('subForm');
    if (oldForm) {
      oldForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert(currentLang === 'ar'
          ? 'شكراً لك! تم تقديم ملفك للمراجعة.'
          : 'Thank you! Your profile has been submitted for review.');
        oldForm.reset();
        oldSub.classList.remove('active');
      });
    }
  }

  // ============================================================
  // 10. ADMIN PANEL (legacy — redirects to pages/admin.html)
  // ============================================================
  const adminPanel = document.getElementById('adminPanel');
  const adminClose = document.getElementById('adminClose');
  if (adminPanel && adminClose) {
    adminClose.addEventListener('click', () => adminPanel.classList.remove('active'));
    document.querySelectorAll('.admin-nav-item[data-section]').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.admin-nav-item').forEach(n => n.classList.remove('active'));
        item.classList.add('active');
      });
    });
    document.querySelectorAll('.admin-input').forEach(input => {
      input.addEventListener('change', function() {
        localStorage.setItem('admin_' + (this.dataset.key || ''), this.value);
      });
    });
    const dt = document.getElementById('adminDateTime');
    if (dt) {
      function updt() { dt.textContent = new Date().toLocaleString(); }
      updt();
      setInterval(updt, 1000);
    }
  }

  // ============================================================
  // 11. CONTACT FORM
  // ============================================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you! Your message has been received. I will get back to you shortly.');
      contactForm.reset();
    });
  }

  // ============================================================
  // 12. ACTIVE NAV ON SCROLL
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
  // 13. FLOATING LABEL FIX
  // ============================================================
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
    el.addEventListener('blur', () => {
      if (el.value) el.setAttribute('placeholder', ' ');
      else el.removeAttribute('placeholder');
    });
  });

  // ============================================================
  // 14. SCROLL TO TOP BUTTON
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
  // 15. LAZY LOAD IMAGES (performance)
  // ============================================================
  document.querySelectorAll('img:not([loading])').forEach(img => {
    img.setAttribute('loading', 'lazy');
  });

  // ============================================================
  // 16. CONTENT VISIBILITY ON BELOW-FOLD SECTIONS
  // ============================================================
  document.querySelectorAll('.section:not(.hero-section):not(.about-section)').forEach(el => {
    el.style.contentVisibility = 'auto';
  });

  console.log('M.A.A. Consulting v3.0 loaded.');
});
