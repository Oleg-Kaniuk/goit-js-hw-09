// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

import { Report } from 'notiflix/build/notiflix-report-aio';


const DELAY = 1000;

document.body.style.backgroundColor = 'orange';
document.body.style.color = 'black';

let selectedDate = null;
let currentDate = null;
let intervalId = null;

const datatimeInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

startBtn.addEventListener('click', onStartTimer);
startBtn.disabled = true;

Report.info(
  'МОЇ ВІТАННЯ ',
  'БУДЬ ЛАСКА ОБЕРИ ДАТУ І НАТИСНИ КНОПКУ START',
  'Ok'
);


flatpickr(datatimeInput, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0].getTime() < Date.now()) {
            Report.failure(
                'ОЙ ЛИШЕНЬКО)',
                'ОБЕРІТЬ БУДЬ ЛАСКА БУДЬ-ЯКУ МАЙБУТНЮ ДАТУ',
                'Ok'
            );
        } else {
            selectedDate = selectedDates[0].getTime();
            startBtn.disabled = false;
            Report.success(
                'ВСЕ ДОБРЕ!',
                'ДЛЯ ТОГО, ЩОБ ЗАПУСТИТИ ТАЙМЕР НАТИСНИ КНОПКУ START',
                'Ok'
            );
        }
    },
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onStartTimer() {
  timer.start();
}

const timer = {
  start() {
    intervalId = setInterval(() => {
      currentDate = Date.now();
      const timeDifference = selectedDate - currentDate;
      updateTimer(convertMs(timeDifference));
      startBtn.disabled = true;
      datatimeInput.disabled = true;

      if (timeDifference <= 1000) {
        this.stop();
        Report.info(
          'МОЇ ВІТАННЯ! ТАЙМЕР ЗУПИНИВСЯ',
          'ЯКЩО ВИ ХОЧЕТЕ ЗАПУСТИТИ ТАЙМЕР НАТИСНІТЬ КНОПКУ START АБО ПЕРЕЗАВАНТАЖТЕ СТОРІНКУ',
          'Ok'
        );
      }
    }, DELAY);
  },

  stop() {
    startBtn.disabled = true;
    datatimeInput.disabled = false;
    clearInterval(intervalId);
    return;
  },
};

function updateTimer({ days, hours, minutes, seconds }) {
  dataDays.textContent = `${days}`;
  dataHours.textContent = `${hours}`;
  dataMinutes.textContent = `${minutes}`;
  dataSeconds.textContent = `${seconds}`;
}