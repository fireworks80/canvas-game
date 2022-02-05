const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const Particle = class {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.directionX = -this.directionX;
    }

    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.directionY = -this.directionY;
    }

    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
};

const paticles = (() => {
  let particleArray = [];

  const init = () => {
    particleArray = [];

    for (let i = 0; i < 100; i += 1) {
      const size = Math.random() * 20;
      const x = Math.random() * (canvas.width - size);
      const y = Math.random() * (canvas.height - size);
      const directionX = Math.random() * 0.9 - 0.4;
      const directionY = Math.random() * 0.9 - 0.3;
      const color = 'white';

      particleArray.push(new Particle(x, y, directionX, directionY, size, color));
    } // for
  };

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particleArray.forEach((particle) => {
      particle.update();
    });
    requestAnimationFrame(animate);
  };

  return {
    init,
    animate,
  };
})();

paticles.init();
paticles.animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  paticles.init();
});
