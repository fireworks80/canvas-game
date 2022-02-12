const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);
const image = new Image();
const spriteWidth = 575;
const spriteHeight = 523;
let playStatus = 'idle';
let frameRate = 0;
const staggerFrame = 5;
image.src = './shadow_dog.png';

const spriteAnimations = {};
const animationStatus = [
  {
    name: 'idle',
    frames: 7,
  },
  {
    name: 'jump',
    frames: 7,
  },
  {
    name: 'fall',
    frames: 7,
  },
  {
    name: 'run',
    frames: 9,
  },
  {
    name: 'dizzy',
    frames: 11,
  },
  {
    name: 'sit',
    frames: 5,
  },
  {
    name: 'roll',
    frames: 7,
  },
  {
    name: 'bite',
    frames: 7,
  },
  {
    name: 'ko',
    frames: 12,
  },
  {
    name: 'gethit',
    frames: 4,
  },
];

const recursive = (() => {
  const _recursive = (status, idx, w, h, count, acc) =>
    count < status.frames
      ? _recursive(status, idx, w, h, count + 1, [...acc, { x: count * w, y: idx * h }])
      : { loc: acc };
  return (status, idx, spriteWidth, spriteHeight) => _recursive(status, idx, spriteWidth, spriteHeight, 0, []);
})();

animationStatus.forEach((status, idx) => {
  spriteAnimations[status.name] = recursive(status, idx, spriteWidth, spriteHeight);
});

// console.log(spriteAnimations);

const drawImage = ({ x, y }) => {
  ctx.drawImage(image, x, y, spriteWidth, spriteHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
};

const animate = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  let position = Math.floor(frameRate / staggerFrame) % spriteAnimations[playStatus].loc.length;
  let frames = spriteAnimations[playStatus].loc[position];

  drawImage(frames);

  frameRate += 1;
  requestAnimationFrame(animate);
};

const setDropBox = () => {
  const selectEl = document.querySelector('#animation');
  const fragment = new DocumentFragment();

  animationStatus.forEach((status) => {
    const optionEl = document.createElement('option');
    optionEl.value = status.name;
    optionEl.textContent = status.name;

    fragment.appendChild(optionEl);
  });

  selectEl.appendChild(fragment);

  selectEl.addEventListener('change', (e) => {
    playStatus = e.target.value;
  });
};

const init = () => {
  setDropBox();
  animate();
};
init();
image.addEventListener('load', drawImage);
