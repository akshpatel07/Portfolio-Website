/* =============================================
   AKSH B PATEL — PORTFOLIO JS
   Fixed for Three.js r128, all effects working
   ============================================= */

// ── CUSTOM CURSOR ──────────────────────────────
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = window.innerWidth / 2;
let my = window.innerHeight / 2;
let rx = mx, ry = my;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function lerpRing() {
  rx += (mx - rx) * 0.11;
  ry += (my - ry) * 0.11;
  dot.style.left  = mx + 'px';
  dot.style.top   = my + 'px';
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(lerpRing);
})();

document.querySelectorAll('a, button, .tilt').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('big'));
  el.addEventListener('mouseleave', () => ring.classList.remove('big'));
});


// ── THREE.JS HERO BACKGROUND ───────────────────
(function initThree() {
  const canvas   = document.getElementById('bg');
  const scene    = new THREE.Scene();
  const camera   = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 500);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.z = 80;

  // ── Particles (r128-safe: single color, no vertexColors) ──
  const COUNT = 3000;
  const pos   = new Float32Array(COUNT * 3);

  for (let i = 0; i < COUNT; i++) {
    // Distribute on a large sphere
    const r     = 50 + Math.random() * 80;
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = r * Math.cos(phi);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

  // Cyan particles
  const mat1 = new THREE.PointsMaterial({ size: 0.28, color: 0x00e5ff, transparent: true, opacity: 0.7 });
  const pts1  = new THREE.Points(geo, mat1);
  scene.add(pts1);

  // Violet accent layer (smaller subset)
  const pos2 = new Float32Array(800 * 3);
  for (let i = 0; i < 800; i++) {
    const r     = 40 + Math.random() * 90;
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos(2 * Math.random() - 1);
    pos2[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    pos2[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos2[i * 3 + 2] = r * Math.cos(phi);
  }
  const geo2 = new THREE.BufferGeometry();
  geo2.setAttribute('position', new THREE.BufferAttribute(pos2, 3));
  const mat2  = new THREE.PointsMaterial({ size: 0.22, color: 0x7b61ff, transparent: true, opacity: 0.55 });
  const pts2  = new THREE.Points(geo2, mat2);
  scene.add(pts2);

  // Mouse influence
  let targetRX = 0, targetRY = 0;
  document.addEventListener('mousemove', e => {
    targetRY =  (e.clientX / window.innerWidth  - 0.5) * 0.5;
    targetRX = -(e.clientY / window.innerHeight - 0.5) * 0.35;
  });

  let tick = 0;
  (function animate() {
    requestAnimationFrame(animate);
    tick += 0.0008;

    pts1.rotation.x += (targetRX - pts1.rotation.x) * 0.025;
    pts1.rotation.y += (targetRY + tick - pts1.rotation.y) * 0.025;
    pts2.rotation.x = pts1.rotation.x * 0.8;
    pts2.rotation.y = pts1.rotation.y * 1.1 + tick * 0.3;

    renderer.render(scene, camera);
  })();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();


// ── TYPING EFFECT ──────────────────────────────
(function initTyping() {
  const phrases = ['AI/ML models.', 'intelligent systems.', 'robust software.', 'real-world solutions.', 'clean pipelines.'];
  const el = document.getElementById('typed');
  let pi = 0, ci = 0, deleting = false;

  function tick() {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; setTimeout(tick, 2200); return; }
      setTimeout(tick, 72);
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 380); return; }
      setTimeout(tick, 36);
    }
  }
  setTimeout(tick, 1600);
})();


// ── SCROLL REVEAL ──────────────────────────────
(function initReveal() {
  const els = document.querySelectorAll('.reveal');

  // Use IntersectionObserver with a low threshold so items appear promptly
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target); // fire once
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
})();


// ── 3D TILT CARDS ──────────────────────────────
(function initTilt() {
  document.querySelectorAll('.tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 9}deg) rotateX(${-y * 7}deg) scale3d(1.02,1.02,1.02)`;
      card.style.transition = 'transform 0.05s';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
      card.style.transition = 'transform 0.45s cubic-bezier(.16,1,.3,1)';
    });
  });
})();


// ── GLITCH EFFECT on hero name hover ──────────────
(function initGlitch() {
  const chars = '!<>-_\\/[]{}—=+*^?#@$%';
  document.querySelectorAll('.name-line').forEach(span => {
    span.addEventListener('mouseenter', () => {
      const original = span.textContent;
      let iter = 0;
      const interval = setInterval(() => {
        span.textContent = original.split('').map((c, i) => {
          if (c === ' ') return ' ';
          if (i < iter) return original[i];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('');
        iter += 0.5;
        if (iter >= original.length) { span.textContent = original; clearInterval(interval); }
      }, 38);
    });
  });
})();


// ── ACTIVE NAV LINK on scroll ──────────────────
(function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.classList.remove('active'));
        const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => io.observe(s));
})();
