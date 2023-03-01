
//SLIDER

var desktops = document.querySelectorAll('.desktop');

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


//CARD

const cards = document.querySelector(".cards");
const images = document.querySelectorAll(".card__img");
const backgrounds = document.querySelectorAll(".card__bg");
const range = 40;

// const calcValue = (a, b) => (((a * 100) / b) * (range / 100) -(range / 2)).toFixed(1);
const calcValue = (a, b) => ((a / b) * range - range / 2).toFixed(1); // thanks @alice-mx

let timeout;
document.addEventListener("mousemove", ({ x, y }) => {
        if (timeout) {
            window.cancelAnimationFrame(timeout);
        }

        timeout = window.requestAnimationFrame(() => {
        const yValue = calcValue(y, window.innerHeight);
        const xValue = calcValue(x, window.innerWidth);

        cards.style.transform = `rotateX(${yValue}deg) rotateY(${-xValue}deg)`;

        [].forEach.call(images, (image) => {
            image.style.transform = `translateX(${xValue}px) translateY(${yValue}px)`;
        });

        [].forEach.call(backgrounds, (background) => {
            background.style.backgroundPosition = `${xValue * 0.45}px ${yValue * 0.45}px`;
        });
        });
    },
    false
);

window.addEventListener("deviceorientation",({ alpha, beta, gamma }) => {
        if (timeout) {
        window.cancelAnimationFrame(timeout);
        }

        timeout = window.requestAnimationFrame(() => {
        const yValue = calcValue(beta, 180);
        const xValue = calcValue(gamma, 180);

        cards.style.perspective = `${window.innerHeight * 2}px`;
        //cards.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;

        [].forEach.call(images, (image) => {
            image.style.transform = `translateX(${-xValue}px) translateY(${-yValue}px)`;
        });

        [].forEach.call(backgrounds, (background) => {
            background.style.backgroundPosition = `${-xValue * 0.45}px ${
            -yValue * 0.45
            }px`;
        });
        });
    },
    false
);