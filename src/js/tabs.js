export default function tabs() {
    const elements = Array.from(document.querySelectorAll('.js-tabs'));

    elements.forEach(element => {
        const tabBtns = Array.from(element.querySelectorAll('.js-tabs-btn'));
        const tabItems = Array.from(element.querySelectorAll('.js-tabs-item'));

        const setActiveTab = index => {
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabItems.forEach(item => item.classList.remove('active'));
            tabBtns[index].classList.add('active');
            tabItems[index].classList.add('active');
        };

        setActiveTab(0);

        tabBtns.forEach((btn, btnIndex) => {
            btn.addEventListener('click', event => {
                event.preventDefault();
                setActiveTab(btnIndex);
            });
        });
    });
}
