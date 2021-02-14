function timer() {
    let deadline = '2021-03-15';

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
}

module.exports = timer;