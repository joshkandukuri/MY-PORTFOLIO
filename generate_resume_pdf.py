# Generate professional PDF resume for Josh Kandukuri
import os

def create_resume_pdf(filename):
    # PDF stream commands
    commands = []
    
    def rgb(r, g, b):
        return f"{r/255:.3f} {g/255:.3f} {b/255:.3f} rg"
    
    def stroke_rgb(r, g, b):
        return f"{r/255:.3f} {g/255:.3f} {b/255:.3f} RG"

    # Background header accent
    commands.append(f"{rgb(10, 25, 47)} 0 740 612 52 re f")
    commands.append(f"{stroke_rgb(0, 240, 255)} 2 w 0 740 612 0 re S")
    
    # Header Name
    commands.append(f"BT /F2 22 Tf {rgb(255, 255, 255)} 40 760 Td (JOSH KANDUKURI) Tj ET")
    commands.append(f"BT /F1 10 Tf {rgb(0, 240, 255)} 40 747 Td (B.Tech - Computer Science, Artificial Intelligence & Data Science | NIAT Kolhapur) Tj ET")

    # Contact Info Bar
    commands.append(f"BT /F1 9 Tf {rgb(71, 85, 105)} 40 720 Td (Phone: +91 9347339725   |   Email: joshkandukuri08@gmail.com   |   Location: Kolhapur, Maharashtra, India) Tj ET")
    commands.append(f"BT /F1 9 Tf {rgb(2, 132, 199)} 40 707 Td (LinkedIn: linkedin.com/in/josh-kandukuri   |   GitHub: github.com/josh-kandukuri) Tj ET")
    
    # Horizontal divider
    commands.append(f"{stroke_rgb(226, 232, 240)} 1 w 40 695 m 572 695 l S")

    # Section generator helper
    y = 675
    
    def add_section_header(title):
        nonlocal y
        commands.append(f"{stroke_rgb(2, 132, 199)} 1.5 w 40 {y-3} m 572 {y-3} l S")
        commands.append(f"BT /F2 12 Tf {rgb(2, 132, 199)} 40 {y} Td ({title.upper()}) Tj ET")
        y -= 20

    # 1. EDUCATION
    add_section_header("Education")
    commands.append(f"BT /F2 10.5 Tf {rgb(15, 23, 42)} 40 {y} Td (NIAT (NxtWave of Innovation in Advanced Technologies), Kolhapur) Tj ET")
    commands.append(f"BT /F1 9.5 Tf {rgb(100, 116, 139)} 450 {y} Td (2026 - Present | First Year) Tj ET")
    y -= 14
    commands.append(f"BT /F2 9.5 Tf {rgb(30, 41, 59)} 40 {y} Td (Bachelor of Technology: ) Tj /F1 9.5 Tf {rgb(71, 85, 105)} (Computer Science, Artificial Intelligence & Data Science) Tj ET")
    y -= 14
    commands.append(f"BT /F1 9 Tf {rgb(71, 85, 105)} 40 {y} Td (- Core Coursework: Data Structures & Algorithms, Artificial Intelligence, Linear Algebra, Python, C Programming.) Tj ET")
    y -= 13
    commands.append(f"BT /F1 9 Tf {rgb(71, 85, 105)} 40 {y} Td (- Active participant in campus tech societies, algorithm workshops, and competitive AI sprints.) Tj ET")
    y -= 22

    # 2. TECHNICAL SKILLS
    add_section_header("Technical Skills & Core Competencies")
    skills = [
        ("Programming Languages: ", "Python (Advanced), C, C++, JavaScript (ES6+), SQL, HTML5/CSS3"),
        ("AI & Machine Learning: ", "NumPy, Pandas, Scikit-Learn, Neural Network Fundamentals, Matplotlib, Data Wrangling"),
        ("Interactive & 3D Web: ", "WebGL, Three.js, Responsive Glassmorphic UI/UX, DOM Manipulation"),
        ("Developer Tools: ", "Git, GitHub, VS Code, Linux/Bash, Jupyter Notebooks, Google Colab (GPU)")
    ]
    for label, items in skills:
        commands.append(f"BT /F2 9.5 Tf {rgb(15, 23, 42)} 40 {y} Td ({label}) Tj /F1 9 Tf {rgb(71, 85, 105)} ({items}) Tj ET")
        y -= 14
    y -= 8

    # 3. FEATURED PROJECTS
    add_section_header("Featured Technical Projects")
    projects = [
        ("Neural Network Vision & Pattern Classifier", "Python, NumPy, Linear Algebra", [
            "Implemented a multilayer neural network architecture from mathematical scratch in Python.",
            "Formulated custom forward propagation, backpropagation, and loss functions (ReLU, Sigmoid, Cross-Entropy).",
            "Demonstrated dynamic pattern classification accuracy and visualized training convergence."
        ]),
        ("Data Science & Predictive Analytics Engine", "Python, Pandas, Scikit-Learn, Matplotlib", [
            "Designed end-to-end data pipeline: statistical cleaning, normalization, and outlier detection.",
            "Trained regression and classification models to generate predictive forecasts with high R2 and RMSE metrics.",
            "Generated correlation heatmaps and automated feature importance distribution graphs."
        ]),
        ("Algorithmic Graph & Pathfinding Visualizer 3D", "JavaScript, WebGL, Three.js, C++", [
            "Interactive graph search engine rendering Dijkstra, A* Heuristic, BFS, and DFS traversals in 3D space.",
            "Engineered real-time obstacle generation, weighted edge traversal, and dynamic queue optimizations."
        ])
    ]
    for p_title, p_tech, bullets in projects:
        commands.append(f"BT /F2 10 Tf {rgb(15, 23, 42)} 40 {y} Td ({p_title}) Tj /F1 8.5 Tf {rgb(2, 132, 199)} 350 {y} Td ([{p_tech}]) Tj ET")
        y -= 13
        for b in bullets:
            commands.append(f"BT /F1 8.5 Tf {rgb(71, 85, 105)} 50 {y} Td (- {b}) Tj ET")
            y -= 11.5
        y -= 4
    y -= 4

    # 4. HACKATHONS & COMPETITIVE TRACK
    add_section_header("Hackathons & Academic Achievements")
    commands.append(f"BT /F2 9.5 Tf {rgb(15, 23, 42)} 40 {y} Td (NIT Kolhapur Tech Hackathon 2026 - AI Track Leader) Tj ET")
    y -= 12
    commands.append(f"BT /F1 8.5 Tf {rgb(71, 85, 105)} 50 {y} Td (- Spearheaded team development of intelligent optimization model for campus smart energy allocation.) Tj ET")
    y -= 16
    commands.append(f"BT /F2 9.5 Tf {rgb(15, 23, 42)} 40 {y} Td (National AI & Data Science Sprint 2026) Tj ET")
    y -= 12
    commands.append(f"BT /F1 8.5 Tf {rgb(71, 85, 105)} 50 {y} Td (- Built automated data validation scripts during 36-hour sprint; finished in top national quartile.) Tj ET")
    y -= 20

    # 5. CERTIFICATIONS
    add_section_header("Certifications & Honors")
    commands.append(f"BT /F1 9 Tf {rgb(15, 23, 42)} 40 {y} Td (- AI & Data Science Specialization - NIT Kolhapur Honors Foundation Track (2026)) Tj ET")
    y -= 14
    commands.append(f"BT /F1 9 Tf {rgb(15, 23, 42)} 40 {y} Td (- Python & Data Structures Computational Problem Solving Credential (2026)) Tj ET")
    
    stream_content = "\n".join(commands).encode('latin1')
    
    # Construct standard valid PDF objects
    objects = []
    
    # 1: Catalog
    objects.append(b"<< /Type /Catalog /Pages 2 0 R >>")
    # 2: Pages
    objects.append(b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>")
    # 3: Page
    objects.append(b"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>")
    # 4: Contents
    objects.append(f"<< /Length {len(stream_content)} >>\nstream\n".encode('latin1') + stream_content + b"\nendstream")
    # 5: F1 Helvetica Regular
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>")
    # 6: F2 Helvetica Bold
    objects.append(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>")
    
    # Write file
    with open(filename, 'wb') as f:
        f.write(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
        offsets = []
        for i, obj in enumerate(objects, 1):
            offsets.append(f.tell())
            f.write(f"{i} 0 obj\n".encode('latin1'))
            f.write(obj)
            f.write(b"\nendobj\n")
        
        xref_pos = f.tell()
        f.write(f"xref\n0 {len(objects)+1}\n0000000000 65535 f \n".encode('latin1'))
        for off in offsets:
            f.write(f"{off:010d} 00000 n \n".encode('latin1'))
        
        f.write(f"trailer\n<< /Size {len(objects)+1} /Root 1 0 R >>\nstartxref\n{xref_pos}\n%%EOF\n".encode('latin1'))

if __name__ == '__main__':
    target = os.path.join(os.getcwd(), 'assets', 'Josh_Kandukuri_Resume.pdf')
    create_resume_pdf(target)
    print("Generated PDF resume at:", target, "Size:", os.path.getsize(target))
