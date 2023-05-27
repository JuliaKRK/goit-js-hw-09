import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
const startBtn = document.querySelector('button[data-start]');

let timerId = null;

startBtn.setAttribute('disabled', true);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function handleTimerStart(selectedDates) {
  if (selectedDates[0] < new Date()) {
    Notify.failure('Please choose a date in the future');
    return;
  }
  startBtn.removeAttribute('disabled');

  function showTimer() {
    const now = new Date();
    localStorage.setItem('selectedData', selectedDates[0]);
    const selectData = new Date(localStorage.getItem('selectedData'));

    if (!selectData) return;

    const timeDifference = selectData - now;
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    daysEl.textContent = days;
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);

    if (
      daysEl.textContent === '0' &&
      hoursEl.textContent === '00' &&
      minutesEl.textContent === '00' &&
      secondsEl.textContent === '00'
    ) {
      clearInterval(timerId);
    }
  }

  function handleClick() {
    if (timerId) {
      clearInterval(timerId);
    }
    showTimer();
    timerId = setInterval(showTimer, 1000);
  }

  startBtn.addEventListener('click', handleClick);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: handleTimerStart,
};

flatpickr('input#datetime-picker', options);
