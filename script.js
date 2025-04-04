// Tile Expand on Hover
document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('mouseover', () => {
        tile.querySelector('.tile-secondary').style.display = 'block';
    });
    tile.addEventListener('mouseout', () => {
        tile.querySelector('.tile-secondary').style.display = 'none';
    });
});

// Animated Counter on Scroll
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        counter.counterAlreadyFired = false;
        counter.counterSpeed = parseInt(counter.dataset.counterTime) / 45;
        counter.counterTarget = parseInt(counter.innerText);
        counter.counterCount = 0;
        counter.counterStep = counter.counterTarget / counter.counterSpeed;

        function updateCounter() {
            if (counter.counterCount < counter.counterTarget) {
                counter.counterCount += counter.counterStep;
                counter.innerText = Math.ceil(counter.counterCount);
                setTimeout(updateCounter, counter.counterSpeed);
            }
        }

        function isElementVisible(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientHeight)
            );
        }

        function handleScroll() {
            if (!counter.counterAlreadyFired && isElementVisible(counter)) {
                updateCounter();
                counter.counterAlreadyFired = true;
            }
        }

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
    });
});

// Testimonial Carousel
const slides = document.querySelector('.slider__slides');
const prevButton = document.querySelector('.slider__button--prev');
const nextButton = document.querySelector('.slider__button--next');
let counter = 1;
const slideWidth = slides.children[0].offsetWidth;

nextButton.addEventListener('click', () => {
    counter++;
    slides.style.transform = `translateX(-${slideWidth * counter}px)`;
});
prevButton.addEventListener('click', () => {
    counter--;
    slides.style.transform = `translateX(-${slideWidth * counter}px)`;
});