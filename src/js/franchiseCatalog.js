import './resizeSensor';
import StickySidebar from 'sticky-sidebar';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
gsap.registerPlugin(ScrollTrigger);

export default function franchiseCatalog() {
    const elements = Array.from(document.querySelectorAll('.js-franchise-catalog'));

    elements.forEach(element => {
        const sidebar = element.querySelector('.franchise-catalog__sidebar');
        new StickySidebar(sidebar, {
            containerSelector: '.franchise-catalog__row',
            innerWrapperSelector: '.franchise-catalog__sidebar-inner',
            topSpacing: 40,
            bottomSpacing: 40,
            minWidth: 641
        });
    });

    const SPEED = 1.2;

    const openAccordion = element => {
        gsap.to(element, {
            height: 'auto',
            duration: SPEED,
            onComplete: () => ScrollTrigger.refresh()
        });
    };
    const closeAccordion = element => {
        gsap.to(element, {
            height: 0,
            duration: SPEED,
            onComplete: () => ScrollTrigger.refresh()
        });
    };

    document.addEventListener('click', event => {
        if (
            event.target.matches('.franchise-catalog__card-main-info-detailed-description') ||
            event.target.closest('.franchise-catalog__card-main-info-detailed-description')
        ) {
            event.preventDefault();

            const card = event.target.closest('.franchise-catalog__card');

            const content = card.querySelector('.franchise-catalog__card-detail-info');

            if (card.classList.contains('open')) {
                closeAccordion(content);
            } else {
                openAccordion(content);
            }

            card.classList.toggle('open');
        }
    });

    const openFiltersBtn = document.querySelector('.franchise-catalog__filters-menu-open');
    const filtersMenu = document.querySelector('.franchise-catalog__filters-menu');

    const closeFiltersBtn = document.querySelector('.franchise-catalog__filters-menu-back-btn');

    if (!window.matchMedia('(max-width: 640px)').matches) return;

    console.log('Hello', {
        openFiltersBtn,
        filtersMenu,
        closeFiltersBtn
    })

    if (openFiltersBtn && filtersMenu && closeFiltersBtn) {
        console.log('World')
        let filtersOpen = false;
        const openFilters = () => {
            if (filtersOpen) return;
            document.body.classList.add('mobile-filters-open');
            disableBodyScroll(filtersMenu);
            filtersOpen = true;
        };
        const closeFilters = () => {
            if (!filtersOpen) return;
            document.body.classList.remove('mobile-filters-open');
            clearAllBodyScrollLocks();
            filtersOpen = false;
        };

        openFiltersBtn.addEventListener('click', event => {
            event.preventDefault();
            openFilters();
        });

        closeFiltersBtn.addEventListener('click', event => {
            event.preventDefault();
            closeFilters();
        });
    }
}
