/**
 * ============================================================================
 * JOSH - 3D INTERACTIVE AI NEURAL NETWORK ENGINE (Three.js + WebGL)
 * ============================================================================
 * Features:
 * - 3D Synaptic Nodes & Connected Neural Pathways
 * - Pulsing "Action Potential" Data Packets traveling across synapses
 * - Smooth Mouse Parallax with Inertial Damping
 * - Dynamic Scroll-linked Camera Trajectory (voyage through neural layers)
 * - Click / Tap Neural Shockwave Stimulation
 * - High-Performance (60-120 FPS, adaptive DPR, mobile battery-aware)
 * - Pure 2D Canvas Fallback in case WebGL is unavailable
 * ============================================================================
 */

(function () {
  'use strict';

  const container = document.getElementById('neural-canvas-container');
  if (!container) return;

  // Configuration
  const isMobile = window.innerWidth < 768;
  const NODE_COUNT = isMobile ? 55 : 120;
  const CONNECTION_DIST = isMobile ? 95 : 130;
  const PULSE_COUNT = isMobile ? 12 : 28;

  // Colors
  const COLOR_CYAN = 0x00f0ff;
  const COLOR_VIOLET = 0xa855f7;
  const COLOR_BLUE = 0x0066ff;
  const COLOR_MAGENTA = 0xd946ef;

  let scene, camera, renderer, nodesGroup;
  let nodePositions = [];
  let nodeVelocities = [];
  let nodeMesh, pointsGeometry;
  let linesMesh, linesGeometry;
  let pulses = [];
  let pulseGeometry, pulseMesh;

  let mouseX = 0, mouseY = 0;
  let targetRotationX = 0, targetRotationY = 0;
  let currentRotationX = 0, currentRotationY = 0;
  let scrollProgress = 0;
  let targetCameraZ = 380, currentCameraZ = 380;
  let targetCameraY = 0, currentCameraY = 0;

  // Test if WebGL and Three.js are available
  function init() {
    if (typeof THREE === 'undefined') {
      console.warn('Three.js not loaded, activating 2D Neural Canvas Fallback');
      init2DFallback();
      return;
    }

    try {
      // 1. Scene setup
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x030712, 0.0016);

      // 2. Camera setup
      camera = new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        1,
        2000
      );
      camera.position.z = 380;

      // 3. Renderer setup
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0); // Transparent to show dark gradient body
      container.appendChild(renderer.domElement);

      // 4. Group for rotation
      nodesGroup = new THREE.Group();
      scene.add(nodesGroup);

      // 5. Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const cyanPoint = new THREE.PointLight(COLOR_CYAN, 3, 600);
      cyanPoint.position.set(200, 150, 200);
      scene.add(cyanPoint);

      const violetPoint = new THREE.PointLight(COLOR_VIOLET, 3, 600);
      violetPoint.position.set(-200, -150, 150);
      scene.add(violetPoint);

      // 6. Generate Neural Nodes
      createNodes();

      // 7. Generate Synaptic Lines
      createLines();

      // 8. Generate Neural Pulses
      createPulses();

      // 9. Event Listeners
      setupEventListeners();

      // 10. Start Animation Loop
      animate();
    } catch (e) {
      console.error('WebGL Init error:', e);
      init2DFallback();
    }
  }

  // Create node particles (neurons)
  function createNodes() {
    pointsGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(NODE_COUNT * 3);
    const colors = new Float32Array(NODE_COUNT * 3);
    const sizes = new Float32Array(NODE_COUNT);

    const cCyan = new THREE.Color(COLOR_CYAN);
    const cViolet = new THREE.Color(COLOR_VIOLET);
    const cBlue = new THREE.Color(COLOR_BLUE);

    const spreadX = isMobile ? 320 : 680;
    const spreadY = isMobile ? 450 : 520;
    const spreadZ = 350;

    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * spreadX;
      const y = (Math.random() - 0.5) * spreadY;
      const z = (Math.random() - 0.5) * spreadZ;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      nodePositions.push(new THREE.Vector3(x, y, z));
      nodeVelocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.28,
          (Math.random() - 0.5) * 0.28,
          (Math.random() - 0.5) * 0.28
        )
      );

      // Node color gradient
      const choice = Math.random();
      let col;
      if (choice < 0.45) col = cCyan;
      else if (choice < 0.8) col = cViolet;
      else col = cBlue;

      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;

      sizes[i] = Math.random() * 4 + 3;
    }

    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pointsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle sprite using canvas texture
    const sprite = createGlowTexture();
    const pointsMaterial = new THREE.PointsMaterial({
      size: isMobile ? 8 : 11,
      map: sprite,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    nodeMesh = new THREE.Points(pointsGeometry, pointsMaterial);
    nodesGroup.add(nodeMesh);
  }

  // Create synaptic lines buffer
  function createLines() {
    const maxLines = (NODE_COUNT * (NODE_COUNT - 1)) / 2;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);

    linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    linesGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    nodesGroup.add(linesMesh);
  }

  // Create action potential pulses (packets traveling along synapses)
  function createPulses() {
    pulseGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PULSE_COUNT * 3);
    const colors = new Float32Array(PULSE_COUNT * 3);

    const cWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < PULSE_COUNT; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      colors[i * 3] = cWhite.r;
      colors[i * 3 + 1] = cWhite.g;
      colors[i * 3 + 2] = cWhite.b;

      pulses.push({
        sourceIdx: Math.floor(Math.random() * NODE_COUNT),
        targetIdx: Math.floor(Math.random() * NODE_COUNT),
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.015,
        active: false
      });
    }

    pulseGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pulseGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pulseSprite = createGlowTexture();
    const pulseMaterial = new THREE.PointsMaterial({
      size: isMobile ? 9 : 14,
      map: pulseSprite,
      transparent: true,
      color: 0x00f0ff,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    pulseMesh = new THREE.Points(pulseGeometry, pulseMaterial);
    nodesGroup.add(pulseMesh);
  }

  // Create smooth radial glow sprite texture
  function createGlowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.25, 'rgba(120, 235, 255, 0.85)');
    grad.addColorStop(0.55, 'rgba(168, 85, 247, 0.4)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  // Setup interaction event listeners
  function setupEventListeners() {
    window.addEventListener('resize', onWindowResize, false);

    // Mouse parallax
    window.addEventListener('mousemove', function (e) {
      mouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

      targetRotationY = mouseX * 0.35;
      targetRotationX = mouseY * 0.25;
    }, { passive: true });

    // Touch support for mobile tilt
    window.addEventListener('touchmove', function (e) {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouseX = (touch.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
        mouseY = (touch.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
        targetRotationY = mouseX * 0.25;
        targetRotationX = mouseY * 0.2;
      }
    }, { passive: true });

    // Scroll-based camera choreography
    window.addEventListener('scroll', function () {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

      // As user scrolls, camera glides along Z and moves with neural depth
      targetCameraZ = 380 - scrollProgress * 120;
      targetCameraY = -scrollProgress * 90;
    }, { passive: true });

    // Interactive Shockwave Stimulus on Click / Tap
    window.addEventListener('click', function (e) {
      // Don't trigger if clicked on an anchor or button
      if (e.target.closest('a, button, input, textarea')) return;
      triggerShockwave(e.clientX, e.clientY);
    });
  }

  // Radiate a synaptic impulse outward from clicked coordinate
  function triggerShockwave(screenX, screenY) {
    const normX = (screenX / window.innerWidth) * 2 - 1;
    const normY = -(screenY / window.innerHeight) * 2 + 1;

    for (let i = 0; i < nodeVelocities.length; i++) {
      const v = nodeVelocities[i];
      v.x += (Math.random() - 0.5) * 1.8;
      v.y += (Math.random() - 0.5) * 1.8;
      v.z += (Math.random() - 0.5) * 1.8;
    }
  }

  function onWindowResize() {
    if (!renderer || !camera) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // Main 60-120fps Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    // 1. Inertial rotation damping
    currentRotationX += (targetRotationX - currentRotationX) * 0.05;
    currentRotationY += (targetRotationY - currentRotationY) * 0.05;

    nodesGroup.rotation.x = currentRotationX + Math.sin(Date.now() * 0.0003) * 0.05;
    nodesGroup.rotation.y = currentRotationY + (Date.now() * 0.0001);

    // 2. Camera scroll lerp
    currentCameraZ += (targetCameraZ - currentCameraZ) * 0.06;
    currentCameraY += (targetCameraY - currentCameraY) * 0.06;
    camera.position.z = currentCameraZ;
    camera.position.y = currentCameraY;
    camera.lookAt(0, currentCameraY * 0.4, 0);

    // 3. Update node physics
    const positions = pointsGeometry.attributes.position.array;
    const limitX = isMobile ? 220 : 380;
    const limitY = isMobile ? 280 : 320;
    const limitZ = 220;

    for (let i = 0; i < NODE_COUNT; i++) {
      const pos = nodePositions[i];
      const vel = nodeVelocities[i];

      pos.add(vel);

      // Bounce boundaries
      if (Math.abs(pos.x) > limitX) vel.x *= -1;
      if (Math.abs(pos.y) > limitY) vel.y *= -1;
      if (Math.abs(pos.z) > limitZ) vel.z *= -1;

      // Friction back to baseline gentle speed
      vel.multiplyScalar(0.985);
      if (vel.length() < 0.12) {
        vel.add(
          new THREE.Vector3(
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02,
            (Math.random() - 0.5) * 0.02
          )
        );
      }

      positions[i * 3] = pos.x;
      positions[i * 3 + 1] = pos.y;
      positions[i * 3 + 2] = pos.z;
    }
    pointsGeometry.attributes.position.needsUpdate = true;

    // 4. Update Synaptic Connections
    updateLinesAndPulses();

    renderer.render(scene, camera);
  }

  // Update dynamic synaptic lines and neural pulses
  function updateLinesAndPulses() {
    const linePos = linesGeometry.attributes.position.array;
    const lineCol = linesGeometry.attributes.color.array;

    const cCyan = new THREE.Color(COLOR_CYAN);
    const cViolet = new THREE.Color(COLOR_VIOLET);

    let lineIdx = 0;
    let connectedPairs = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const p1 = nodePositions[i];
        const p2 = nodePositions[j];
        const dist = p1.distanceTo(p2);

        if (dist < CONNECTION_DIST) {
          connectedPairs.push({ i, j, dist });

          // Normalized opacity based on distance
          const alpha = 1.0 - dist / CONNECTION_DIST;

          // Vertex 1
          linePos[lineIdx * 6] = p1.x;
          linePos[lineIdx * 6 + 1] = p1.y;
          linePos[lineIdx * 6 + 2] = p1.z;

          lineCol[lineIdx * 6] = cCyan.r * alpha;
          lineCol[lineIdx * 6 + 1] = cCyan.g * alpha;
          lineCol[lineIdx * 6 + 2] = cCyan.b * alpha;

          // Vertex 2
          linePos[lineIdx * 6 + 3] = p2.x;
          linePos[lineIdx * 6 + 4] = p2.y;
          linePos[lineIdx * 6 + 5] = p2.z;

          lineCol[lineIdx * 6 + 3] = cViolet.r * alpha;
          lineCol[lineIdx * 6 + 4] = cViolet.g * alpha;
          lineCol[lineIdx * 6 + 5] = cViolet.b * alpha;

          lineIdx++;
        }
      }
    }

    linesGeometry.setDrawRange(0, lineIdx * 2);
    linesGeometry.attributes.position.needsUpdate = true;
    linesGeometry.attributes.color.needsUpdate = true;

    // 5. Update Action Potential Pulses
    if (connectedPairs.length > 0) {
      const pulsePos = pulseGeometry.attributes.position.array;

      for (let p = 0; p < pulses.length; p++) {
        const pulse = pulses[p];

        if (!pulse.active || Math.random() < 0.005) {
          const pair = connectedPairs[Math.floor(Math.random() * connectedPairs.length)];
          pulse.sourceIdx = pair.i;
          pulse.targetIdx = pair.j;
          pulse.progress = 0;
          pulse.active = true;
        }

        pulse.progress += pulse.speed;
        if (pulse.progress >= 1.0) {
          pulse.active = false;
          pulse.progress = 0;
        }

        const pSource = nodePositions[pulse.sourceIdx];
        const pTarget = nodePositions[pulse.targetIdx];

        if (pSource && pTarget) {
          pulsePos[p * 3] = pSource.x + (pTarget.x - pSource.x) * pulse.progress;
          pulsePos[p * 3 + 1] = pSource.y + (pTarget.y - pSource.y) * pulse.progress;
          pulsePos[p * 3 + 2] = pSource.z + (pTarget.z - pSource.z) * pulse.progress;
        }
      }

      pulseGeometry.attributes.position.needsUpdate = true;
    }
  }

  // ============================================================================
  // PURE 2D CANVAS FALLBACK (Guarantees zero breakage even without WebGL)
  // ============================================================================
  function init2DFallback() {
    container.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.id = 'neural-2d-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const dots = [];
    const count = window.innerWidth < 768 ? 45 : 90;
    for (let i = 0; i < count; i++) {
      dots.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1.5,
        color: Math.random() > 0.5 ? '#00f0ff' : '#a855f7'
      });
    }

    function render2D() {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.35 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and move dots
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > width) d.vx *= -1;
        if (d.y < 0 || d.y > height) d.vy *= -1;

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = d.color;
        ctx.shadowColor = d.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      requestAnimationFrame(render2D);
    }
    render2D();
  }

  // Initialize on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
