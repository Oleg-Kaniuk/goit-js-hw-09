// Вибір кнопки "Start" за допомогою атрибута data-start
const startBtn = document.querySelector('button[data-start]')
// console.dir(startBtn);

// Вибір кнопки "Stop" за допомогою атрибута data-stop
const stopBtn = document.querySelector('button[data-stop]')
// console.dir(stopBtn);

// Вибір елементу <body> сторінки
const body = document.querySelector('body')
// console.dir(body);

// Додавання обробника події "click" до кнопки "Start"
startBtn.addEventListener('click', onClickStartBtn)
// Додавання обробника події "click" до кнопки "Stop"
stopBtn.addEventListener('click', onClickStopBtn)

// Константа, що визначає інтервал затримки (в мілісекундах) для зміни кольору фону
const DELAY = 1000

// Змінна, що зберігає ідентифікатор інтервалу
let intervalId = null

// Встановлення атрибуту "disabled" на кнопці "Stop" (виключено за замовчуванням)
stopBtn.setAttribute('disabled', true);

// Функція, яка виконується при натисканні кнопки "Start"
function onClickStartBtn() {
    startBtn.setAttribute('disabled', true); // Вимкнення кнопки "Start"
    stopBtn.removeAttribute('disabled'); // Увімкнення кнопки "Stop"
    // Встановлення інтервалу, який змінює колір фону з певною затримкою
    intervalId = setInterval(() => {
        // Зміна кольору фону на випадковий
        body.style.backgroundColor = getRandomHexColor()
    }, DELAY);
}

// Функція, яка виконується при натисканні кнопки "Stop"
function onClickStopBtn() {
    stopBtn.setAttribute('disabled', true); // Вимкнення кнопки "Stop"
    startBtn.removeAttribute('disabled'); // Увімкнення кнопки "Start"
    clearInterval(intervalId);  // Зупинка інтервалу
}

// Функція для отримання випадкового шестнадцяткового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}