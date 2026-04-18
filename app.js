// ========== CUSTOM CURSOR ==========
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';
});

(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .tilt-card').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
});


// ========== THREE.JS HERO BACKGROUND ==========
const scene    = new THREE.Scene();
const camera   = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg'), alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.z = 60;

// Particles
const count = 2500;
const positions = new Float32Array(count * 3);
const colors    = new Float32Array(count * 3);
const palette   = [
  new THREE.Color('#00e5ff'),
  new THREE.Color('#7b61ff'),
  new THREE.Color('#ffffff'),
];
for (let i = 0; i < count; i++) {
  const r = 60 + Math.random() * 60;
  const theta = Math.random() * Math.PI * 2;
  const phi   = Math.acos(2 * Math.random() - 1);
  positions[i*3]   = r * Math.sin(phi) * Math.cos(theta);
  positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
  positions[i*3+2] = r * Math.cos(phi);
  const col = palette[Math.floor(Math.random() * palette.length)];
  colors[i*3]   = col.r;
  colors[i*3+1] = col.g;
  colors[i*3+2] = col.b;
}
const geo = new THREE.BufferGeometry();
geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
const mat = new THREE.PointsMaterial({ size: 0.22, vertexColors: true, transparent: true, opacity: 0.75 });
const points = new THREE.Points(geo, mat);
scene.add(points);

// Mouse-reactive rotation
let targetRX = 0, targetRY = 0;
document.addEventListener('mousemove', e => {
  targetRY = (e.clientX / window.innerWidth  - 0.5) * 0.4;
  targetRX = (e.clientY / window.innerHeight - 0.5) * 0.3;
});

let clock = 0;
function animate() {
  requestAnimationFrame(animate);
  clock += 0.001;
  points.rotation.x += (targetRX - points.rotation.x) * 0.03;
  points.rotation.y += (targetRY + clock - points.rotation.y) * 0.03;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


// ========== TYPING EFFECT ==========
const phrases = [
  'AI/ML models.',
  'intelligent systems.',
  'robust software.',
  'clean pipelines.',
  'real-world solutions.',
];
let pIdx = 0, cIdx = 0, deleting = false;
const el = document.getElementById('typed-text');

function type() {
  const phrase = phrases[pIdx];
  if (!deleting) {
    el.textContent = phrase.slice(0, ++cIdx);
    if (cIdx === phrase.length) {
      deleting = true;
      setTimeout(type, 2000);
      return;
    }
    setTimeout(type, 70);
  } else {
    el.textContent = phrase.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
      setTimeout(type, 400);
      return;
    }
    setTimeout(type, 35);
  }
}
setTimeout(type, 1500);


// ========== SCROLL REVEAL ==========
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// ========== 3D TILT CARDS ==========
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) scale3d(1.02,1.02,1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale3d(1,1,1)';
  });
});


// ========== ACTIVE NAV HIGHLIGHT ==========
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.style.color = 'var(--accent)';
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => navObs.observe(s));


// ========== GLITCH TITLE on hover ==========
const heroName = document.querySelector('.hero-name');
const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
function randomChar() { return glitchChars[Math.floor(Math.random() * glitchChars.length)]; }

heroName && heroName.addEventListener('mouseenter', () => {
  const spans = heroName.querySelectorAll('span');
  spans.forEach(span => {
    const original = span.textContent;
    let iter = 0;
    const interval = setInterval(() => {
      span.textContent = original.split('').map((c, i) => {
        if (c === ' ') return ' ';
        if (i < iter) return original[i];
        return randomChar();
      }).join('');
      if (iter >= original.length) { span.textContent = original; clearInterval(interval); }
      iter += 0.4;
    }, 35);
  });
});
