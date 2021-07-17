export default function mobileReload() {
    const mq = window.matchMedia('(max-width: 640px)');

    function screenTest(e) {
        location.reload();
    }

    mq.addListener(screenTest);
}
