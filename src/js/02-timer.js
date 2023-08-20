// Імпорт бібліотеки flatpickr з описаним в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів для flatpickr
import "flatpickr/dist/flatpickr.min.css";

// Імпорт функції "Report" з бібліотеки Notiflix для показу повідомлень
import { Report } from 'notiflix/build/notiflix-report-aio';

// Константа, яка визначає інтервал затримки (в мілісекундах)
const DELAY = 1000;

// Встановлення початкових стилів для фону і тексту тіла документу
document.body.style.backgroundColor = 'orange';
document.body.style.color = 'black';

// Змінні для зберігання вибраної та поточної дати
let selectedDate = null;
let currentDate = null;

// Змінна для зберігання ідентифікатора інтервалу
let intervalId = null;

// Вибір елементу вводу дати/часу
const datatimeInput = document.querySelector('#datetime-picker');
// Вибір кнопки "Start"
const startBtn = document.querySelector('[data-start]');

// Вибір елементів для виведення інформації про різницю в часі
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

// Додавання обробника події "click" до кнопки "Start"
startBtn.addEventListener('click', onStartTimer);
startBtn.disabled = true;

// Відображення інформаційного повідомлення
Report.info(
  'МОЇ ВІТАННЯ ',
  'БУДЬ ЛАСКА ОБЕРІТЬ ДАТУ І НАТИСНІТЬ КНОПКУ START',
  'Ok'
);

// Ініціалізація бібліотеки flatpickr для елемента вибору дати/часу
flatpickr(datatimeInput, {
    // Дозвіл на вибір часу
    enableTime: true,
    // Формат часу у 24-годинному форматі
    time_24hr: true,
    // Початкова дата за замовчуванням - поточна дата та час
    defaultDate: new Date(),
    // Інтервал зміни хвилин при виборі часу
    minuteIncrement: 1,
    // Функція, яка виконується при закритті вибору дати/часу
    onClose(selectedDates) {
        // Перевірка, чи вибрана дата менше поточної дати
        if (selectedDates[0].getTime() < Date.now()) {
            // Повідомлення про помилку, якщо вибрана мінула дата
            Report.failure(
                'ОЙ ЛИШЕНЬКО)',
                'ОБЕРІТЬ БУДЬ ЛАСКА БУДЬ-ЯКУ МАЙБУТНЮ ДАТУ',
                'Ok'
            );
        } else {
            // Збереження вибраної майбутньої дати та відображення інформаційного повідомлення про готовність до запуску таймера
            selectedDate = selectedDates[0].getTime();
            startBtn.disabled = false;
            Report.success(
                'ВСЕ ДОБРЕ!',
                'ДЛЯ ТОГО, ЩОБ ЗАПУСТИТИ ТАЙМЕР НАТИСНІТЬ КНОПКУ START',
                'Ok'
            );
        }
    },
});

// Функція для конвертації мілісекунд в дні, години, хвилини та секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// Додавання ведучих нулів для значень
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// Обробник події для кнопки "Start"
function onStartTimer() {
  timer.start();
}

// Об'єкт "timer", який управляє таймером
const timer = {
  // Метод "start", який починає роботу таймера
  start() {
    // Встановлення інтервалу для виконання функції через певний проміжок часу
    intervalId = setInterval(() => {
      // Збереження поточної дати та обчислення різниці в часі
      currentDate = Date.now();
      const timeDifference = selectedDate - currentDate;

      // Оновлення виводу інформації про таймер
      updateTimer(convertMs(timeDifference));

      // Вимкнення кнопки "Start" та виключення вибору дати/часу
      startBtn.disabled = true;
      datatimeInput.disabled = true;

      // Перевірка, чи різниця в часі менше або дорівнює 1000 мс (1 с)
      if (timeDifference <= 1000) {
        // Зупинка таймера за допомогою методу "stop"
        this.stop();
        // Повідомлення про завершення таймера
        Report.info(
          'ТАЙМЕР ЗУПИНИВСЯ!',
          'ЯКЩО ВИ ХОЧЕТЕ ЗАПУСТИТИ ТАЙМЕР НАТИСНІТЬ КНОПКУ START АБО ПЕРЕЗАВАНТАЖТЕ СТОРІНКУ',
          'Ok'
        );
      }
    }, DELAY);
  },

  // Метод "stop", який зупиняє таймер
  stop() {
    // Вимкнення кнопки "Start" та увімкнення вибору дати/часу
    startBtn.disabled = true;
    datatimeInput.disabled = false;
    // Очищення інтервалу для припинення виконання функції через проміжок часу
    clearInterval(intervalId);
    return;
  },
};

// Функція для оновлення виводу інформації про таймер
function updateTimer({ days, hours, minutes, seconds }) {
  // Оновлення вмісту елементів відображення днів, годин, хвилин та секунд
  dataDays.textContent = `${days}`;
  dataHours.textContent = `${hours}`;
  dataMinutes.textContent = `${minutes}`;
  dataSeconds.textContent = `${seconds}`;
}