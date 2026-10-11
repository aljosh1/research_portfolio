const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com").replace(/\/+$/, "");

export const profile = {
  name: "Professor [Full Name]",
  role: "Associate Professor of [Discipline]",
  headline:
    "Researching sustainable systems, equitable innovation, and evidence-informed policy for resilient societies.",
  summary:
    "I am an academic lecturer and researcher whose work sits at the intersection of digital systems, public policy, and societal impact. My research agenda combines rigorous methods, applied collaboration, and clear communication to support better decisions in higher education, civic institutions, and emerging technology environments.",
  location: "[City], [Country]",
  availability:
    "Open to research collaborations, postgraduate supervision enquiries, and invited speaking engagements",
  email: "first.last@university.edu",
  github: "https://scholar.google.com/",
  linkedin: "https://www.linkedin.com/",
  x: "https://www.researchgate.net/",
  siteUrl,
};

export type Project = {
  slug: string;
  number: string;
  name: string;
  category: string;
  summary: string;
  problem: string;
  solution: string;
  impact: string;
  stack: string[];
  demo: string;
  source: string;
  theme: "mint" | "lavender" | "peach";
  image: string;
  imageAlt: string;
  featured?: boolean;
};

export type Publication = {
  title: string;
  authors: string[];
  year: number;
  type: string;
  venue: string;
  status: "Published" | "Accepted" | "Under review" | "Preprint";
  doi?: string;
  link?: string;
  abstract: string;
  keywords: string[];
  featured?: boolean;
};

export const researchInterests = [
  "Digital transformation in higher education",
  "Climate resilience and public policy",
  "Human-centred AI and responsible innovation",
  "Knowledge systems and institutional change",
  "Research methods for applied social impact",
  "Open scholarship and interdisciplinary collaboration",
];

export const achievements = [
  "Principal investigator for externally funded collaborative research programmes.",
  "Secured institutional partnerships across universities, public agencies, and research networks.",
  "Mentored postgraduate researchers and supervised interdisciplinary projects.",
  "Delivered keynote lectures and invited seminars at international academic forums.",
];

export const news = [
  {
    title: "New collaborative research project launched",
    date: "January 2026",
    summary:
      "A cross-institution project investigating evidence-based resilience strategies and public sector innovation.",
  },
  {
    title: "Invited speaker at the annual policy and technology forum",
    date: "October 2025",
    summary:
      "Presented recent findings on digital transformation, human agency, and higher education systems.",
  },
  {
    title: "Postgraduate supervision opportunities now open",
    date: "August 2025",
    summary:
      "The research group is welcoming applicants working on interdisciplinary, public-interest topics.",
  },
];

export const projects: Project[] = [
  {
    slug: "urban-climate-lab",
    number: "01",
    name: "Urban Climate Adaptation Lab",
    category: "Research project · Climate resilience",
    summary:
      "A collaborative research programme examining how urban systems can adapt to climate risk through better evidence, policy design, and community engagement.",
    problem:
      "City-scale planning decisions were often made without integrated evidence on risk, social vulnerability, and institutional capacity.",
    solution:
      "The project combined spatial data analysis, stakeholder workshops, and policy review to clarify trade-offs and build a decision-support framework for resilient planning.",
    impact:
      "This work produced an evidence base for policy dialogue, institutional learning, and longer-term collaboration across public and academic partners.",
    stack: ["Urban systems", "Spatial analysis", "Policy design", "Research synthesis"],
    demo: "https://example.com",
    source: "https://example.com",
    theme: "mint",
    featured: true,
    image: "/projects/school-portal.jpg",
    imageAlt: "Research dashboard showing climate adaptation indicators and community vulnerability maps",
  },
  {
    slug: "digital-learning-ecosystem",
    number: "02",
    name: "Digital Learning Ecosystem",
    category: "Research project · Higher education",
    summary:
      "An interdisciplinary inquiry into how digital infrastructures can support pedagogical quality, inclusion, and institutional insights.",
    problem:
      "Universities increasingly deploy digital tools without enough evidence on how they change practice, access, and student experience.",
    solution:
      "The project mapped learning experiences, evaluated platform adoption, and developed a framework for evidence-informed digital transformation in academic settings.",
    impact:
      "It contributed practical recommendations for curriculum planning, staff support, and more equitable deployment of digital learning systems.",
    stack: ["Higher education", "Qualitative methods", "Learning analytics", "Institutional strategy"],
    demo: "https://example.com",
    source: "https://example.com",
    theme: "lavender",
    featured: true,
    image: "/projects/vehicle-theft_detection.jpg",
    imageAlt: "Academic dashboard showing digital learning pathways and institutional indicators",
  },
  {
    slug: "responsible-innovation-network",
    number: "03",
    name: "Responsible Innovation Network",
    category: "Research project · Public impact",
    summary:
      "A collaborative network bringing together researchers, practitioners, and policymakers to examine how emerging technologies are governed responsibly.",
    problem:
      "Many innovation agendas were moving faster than institutional readiness, creating governance gaps and uneven public benefits.",
    solution:
      "The network combined stakeholder engagement, policy analysis, and practical guidance to shape more accountable innovation pathways.",
    impact:
      "The programme created a platform for sustained collaboration, practical policy recommendations, and shared academic learning across disciplines.",
    stack: ["Governance", "Responsible AI", "Stakeholder engagement", "Policy analysis"],
    demo: "https://example.com",
    source: "https://example.com",
    theme: "peach",
    featured: true,
    image: "/projects/school-portal.jpg",
    imageAlt: "Research network overview for responsible innovation and governance activities",
  },
];

