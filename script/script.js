const startButton = document.querySelector('#start');
const timeList = document.querySelector('#time-list');
const timeSpan = document.querySelector('#time');
const board = document.querySelector('#board');
const screens= document.querySelectorAll('.screen');
let time = 0;
let count = 0;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function htmlHex(x, y, z) {
  let hex = '';
  if ((x <= 255 && x >= 0) || (y <= 255 && y >= 0) || (z <= 255 && z >= 0)) {
    x = x < 16 ? '0' + x.toString(16) : x.toString(16);
    y = y < 16 ? '0' + y.toString(16) : y.toString(16);
    z = z < 16 ? '0' + z.toString(16) : z.toString(16);
  }
  return (hex +='#' + x + y + z);
}

function setTime(value) {
  timeSpan.innerHTML = `00:${value}`;
}

function createRandomCircle() {
  const size  = getRandomIntInclusive(25, 50);
  const {width, height} = board.getBoundingClientRect();
  const top = getRandomIntInclusive(size, height - size);
  const left = getRandomIntInclusive(size, width - size);
  const circle = document.createElement('div');
  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${top}px`;
  circle.style.left = `${left}px`;
  circle.style.background = htmlHex(getRandomIntInclusive(0, 255), getRandomIntInclusive(0, 255), getRandomIntInclusive(0, 255));
  board.append(circle);
}

function finishGame() {
  timeSpan.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Счет составляет: <span class="prime">${count}</span> нажатий</h1>`;
}

function decreaseTime() {
  if (time === 0) {
    finishGame()  
  }
  else {
    let current = --time;
    if (current <10) {
      current = '0' + current;
    }
    setTime(current);
  }
}

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

startButton.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
  if(event.target.classList.contains('time-btn')){
    time = +event.target.getAttribute('data-time');
    screens[1].classList.add('up');
    startGame();
  }
});

board.addEventListener('click', (event) => {
  if(event.target.classList.contains('circle')){
    count++;
    event.target.remove();
    createRandomCircle();
  }
});