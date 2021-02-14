window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    // табы

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {

                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // таймер

    let deadline = '2021-02-04';

    function getTimeRemaining(endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor(t / 1000 / 60 / 60);

        if (t <= 0) {
            seconds = 0;
            minutes = 0;
            hours = 0;
        }

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endTime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endTime);

            function classicClock(a) {
                if (a < 10) {
                    return '0' + a;
                } else {
                    return a;
                }
            }
            hours.textContent = classicClock(t.hours);
            minutes.textContent = classicClock(t.minutes);
            seconds.textContent = classicClock(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('timer', deadline);

    // модальное окно

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        description = document.querySelectorAll('.description-btn');

    more.addEventListener('click', callOverlay);

    for (let i = 0; i < description.length; i++) {
        description[i].addEventListener('click', callOverlay);
    }

    function callOverlay() {
        overlay.style.display = 'block';
        this.classList.add = '.more-splash';
        document.body.style.overflow = 'hidden';
    }

    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove = '.more-splash';
        document.body.style.overflow = '';
    });

    // отправка формы

    let message = {
        loading: 'Загрузка...',
        sucess: 'Спасибо! Скоро мы с Вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        function promiseForm() {
            return new Promise((resolve, reject) => {
                let request = new XMLHttpRequest();

                request.open('POST', 'server.php');
                request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                let formData = new FormData(form);

                let obj = {};
                formData.forEach(function (value, key) {
                    obj[key] = value;
                });

                let json = JSON.stringify(obj);

                request.send(json);

                request.onload = () => {
                    if (request.readyState === 4 || request.status == 200) {
                        resolve('Спасибо! Скоро мы с Вами свяжемся!');
                    } else {
                        reject('Что-то пошло не так!');
                    }
                };

            });
        }

        promiseForm()
            .then((message) => statusMessage.innerHTML = message)
            .catch((error) => statusMessage.innerHTML = error)
            .finally(() => console.log('Запрос обработан'));

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });

    // слайдер

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n)
    }

    prev.addEventListener('click', function () {
        plusSlides(-1);
    });

    next.addEventListener('click', function () {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function (event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });

    //калькулятор

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.textContent = 0;

    persons.addEventListener('input', function () {
        personsSum = +this.value;
        total = (daysSum + personsSum) * 2000;

        if (restDays.value == '' || persons.value == '') {
            totalValue.textContent = 0;
        } else {
            totalValue.textContent = total;
        }
    });

    restDays.addEventListener('input', function () {
        daysSum = +this.value;
        total = (daysSum + personsSum) * 2000;

        if (persons.value == '' || restDays.value == '') {
            totalValue.textContent = 0;
        } else {
            totalValue.textContent = total;
        }
    });

    place.addEventListener('change', function () {
        if (restDays.value == '' || persons.value == '') {
            totalValue.textContent = 0;
        } else {
            let a = total;
            totalValue.textContent = a * this.options[this.selectedIndex].value;
        }
    });
});