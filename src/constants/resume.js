// =============================================================================
// RÉSUMÉ DATA — single source of truth for the résumé-driven sections.
// Edit values here; the UI sections render straight from this file.
// (Experience, Education, Awards, Leadership, Skills, Profile/Stats.)
// =============================================================================

/** Identity + contact used by Hero, Navbar CTA, Contact, Footer. */
export const profile = {
  name: "Akram Mujjaman Raton",

  role: "Front-End Developer",

  tagline: "Membangun aplikasi web & mobile yang responsif, cepat, dan mudah digunakan.",
  location: "Tangerang, Indonesia",
  workMode: "Freelance / Proyek · Remote",
  email: "akramraton4@gmail.com",

  // phone/address intentionally NOT stored here — keep private details out of the bundle
  availability: "Buka untuk peluang Front-End Developer",
  github: "https://github.com/Akramm-22",
  linkedin: "https://www.linkedin.com/in/akram-mujjaman-raton-6103453ba/",
  portfolio: "",
  resume: "",
};

/** Headline counters for About/Stats. */
export const stats = [
  { value: 4, suffix: "+", label: "Years building software", icon: "code" },
  { value: 24, suffix: "", label: "Projects shipped", icon: "laptop" },
  { value: 5, suffix: "", label: "Awards & finalist runs", icon: "trophy" },
  { value: 6, suffix: "", label: "Professional roles", icon: "users" },
];

// -----------------------------------------------------------------------------
// EXPERIENCE — real résumé roles (reverse-chronological as on the résumé).
// `start`/`end` are sortable "YYYY-MM" strings; `current: true` for ongoing.
// -----------------------------------------------------------------------------
export const experiences = [
  {
    id: "mudabbir",
    company: "Mudabbir (Tim Manajemen Asrama)",
    role: "Head of Mudabbir",
    type: "Organisasi",
    location: "Indonesia",
    period: "Sep 2025 – Jun 2026",
    start: "2025-09",
    end: "2026-06",
    current: false,
    icon: "users",
    stack: ["Leadership", "Operasional", "Koordinasi"],
    highlights: [
      "Memimpin operasional manajemen asrama dengan koordinasi aktivitas harian dan supervisi terstruktur untuk memperkuat disiplin, efisiensi operasional, serta kolaborasi antar penghuni.",
    ],
  },
  {
    id: "ppra-student-council",
    company: "Dewan Perwakilan Siswa (Public Relations)",
    role: "Public Relations",
    type: "Organisasi",
    location: "Indonesia",
    period: "Okt 2024 – Okt 2025",
    start: "2024-10",
    end: "2025-10",
    current: false,
    icon: "users",
    stack: ["Komunikasi", "Publikasi", "Koordinasi"],
    highlights: [
      "Mengelola komunikasi organisasi, publikasi, dan kegiatan humas untuk memperkuat keterlibatan pemangku kepentingan dan mendukung kelancaran acara sekolah.",
    ],
  },
  {
    id: "ppk-ppk",
    company: "PPK Ciampea",
    role: "District Committee Member",
    type: "Komite Daerah",
    location: "Indonesia",
    period: "Agu 2024 – Agu 2025",
    start: "2024-08",
    end: "2025-08",
    current: false,
    icon: "users",
    stack: ["Koordinasi Acara", "Komunikasi Publik", "Administrasi"],
    highlights: [
      "Berperan dalam program kegiatan seremonial dan kepemimpinan tingkat distrik dengan mengoordinasikan operasional acara, mengelola komunikasi stakeholder, serta memimpin humas untuk LPBB Piala Bupati Bogor.",
    ],
  },
  {
    id: "ppk-paskibra",
    company: "PPK Ciampea",
    role: "Purna Paskibra & District Committee Member",
    type: "Komite Daerah",
    location: "Indonesia",
    period: "Agu 2024 – Agu 2025",
    start: "2024-08",
    end: "2025-08",
    current: false,
    icon: "users",
    stack: ["Mentoring", "PR", "Kepemimpinan"],
    highlights: [
      "Mendukung program seremonial dan kepemimpinan pemuda dengan membina anggota Paskibra yang lebih junior, memimpin humas untuk LPBB Piala Bupati Bogor, serta mewakili sekolah pada kegiatan tingkat distrik dan regional.",
    ],
  },
];

