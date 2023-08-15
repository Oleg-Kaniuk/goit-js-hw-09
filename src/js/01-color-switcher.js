const startBtn = document.querySelector('button[data-start]')
// console.dir(startBtn);
const stopBtn = document.querySelector('button[data-stop]')
// console.dir(stopBtn);
const body = document.querySelector('body')
// console.dir(body);

startBtn.addEventListener('click', onClickStartBtn)
stopBtn.addEventListener('click', onClickStopBtn)

const DELAY = 1000
let intervalId = null
stopBtn.setAttribute('disabled', true);

function onClickStartBtn() {
    startBtn.setAttribute('disabled', true);
    stopBtn.removeAttribute('disabled');
    intervalId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor()
    }, DELAY);
}

function onClickStopBtn() {
    stopBtn.setAttribute('disabled', true);
    startBtn.removeAttribute('disabled');
    clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}