import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function successStoriesSlider() {
    const elements = Array.from(document.querySelectorAll('.js-success-stories-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            watchOverflow: true,
            spaceBetween: 30,
            slidesPerView: 'auto',
            centeredSlides: true,
            loop: true,
            loopedSlides: 5,
            speed: 500,
            centerInsufficientSlides: true,
            navigation: {
                nextEl: element.querySelector('.success-stories__slider-arrow--next'),
                prevEl: element.querySelector('.success-stories__slider-arrow--prev')
            }
        });
    });
}
