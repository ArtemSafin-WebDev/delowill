export default function vhUnits() {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty('--vh', `${vh}px`);

    let lastHeight = window.innerHeight;

    window.addEventListener('resize', () => {
        if (window.innerWidth > window.innerHeight || Math.abs(lastHeight - window.innerHeight) > 140) {
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            lastHeight = window.innerHeight;
        }
    });
}
