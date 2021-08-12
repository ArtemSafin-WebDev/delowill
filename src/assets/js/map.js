document.addEventListener('DOMContentLoaded', function() {
    var mapElements = Array.from(document.querySelectorAll('.js-map'));
    mapElements.forEach(mapElement => {
        if (!mapElement) return;
        ymaps.ready(initWhereToBuy);

        function initWhereToBuy() {
            console.log('Initializing points map');
            const pin = {
                iconLayout: 'default#image',
                iconImageHref: 'img/pin.svg',
                iconImageSize: [23, 23],
                iconImageOffset: [-11.5, -11.5]
            };

            const bluePin = {
                iconLayout: 'default#image',
                iconImageHref: 'img/pin-blue.svg',
                iconImageSize: [23, 23],
                iconImageOffset: [-11.5, -11.5]
            };

            const center = [55.796554, 49.104752];

          

            const mapInstance = new ymaps.Map(mapElement, {
                center: center,
                zoom: 10,
                controls: []
            });

            const zoomControl = new ymaps.control.ZoomControl({
                options: {
                    size: 'small',
                    position: {
                        right: 20,
                        bottom: 60
                    }
                }
            });
            mapInstance.controls.add(zoomControl);

            var MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
                '<div class="popover top">' +
                    `<a class="close" href="#"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 329 329"><path fill="#4659FF" d="M194.64,164.77,322.75,36.66A21.31,21.31,0,0,0,292.61,6.52L164.5,134.63,36.39,6.52A21.31,21.31,0,0,0,6.25,36.66L134.36,164.77,6.25,292.88A21.31,21.31,0,0,0,36.39,323L164.5,194.91,292.61,323a21.31,21.31,0,0,0,30.14-30.14Z" /></svg></a>` +
                    '<div class="arrow"></div>' +
                    '<div class="popover-inner">' +
                    '$[[options.contentLayout observeSize minWidth=235 maxWidth=270 maxHeight=450]]' +
                    '</div>' +
                    '</div>',
                {
                    /**
                     * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
                     * @function
                     * @name build
                     */
                    build: function() {
                        this.constructor.superclass.build.call(this);

                        this._$element = $('.popover', this.getParentElement());

                        this.applyElementOffset();

                        this._$element.find('.close').on('click', $.proxy(this.onCloseClick, this));
                    },

                    /**
                     * Удаляет содержимое макета из DOM.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
                     * @function
                     * @name clear
                     */
                    clear: function() {
                        this._$element.find('.close').off('click');

                        this.constructor.superclass.clear.call(this);
                    },

                    /**
                     * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                     * @function
                     * @name onSublayoutSizeChange
                     */
                    onSublayoutSizeChange: function() {
                        MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                        if (!this._isElement(this._$element)) {
                            return;
                        }

                        this.applyElementOffset();

                        this.events.fire('shapechange');
                    },

                    /**
                     * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                     * @function
                     * @name applyElementOffset
                     */
                    applyElementOffset: function() {
                        this._$element.css({
                            left: -(this._$element[0].offsetWidth / 2),
                            top: -(this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight)
                        });
                    },

                    /**
                     * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                     * @function
                     * @name onCloseClick
                     */
                    onCloseClick: function(e) {
                        e.preventDefault();

                        this.events.fire('userclose');
                    },

                    /**
                     * Используется для автопозиционирования (balloonAutoPan).
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
                     * @function
                     * @name getClientBounds
                     * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
                     */
                    getShape: function() {
                        if (!this._isElement(this._$element)) {
                            return MyBalloonLayout.superclass.getShape.call(this);
                        }

                        var position = this._$element.position();

                        return new ymaps.shape.Rectangle(
                            new ymaps.geometry.pixel.Rectangle([
                                [position.left, position.top],
                                [
                                    position.left + this._$element[0].offsetWidth,
                                    position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
                                ]
                            ])
                        );
                    },

                    /**
                     * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
                     * @function
                     * @private
                     * @name _isElement
                     * @param {jQuery} [element] Элемент.
                     * @returns {Boolean} Флаг наличия.
                     */
                    _isElement: function(element) {
                        return element && element[0] && element.find('.arrow')[0];
                    }
                }
            );
            // Создание вложенного макета содержимого балуна.
            var MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass('<div class="popover-content">$[properties.balloonContent]</div>');

            var objectManager = new ymaps.ObjectManager({
                clusterize: true,
                gridSize: 128,
                clusterHasBalloon: false,
                geoObjectOpenBalloonOnClick: true,
                clusterIconLayout: ymaps.templateLayoutFactory.createClass(`<div class="clusterIcon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 13">
                        <path
                            d="M14,6.5a.62.62,0,0,1-.64.59H7.64v5.32a.64.64,0,0,1-1.28,0V7.09H.64a.59.59,0,1,1,0-1.18H6.36V.59a.64.64,0,0,1,1.28,0V5.91h5.72A.62.62,0,0,1,14,6.5Z" />
                    </svg>
                </div>`),

                clusterIconShape: {
                    type: 'Circle',
                    coordinates: [19, 19],
                    radius: 19
                }
            });
            mapInstance.geoObjects.add(objectManager);

            if (pointsMapData) {
                pointsMapData.forEach(function(item) {
                    var objectToAdd = {
                        id: item.coords.join('-'),
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: item.coords
                        },
                        options: {
                            ...pin,
                            balloonShadow: false,
                            balloonLayout: MyBalloonLayout,
                            balloonContentLayout: MyBalloonContentLayout,
                            balloonPanelMaxMapArea: 0,
                            hideIconOnBalloonOpen: false,
                            balloonOffset: [0, -20]
                        },
                        properties: {
                            balloonContent: item.content,
                            balloonHeader: item.title
                        }
                    };

                    if (!item.open) {
                        objectToAdd.options = {
                            ...objectToAdd.options,
                            ...bluePin
                        };
                    }
                    objectManager.add(objectToAdd);
                });
            }

            const cityLinks = Array.from(document.querySelectorAll('.geography__city'));

            cityLinks.forEach(link => {
                link.addEventListener('click', event => {
                    event.preventDefault();

                    const coords = link.getAttribute('data-coords');

                    if (!coords.trim()) return;

                    const parsedCoords = coords.split(',').map(item => Number(item));

                    console.log('Coords', parsedCoords);

                    mapInstance.setCenter(parsedCoords);
                });
            });

            const mapCitySelect = document.querySelector('.js-map-city-select');

            if (mapCitySelect) {
                mapCitySelect.addEventListener('change', event => {
                    const coords = event.target.value;

                    if (!coords.trim()) return;

                    const parsedCoords = coords.split(',').map(item => Number(item));

                    console.log('Coords select', parsedCoords);

                    mapInstance.setCenter(parsedCoords);
                });
            }
        }
    });
});
