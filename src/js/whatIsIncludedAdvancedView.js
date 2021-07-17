import { Swiper, Navigation } from 'swiper';

Swiper.use([Navigation]);

export default function whatIsIncludedAdvancedView() {
    const elements = Array.from(document.querySelectorAll('.js-what-is-included-advanced-view'));

    elements.forEach(element => {
        const stagesLinks = Array.from(element.querySelectorAll('.what-is-included__advanced-view-stages-link'));
        const stagesTabs = Array.from(element.querySelectorAll('.what-is-included__advanced-view-stages-tab'));
        const stageContentElements = Array.from(element.querySelectorAll('.what-is-included__advanced-stage-content'));

        const setStagesTab = index => {
            stagesLinks.forEach(link => link.classList.remove('active'));
            stagesTabs.forEach(tab => tab.classList.remove('active'));

            stagesLinks[index].classList.add('active');
            stagesTabs[index].classList.add('active');
        };

        if (stagesTabs.length) {
            setStagesTab(0);
        }

        stagesLinks.forEach((link, linkIndex) => {
            link.addEventListener('click', event => {
                event.preventDefault();
                setStagesTab(linkIndex);
            });
        });

        stageContentElements.forEach(element => {
            const navContainer = element.querySelector('.what-is-included__advanced-stage-slider-wrapper .swiper-container');

            const links = Array.from(element.querySelectorAll('.what-is-included__advanced-stage-inner-nav-card'));

            const tabs = Array.from(element.querySelectorAll('.what-is-included__advanced-stage-inner-tab'));

            const setActiveInnerTab = index => {
                links.forEach(link => link.classList.remove('active'));
                tabs.forEach(tab => tab.classList.remove('active'));

                links[index].classList.add('active');
                tabs[index].classList.add('active');
            };

            new Swiper(navContainer, {
                watchOverflow: true,
                slidesPerView: 4,
                spaceBetween: 5,
                threshold: 5,
                speed: 300,
                navigation: {
                    nextEl: element.querySelector('.what-is-included__advanced-stage-arrow--next'),
                    prevEl: element.querySelector('.what-is-included__advanced-stage-arrow--prev')
                }
            });

            if (tabs.length) {
                setActiveInnerTab(0);
            }

            links.forEach((link, linkIndex) => {
                link.addEventListener('click', event => {
                    event.preventDefault();
                    setActiveInnerTab(linkIndex);
                });
            });

            const stagesSelect = element.querySelector('.js-stages-select');
            stagesSelect.addEventListener('change', event => {
                // console.log(event.target.value);

                setActiveInnerTab(event.target.value)
            });
        });

        if (window.matchMedia('(max-width: 640px)').matches) {
            const stagesSliders = Array.from(element.querySelectorAll('.js-stages-links-slider'));

            stagesSliders.forEach(item => {
                const container = item.querySelector('.swiper-container');

                new Swiper(container, {
                    slidesPerView: 'auto',
                    spaceBetween: 5,
                    watchOverflow: true
                });
            });
        }

        if (!window.matchMedia('(max-width: 640px)').matches) {
            const calculateBarLength = () => {
                if (stagesLinks.length < 2) return;
                const firstMark = stagesLinks[0].querySelector('.what-is-included__advanced-view-stages-link-mark');
                const lastMark = stagesLinks[stagesLinks.length - 1].querySelector('.what-is-included__advanced-view-stages-link-mark');

                const distance = lastMark.getBoundingClientRect().top - firstMark.getBoundingClientRect().top;

                console.log('Distance', distance);

                firstMark.parentElement.parentElement.parentElement.style.setProperty('--bar-height', distance + 'px');
            };

            window.addEventListener('resize', () => {
                calculateBarLength();
            });

            calculateBarLength();
        }
    });
}
