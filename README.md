# 🚀 Josh's 3D Interactive Futuristic Portfolio
**B.Tech in Computer Science, Artificial Intelligence & Data Science**  
**National Institute of Technology (NIT), Kolhapur, Maharashtra, India**

Welcome to your official, award-winning 3D interactive portfolio website! Built with a cinematic deep black and midnight-blue aesthetic, electric cyan, violet and blue neon lighting, and a live interactive 3D WebGL artificial neural network.

---

## 🌟 Key Highlights & Features

1. **Prominent Top-Right Profile Photograph**:
   - Framed in a premium circular glass portal with dual concentric holographic orbit rings.
   - Gentle 3D perspective mouse tilt with ambient electric-blue and violet lighting.
   - Perfectly visible on both laptop and mobile screens without scrolling.
   - Zero face distortion using CSS `object-fit: cover` and centered eye-level framing.

2. **Interactive 3D AI Neural Network**:
   - Real-time Three.js WebGL simulation featuring interconnected synaptic nodes.
   - Glowing action potential data packets streaming along neural pathways.
   - Mouse parallax, click shockwaves, and camera glide synced with page scroll.
   - High performance (60–120 FPS) with a 2D canvas fallback for all devices.

3. **All Required Sections Included**:
   - **Hero**: "Hello, I'm Josh", status pill, introduction, "Explore Projects" & "Download Resume" buttons.
   - **About Me**: Academic background at NIT Kolhapur, narrative, quick stat badges, and an interactive hacker terminal widget.
   - **Technical Skills**: Categorized into AI/ML, Data Science, Core Programming (Python, C, C++, DSA), Web/3D, and Developer Tools.
   - **Featured Projects**: Modular cards with tags, GitHub source links, and an "Add Your Next Project" helper card.
   - **Hackathons & Competitions**: Dedicated cards to record future wins, team roles, and milestones.
   - **Certificates & Credentials**: Interactive gallery with click-to-view modal dialog.
   - **Learning Journey**: Futuristic circuit-board timeline tracking your academic semesters and AI roadmap.
   - **Resume**: Interactive preview card, instant PDF download button, and printable web resume.
   - **Contact**: Direct cards for Phone (+91 9347339725), Email (joshkandukuri08@gmail.com), LinkedIn, GitHub, plus one-click copy and a direct message form.

4. **Futuristic Micro-Interactions**:
   - Synthesized high-tech audio feedback (Web Audio API) with mute/unmute control in the navigation bar.
   - Interactive toast notification system for copy actions and downloads.
   - Responsive mobile slide-out drawer menu.

---

## 📁 Project Directory Structure

```text
MY PORTFOLIO/
├── index.html                  <-- Master portfolio website
├── README.md                   <-- This comprehensive guide
├── css/
│   └── style.css               <-- Futuristic cyberpunk styling & responsive layout
├── js/
│   ├── portfolio-data.js       <-- 🛠️ YOUR DATA FILE (Edit everything here!)
│   ├── neural-canvas.js        <-- Three.js 3D WebGL Neural Network engine
│   ├── main.js                 <-- Dynamic UI rendering, tilt, sound & modals
│   └── three.min.js            <-- Standalone offline Three.js library
├── images/
│   ├── josh-profile.jpg        <-- Your real uploaded profile photograph
│   ├── projects/               <-- Project cover images & SVGs
│   │   ├── project1.svg
│   │   ├── project2.svg
│   │   └── project3.svg
│   └── certificates/           <-- Certificate preview images & SVGs
│       ├── cert1.svg
│       └── cert2.svg
└── assets/
    ├── Josh_Kandukuri_Resume.pdf <-- Official downloadable PDF resume
    └── resume.html               <-- Clean printable HTML resume
```

---

## 🛠️ How to Update Your Information

All your personal details, projects, skills, certificates, and hackathons are neatly organized in a single file:  
👉 **`js/portfolio-data.js`**

### 1. Update Profile Photo
- Put your new image in the `images/` folder (e.g., `images/my-new-photo.jpg`).
- Open `js/portfolio-data.js` and update line 33:
  ```javascript
  profilePhoto: "images/my-new-photo.jpg",
  ```
