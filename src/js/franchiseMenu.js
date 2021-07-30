import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function franchiseMenu() {
    const elements = Array.from(document.querySelectorAll('.js-franchise-navigation'));

    elements.forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            start: 'top top',
            endTrigger: 'html',
            end: 'bottom top',
            pin: true,
            markers: false,
            pinSpacing: false,
            toggleClass: 'pinned'
        });
    });
}
