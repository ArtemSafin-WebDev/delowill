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
                const formData = new FormData(callbackForm);
                console.log('Form data', new URLSearchParams(formData))
                axios
                    .post(callbackForm.action, new URLSearchParams(formData))
                    .then(() => {
                        if (typeof window.openModal === 'function') {
                            window.openModal('#callback-modal-success');
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        });
    }

    let citySelect = document.querySelector('.js-map-city-select');

    if (citySelect) {
        if (typeof citiesRating === 'undefined') {
            console.error('No cities object available');
            return;
        }

        const gisElement = document.querySelector('.geography__reviews-item:nth-child(1)').childNodes[2];
        const yandexElement = document.querySelector('.geography__reviews-item:nth-child(2)').childNodes[2];
        const googleElement = document.querySelector('.geography__reviews-item:nth-child(3)').childNodes[2];
        const reviewsBlock = document.querySelector('.geography__reviews');
        const reviewsHeading = document.querySelector('.geography__reviews-heading');
        const setRating = () => {
            const cityName = citySelect.options[citySelect.selectedIndex].text;
            console.log('Cityname', cityName);
            if (!cityName) {
                reviewsBlock.style.display = 'none';
                return;
            }
            reviewsBlock.style.display = '';
            const rating = citiesRating[cityName];

            if (!rating) {
                console.warn(`Rating for city ${cityName} not found`);
                reviewsBlock.style.display = 'none';
                return;
            }

            const gis = rating['2gis'];
            const yandex = rating['yandex'];
            const google = rating['google'];
            reviewsHeading.textContent = `Отзывы по г. ${rating.name}`;

            console.log({
                gis,
                yandex,
                google
            });

            gisElement.textContent = gis;
            yandexElement.textContent = yandex;
            googleElement.textContent = google;
        };

        setRating();

        citySelect.addEventListener('change', () => {
            setRating();
        });
    }

    const addToFavs = Array.from(document.querySelectorAll('.js-add-to-fav'));

    addToFavs.forEach(btn => {
        if (!btn.hasAttribute('data-id')) {
            console.error('Btn has no data id attribute', btn);
            return;
        }

        btn.addEventListener('click', event => {
            event.preventDefault();

            console.log('CLicke on button');
            const id = btn.getAttribute('data-id');
            axios
                .post(`/fav/toggle/{${id}}`)
                .then(() => {
                    btn.classList.toggle('active');
                })
                .catch(err => {
                    console.error(err);
                });
        });
    });
});
