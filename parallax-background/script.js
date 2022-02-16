const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 700);

let gameSpeed = 10;

const bg1 = new Image();
bg1.src = './images/layer-1.png';
const bg2 = new Image();
bg2.src = './images/layer-2.png';
const bg3 = new Image();
bg3.src = './images/layer-3.png';
const bg4 = new Image();
bg4.src = './images/layer-4.png';
const bg5 = new Image();
bg5.src = './images/layer-5.png';

let x = 0;
let x2 = 2400;

const Layer = class {
  constructor(image, speedModifier) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.image = image;
    this.speedModifier = speedModifier;
    this.x2 = this.width;
    this.speed = gameSpeed * this.speedModifier;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
  update() {
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }

    this.x -= this.speed;
    this.x2 -= this.speed;

    this.draw();
  }
};

const layers = [new Layer(bg1, 0.2), new Layer(bg2, 0.4), new Layer(bg3, 0.6), new Layer(bg4, 0.8), new Layer(bg5, 1)];

const animate = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  layers.forEach((layer) => layer.update());

  // ctx.drawImage(bg5, x, 0);
  // ctx.drawImage(bg5, x2, 0);

  // if (x < -2400) x = 2400 + x2 - gameSpeed;
  // else x -= gameSpeed;

  // if (x2 < -2400) x2 = 2400 + x - gameSpeed;
  // else x2 -= gameSpeed;

  requestAnimationFrame(animate);
};

animate();
