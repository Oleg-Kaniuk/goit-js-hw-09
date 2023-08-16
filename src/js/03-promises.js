import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
// const delay = document.querySelector('[name="delay"]');
// const step = document.querySelector('[name="step"]');
// const amount = document.querySelector('[name="amount"]')

form.addEventListener('submit', onBtnPromiseCreate)

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onBtnPromiseCreate(evt) {
  evt.preventDefault();

  let delayPromise = Number(form.delay.value);

  for (let i = 1; i <= form.amount.value; i += 1) {

    createPromise(i, delayPromise)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayPromise += Number(form.step.value);
  }
}


