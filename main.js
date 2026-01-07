document.addEventListener('DOMContentLoaded', () => {

  /* =========================
      CANVAS SOUL PARTICLES
  ========================= */
  const canvas = document.createElement('canvas');
  canvas.id = 'soul-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '0';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];
  const PARTICLE_COUNT = 50;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() { this.init(); }
    init() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = -Math.random() * 0.8 - 0.2;
      this.opacity = Math.random() * 0.6;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.y < 0) this.init();
    }
    draw() {
      ctx.fillStyle = `rgba(224, 224, 224, ${this.opacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
  animateParticles();


  /* =========================
      CARD PARALLAX EFFECT
  ========================= */
  // On exclut explicitement la classe .homelab ici
  document.querySelectorAll('.card:not(.homelab)').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // Exemple de fonction pour dynamiser tes projets via l'API GitHub
async function fetchGithubStats() {
    const response = await fetch('https://api.github.com/users/Xulyraide124/repos');
    const repos = await response.json();
    console.log("Projets récupérés via IA/API:", repos.length);
    // Ici tu pourrais injecter les descriptions générées par IA
}
  /* =========================
      CHARMS FILTER SYSTEM
  ========================= */
  const charms = document.querySelectorAll('.charm');
  const cards = document.querySelectorAll('.card:not(.homelab)');

  charms.forEach(charm => {
    charm.addEventListener('click', () => {
      const tech = charm.getAttribute('data-tech');

      if (charm.classList.contains('active')) {
        charm.classList.remove('active');
        cards.forEach(card => card.classList.remove('dimmed'));
        return;
      }

      charms.forEach(c => c.classList.remove('active'));
      charm.classList.add('active');

      cards.forEach(card => {
        card.getAttribute('data-tech') === tech
          ? card.classList.remove('dimmed')
          : card.classList.add('dimmed');
      });
    });
  });
});
function sendCustomMail() {
    const email = 'ulysseprevostlacaze0@gmail.com';
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    if (subject && message) {
        // On construit le lien mailto avec les paramètres encodés
        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        
        // On ouvre le client mail
        window.location.href = mailtoLink;
    } else {
        alert('Veuillez remplir le sujet et le message avant d\'envoyer.');
    }
}