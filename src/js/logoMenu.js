import { primaryInput } from 'detect-it';

export default function logoMenu() {
    const elements = Array.from(document.querySelectorAll('.js-logo-menu'));

    elements.forEach(element => {
        const btn = element.querySelector('.page-header__logo-menu-burger');

        if (primaryInput === 'touch') {
            document.addEventListener('click', event => {
                const insideModal = event.target.matches('.js-logo-menu') || event.target.closest('.js-logo-menu');
                if (!insideModal) {
                    element.classList.remove('active');
                }
            })
        } else {
            element.addEventListener('mouseenter', () => {
                element.classList.add('active');
            });
            element.addEventListener('mouseleave', () => {
                element.classList.remove('active');
            });
        }

        btn.addEventListener('click', event => {
            event.preventDefault();
            element.classList.toggle('active');
        });
    });
}
