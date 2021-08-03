export default function showMoreBtns() {
    const elements = Array.from(document.querySelectorAll('.js-show-more'));

    elements.forEach(element => {
        const showMoreContainer = element.closest('.js-show-more-container');
        if (!showMoreContainer) return;

        element.addEventListener('click', event => {
            event.preventDefault();

            showMoreContainer.classList.toggle('more-shown');
        })
    })
}