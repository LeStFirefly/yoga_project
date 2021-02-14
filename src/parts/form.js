function form() {
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
}

module.exports = form;