document.addEventListener('DOMContentLoaded', () => {
    let callbackForm = document.querySelector('#callback-modal-form');

    if (callbackForm) {
        callbackForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (
                $(callbackForm)
                    .parsley()
                    .isValid()
            ) {
                if (typeof window.openModal === 'function') {
                    window.openModal('#callback-modal-success')
                }
            }
        });
    }
});
