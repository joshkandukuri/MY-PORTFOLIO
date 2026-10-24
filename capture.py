import subprocess
import os
import sys

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
artifact_dir = r"C:\Users\DELL LATITUDE 3410\.gemini\antigravity\brain\cd42a17d-f7c0-44c7-87c5-149ee377d8ca"
shot_path = os.path.join(artifact_dir, "preview_hero.png")
html_url = "file:///C:/Users/DELL%20LATITUDE%203410/Desktop/MY%20PORTFOLIO/index.html"

cmd = [
    edge_path,
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    "--window-size=1280,820",
    f"--screenshot={shot_path}",
    html_url
]

print("Running screenshot command...")
res = subprocess.run(cmd, capture_output=True, text=True, timeout=15)
print("Return code:", res.returncode)
print("File exists:", os.path.exists(shot_path))
if os.path.exists(shot_path):
    print("Size:", os.path.getsize(shot_path))
