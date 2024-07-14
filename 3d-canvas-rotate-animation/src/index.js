const viewer = document.getElementById('viewer');
const carCanvas = document.getElementById('canvas-view');
const ctx = carCanvas.getContext('2d');

let isDragging = false;
let startX = 0;
let currentImage = 1;

// Total of images, you can put here the number of images that you need on the carousel
const totalImages = 6;

const images = [];

// Load all images
for (let i = 1; i <= totalImages; i++) {
    const img = new Image();
    img.src = `static/images/photo_${i}.jpg`;
    images.push(img);
}

// Adjuts canvas size
carCanvas.width = viewer.clientWidth;
carCanvas.height = viewer.clientHeight;

function drawCurrentImage(currentImage) {
    ctx.drawImage(currentImage, 0, 0, carCanvas.width, carCanvas.height);
}

// Draw the first image
images[0].onload = () => {
    drawCurrentImage(images[0]);
};

function startDrag(event) {
    isDragging = true;
    startX = event.clientX || event.touches[0].clientX;
    viewer.style.cursor = 'grabbing';
}

function stopDrag() {
    isDragging = false;
    viewer.style.cursor = 'grab';
}

function doDrag(event) {
    if (!isDragging) return;

    const clientX = event.clientX || event.touches[0].clientX;
    const deltaX = clientX - startX;

    if (deltaX > 10) {
        currentImage = (currentImage + 1) % totalImages;

        if (currentImage === 0) currentImage = totalImages;

        drawCurrentImage(images[currentImage - 1]);

        startX = clientX;
    } else if (deltaX < -10) {
        currentImage = (currentImage - 1 + totalImages) % totalImages;

        if (currentImage === 0) currentImage = totalImages;

        drawCurrentImage(images[currentImage - 1]);

        startX = clientX;
    }
}

viewer.addEventListener('mousedown', startDrag);
viewer.addEventListener('mouseup', stopDrag);
viewer.addEventListener('mouseleave', stopDrag);
viewer.addEventListener('mousemove', doDrag);

viewer.addEventListener('touchstart', startDrag);
viewer.addEventListener('touchend', stopDrag);
viewer.addEventListener('touchcancel', stopDrag);
viewer.addEventListener('touchmove', doDrag);