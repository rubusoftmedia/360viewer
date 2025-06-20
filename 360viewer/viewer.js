const viewer = document.getElementById('viewer');
const totalFrames = 360;
const preloadStep = 10;
let currentFrame = 1;
let isDragging = false;
let startX = 0;

const loadedFrames = {};
const imagePath = (i) =>
  `https://ik.imagekit.io/KULLANICI_ADI/360product/img${String(i).padStart(3, '0')}.jpg`;

function showFrame(frame) {
  viewer.style.backgroundImage = `url('${imagePath(frame)}')`;
}

function preloadFrame(frame) {
  if (!loadedFrames[frame]) {
    const img = new Image();
    img.src = imagePath(frame);
    loadedFrames[frame] = true;
  }
}

function preloadInitialFrames() {
  for (let i = 1; i <= totalFrames; i += preloadStep) {
    preloadFrame(i);
  }
  showFrame(1);
}
preloadInitialFrames();

viewer.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX;
  viewer.style.cursor = 'grabbing';
});

window.addEventListener('mouseup', () => {
  isDragging = false;
  viewer.style.cursor = 'grab';
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const delta = e.pageX - startX;
  if (Math.abs(delta) > 5) {
    const direction = delta > 0 ? 1 : -1;
    currentFrame = (currentFrame + direction) % totalFrames;
    if (currentFrame <= 0) currentFrame += totalFrames;

    preloadFrame(currentFrame);
    showFrame(currentFrame);

    startX = e.pageX;
  }
});
