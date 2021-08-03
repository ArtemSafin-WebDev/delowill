import './resizeSensor';
import StickySidebar from 'sticky-sidebar';

export default function articles() {
    const elements = Array.from(document.querySelectorAll('.js-articles'));

    elements.forEach(element => {
        const sidebar = element.querySelector('.articles__sidebar');
        new StickySidebar(sidebar, {
            containerSelector: '.articles__row',
            innerWrapperSelector: '.articles__sidebar-inner',
            topSpacing: 40,
            bottomSpacing: 40,
            minWidth: 641
        });
    });

}
