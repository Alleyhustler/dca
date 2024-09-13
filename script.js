const cow = document.getElementById('cow');
const popup = document.getElementById('popup');
let dragging = false;
let offsetX, offsetY;
const fallSpeed = 5;
const waterContainer = document.querySelector('.water');
const waterLevel = waterContainer.offsetTop + waterContainer.offsetHeight;

cow.addEventListener('mousedown', (e) => {
    if (popup.style.display !== 'none') {
        popup.style.display = 'none'; // Remove the popup text
    }
    dragging = true;
    cow.style.transition = 'none'; // Disable transitions during dragging
    offsetX = e.clientX - cow.offsetLeft;
    offsetY = e.clientY - cow.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (dragging) {
        cow.style.left = `${e.clientX - offsetX}px`;
        cow.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener('mouseup', () => {
    if (dragging) {
        dragging = false;
        if (parseFloat(cow.style.top) > waterLevel - cow.clientHeight) {
            cowFall();
        }
    }
});

function cowFall() {
    cow.style.transition = 'top 1s ease-in';
    cow.style.top = `${waterLevel - cow.clientHeight}px`;
    createRipple(cow.offsetLeft + cow.clientWidth / 2, waterLevel);
}

setInterval(() => {
    if (!dragging) {
        let currentTop = parseFloat(cow.style.top);
        if (currentTop < waterLevel - cow.clientHeight) {
            cow.style.top = `${currentTop + fallSpeed}px`;
        }
    }
}, 30);

function createRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.left = `${x - 50}px`;
    ripple.style.top = `${y - 50}px`;
    document.querySelector('.container').appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 1000);
}

// Show popup initially
setTimeout(() => {
    popup.classList.add('hidden');
}, 3000); // Adjust time as needed

// Play background sound on user interaction
document.addEventListener('click', () => {
    backgroundSound.play();
});

backgroundSound.volume = 1; // Set volume to max
