const prevButton = document.querySelector('.details__pagination--prev');
const nextButton = document.querySelector('.details__pagination--next');
const items = document.querySelectorAll('.details__content--item');
const dots = document.querySelectorAll('.details__pagination--dots .dot');
const track = document.querySelector('.details__content--track');
let currentIndex = 0;

function updateSlider() {
    items.forEach((item, index) => {
        item.classList.remove('active');
        if (index === currentIndex) {
            item.classList.add('active');
        }
    });

    dots.forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentIndex) {
            dot.classList.add('active');
        }
    });

    
    track.style.transform = `translateX(-${currentIndex * 100}%)`; // Сдвигаем элементы

    prevButton.classList.toggle('disabled', currentIndex === 0);
    nextButton.classList.toggle('disabled', currentIndex === items.length - 1);
}

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
});

nextButton.addEventListener('click', () => {
    if (currentIndex < items.length - 1) {
        currentIndex++;
        updateSlider();
    }
});

updateSlider(); // Initialize slider
