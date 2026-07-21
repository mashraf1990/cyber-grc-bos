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
      caseStudies: 'Case Studies', insights: 'Insights', contact: 'Contact',
      heroBadge: 'Principal Cybersecurity & GRC Consultant',
      heroSub: 'Helping financial institutions, SaaS companies, healthcare organizations, government entities, and enterprises strengthen cybersecurity, manage risk, achieve compliance, and prepare for successful audits.',
      explore: 'Explore Services', schedule: 'Book a Consultation',
      trustedBy: 'Trusted by organizations across the Middle East and North America',
      snb: 'Banking & Financial Services', diriyah: 'Government & Public Sector', nvits: 'SaaS & Technology', parentApp: 'FinTech', healthcare: 'Healthcare',
      aboutLabel: 'About', aboutTitle: 'Cybersecurity & GRC Consulting',
      aboutP1: 'Mohamed Ashraf is a Principal Cybersecurity & Governance, Risk & Compliance (GRC) Consultant with over 10 years of experience delivering cybersecurity, compliance, and risk management solutions across banking, government, healthcare, SaaS, and enterprise environments.',
      aboutP2: 'He helps organizations strengthen security, manage cyber risk, achieve compliance, and prepare for audits through cybersecurity consulting, technical security assessments, governance programs, policy development, and professional cybersecurity training.',
      servicesLabel: 'What I Do', servicesTitle: 'Cybersecurity & Compliance Consulting',
      servicesDesc: 'Every engagement is tailored to your industry, regulatory environment, and business objectives.',
      tabCompliance: 'Compliance & GRC', tabAssessments: 'Cybersecurity Assessments', tabDocumentation: 'Documentation & Programs', tabTraining: 'Training', tabVCISO: 'vCISO',
      pciTitle: 'PCI DSS Compliance', pciDesc: 'End-to-end PCI DSS v4.0.1 program management. Gap assessment, evidence collection, control testing, and QSA audit readiness.',
      isoTitle: 'ISO 27001 Compliance', isoDesc: 'Full ISMS lifecycle: gap analysis, risk assessment, Statement of Applicability, internal audit, and certification body liaison.',
      soc2Title: 'SOC 2 Readiness', soc2Desc: 'Trust Service Criteria mapping, control identification, evidence collection, pre-audit testing, and remediation planning for Type I and Type II reports.',
      nistTitle: 'NIST CSF Alignment', nistDesc: 'Maturity assessment across all 6 functions. Strategic roadmap and control implementation guidance aligned to NIST CSF 2.0.',
      samaTitle: 'SAMA CSF Implementation', samaDesc: 'Regulatory compliance for Saudi financial institutions. Domain mapping, control testing, and evidence management for SAMA licensing requirements.',
      ncaTitle: 'NCA ECC Compliance', ncaDesc: 'Compliance with Saudi Arabia\'s National Cybersecurity Authority framework for government entities and critical infrastructure organizations.',
      archTitle: 'Security Architecture Review', archDesc: 'Comprehensive review of network, cloud, application, and physical architectures. Threat modeling and prioritized recommendations.',
      netReviewTitle: 'Network Security Review', netReviewDesc: 'Firewall rule set review, network diagram validation, segmentation analysis, and security baseline assessment.',
      vulnTitle: 'Vulnerability Assessment', vulnDesc: 'Technical vulnerability scanning, prioritization, and remediation guidance across infrastructure, applications, and cloud environments.',
      accessTitle: 'Access & Privileged Access Review', accessDesc: 'User access controls, privileged account management, segregation of duties, and identity governance evaluation.',
      irReviewTitle: 'Incident Response Review', irReviewDesc: 'Incident response plan assessment, tabletop exercise facilitation, gap identification, and improvement recommendations.',
      bcrTitle: 'Business Continuity Review', bcrDesc: 'BCP/DR plan review, business impact analysis support, and resilience improvement recommendations.',
      policyTitle: 'Policy Development', policyDesc: 'Comprehensive policy suites, standards, procedures, and guidelines aligned to your chosen framework(s). Practical, enforceable, and audit-ready.',
      procTitle: 'Procedure Development', procDesc: 'Detailed operational procedures, work instructions, and process documentation for security and compliance controls.',
      riskRegTitle: 'Risk Register Development', riskRegDesc: 'Risk identification, analysis, and documentation. Risk register creation, treatment planning, and executive reporting.',
      compDocTitle: 'Compliance Documentation', compDocDesc: 'Compliance evidence repositories, control matrices, and documentation packages for regulatory submissions and audits.',
      irPlanTitle: 'Incident Response Plans', irPlanDesc: 'Incident response plan development, escalation procedures, communication templates, and testing frameworks.',
      awarenessTitle: 'Security Awareness Programs', awarenessDesc: 'Tailored awareness programs including phishing simulations, training modules, and metrics-driven measurement for all staff levels.',
      corpTrainTitle: 'Corporate Cybersecurity Training', corpTrainDesc: 'Custom training programs for technical and non-technical teams covering security fundamentals, secure coding, and compliance awareness.',
      execWorkTitle: 'Executive Workshops', execWorkDesc: 'Board-level and executive sessions on cyber risk, regulatory trends, incident readiness, and security governance.',
      techTrainTitle: 'Technical Training', techTrainDesc: 'Hands-on technical training covering security tools, architecture review techniques, and compliance assessment methodologies.',
      currTitle: 'Curriculum Development', currDesc: 'Design and development of university-level and professional training curricula covering GRC, risk management, security architecture, and compliance frameworks.',
      vcisoTitle: 'Virtual CISO (vCISO)', vcisoDesc: 'Part-time or retainer-based executive cybersecurity leadership. Strategy development, risk oversight, board reporting, compliance program management, and incident response guidance.',
      bookConsult: 'Book a Consultation',
      fwLabel: 'Framework Expertise', fwTitle: 'Every Major Standard, One Integrated Approach',
      fwDesc: 'I do not silo compliance. I build unified programs that satisfy multiple frameworks simultaneously.',
      indLabel: 'Who I Serve', indTitle: 'Industry-Specific Expertise',
      indDesc: 'Every sector has its own regulatory pressures, operational realities, and risk profiles.',
      indBank: 'Banking & Financial Services', indBankDesc: 'PCI DSS, SAMA CSF, CBE regulations. Former bank supervisor and compliance lead for a major Saudi bank.',
      indFintech: 'FinTech', indFintechDesc: 'PCI DSS, SOC 2, ISO 27001. Pragmatic compliance for fast-moving financial technology companies.',
      indHealth: 'Healthcare', indHealthDesc: 'Security reviews and compliance roadmaps for digital health platforms and healthcare SaaS.',
      indGov: 'Government', indGovDesc: 'NCA ECC, NIST CSF, ISO 27001. Architecture review and compliance programs for government entities.',
      indSaaS: 'SaaS & Technology', indSaaSDesc: 'SOC 2, ISO 27001, NIST. Evidence-driven compliance for technology organizations serving enterprise clients.',
      outLabel: 'What to Expect', outTitle: 'Business Outcomes, Not Just Reports',
      outDesc: 'Every engagement is measured against the outcomes that matter to your business.',
      out1: 'Reduced Compliance Gaps', out1d: 'Methodical identification and remediation of compliance gaps across selected frameworks.',
      out2: 'Audit Readiness', out2d: 'Satisfy regulators, QSAs, and external auditors with well-documented, testable controls.',
      out3: 'Risk Visibility', out3d: 'Clear, quantified risk picture for management and the board. Prioritized treatment plans.',
      out4: 'Regulatory Confidence', out4d: 'Navigate evolving regulatory requirements with confidence and proactive planning.',
      out5: 'Team Capability', out5d: 'Your team gains the skills and confidence to sustain compliance independently.',
      out6: 'Faster Time to Compliance', out6d: 'Streamlined methodology that accelerates compliance timelines through proven frameworks.',
      methodLabel: 'How I Work', methodTitle: 'The GRCA Methodology',
      methodDesc: 'A proven, repeatable framework refined over a decade of engagements across industries and geographies.',
      step1: 'Assess', step1d: 'Discovery, stakeholder interviews, document review, control testing, and gap analysis against your target framework(s).',
      step2: 'Plan', step2d: 'Risk-based prioritization, resource estimation, roadmap development, and executive alignment on scope and timeline.',
      step3: 'Build', step3d: 'Policy development, control implementation, technical configuration, training, and evidence collection infrastructure.',
      step4: 'Operate', step4d: 'Embedded support, monitoring, progress tracking, management reporting, and adjustments based on emerging risks.',
      step5: 'Audit', step5d: 'Internal audit, pre-certification mock assessment, remediation, and readiness confirmation for external auditors.',
      step6: 'Sustain', step6d: 'Ongoing monitoring, quarterly reviews, continuous improvement, and re-assessment cycles to maintain compliance.',
      whyLabel: 'Why Organizations Choose Me', whyTitle: 'Experience That Speaks for Itself',
      cred1: '10+ years of GRC consulting across multiple countries',
      cred2: 'Former bank supervisor \u2014 National Bank of Egypt',
      cred3: 'EC-Council Certified Instructor \u2014 training the next generation of cybersecurity professionals',
      cred4: 'Curriculum developer \u2014 designed university-level programs for institutions in Canada',
      cred5: 'Multi-framework integration specialist \u2014 unified programs for organizations managing multiple compliance standards',
      cred6: 'Board-fluent communicator \u2014 executive summaries that drive decisions',
      badge1: 'EC-Council', badge1d: 'Certified Instructor',
      badge2: 'Curriculum Design', badge2d: 'University & Professional Programs',
      badge3: 'International', badge3d: 'SA \u00b7 UAE \u00b7 EG \u00b7 USA \u00b7 Canada',
      csLabel: 'Case Studies', csTitle: 'Selected Engagements',
      csDesc: 'These engagements reflect real consulting experience. Client names are anonymized where requested.',
      testLabel: 'Engagement Highlights', testTitle: 'Selected Engagement Highlights',
      eh1: 'Led PCI DSS compliance program for a major financial institution in Saudi Arabia',
      eh2: 'Performed enterprise security architecture review for a national development project',
      eh3: 'Conducted SOC 2 readiness assessment for a US-based technology company',
      eh4: 'Developed cybersecurity curriculum for a Canadian educational institution',
      eh5: 'Delivered SAMA CSF compliance program for a Saudi insurance company',
      eh6: 'EC-Council Certified Instructor delivering professional cybersecurity training',
      insightLabel: 'Insights', insightTitle: 'Cybersecurity Resources & Analysis',
      insightDesc: 'Practical guidance on compliance strategy, risk management, and governance best practices.',
      art1Title: 'PCI DSS v4.0.1: What Changed and What to Do About It', art1Desc: 'A practical guide to the key changes in the latest version and how to prepare your organization for assessment.',
      art2Title: 'The True Cost of Compliance (and the Cost of Non-Compliance)', art2Desc: 'Why leading organizations view compliance as an investment in revenue protection, not a cost center.',
      art3Title: 'Building a Board-Ready Cybersecurity Dashboard', art3Desc: 'How to communicate risk and compliance posture to executives in a language they understand and act on.',
      faqLabel: 'FAQ', faqTitle: 'Frequently Asked Questions',
      faq1: 'What frameworks do you work with?', faq1a: 'PCI DSS v4.0.1, ISO 27001:2022, SOC 2 (Type I/II), NIST CSF 2.0, SAMA CSF, NCA ECC, CIS Controls, ISO 27005, and CBE Cybersecurity Framework. I also integrate multiple frameworks into a unified compliance program.',
      faq2: 'How long does a typical engagement take?', faq2a: 'A gap assessment typically takes 2-4 weeks. Full compliance programs range from 8-16 weeks. vCISO engagements are ongoing. I will provide a timeline specific to your situation during our initial consultation.',
      faq3: 'Do you work remotely or on-site?', faq3a: 'Both. I work with clients across Saudi Arabia, UAE, Egypt, USA, and Canada. Initial assessments are often hybrid, with deep-dive phases conducted on-site when required.',
      faq4: 'What industries do you specialize in?', faq4a: 'Banking, financial services, FinTech, healthcare, government, SaaS/technology, and insurance. Each industry has distinct regulatory requirements and I bring relevant experience from each sector.',
      faq5: 'Do you offer fractional CISO services?', faq5a: 'Yes. I provide vCISO services on a part-time or retainer basis, including strategy development, risk oversight, board reporting, incident response guidance, and compliance program management.',
      contactLabel: 'Contact', contactTitle: "Let's Start a Conversation",
      contactDesc: 'Whether you need a gap assessment, full compliance program, or executive advisory \u2014 I am ready to help.',
      emailLabel: 'Email', locationLabel: 'Location', availability: 'Availability',
      availVal: 'Remote & On-site | MENA & North America',
      formName: 'Full Name', formEmail: 'Email Address', formCompany: 'Company', formCompanySize: 'Company Size', formSelect: 'Select Service Interest', formEngagementType: 'Preferred Engagement Type', formMessage: 'Tell me about your project or question',
      sendMessage: 'Send Message',
      tagline: 'Cybersecurity | GRC | Compliance | Security Assessments | Training',
      footerDesc: 'Enterprise cybersecurity governance, risk, and compliance consulting across the Middle East and internationally.',
      services: 'Services', quickLinks: 'Quick Links', connect: 'Connect', footerNote: 'Based in Saudi Arabia, serving clients worldwide.',
      footerLegal: 'This site is for informational purposes. Client references are disclosed with permission or anonymized.',
      readMore: 'Read More', editMode: 'Edit',
      skillsLabel: 'Core Competencies', skillsTitle: 'Framework & Domain Expertise', skillsDesc: 'Deep technical and regulatory expertise built over a decade of enterprise consulting.',
      expLabel: 'Professional History', expTitle: 'Selected Consulting Engagements', expDesc: 'A track record of delivering enterprise-scale cybersecurity and compliance programs.',
      /* TODO: Future SaaS - restore subscription i18n keys when building separate SaaS platform */
      subSecLabel: 'Plans', subSecTitle: 'Choose Your Plan', subSecDesc: 'Plans section (hidden - for future SaaS)'
    },
    ar: {
      editMode: 'تعديل',
      home: 'الرئيسية', about: 'عني', skills: 'كفاءات', experience: 'المشاريع', services: 'الخدمات', industries: 'الصناعات',
      caseStudies: 'دراسات الحالة', insights: 'رؤى', contact: 'اتصل بي',
      heroBadge: 'كبير مستشاري الحوكمة والمخاطر والامتثال السيبراني',
      heroSub: 'مساعدة المؤسسات المالية وشركات التقنية ومؤسسات الرعاية الصحية والجهات الحكومية على تعزيز الأمن السيبراني وإدارة المخاطر وتحقيق الامتثال والاستعداد لعمليات التدقيق الناجحة.',
      explore: 'استعرض الخدمات', schedule: 'احجز استشارة',
      trustedBy: 'موثوق به من منظمات في الشرق الأوسط وأمريكا الشمالية',
      snb: 'الخدمات المصرفية والمالية', diriyah: 'القطاع الحكومي', nvits: 'التقنية والحلول السحابية', parentApp: 'التقنية المالية', healthcare: 'الرعاية الصحية',
      aboutLabel: 'عني', aboutTitle: 'استشارات الأمن السيبراني والحوكمة',
      aboutP1: 'محمد أشرف هو كبير مستشاري الأمن السيبراني والحوكمة والمخاطر والامتثال (GRC) مع أكثر من 10 سنوات من الخبرة في تقديم حلول الأمن السيبراني والامتثال وإدارة المخاطر عبر البيئات المصرفية والحكومية والصحية والتقنية.',
      aboutP2: 'يساعد المؤسسات على تعزيز الأمن وإدارة المخاطر السيبرانية وتحقيق الامتثال والاستعداد لعمليات التدقيق من خلال الاستشارات الأمنية والتقييمات الفنية وبرامج الحوكمة وتطوير السياسات والتدريب المهني.',
      servicesLabel: 'ماذا أقدم', servicesTitle: 'استشارات الأمن السيبراني والامتثال',
      servicesDesc: 'كل مهمة مصممة خصيصاً لصناعتك وبيئتك التنظيمية وأهدافك التجارية.',
      tabCompliance: 'الامتثال والحوكمة', tabAssessments: 'التقييمات الأمنية', tabDocumentation: 'التوثيق والبرامج', tabTraining: 'التدريب', tabVCISO: 'VIP للأمن',
      pciTitle: 'امتثال PCI DSS', pciDesc: 'إدارة شاملة لبرنامج PCI DSS v4.0.1. تقييم الفجوات وجمع الأدلة واختبار الضوابط والاستعداد لتدقيق QSA.',
      isoTitle: 'الامتثال لـ ISO 27001', isoDesc: 'دورة حياة كاملة لنظام إدارة أمن المعلومات: تحليل الفجوات وتقييم المخاطر وتصريح التطبيق والتدقيق الداخلي.',
      soc2Title: 'جاهزية SOC 2', soc2Desc: 'ربط معايير الثقة وتحديد الضوابط وجمع الأدلة والاختبار المسبق للتدقيق والتخطيط للمعالجة.',
      nistTitle: 'مواءمة NIST CSF', nistDesc: 'تقييم النضج عبر 6 وظائف. خارطة طريق استراتيجية وتوجيه لتنفيذ الضوابط.',
      samaTitle: 'تطبيق SAMA CSF', samaDesc: 'الامتثال التنظيمي للمؤسسات المالية السعودية. رسم خرائط المجالات واختبار الضوابط.',
      ncaTitle: 'الامتثال لـ NCA ECC', ncaDesc: 'الامتثال لإطار الهيئة الوطنية للأمن السيبراني للجهات الحكومية والبنية التحتية الحيوية.',
      archTitle: 'مراجعة البنية الأمنية', archDesc: 'مراجعة شاملة للبنى الشبكية والسحابية والتطبيقية والمادية. نمذجة التهديدات وتوصيات ذات أولوية.',
      netReviewTitle: 'مراجعة أمن الشبكات', netReviewDesc: 'مراجعة قواعد جدار الحماية والتحقق من مخططات الشبكة وتحليل التقسيم وتقييم خط الأساس الأمني.',
      vulnTitle: 'تقييم الثغرات', vulnDesc: 'مسح تقني للثغرات وتحديد الأولويات وتوجيه المعالجة عبر البنية التحتية والتطبيقات والبيئات السحابية.',
      accessTitle: 'مراجعة الوصول والامتيازات', accessDesc: 'تقييم ضوابط وصول المستخدمين وإدارة الحسابات المميزة والفصل بين المهام.',
      irReviewTitle: 'مراجعة الاستجابة للحوادث', irReviewDesc: 'تقييم خطة الاستجابة للحوادث وتسهيل التمارين الطارئة وتحديد الفجوات.',
      bcrTitle: 'مراجعة استمرارية الأعمال', bcrDesc: 'مراجعة خطط استمرارية الأعمال والتعافي من الكوارث ودعم تحليل تأثير الأعمال.',
      policyTitle: 'تطوير السياسات', policyDesc: 'مجموعات شاملة من السياسات والمعايير والإجراءات والإرشادات المتوافقة مع أطرك المختارة.',
      procTitle: 'تطوير الإجراءات', procDesc: 'إجراءات تشغيلية مفصلة وتعليمات عمل وتوثيق عمليات لضوابط الأمن والامتثال.',
      riskRegTitle: 'تطوير سجل المخاطر', riskRegDesc: 'تحديد وتحليل وتوثيق المخاطر. إنشاء سجل المخاطر وتخطيط المعالجة والتقارير التنفيذية.',
      compDocTitle: 'توثيق الامتثال', compDocDesc: 'مستودعات أدلة الامتثال ومصفوفات الضوابط وحزم التوثيق للتقديمات التنظيمية.',
      irPlanTitle: 'خطط الاستجابة للحوادث', irPlanDesc: 'تطوير خطط الاستجابة للحوادث وإجراءات التصعيد وقوالب التواصل وأطر الاختبار.',
      awarenessTitle: 'برامج التوعية الأمنية', awarenessDesc: 'برامج توعية مخصصة تتضمن محاكاة التصيد ووحدات تدريبية وقياس الأداء.',
      corpTrainTitle: 'التدريب المؤسسي', corpTrainDesc: 'برامج تدريب مخصصة للفرق الفنية وغير الفنية تغطي أساسيات الأمن والبرمجة الآمنة.',
      execWorkTitle: 'ورش عمل تنفيذية', execWorkDesc: 'جلسات لمجالس الإدارة والإدارة التنفيذية حول المخاطر السيبرانية والاتجاهات التنظيمية.',
      techTrainTitle: 'التدريب التقني', techTrainDesc: 'تدريب تقني عملي يغطي أدوات الأمن وتقنيات مراجعة البنية ومنهجيات تقييم الامتثال.',
      currTitle: 'تطوير المناهج', currDesc: 'تصميم وتطوير مناهج جامعية ومهنية تغطي الحوكمة والمخاطر والامتثال وأمن المعلومات.',
      vcisoTitle: 'كبير أمن رقمي افتراضي (vCISO)', vcisoDesc: 'قيادة أمنية تنفيذية بدوام جزئي أو بعقد: تطوير الاستراتيجية والإشراف على المخاطر والتقارير التنفيذية وإدارة برامج الامتثال.',
      bookConsult: 'احجز استشارة',
      fwLabel: 'خبرة الأطر', fwTitle: 'كل معيار رئيسي بنهج متكامل',
      fwDesc: 'لا أُقسم الامتثال. أبني برامج موحدة تلبي متطلبات أطر متعددة في وقت واحد.',
      indLabel: 'من أخدم', indTitle: 'خبرة خاصة بكل صناعة',
      indDesc: 'لكل قطاع ضغوطه التنظيمية وواقعه التشغيلي وملف المخاطر الخاص به.',
      indBank: 'الخدمات المصرفية والمالية', indBankDesc: 'PCI DSS وSAMA CSF ولوائح البنك المركزي المصري. مشرف بنكي سابق وقائد امتثال لبنك سعودي كبير.',
      indFintech: 'التقنية المالية', indFintechDesc: 'PCI DSS وSOC 2 وISO 27001. امتثال عملي لشركات التقنية المالية سريعة الحركة.',
      indHealth: 'الرعاية الصحية', indHealthDesc: 'مراجعات أمنية وخرائط طريق امتثال لمنصات الصحة الرقمية وتقنية الرعاية الصحية السحابية.',
      indGov: 'القطاع الحكومي', indGovDesc: 'NCA ECC وNIST CSF وISO 27001. مراجعة بنية وبرامج امتثال للجهات الحكومية.',
      indSaaS: 'التقنية والحلول السحابية', indSaaSDesc: 'SOC 2 وISO 27001 وNIST. امتثال قائم على الأدلة لشركات التقنية.',
      outLabel: 'توقعات النتائج', outTitle: 'نتائج أعمال، وليس فقط تقارير',
      outDesc: 'كل مهمة تقاس بالنتائج التي تهم عملك.',
      out1: 'تخفيض فجوات الامتثال', out1d: 'تحديد ومعالجة منهجية لفجوات الامتثال عبر الأطر المختارة.',
      out2: 'جاهزية التدقيق', out2d: 'إرضاء الجهات التنظيمية ومدققي QSA والمدققين الخارجيين بضوابط موثقة وقابلة للاختبار.',
      out3: 'وضوح المخاطر', out3d: 'صورة واضحة وقابلة للقياس للمخاطر للإدارة ومجلس الإدارة.',
      out4: 'ثقة تنظيمية', out4d: 'التنقل بين المتطلبات التنظيمية المتطورة بثقة وتخطيط استباقي.',
      out5: 'قدرة الفريق', out5d: 'يكتسب فريقك المهارات والثقة للحفاظ على الامتثال بشكل مستقل.',
      out6: 'امتثال أسرع', out6d: 'منهجية مبسطة تسرع جداول الامتثال من خلال أطر مثبتة.',
      methodLabel: 'كيف أعمل', methodTitle: 'منهجية GRCA',
      methodDesc: 'إطار مثبت وقابل للتكرار تم تحسينه على مدى عقد من المهام عبر الصناعات والمناطق الجغرافية.',
      step1: 'التقييم', step1d: 'الاكتشاف ومقابلات أصحاب المصلحة ومراجعة المستندات واختبار الضوابط وتحليل الفجوات.',
      step2: 'التخطيط', step2d: 'تحديد الأولويات على أساس المخاطر وتقدير الموارد وتطوير خارطة الطريق.',
      step3: 'البناء', step3d: 'تطوير السياسات وتنفيذ الضوابط والتكوين التقني والتدريب.',
      step4: 'التشغيل', step4d: 'دعم مدمج ومراقبة وتتبع التقدم وتقارير الإدارة والتعديلات.',
      step5: 'التدقيق', step5d: 'التدقيق الداخلي والتقييم التجريبي قبل الشهادة والمعالجة.',
      step6: 'الاستدامة', step6d: 'مراقبة مستمرة ومراجعات ربع سنوية وتحسين مستمر.',
      whyLabel: 'لماذا تختارني', whyTitle: 'خبرة تتحدث عن نفسها',
      cred1: 'أكثر من 10 سنوات من الاستشارات في الحوكمة والمخاطر عبر دول متعددة',
      cred2: 'مشرف بنكي سابق \u2014 البنك الأهلي المصري',
      cred3: 'مدرب معتمد من EC-Council \u2014 تدريب الجيل القادم من محترفي الأمن السيبراني',
      cred4: 'مطور مناهج \u2014 تصميم برامج جامعية لمؤسسات في كندا',
      cred5: 'متخصص في تكامل الأطر المتعددة \u2014 برامج موحدة للمنظمات التي تدير معايير امتثال متعددة',
      cred6: 'متواصل مع مجالس الإدارة \u2014 ملخصات تنفيذية تقود القرارات',
      badge1: 'EC-Council', badge1d: 'مدرب معتمد',
      badge2: 'تصميم المناهج', badge2d: 'برامج جامعية ومهنية',
      badge3: 'دولي', badge3d: 'السعودية · الإمارات · مصر · أمريكا · كندا',
      csLabel: 'دراسات الحالة', csTitle: 'مهام مختارة',
      csDesc: 'هذه المهام تعكس خبرة استشارية حقيقية. أسماء العملاء مجهولة حسب الطلب.',
      testLabel: 'أبرز المهام', testTitle: 'أبرز المهام الاستشارية',
      eh1: 'قيادة برنامج الامتثال PCI DSS لمؤسسة مالية كبرى في السعودية',
      eh2: 'إجراء مراجعة أمنية شاملة لمشروع تطوير وطني',
      eh3: 'إجراء تقييم جاهزية SOC 2 لشركة تقنية أمريكية',
      eh4: 'تطوير منهج أمن سيبراني لمؤسسة تعليمية في كندا',
      eh5: 'تقديم برنامج امتثال SAMA CSF لشركة تأمين سعودية',
      eh6: 'مدرب معتمد من EC-Council لتقديم التدريب المهني في الأمن السيبراني',
      insightLabel: 'رؤى', insightTitle: 'موارد وتحليلات الأمن السيبراني',
      insightDesc: 'إرشادات عملية حول استراتيجية الامتثال وإدارة المخاطر وأفضل ممارسات الحوكمة.',
      art1Title: 'PCI DSS v4.0.1: ما الذي تغير وماذا تفعل حيال ذلك',
      art1Desc: 'دليل عملي للتغييرات الرئيسية في الإصدار الأخير وكيفية إعداد مؤسستك للتقييم.',
      art2Title: 'التكلفة الحقيقية للامتثال (وتكلفة عدم الامتثال)',
      art2Desc: 'لماذا تنظر المنظمات الرائدة إلى الامتثال كاستثمار في حماية الإيرادات.',
      art3Title: 'بناء لوحة معلومات جاهزة لمجلس الإدارة',
      art3Desc: 'كيفية توصيل وضع المخاطر والامتثال للمديرين التنفيذيين بلغة يفهمونها.',
      faqLabel: 'الأسئلة الشائعة', faqTitle: 'أسئلة متكررة',
      faq1: 'ما هي الأطر التي تعمل بها؟',
      faq1a: 'PCI DSS v4.0.1 وISO 27001:2022 وSOC 2 وNIST CSF 2.0 وSAMA CSF وNCA ECC وCIS Controls وISO 27005.',
      faq2: 'كم يستغرق المهم النموذجي؟',
      faq2a: 'تقييم الفجوات يستغرق عادة 2-4 أسابيع. برامج الامتثال الكاملة تتراوح من 8-16 أسبوعاً.',
      faq3: 'هل تعمل عن بعد أم في الموقع؟',
      faq3a: 'كليهما. أعمل مع عملاء في السعودية والإمارات ومصر وأمريكا وكندا.',
      faq4: 'ما هي الصناعات التي تتخصص فيها؟',
      faq4a: 'الخدمات المصرفية والمالية والتقنية المالية والرعاية الصحية والقطاع الحكومي والتقنية والتأمين.',
      faq5: 'هل تقدم خدمات كبير أمن رقمي جزئي؟',
      faq5a: 'نعم. أقدم خدمات vCISO على أساس جزئي أو بعقد يشمل تطوير الاستراتيجية والإشراف على المخاطر.',
      contactLabel: 'اتصل بي', contactTitle: 'لنبدأ محادثة',
      contactDesc: 'سواء كنت بحاجة لتقييم فجوات أو برنامج امتثال كامل أو استشارة تنفيذية \u2014 أنا مستعد للمساعدة.',
      emailLabel: 'البريد الإلكتروني', locationLabel: 'الموقع', availability: 'التوفر',
      availVal: 'عن بعد وفي الموقع | الشرق الأوسط وأمريكا الشمالية',
      formName: 'الاسم الكامل', formEmail: 'البريد الإلكتروني', formCompany: 'الشركة', formCompanySize: 'حجم الشركة', formSelect: 'اختر الخدمة', formEngagementType: 'نوع المهمة المفضل', formMessage: 'أخبرني عن مشروعك أو استفسارك',
      sendMessage: 'إرسال الرسالة',
      tagline: 'الأمن السيبراني | الحوكمة والمخاطر | الامتثال | التقييمات الأمنية | التدريب',
      footerDesc: 'استشارات على مستوى المؤسسات في الحوكمة والمخاطر والامتثال عبر الشرق الأوسط والعالم.',
      services: 'الخدمات', quickLinks: 'روابط سريعة', connect: 'تواصل',
      footerNote: 'مقرّي في السعودية، أخدم عملاء في جميع أنحاء العالم.',
      footerLegal: 'هذا الموقع لأغراض إعلامية. يتم الإشارة إلى العملاء بإذن أو بشكل مجهول.',
      readMore: 'اقرأ المزيد', editMode: 'تعديل',
      skillsLabel: 'الكفاءات الأساسية', skillsTitle: 'خبرات الأطر والمجالات', skillsDesc: 'خبرة تقنية وتنظيمية عميقة بنيت على مدى عقد من الاستشارات المؤسسية.',
      expLabel: 'السيرة المهنية', expTitle: 'المشاريع الاستشارية', expDesc: 'سجل حافل من تنفيذ برامج الأمن السيبراني والامتثال على مستوى المؤسسات.',
      subSecLabel: 'الباقات', subSecTitle: 'اختر باقتك', subSecDesc: 'قسم الباقات (مخفي - لمنصة SaaS المستقبلية)'
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
    assessments: document.getElementById('panel-assessments'),
    documentation: document.getElementById('panel-documentation'),
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
  // 6. ADMIN SESSION CHECK — SHOW EDIT MODE BUTTON
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
  // 7. CONTACT FORM
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
  document.querySelectorAll('.section').forEach(el => {
    if (!el.closest('.hero') && !el.closest('#about')) {
      el.style.contentVisibility = 'auto';
    }
  });

  console.log('M.A.A. Consulting v3.0 loaded.');
});
