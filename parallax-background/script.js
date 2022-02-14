const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);

let gameSpeed = 5;

const backgroundLayer1 = new Image();
backgroundLayer1.src = './images/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = './images/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = './images/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = './images/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = './images/layer-5.png';

const Layer = class {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
  update() {
    this.speed = gameSpeed * this.speedModifier;

    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }

    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
    this.draw();
  }
};

const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);

const gameObject = [layer1, layer2, layer3, layer4, layer5];

const animate = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  gameObject.forEach((object) => object.update());
  requestAnimationFrame(animate);
};

animate();

const slider = document.querySelector('.slider-wrap');
slider.addEventListener('input', (e) => {
  console.log(e.target.tagName);
  if (e.target.tagName !== 'INPUT') return;
  const value = e.target.value;
  slider.querySelector('.current-speed').textContent = value;
  gameSpeed = value;
});