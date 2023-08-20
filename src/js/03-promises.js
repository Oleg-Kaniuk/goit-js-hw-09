// Імпорт класу "Notify" з бібліотеки Notiflix для показу повідомлень
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Вибір форми з класом "form"
const form = document.querySelector('.form');
// Однакові змінні, що вказують на вибір елементів форми за їхніми атрибутами name
// const delay = document.querySelector('[name="delay"]');
// const step = document.querySelector('[name="step"]');
// const amount = document.querySelector('[name="amount"]')

// Додавання обробника події "submit" до форми
form.addEventListener('submit', onBtnPromiseCreate);

// Функція для створення обіцянки
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    // Генерація випадкової можливості виконання обіцянки
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      // Вирішення або відхилення обіцянки залежно від умови
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Обробник події для створення обіцянок після натискання кнопки
function onBtnPromiseCreate(evt) {
  evt.preventDefault();

  // Отримання числового значення з поля вводу "delay"
  let delayPromise = Number(form.delay.value);

  // Ітерація для створення та обробки обіцянок
  for (let i = 1; i <= form.amount.value; i += 1) {

    // Створення обіцянки
    createPromise(i, delayPromise)
      .then(({ position, delay }) => {
        // Виведення повідомлення про успішне виконання обіцянки
        Notify.success(`✅ Виконано обіцянку ${position} через ${delay} мс`);
      })
      .catch(({ position, delay }) => {
        // Виведення повідомлення про відхилення обіцянки
        Notify.failure(`❌ Відхилено обіцянку ${position} через ${delay} мс`);
      });
      
    // Збільшення значення затримки для наступної обіцянки
    delayPromise += Number(form.step.value);
  }
}