// Verified against the supplied CV and eren123H/portfolio.
export const profile = {
  name: "Eren Uçar",
  location: "İstanbul, Türkiye",
  focusAreas: ["IT", "Yazılım Geliştirme", "Veri Analizi"],
  summary:
    "2026 Nişantaşı Üniversitesi Yönetim Bilişim Sistemleri mezunuyum. Kurumsal IT stajımda destek süreçleri için web tabanlı Help Desk sistemi geliştirdim. Python, SQL, web teknolojileri ve veri analizi alanlarında öğrendiklerimi gerçek problemlere uygulamaya odaklanıyorum.",
  education: {
    university: "Nişantaşı Üniversitesi",
    degree: "Yönetim Bilişim Sistemleri · Lisans",
    years: "2022–2026",
  },
  language: "İngilizce · B1",
  resume: "./resume/Eren_Ucar_CV.pdf",
  resumePreview: "./resume/cv-preview.webp",
  links: [
    { label: "GitHub", href: "https://github.com/eren123H" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/eren-u%C3%A7ar-0a340024a/",
    },
    { label: "E-posta", href: "mailto:bartineren34@gmail.com" },
  ],
} as const;

export const experiences = [
  {
    company: "Honest Holding",
    role: "Bilgi Teknolojileri Stajyeri",
    year: "2026",
    details: [
      "Kurumsal IT destek süreçleri için Help Desk sistemi geliştirip şirket içi kullanıma sundum.",
      "Sistem/ağ altyapısı, kurumsal yazılımlar ve teknik destek süreçlerinde deneyim kazandım.",
    ],
  },
  {
    company: "SCA Social",
    role: "Proje Yönetimi Stajyeri",
    year: "2025",
    details: [
      "AI destekli teklif ve otomatik yanıt sistemi fikri için kapsam, paydaşlar, riskler ve kilometre taşlarını içeren proje başlatma belgesi hazırladım.",
      "Görevleri, sorumluları ve süreleri Gantt şemasında planladım; organizasyon ve iş süreçlerini belgeledim.",
      "Park doluluk problemi için AI/veri bilimi çözüm önerisi ve bilişim hukuku araştırması hazırladım.",
    ],
  },
] as const;

export const projects = [
  {
    id: "helpdesk",
    title: "IT Help Desk System",
    category: "Kurumsal IT · Full-stack",
    summary:
      "Honest Holding IT stajımda şirket içi kullanım için geliştirdiğim destek sistemi. Rol bazlı erişim, talep atama ve takip, dosya ekleri, bildirimler ve iç notlar; SLA, CSAT ve iş yükü raporları içeriyor.",
    technologies: [
      "React / Vite",
      "Node.js / Express",
      "SQLite",
      "JWT",
      "bcrypt",
    ],
    repository: "https://github.com/eren123H/it-helpdesk",
    image: "./projects/helpdesk.webp",
    imageAlt: "IT Help Desk uygulamasının giriş ekranı",
    imageCaption: "Uygulama ekranı",
  },
  {
    id: "national-team",
    title: "Türkiye A Milli Takımı Veri Analizi",
    category: "Veri analizi · Ekip projesi",
    summary:
      "635 maçın verisini rakip, ay, stadyum ve teknik direktör bazında PivotTable ve grafiklerle inceleyen ekip çalışması. Performans özetleri Excel dashboard’u ve PowerPoint sunumunda bir araya getirildi.",
    technologies: ["Excel", "PivotTable", "Dashboard", "PowerPoint"],
    repository: "https://github.com/eren123H/Veri-Analizi",
    image: "./projects/milli-takim.webp",
    imageAlt: "Milli Takım analizi sunumundan aylık galibiyet oranları grafiği",
    imageCaption: "Özgün sunumdan grafik",
  },
  {
    id: "payroll",
    title: "Personel Maaş Takip Sistemi",
    category: "Web uygulaması · Veritabanı",
    summary:
      "Personel ve maaş kaydı oluşturma/güncelleme, bölüm bazlı personel listeleme, iletişim raporu ve yıllık maaş grafiği içeren veritabanı bağlantılı web uygulaması.",
    technologies: ["ASP.NET Web Forms", "C#", "SQL Server"],
    repository: "https://github.com/eren123H/Personel-Maas-Takip",
    image: "./projects/personel.webp",
    imageAlt:
      "Personel Maaş Takip uygulamasının kullanıcı kılavuzundan ana ekran",
    imageCaption: "Kullanıcı kılavuzundan ekran",
  },
  {
    id: "titanic",
    title: "Titanic Survival Prediction",
    category: "Makine öğrenmesi · Veri madenciliği",
    summary:
      "Eksik veri tamamlama ve kategorik kodlama uyguladığım notebook çalışması. Logistic Regression, Decision Tree ve Random Forest modellerini doğruluk ve ROC AUC ile karşılaştırdım.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Jupyter"],
    repository: "https://github.com/eren123H/titanicmodel",
    image: "./projects/titanic.webp",
    imageAlt: "Titanic notebook çıktısındaki Random Forest ROC eğrisi",
    imageCaption: "Özgün notebook çıktısı",
  },
] as const;

export const skillGroups = [
  {
    title: "Yazılım ve web",
    skills: [
      "JavaScript",
      "C#",
      "React",
      "Node.js",
      "Express",
      "ASP.NET Web Forms",
      "HTML / CSS",
    ],
    evidence: "Help Desk ve Personel Maaş Takip uygulamaları.",
  },
  {
    title: "Veri ve veritabanı",
    skills: [
      "Python",
      "SQL",
      "Pandas",
      "Scikit-learn",
      "Excel",
      "SQLite",
      "SQL Server",
      "Veritabanı tasarımı",
    ],
    evidence: "Titanic model karşılaştırması ve Milli Takım veri analizi.",
  },
  {
    title: "IT ve proje süreçleri",
    skills: [
      "Teknik destek",
      "Temel ağ/sistem bilgisi",
      "Gantt",
      "Proje başlatma belgesi",
      "Dokümantasyon",
    ],
    evidence: "Honest Holding ve SCA Social stajları.",
  },
  {
    title: "Geliştirme araçları",
    skills: ["Git / GitHub", "VS Code", "Visual Studio", "Jupyter"],
    evidence: "Web uygulamaları, veri analizi ve notebook çalışmaları.",
  },
] as const;
