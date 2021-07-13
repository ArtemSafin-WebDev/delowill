import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function goodsSlider() {
    const elements = Array.from(document.querySelectorAll('.js-goods-slider'));

    elements.forEach(element => {
        const container = element.querySelector('.swiper-container');

        new Swiper(container, {
            watchOverflow: true,
            spaceBetween: 10,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: 'row',
            navigation: {
                nextEl: element.querySelector('.goods__slider-arrow--next'),
                prevEl: element.querySelector('.goods__slider-arrow--prev')
            },
            breakpoints: {
                slidesPerView: 3,
                slidesPerColumn: 2,
                spaceBetween: 20,
            }
        });
    });
}
