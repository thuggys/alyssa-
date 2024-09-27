// Carousel functionality
const items = document.querySelectorAll('.carousel-item');
let currentItem = 0;

function showNextItem() {
    items[currentItem].classList.remove('active');
    currentItem = (currentItem + 1) % items.length;
    items[currentItem].classList.add('active');
}

function showPreviousItem() {
    items[currentItem].classList.remove('active');
    currentItem = (currentItem - 1 + items.length) % items.length;
    items[currentItem].classList.add('active');
}

setInterval(showNextItem, 3000);

// Touch event handling for carousel
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
        // Swipe left
        showNextItem();
    }
    if (touchEndX - touchStartX > 50) {
        // Swipe right
        showPreviousItem();
    }
}

const carousel = document.querySelector('.carousel');
carousel.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

// Modal functionality
const modal = document.getElementById('loginModal');
const loginButton = document.getElementById('loginButton');
const closeButton = document.getElementsByClassName('close')[0];
const googleBtn = document.querySelector('.google-btn');

function openModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function handleGoogleLogin() {
    // This is where you would implement the actual Google login functionality
    alert('Google login functionality would be implemented here.');
    closeModal();
}

// Event listeners
loginButton.addEventListener('click', openModal);
closeButton.addEventListener('click', closeModal);
googleBtn.addEventListener('click', handleGoogleLogin);

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        closeModal();
    }
});

// Improve button interactivity for touch devices
function addTouchInteractivity(element) {
    element.addEventListener('touchstart', function() {
        this.style.transform = 'scale(1.1)';
    });

    element.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
    });
}

addTouchInteractivity(loginButton);
addTouchInteractivity(googleBtn);

// Add some interactivity to the cute button
loginButton.addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.1)';
    this.style.transition = 'transform 0.3s ease';
});

loginButton.addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
});

// Add floating hearts
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 3 + 's';
    heart.style.opacity = Math.random() * 0.5 + 0.5;
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

setInterval(createHeart, 300);

// Rainbow effect for h1
const h1 = document.querySelector('h1');
h1.classList.add('rainbow-text');

// Modify the Easter egg
let clickCount = 0;
h1.addEventListener('click', function() {
    clickCount++;
    if (clickCount === 5) {
        this.textContent = 'You found the secret! 🦄';
        this.style.fontSize = '2.5em';
        createUnicornRain();
    }
});

function createUnicornRain() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const unicorn = document.createElement('div');
            unicorn.textContent = '🦄';
            unicorn.style.position = 'fixed';
            unicorn.style.left = Math.random() * 100 + 'vw';
            unicorn.style.top = '-50px';
            unicorn.style.fontSize = '30px';
            unicorn.style.zIndex = '1000';
            document.body.appendChild(unicorn);

            const animation = unicorn.animate([
                { transform: 'translateY(0)' },
                { transform: 'translateY(' + window.innerHeight + 'px)' }
            ], {
                duration: Math.random() * 2000 + 3000,
                easing: 'linear'
            });

            animation.onfinish = () => unicorn.remove();
        }, i * 300);
    }
}

// Modify the Easter egg to work with touch events
let tapCount = 0;
let lastTap = 0;
document.querySelector('h1').addEventListener('touchend', function(e) {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 500 && tapLength > 0) {
        tapCount++;
        if (tapCount === 5) {
            this.style.color = 'rainbow';
            this.textContent = 'You found the secret! 🌈';
        }
    } else {
        tapCount = 1;
    }
    lastTap = currentTime;
});
