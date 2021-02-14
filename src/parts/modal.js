function modal() {
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
}

module.exports = modal;