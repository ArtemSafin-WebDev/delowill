export default function format() {
    const elements = Array.from(document.querySelectorAll('.js-format'));

    elements.forEach(element => {
        const links = Array.from(element.querySelectorAll('.format__categories-link'));
        const specsTabs = Array.from(element.querySelectorAll('.format__specs-tab'));
        const sliderTabs = Array.from(element.querySelectorAll('.format__slider-tab'));

        const setActiveItem = index => {
            links.forEach(link => link.classList.remove('active'));
            specsTabs.forEach(item => item.classList.remove('active'));
            sliderTabs.forEach(item => item.classList.remove('active'));

            links[index].classList.add('active');
            specsTabs[index].classList.add('active');
            sliderTabs[index].classList.add('active');
        }

        if (links.length) {
            setActiveItem(0);
        }


        links.forEach((link, linkIndex) => {
            link.addEventListener('click', event => {
                event.preventDefault();

                setActiveItem(linkIndex);
            })
        })
        
    })
}