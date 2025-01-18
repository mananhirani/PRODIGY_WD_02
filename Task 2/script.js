let timer = document.getElementById('timer');
let startButton = document.getElementById('start');
let pauseButton = document.getElementById('pause');
let resetButton = document.getElementById('reset');
let lapButton = document.getElementById('lap');
let lapsContainer = document.getElementById('laps');

let startTime = 0;
let elapsedTime = 0;
let timerInterval;

function updateTimer() {
    let now = Date.now();
    let diff = now - startTime + elapsedTime;
    let milliseconds = Math.floor((diff % 1000) / 10);
    let seconds = Math.floor((diff / 1000) % 60);
    let minutes = Math.floor((diff / (1000 * 60)) % 60);
    timer.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}

startButton.addEventListener('click', () => {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 10);
    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;
    lapButton.disabled = false;
});

pauseButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    startButton.disabled = false;
    pauseButton.disabled = true;
});

resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    timer.textContent = "00:00.00";
    lapsContainer.innerHTML = "";
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    lapButton.disabled = true;
});

lapButton.addEventListener('click', () => {
    let lapTime = timer.textContent;
    let lapDiv = document.createElement('div');
    lapDiv.textContent = `Lap: ${lapTime}`;
    lapsContainer.appendChild(lapDiv);
});
