export default function logoMenu() {
    const elements = Array.from(document.querySelectorAll('.js-logo-menu'));

    elements.forEach(element => {
        const btn = element.querySelector('.page-header__logo-menu-burger');

        element.addEventListener('mouseenter', () => {
            element.classList.add('active');
        })
        element.addEventListener('mouseleave', () => {
            element.classList.remove('active');
        });

        btn.addEventListener('click', event => {
            event.preventDefault();
            element.classList.toggle('active');
        })
    })
}