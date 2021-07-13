import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function formatSlider() {
    const elements = Array.from(document.querySelectorAll('.js-format-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            watchOverflow: true,
            spaceBetween: 0,
            navigation: {
                nextEl: element.querySelector('.format__slider-button--next'),
                prevEl: element.querySelector('.format__slider-button--prev')
            }
        });
    });
}