export const publications: Publication[] = [
  {
    title: "Designing Resilient Public Systems in an Era of Uncertainty",
    authors: ["[Full Name]", "A. Ibrahim", "C. Williams"],
    year: 2025,
    type: "Journal Article",
    venue: "Journal of Public Policy and Research",
    status: "Published",
    doi: "10.0000/example.2025.001",
    abstract:
      "This article examines how public institutions can build effective resilience strategies when evidence, governance, and collaboration are unevenly distributed across complex systems.",
    keywords: ["resilience", "public systems", "policy design"],
    featured: true,
  },
  {
    title: "Institutional Learning for Responsible Digital Transformation",
    authors: ["[Full Name]", "M. Okafor"],
    year: 2024,
    type: "Conference Paper",
    venue: "International Conference on Higher Education and Digital Futures",
    status: "Published",
    abstract:
      "The paper offers a multi-case analysis of how universities interpret digital transformation and how these processes shape inclusion, governance, and long-term strategy.",
    keywords: ["digital transformation", "higher education", "governance"],
    featured: true,
  },
  {
    title: "From Research to Practice: Evidence-informed Innovation in Complex Systems",
    authors: ["[Full Name]"],
    year: 2023,
    type: "Book Chapter",
    venue: "Applied Methodologies for Public-Interest Research",
    status: "Accepted",
    abstract:
      "This chapter outlines a practical framework for translating interdisciplinary research into policy and institutional action across complex systems.",
    keywords: ["innovation", "applied research", "institutional change"],
  },
];

export const skills = [
  {
    category: "Research domains",
    items: [
      "Public policy",
      "Climate resilience",
      "Higher education",
      "Responsible AI",
    ],
  },
  {
    category: "Methods",
    items: [
      "Mixed-methods research",
      "Qualitative inquiry",
      "Evidence synthesis",
      "Policy analysis",
    ],
  },
  {
    category: "Tools",
    items: ["R", "Python", "NVivo", "Power BI", "SPSS"],
  },
  {
    category: "Leadership",
    items: ["Curriculum design", "Grant development", "Team supervision", "Partnership building"],
  },
];

export const experience = [
  {
    role: "Associate Professor",
    organization: "[Department / Faculty], [University]",
    dates: "2020 — Present",
    location: "[City], [Country]",
    details: [
      "Lead a research agenda focused on public systems, institutional change, and resilient innovation.",
      "Teach advanced courses in research methods, policy analysis, and interdisciplinary design.",
      "Coordinate external partnerships and shared scholarly initiatives across academic and civic sectors.",
    ],
  },
  {
    role: "Senior Lecturer",
    organization: "[Previous Institution]",
    dates: "2014 — 2020",
    location: "[City], [Country]",
    details: [
      "Developed curriculum and supervised student research projects with an applied public-interest focus.",
      "Built collaborative programmes connecting teaching, research, and professional engagement.",
      "Led institutional initiatives to strengthen research quality and student mentoring.",
    ],
  },
];

export const education = [
  {
    qualification: "PhD in [Discipline]",
    organization: "[University]",
    dates: "2010 — 2014",
    note: "Dissertation title: [Placeholder research topic].",
  },
  {
    qualification: "MSc in [Field]",
    organization: "[University]",
    dates: "2008 — 2010",
    note: "Focused on research methods, policy analysis, and applied evidence practice.",
  },
];

export const certifications = [
  {
    name: "Academic Leadership Programme",
    issuer: "[Institution / Organisation]",
    date: "2024",
  },
  {
    name: "Research Ethics and Responsible Practice",
    issuer: "[Institution / Organisation]",
    date: "2023",
  },
  { name: "Teaching Excellence Portfolio", issuer: "[University]", date: "2022" },
];

export const learning =
  "Currently exploring interdisciplinary methods for public-interest research, equitable AI governance, and evidence-led programme evaluation.";
