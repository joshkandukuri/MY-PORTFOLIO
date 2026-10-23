/**
 * ============================================================================
 * JOSH - PORTFOLIO CONFIGURATION & DATA SOURCE
 * ============================================================================
 * 
 * WELCOME JOSH! You can easily update ANY of your information right here.
 * Everything on your portfolio automatically updates from this file:
 * 
 * 1. Personal & Contact Details (Phone, Email, LinkedIn, GitHub)
 * 2. Profile Photo Path (e.g. 'images/josh-profile.jpg')
 * 3. About Me bio and academic information
 * 4. Technical Skills and proficiencies
 * 5. Projects (Add your new projects here)
 * 6. Hackathons & Competitions (Record your hackathon wins and participation)
 * 7. Certificates & Credentials (Add links and certificate images)
 * 8. Learning Journey & Milestones (Update your semester roadmaps)
 * 
 * ============================================================================
 */

const PORTFOLIO_DATA = {
  // -------------------------------------------------------------
  // 1. PERSONAL INFORMATION & INTRO
  // -------------------------------------------------------------
  personal: {
    name: "Josh",
    fullName: "Josh Kandukuri",
    salutation: "Hello, I'm",
    headline: "First-Year B.Tech Student in Computer Science, Artificial Intelligence & Data Science",
    institution: "National Institute of Technology (NIT), Kolhapur",
    location: "Kolhapur, Maharashtra, India",
    statusBadge: "Available for AI/ML Projects & Collaborations",
    
    // Profile photo: place your photo in images/ and set the path below
    profilePhoto: "images/josh-profile.jpg",
    profileAlt: "Josh - B.Tech CS (AI & Data Science) Student at NIT Kolhapur",

    // Resume document path
    resumeFile: "assets/Josh_Kandukuri_Resume.pdf",
    resumeViewUrl: "assets/resume.html",

    // Short introduction paragraph for hero section
    shortBio: "Passionate about building intelligent AI systems, neural network architectures, and data-driven solutions. Currently laying strong computational and mathematical foundations at NIT Kolhapur.",
    
    // Detailed narrative for the About section
    aboutNarrative: [
      "I am an enthusiastic first-year B.Tech undergraduate specializing in Computer Science, Artificial Intelligence, and Data Science at the National Institute of Technology (NIT), Kolhapur, Maharashtra.",
      "My passion lies at the intersection of mathematical reasoning, machine learning pipelines, and high-performance computing. I focus deeply on understanding algorithmic principles from the ground up—from linear algebra and discrete structures to neural network weight optimization and data transformations.",
      "Always eager to collaborate on challenging technical problems, participate in hackathons, and contribute to forward-thinking AI research and open-source initiatives."
    ],

    // Quick stats cards in About Me section
    quickStats: [
      { label: "Academic Standing", value: "1st Year B.Tech", icon: "🎓" },
      { label: "Specialization", value: "AI & Data Science", icon: "🧠" },
      { label: "Campus", value: "NIT Kolhapur", icon: "🏛️" },
      { label: "Location", value: "Maharashtra, IN", icon: "📍" }
    ]
  },

  // -------------------------------------------------------------
  // 2. CONTACT DETAILS (Editable)
  // -------------------------------------------------------------
  contact: {
    phone: "9347339725",
    phoneDisplay: "+91 93473 39725",
    phoneTelLink: "tel:+919347339725",
    whatsappLink: "https://wa.me/919347339725",
    
    email: "joshkandukuri08@gmail.com",
    emailMailtoLink: "mailto:joshkandukuri08@gmail.com",
    
    linkedin: "https://www.linkedin.com/in/josh-kandukuri-051531408?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    linkedinDisplay: "linkedin.com/in/josh-kandukuri",
    
    github: "https://github.com/josh-kandukuri",
    githubDisplay: "github.com/josh-kandukuri",

    locationDisplay: "Kolhapur, Maharashtra, India"
  },

  // -------------------------------------------------------------
  // 3. TECHNICAL SKILLS & DOMAIN EXPERTISE
  // -------------------------------------------------------------
  skills: [
    {
      category: "Artificial Intelligence & ML",
      icon: "fa-brain",
      description: "Neural architectures, predictive modeling, and model evaluation",
      items: [
        { name: "Python for AI", level: 90, tag: "Primary" },
        { name: "NumPy & Pandas", level: 88, tag: "Data Prep" },
        { name: "Scikit-Learn", level: 82, tag: "ML" },
        { name: "Neural Networks Fundamentals", level: 80, tag: "Deep Learning" },
        { name: "Matplotlib / Seaborn", level: 85, tag: "Visualization" }
      ]
    },
    {
      category: "Core Programming & CS Foundations",
      icon: "fa-code",
      description: "Algorithmic thinking, data structures, and computer science basics",
      items: [
        { name: "Python", level: 92, tag: "Advanced" },
        { name: "C Programming", level: 85, tag: "Core" },
        { name: "C++ (DSA)", level: 80, tag: "Algorithms" },
        { name: "Object-Oriented Design", level: 84, tag: "Architecture" },
        { name: "Linear Algebra & Probability", level: 86, tag: "Math" }
      ]
    },
    {
      category: "Web & Interactive 3D",
      icon: "fa-cube",
      description: "Modern digital interfaces and WebGL graphics",
      items: [
        { name: "HTML5 & Modern CSS3", level: 92, tag: "Frontend" },
        { name: "JavaScript (ES6+)", level: 85, tag: "Interactive" },
        { name: "Three.js & WebGL", level: 75, tag: "3D Graphics" },
        { name: "Responsive & Glassmorphism UI", level: 90, tag: "Design" }
      ]
    },
    {
      category: "Developer Tools & Workflow",
      icon: "fa-terminal",
      description: "Productivity tools, version control, and collaborative platforms",
      items: [
        { name: "Git & GitHub", level: 88, tag: "Version Control" },
        { name: "VS Code", level: 90, tag: "IDE" },
        { name: "Jupyter Notebooks", level: 92, tag: "Data Analysis" },
        { name: "Linux / Bash Shell", level: 78, tag: "CLI" },
        { name: "Google Colab (GPU)", level: 88, tag: "Cloud AI" }
      ]
    }
  ],

  // -------------------------------------------------------------
  // 4. PROJECTS (Editable - Add your real projects below)
  // -------------------------------------------------------------
  projects: [
    {
      id: "project-1",
      title: "Neural Network Vision & Pattern Classifier",
      category: "AI & Machine Learning",
      status: "Featured Project",
      description: "Built a multi-layer perceptron neural network from scratch in Python to classify complex numeric and visual patterns. Implemented customized forward propagation, gradient descent, and cross-entropy optimization without high-level black-box wrappers.",
      image: "images/projects/project1.svg",
      tags: ["Python", "NumPy", "Neural Networks", "Deep Learning", "Algorithms"],
      githubUrl: "https://github.com/josh-kandukuri",
      liveDemoUrl: "#",
      highlights: [
        "Vectorized matrix mathematics using NumPy",
        "Activation functions: ReLU, Sigmoid, Softmax",
        "Visualization of loss convergence over training epochs"
      ]
    },
    {
      id: "project-2",
      title: "Data Science & Predictive Analytics Engine",
      category: "Data Science",
      status: "Completed",
      description: "An end-to-end exploratory data analysis and predictive regression suite analyzing multidimensional datasets. Includes automatic missing-value imputation, outlier detection, feature correlation heatmaps, and trend forecasting.",
      image: "images/projects/project2.svg",
      tags: ["Python", "Pandas", "Scikit-Learn", "Matplotlib", "Seaborn"],
      githubUrl: "https://github.com/josh-kandukuri",
      liveDemoUrl: "#",
      highlights: [
        "Comprehensive Exploratory Data Analysis (EDA)",
        "Feature scaling & categorical encoding pipelines",
        "High evaluation accuracy with R² and RMSE metrics"
      ]
    },
    {
      id: "project-3",
      title: "Algorithmic Graph & Pathfinding Visualizer 3D",
      category: "Algorithms & 3D",
      status: "Interactive",
      description: "An interactive computational graph visualizer implementing Dijkstra's Algorithm, A* heuristic search, BFS, and DFS with real-time vertex traversal and animated path reconstruction in 3D WebGL space.",
      image: "images/projects/project3.svg",
      tags: ["JavaScript", "Three.js", "C++", "Graph Theory", "DSA"],
      githubUrl: "https://github.com/josh-kandukuri",
      liveDemoUrl: "#",
      highlights: [
        "Interactive obstacle generation and heuristic weights",
        "Real-time step-by-step traversal animation",
        "Optimized priority queue and adjacency matrix"
      ]
    }
    // TO ADD A NEW PROJECT: Copy the structure above, fill in your details, and paste it here!
  ],

  // -------------------------------------------------------------
  // 5. HACKATHONS & COMPETITIONS (Editable)
  // -------------------------------------------------------------
  hackathons: [
    {
      id: "hack-1",
      name: "NIT Kolhapur Annual Tech Hackathon",
      edition: "2026 Edition",
      role: "AI / ML Developer & Team Lead",
      badge: "Active / Upcoming",
      badgeType: "primary",
      location: "NIT Kolhapur Campus",
      date: "Spring 2026",
      summary: "Developing an AI-driven predictive intelligence model addressing smart campus resource allocation and autonomous energy optimization.",
      technologies: ["Python", "Machine Learning", "Data Modeling", "API Integration"],
      outcome: "Active Participant & Innovation Finalist Candidate",
      projectLink: "#"
    },
    {
      id: "hack-2",
      name: "National AI Innovation Sprint",
      edition: "Inter-College Challenge",
      role: "Data Analyst & Algorithm Designer",
      badge: "Participation",
      badgeType: "secondary",
      location: "Virtual / National Level",
      date: "2026",
      summary: "Competed in high-intensity 36-hour sprint creating automated data pipelines and visual dashboards for real-time sensor streams.",
      technologies: ["Python", "NumPy", "Pandas", "FastAPI"],
      outcome: "Top 25 percentile national submission rank",
      projectLink: "#"
    }
    // TO ADD A NEW HACKATHON WIN: Simply add a new object to this list!
  ],

  // -------------------------------------------------------------
  // 6. CERTIFICATES & CREDENTIALS (Editable)
  // -------------------------------------------------------------
  certificates: [
    {
      id: "cert-1",
      title: "Artificial Intelligence & Data Science Specialization",
      issuer: "NIT Kolhapur Academic Honors Track",
      issueDate: "2026",
      credentialId: "NITK-AIDS-2026-F01",
      image: "images/certificates/cert1.svg",
      verificationUrl: "#",
      description: "Comprehensive foundational mastery of algorithmic data science, probability distributions, matrix computations, and modern artificial intelligence concepts."
    },
    {
      id: "cert-2",
      title: "Python for Computational Science & Data Structures",
      issuer: "Advanced Engineering Council",
      issueDate: "2026",
      credentialId: "CS-DSA-PY-9842",
      image: "images/certificates/cert2.svg",
      verificationUrl: "#",
      description: "Rigorous coursework covering memory management, algorithm complexity (Big O), modular system design, and algorithmic problem-solving."
    }
    // TO ADD A NEW CERTIFICATE: Upload your certificate image to images/certificates/ and add its details here!
  ],

  // -------------------------------------------------------------
  // 7. LEARNING JOURNEY & ROADMAP TIMELINE
  // -------------------------------------------------------------
  timeline: [
    {
      year: "Year 1 - Semester 1 (Current)",
      stage: "Foundational Computer Science & AI Inception",
      institution: "NIT Kolhapur, Maharashtra",
      icon: "fa-university",
      status: "current",
      points: [
        "Commenced B.Tech in CS (Artificial Intelligence & Data Science).",
        "Deep diving into C programming, computational logic, and Linear Algebra.",
        "Building foundational Python scripts for statistical analysis and data visualization."
      ]
    },
    {
      year: "Year 1 - Semester 2 (Upcoming)",
      stage: "Advanced Data Structures, Algorithms & Neural Networks",
      institution: "NIT Kolhapur",
      icon: "fa-microchip",
      status: "upcoming",
      points: [
        "Mastering object-oriented principles, dynamic programming, and graph algorithms.",
        "Implementing core neural network architectures (MLP, CNN) and PyTorch pipelines.",
        "Competing in state and national collegiate hackathons."
      ]
    },
    {
      year: "Year 2 & Beyond (Roadmap)",
      stage: "Applied Machine Learning, Computer Vision & Research",
      institution: "NIT Kolhapur & AI Industry Partnerships",
      icon: "fa-rocket",
      status: "future",
      points: [
        "Specializing in Transformer models, NLP, and Deep Reinforcement Learning.",
        "Authoring academic research papers and contributing to top open-source repositories.",
        "Pursuing high-impact AI/ML research internships."
      ]
    }
  ]
};

// Export for browser and module environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PORTFOLIO_DATA;
}
