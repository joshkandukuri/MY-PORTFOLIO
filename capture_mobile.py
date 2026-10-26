import subprocess
import os
import sys

edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
artifact_dir = r"C:\Users\DELL LATITUDE 3410\.gemini\antigravity\brain\cd42a17d-f7c0-44c7-87c5-149ee377d8ca"
html_url = "file:///C:/Users/DELL%20LATITUDE%203410/Desktop/MY%20PORTFOLIO/index.html"

# Mobile screenshot
mobile_shot = os.path.join(artifact_dir, "preview_mobile.png")
cmd_mobile = [
    edge_path,
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    "--window-size=412,892",
    f"--screenshot={mobile_shot}",
    html_url
]
subprocess.run(cmd_mobile, capture_output=True, text=True, timeout=15)
print("Mobile exists:", os.path.exists(mobile_shot))
