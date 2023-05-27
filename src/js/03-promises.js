import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
const inputDelayEl = document.querySelector('input[name=delay]');
const inputDelayStepEl = document.querySelector('input[name=step]');
const inputAmountPromisesEl = document.querySelector('input[name=amount]');

formEl.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmit(evt) {
  evt.preventDefault();
  const delayValue = Number(inputDelayEl.value);
  const stepValue = Number(inputDelayStepEl.value);
  const amountValue = Number(inputAmountPromisesEl.value);
  let delay = delayValue;
  let position = 0;
  delay -= stepValue;
  formEl.reset();
  for (let i = 0; i < amountValue; i += 1) {
    delay += stepValue;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
