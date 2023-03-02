



//CONST, VAR, LET

//card
const cards = document.querySelector('.cards');
const images = document.querySelectorAll('.card__img');
const backgrounds = document.querySelectorAll('.card__bg');
const range = 40;
const calcValue = (a, b) => ((a / b) * range - range / 2).toFixed(1);
let timeout;

//different devices
const desktops = document.querySelectorAll('.desktop');
const container = document.querySelectorAll('.container')

//find out if device has mouse or touchscreen
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

//MOUSE DEVICES
if (! isTouchDevice) { 
    //console.log('Zariadenie nemá dotykovú obrazovku');

    //SLIDER
    function hide(element) {
        element.style.setProperty('left', '-100%', element.style.getPropertyPriority('left'));
    }

    function hideAll() {
        for (var i = 0; i < desktops.length; i++) {
            hide(desktops[i]);
        }
    }

    function show(element) {
        element.style.setProperty('left', '0', element.style.getPropertyPriority('left'));
    }

    function cardTogller (x, y) {
        document.getElementById(x).addEventListener('click', function () {
            hideAll();
            show(document.getElementById(y));
        }, false);
    }

    cardTogller ('link-one', 'one');
    cardTogller ('link-two', 'two');
    cardTogller ('link-three', 'three');
    cardTogller ('link-four', 'four');
    cardTogller ('link-five', 'five');

    show(document.getElementById('one'));
    
    //CHANGE ELEMENT SCALE ON HOVER
    
    container.forEach((element) => {
        element.classList.add('scaler');
    });
    
    //CARD EFFECT FOR LAPTOP/MAC/PC
    document.addEventListener('mousemove', ({ x, y }) => {
        if (timeout) {
            window.cancelAnimationFrame(timeout);
        }

        timeout = window.requestAnimationFrame(() => {
        const yValue = calcValue(y, window.innerHeight);
        const xValue = calcValue(x, window.innerWidth);

        //CONTROL CARD ROTATION
        cards.style.transform = `rotateX(${yValue}deg) rotateY(${-xValue}deg)`;

        //CONTROLL IMAGE POSITION
        [].forEach.call(images, (image) => {
            image.style.transform = `translateX(${xValue * 0.75}px) translateY(${yValue * 0.75}px)`;
        });

        //CONTROLL BACKGROUND POSITION
        [].forEach.call(backgrounds, (background) => {
            background.style.backgroundPosition = `${xValue * 2}px ${yValue * 2}px`;
        });
        });
    },
    false
    );
}

//TOUCHSCREENDEVICES
else {
    //console.log('Zariadenie ma dotykovú obrazovku');

    //GIVE SCROLL OPTION FOR TOUCHSCREENS
    desktops.forEach((element) => {
        element.style.position = 'static';
    });

    //HIDE NAVIGATION MENU
    function hideNav() {
        var nav = document.querySelector('nav');
        nav.style.display = 'none';    
    }
    hideNav();
   

    //CARD EFFECT FOR ANDROID/ *ios*
    window.addEventListener('deviceorientation',({ alpha, beta, gamma }) => {
        if (timeout) {
        window.cancelAnimationFrame(timeout);
        }

        timeout = window.requestAnimationFrame(() => {
        const yValue = calcValue(beta, 90);
        const xValue = calcValue(gamma, 180);

        cards.style.perspective = `${window.innerHeight * 2}px`;
        //cards.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;

        //CONTROLL IMAGE POSITION
        [].forEach.call(images, (image) => {
            image.style.transform = `translateX(${-xValue * 2.5}px) translateY(${-yValue * 2.5}px)`;
        });

        //CONTROLL BACKGROUND POSITION
        [].forEach.call(backgrounds, (background) => {
            background.style.backgroundPosition = `${xValue * 2}px ${yValue * 2}px`;
        });
        });
    },
    false
    );
}