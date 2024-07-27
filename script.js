let timer;
let startTime;
let elapsedTime = 0;
let paused = true;
let laps = [];

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateTime() {
    const currentTime = Date.now();
    const elapsed = elapsedTime + (currentTime - startTime);
    document.getElementById('time').textContent = formatTime(elapsed);
}

function startStopwatch() {
    if (paused) {
        paused = false;
        startTime = Date.now();
        timer = setInterval(updateTime, 100);
    }
}

function pauseStopwatch() {
    if (!paused) {
        paused = true;
        elapsedTime += Date.now() - startTime;
        clearInterval(timer);
    }
}

function resetStopwatch() {
    paused = true;
    clearInterval(timer);
    elapsedTime = 0;
    document.getElementById('time').textContent = formatTime(0);
    laps = [];
    document.getElementById('laps').innerHTML = '';
}

function recordLap() {
    if (!paused) {
        const currentTime = Date.now();
        const elapsed = elapsedTime + (currentTime - startTime);
        laps.push(elapsed);
        const lapElement = document.createElement('div');
        lapElement.className = 'lap-item';
        lapElement.textContent = `Lap ${laps.length}: ${formatTime(elapsed)}`;
        document.getElementById('laps').appendChild(lapElement);
    }
}