- Alternatively, simply replace `images/josh-profile.jpg` with your new photo using the exact same filename.

---

### 2. Update Contact Details (Phone, Email, LinkedIn, GitHub)
Open `js/portfolio-data.js` under section `2. CONTACT DETAILS`:
```javascript
contact: {
  phone: "9347339725",
  phoneDisplay: "+91 93473 39725",
  phoneTelLink: "tel:+919347339725",
  whatsappLink: "https://wa.me/919347339725",
  
  email: "joshkandukuri08@gmail.com",
  emailMailtoLink: "mailto:joshkandukuri08@gmail.com",
  
  linkedin: "https://www.linkedin.com/in/josh-kandukuri-051531408?...",
  linkedinDisplay: "linkedin.com/in/josh-kandukuri",
  
  github: "https://github.com/josh-kandukuri",
  githubDisplay: "github.com/josh-kandukuri",
  locationDisplay: "Kolhapur, Maharashtra, India"
}
```

---

### 3. Add Real Projects
Open `js/portfolio-data.js` under `4. PROJECTS`. To add a new project, copy and paste this template inside the `projects: [...]` array:

```javascript
{
  id: "project-4",
  title: "My AI Autonomous Robot",
  category: "Robotics & AI",
  status: "Completed",
  description: "Built a computer vision obstacle navigation model running on an embedded device.",
  image: "images/projects/my-project.jpg", // place image in images/projects/
  tags: ["Python", "OpenCV", "PyTorch", "ROS"],
  githubUrl: "https://github.com/josh-kandukuri/my-project",
  liveDemoUrl: "https://my-demo-link.com",
  highlights: [
    "Object detection accuracy of 94%",
    "Ultra-low latency 30 FPS inference",
    "Tested on physical hardware"
  ]
},
```

---

### 4. Add Real Certificates & Credentials
1. Save your certificate image/scan into `images/certificates/` (e.g. `images/certificates/coursera-ml.jpg`).
2. Open `js/portfolio-data.js` under `6. CERTIFICATES & CREDENTIALS` and add:

```javascript
{
  id: "cert-3",
  title: "Machine Learning Specialization",
  issuer: "DeepLearning.AI / Coursera",
  issueDate: "2026",
  credentialId: "DL-AI-948271",
  image: "images/certificates/coursera-ml.jpg",
  verificationUrl: "https://coursera.org/verify/YOUR_ID",
  description: "Supervised and unsupervised learning, gradient descent algorithms, and neural networks."
},
```

---

### 5. Record Real Hackathon Wins & Participation
Open `js/portfolio-data.js` under `5. HACKATHONS` and add your win:

```javascript
{
  id: "hack-3",
  name: "Smart India Hackathon (SIH)",
  edition: "2026 Grand Finale",
  role: "Lead ML Architect",
  badge: "1st Place Winner 🏆",
  badgeType: "primary", // 'primary' (cyan) or 'secondary' (violet)
  location: "New Delhi, India",
  date: "October 2026",
  summary: "Engineered an AI automated traffic prediction system with sensor fusion.",
  technologies: ["Python", "TensorFlow", "FastAPI", "React"],
  outcome: "Winner - National First Prize",
  projectLink: "https://github.com/josh-kandukuri"
},
```

---

### 6. Update Your Resume File
- To update your downloadable PDF resume, simply export your new resume as a PDF and overwrite:
  `assets/Josh_Kandukuri_Resume.pdf`
- You can also edit the printable web resume at `assets/resume.html`.

---

## 🌐 How to Deploy Your Website Online for FREE

### Option A: GitHub Pages (Recommended)
1. Create a repository on GitHub (e.g. `josh-portfolio` or `josh-kandukuri.github.io`).
2. Push this folder to GitHub.
3. In your GitHub repository, go to **Settings** > **Pages**.
4. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
5. Your portfolio will be live at `https://<your-username>.github.io` in 60 seconds!

### Option B: Vercel or Netlify (Drag and Drop)
1. Go to [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
2. Simply drag and drop the `MY PORTFOLIO` folder onto their dashboard.
3. Your site will instantly get a custom HTTPS URL!

---

© 2026 Josh Kandukuri • National Institute of Technology (NIT), Kolhapur