// -----------------------------------------------------------------------------
// EDUCATION
// -----------------------------------------------------------------------------
export const education = [
  {
    id: "smk-ti-bazma",
    school: "SMK TI Bazma",
    degree: "Information Systems, Network & Application",
    major: "Pengembangan Software & Teknologi Web",
    location: "Indonesia",
    period: "2023 – Sekarang",
    current: true,
    coursework: [],
  },
];

// -----------------------------------------------------------------------------
// AWARDS — `icon` is an SVG key (no emoji), `projectId` links to a project.
// -----------------------------------------------------------------------------
export const awards = [
  {
    id: "ohsn-islamic-edu",
    place: "Gold Medalist",
    event: "OHSN (Olimpiade Hari Santri Nasional) – Islamic Education",
    detail: "Juara Medali Emas (2024)",
    year: "2024",
    project: "—",
    projectId: "", 
    icon: "medal",
  },
  {
    id: "ohsn-islamic-history",
    place: "Gold Medalist",
    event: "OHSN (Olimpiade Hari Santri Nasional) – Islamic History",
    detail: "Juara Medali Emas (2024)",
    year: "2024",
    project: "—",
    projectId: "",
    icon: "medal",
  },
  {
    id: "bnsp-web-dev",
    place: "Certified",
    event: "Junior Web Developer Certification – BNSP",
    detail: "Kompetensi pengembangan web, Laravel, Vue.js, dan integrasi database (2025)",
    year: "2025",
    project: "—",
    projectId: "",
    icon: "award",
  },
];

// -----------------------------------------------------------------------------
// LEADERSHIP & COMMUNITY
// -----------------------------------------------------------------------------
export const leadership = [
  {
    id: "mudabbir",
    org: "Mudabbir (Tim Manajemen Asrama)",
    role: "Head of Mudabbir",
    location: "Indonesia",
    period: "Sep 2025 – Jun 2026",
    detail:
      "Memimpin operasional manajemen asrama: koordinasi aktivitas harian dan supervisi terstruktur untuk memperkuat disiplin, efisiensi operasional, serta kolaborasi antar penghuni.",
  },
  {
    id: "ppk-ciampea",
    org: "PPK Ciampea",
    role: "District Committee Member",
    location: "Indonesia",
    period: "Agu 2024 – Agu 2025",
    detail:
      "Berperan dalam program kegiatan seremonial dan kepemimpinan tingkat distrik dengan mengoordinasikan operasional acara, mengelola komunikasi stakeholder, serta memimpin humas untuk LPBB Piala Bupati Bogor.",
  },
  {
    id: "ppk-paskibra",
    org: "PPK Ciampea",
    role: "Purna Paskibra & District Committee Member",
    location: "Indonesia",
    period: "Agu 2024 – Agu 2025",
    detail:
      "Mendukung program seremonial dan kepemimpinan pemuda: membina anggota Paskibra yang lebih junior, memimpin humas untuk LPBB Piala Bupati Bogor, serta mewakili sekolah pada kegiatan tingkat distrik dan regional.",
  },
  {
    id: "student-council-pr",
    org: "Student Council (Public Relations)",
    role: "Public Relations",
    location: "Indonesia",
    period: "Okt 2024 – Okt 2025",
    detail:
      "Mengelola komunikasi organisasi, publikasi, dan kegiatan public relations untuk memperkuat keterlibatan stakeholder dan mendukung kelancaran acara sekolah.",
  },
];

// -----------------------------------------------------------------------------
// SKILL MATRIX — mirrors résumé categories. Add a skill = add a string.
// -----------------------------------------------------------------------------
export const skillMatrix = [
  {
    id: "hard-skills",
    label: "Technical / Hard Skills",
    skills: [
      "JavaScript",
      "React.js",
      "Next.js",
      "Laravel",
      "Node.js",
      "REST API",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Prisma ORM",
      "Git / GitHub",
      "Figma",
      "Vue.js",
      ".Net",
    ],
  },
  {
    id: "soft-skills",
    label: "Soft Skills",
    skills: [
      "Leadership",
      "Communication",
      "Teamwork",
      "Problem Solving",
      "Time Management",
      "Adaptability",
    ],
  },
];

/** Spoken languages. */
export const spokenLanguages = ["Bahasa Indonesia (Native)", "English (Professional)"];

// -----------------------------------------------------------------------------
// SPEAKING — talks given. `first: true` flags a milestone; `photo` is optional
// -----------------------------------------------------------------------------
export const talks = [];

// -----------------------------------------------------------------------------
// COMMUNITY — ecosystems Ken builds and shows up in.
// -----------------------------------------------------------------------------
export const communities = [];
