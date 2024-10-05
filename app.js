let banner = document.querySelector('.banner');
let canvas = document.getElementById('dotsCanvas');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
const ctx = canvas.getContext('2d');
const dots = [];
const arrayColors = ['#eee', '#545454', '#596d91', '#bb5a68', '#696541'];

// Create dots with random properties
for (let index = 0; index < 105; index++) {
    dots.push({
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * canvas.height),
        size: Math.random() * 3 + 2,
        originalSize: Math.random() * 3 + 2,
        color: arrayColors[Math.floor(Math.random() * arrayColors.length)],
        opacity: Math.random(),
        falling: false,
        fallSpeed: Math.random() * 3 + 1
    });
}

// Function to draw dots with varying opacity (twinkling effect)
const drawDots = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.globalAlpha = dot.opacity;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalAlpha = 1; // Reset alpha
}

// Function to animate the dots (twinkling and falling)
const animateDots = () => {
    dots.forEach(dot => {
        // Twinkling effect by varying opacity
        dot.opacity += (Math.random() * 0.05 - 0.025);
        if (dot.opacity < 0.1) dot.opacity = 0.1;
        if (dot.opacity > 1) dot.opacity = 1;

        // Randomly trigger falling for some dots
        if (!dot.falling && Math.random() < 0.001) {
            dot.falling = true;
            dot.size = dot.originalSize;
        }

        // Falling effect
        if (dot.falling) {
            dot.y += dot.fallSpeed;
            dot.size -= 0.05;
            if (dot.size <= 0) {
                dot.size = dot.originalSize;
                dot.x = Math.floor(Math.random() * canvas.width);
                dot.y = -dot.size; // Reposition to fall from the top
                dot.fallSpeed = Math.random() * 3 + 1;
                dot.color = arrayColors[Math.floor(Math.random() * arrayColors.length)];
                dot.falling = false;
            }
        }
    });
}

// Main animation loop
const loop = () => {
    drawDots();
    animateDots();
    requestAnimationFrame(loop);
}

loop(); // Start the animation loop

banner.addEventListener('mousemove', (event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
    let mouse = {
        x: event.pageX - banner.getBoundingClientRect().left,
        y: event.pageY - banner.getBoundingClientRect().top
    }
    dots.forEach(dot => {
        let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        if (distance < 300) {
            ctx.strokeStyle = dot.color;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });
});

window.addEventListener('resize', () => {
    canvas.width = banner.offsetWidth;
    canvas.height = banner.offsetHeight;

    dots.length = 0;
    for (let index = 0; index < 105; index++) {
        dots.push({
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height),
            size: Math.random() * 3 + 2,
            originalSize: Math.random() * 3 + 2,
            color: arrayColors[Math.floor(Math.random() * arrayColors.length)],
            opacity: Math.random(),
            falling: false,
            fallSpeed: Math.random() * 3 + 1
        });
    }
    drawDots();
});
