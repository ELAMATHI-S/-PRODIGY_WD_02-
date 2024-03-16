let timerInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;

const displayHours = document.getElementById("displayHours");
const displayMinutes = document.getElementById("displayMinutes");
const displaySeconds = document.getElementById("displaySeconds");
const displayMilliseconds = document.getElementById("displayMilliseconds");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const lapButton = document.getElementById("lapButton");
const lapsList = document.getElementById("lapsList");

function formatTime(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = time % 1000;

    return {
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
        milliseconds: milliseconds.toString().padStart(3, "0")
    };
}

function updateDisplay() {
    const time = formatTime(elapsedTime);
    displayHours.textContent = time.hours;
    displayMinutes.textContent = time.minutes;
    displaySeconds.textContent = time.seconds;
    displayMilliseconds.textContent = time.milliseconds;
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function() {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
}

function pauseTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    lapsList.innerHTML = "";
}

function lapTimer() {
    const lapTime = elapsedTime;
    const lapItem = document.createElement("li");
    lapItem.textContent = formatTime(lapTime).hours + ":" +
                          formatTime(lapTime).minutes + ":" +
                          formatTime(lapTime).seconds + "." +
                          formatTime(lapTime).milliseconds;
    lapsList.prepend(lapItem);
}

startButton.addEventListener("click", function() {
    if (!isRunning) {
        startTimer();
        isRunning = true;
    }
});

pauseButton.addEventListener("click", function() {
    if (isRunning) {
        pauseTimer();
        isRunning = false;
    }
});

resetButton.addEventListener("click", function() {
    resetTimer();
    isRunning = false;
});

lapButton.addEventListener("click", function() {
    if (isRunning) {
        lapTimer();
    }
});
