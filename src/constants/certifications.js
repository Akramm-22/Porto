// =============================================================================
// CERTIFICATIONS — all image files from /public/image/certifications/.
//
// To add a new certificate: add its filename + basePath to the `certFiles`
// array below; the `parseCertData` function will auto-detect the metadata.
// =============================================================================

/**
 * Parse a raw filename into structured certificate metadata.
 * The `name` is the filename stripped of extension and trailing _page-XXXX
 * or _pages-to-jpg-XXXX suffixes.
 */
const parseCertData = (filename) => {
  const name = filename
    .replace(/\.\w+$/, "")
    .replace(/(_page-\d+$|_pages-to-jpg-\d+$)/, "")
    .trim();

  // OSIS certificate
  if (/sertifikat.*osis/i.test(name) || /osis.*akram/i.test(name)) {
    return {
      name: "OSIS Organization Certificate",
      issuer: "OSIS (Organisasi Siswa Intra Sekolah)",
      description:
        "Certificate of active participation and contribution as a member of the OSIS student organization, demonstrating leadership, teamwork, and organizational commitment.",
      year: "2024",
    };
  }

  // Web Development certificate
  if (/web.*development/i.test(name) || /web.*dev/i.test(name)) {
    return {
      name: "Web Development Certification",
      issuer: "Professional Web Development Program",
      description:
        "Certification in web development fundamentals covering modern web technologies, responsive design principles, and practical development workflows for building web applications.",
      year: "2024",
    };
  }

  // Akram portfolio cert
  if (
    /Akram.*raton/i.test(name) &&
    !/cyber/i.test(name) &&
    !/OHSN/i.test(name) &&
    !/exel/i.test(name) &&
    !/piag/i.test(name) &&
    !/cert/i.test(name)
  ) {
    return {
      name: "Portfolio Completion Certificate – SMK TI Bazma",
      issuer: "SMK TI Bazma",
      description:
        "Certificate of completion for the Information Systems, Network & Application program at SMK TI Bazma, demonstrating foundational competency in software development and web technologies.",
      year: "2024",
    };
  }
  // Excel cert
  if (/sertifikat.*exel/i.test(name) || /exel/i.test(name)) {
    return {
      name: "Microsoft Excel Proficiency Certification",
      issuer: "Professional Certification Program",
      description:
        "Certification demonstrating proficiency in Microsoft Excel including data management, formulas, functions, charts, and spreadsheet analysis for professional productivity.",
      year: "2024",
    };
  }
  // Cybersecurity
  if (/cyber.*security/i.test(name) || /webinar.*cyber/i.test(name)) {
    return {
      name: "Webinar Certificate – Cyber Security Fundamentals",
      issuer: "Cyber Security Training Program",
      description:
        "Certificate of participation and completion in a cybersecurity webinar covering threat landscapes, security best practices, network defense strategies, and ethical hacking fundamentals.",
      year: "2024",
    };
  }
  // OHSN Islamic Education cert
  if (/cert.*Pendidikan.*Islam/i.test(name) || /cert.*PAI/i.test(name)) {
    return {
      name: "OHSN 2024 – Islamic Education Certificate",
      issuer: "Olimpiade Hari Santri Nasional (OHSN)",
      description:
        "Certificate of participation and achievement in the National Santri Olympiad (OHSN) for Islamic Education, demonstrating knowledge and understanding of Islamic studies.",
      year: "2024",
    };
  }
  // OHSN Islamic History cert
  if (/cert.*Sejarah.*Islam/i.test(name) || /cert.*SKI/i.test(name)) {
    return {
      name: "OHSN 2024 – Islamic History Certificate",
      issuer: "Olimpiade Hari Santri Nasional (OHSN)",
      description:
        "Certificate of participation and achievement in the National Santri Olympiad (OHSN) for Islamic History, demonstrating knowledge of Islamic historical events and cultural heritage.",
      year: "2024",
    };
  }
  // Gold Medal Islamic Education
  if (/piag.*Pendidikan.*Islam/i.test(name) || /piag.*PAI/i.test(name)) {
    return {
      name: "Gold Medal – OHSN Islamic Education",
      issuer: "Olimpiade Hari Santri Nasional (OHSN)",
      description:
        "Gold Medal award in the National Santri Olympiad for Islamic Education, recognizing outstanding academic achievement and mastery of Islamic education studies.",
      year: "2024",
    };
  }
  // Gold Medal Islamic History
  if (/piag.*Sejarah.*Islam/i.test(name) || /piag.*SKI/i.test(name)) {
    return {
      name: "Gold Medal – OHSN Islamic History",
      issuer: "Olimpiade Hari Santri Nasional (OHSN)",
      description:
        "Gold Medal award in the National Santri Olympiad for Islamic History, recognizing outstanding academic achievement and comprehensive understanding of Islamic history.",
      year: "2024",
    };
  }

  // Fallback
  return {
    name: name
      .replace(/_/g, " ")
      .replace(/-/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
    issuer: "Professional Certification",
    description:
      "Professional certification demonstrating competency in the relevant field of study.",
    year: "",
  };
};

// ---------------------------------------------------------------------------
// Certificate file list — every filename here MUST exist in
// /public/image/certifications/. These are the actual filenames on disk.
// ---------------------------------------------------------------------------
const certFiles = [
  { file: "Akram mujjaman raton_page-0001.jpg", basePath: "/image/certifications/" },
  { file: "cert_Pendidikan Agama Islam - OHSN 2024_page-0001.jpg", basePath: "/image/certifications/" },
  { file: "cert_Sejarah Kebudayaan Islam - OHSN 2024_page-0001.jpg", basePath: "/image/certifications/" },
  { file: "E-Certificate Webinar Cyber Security Akram mujjaman raton (2)_page-0001.jpg", basePath: "/image/certifications/" },
  { file: "piag_Pendidikan Agama Islam - OHSN 2024_page-0001.jpg", basePath: "/image/certifications/" },
  { file: "piag_Sejarah Kebudayaan Islam - OHSN 2024_page-0001.jpg", basePath: "/image/certifications/" },
  { file: "sertifikat exel_page-0001.jpg", basePath: "/image/certifications/" },
  { file: "SERTIFIKAT OSIS Akram_page-0001.jpg", basePath: "/image/certifications/" },
  { file: "Web Development_Akra Mujjaman Raton_pages-to-jpg-0001.jpg", basePath: "/image/certifications/" },
];

/** Normalised certificate list with resolved image paths. */
export const certifications = certFiles.map(({ file, basePath }, index) => {
  const meta = parseCertData(file);
  return {
    id: index + 1,
    name: meta.name,
    issuer: meta.issuer,
    description: meta.description,
    year: meta.year,
    isPdf: false,
    imagePath: basePath + encodeURIComponent(file),
    pdfPath: "",
    fileType: "image",
  };
});
