import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
const inputDelayEl = document.querySelector('input[name=delay]');
const inputDelayStepEl = document.querySelector('input[name=step]');
const inputAmountPromisesEl = document.querySelector('input[name=amount]');

formEl.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
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
  let delay = Number(inputDelayEl.value);
  const stepValue = Number(inputDelayStepEl.value);
  const amountValue = Number(inputAmountPromisesEl.value);
  formEl.reset();
  for (let i = 1; i < amountValue; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += stepValue;
  }
}
