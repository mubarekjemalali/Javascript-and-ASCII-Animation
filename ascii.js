var ANIMATIONS = { bike: BIKE, exercise: EXERCISE, dive: DIVE, juggler: JUGGLER, 'custom': CUSTOM };

var textarea = document.getElementById('textarea');
var startBtn = document.getElementById('start');
var stopBtn = document.getElementById('stop')

startBtn.onclick = function () { start() };
stopBtn.onclick = function () { stop() };

var lists;
var current = 0;
var end;
var speed = 250;
var custom = false;

timer = null;

document.getElementById('speed').onchange = function () {
    if (this.checked) speed = 50;
    else speed = 250;
    stop();
    start();
}
document.getElementById('size').onchange = function () {
    textarea.style.fontSize = this.value + "pt";

}

document.getElementById('animation').onchange = function () {
    stop();
    textarea.value = "";
    if (this.value === 'custom') {
        custom = true;
    } else {
        lists = ANIMATIONS[this.value].split('=====');
        custom = false;

    }
    if (!custom) config();
}


function config() {
    current = 0;
    end = lists.length;
    if (end > 0)
        set();
    else stop();
}

function set() {
    textarea.value = lists[current];
    if (current + 1 > end - 1) current = 0;
    else current++;
}

function start() {
    if (custom) {
        lists = textarea.value.split('=====');
        config();
        custom = false;

    }
    timer = setInterval(set, speed);
    startBtn.disabled = true;
    stopBtn.disabled = false;
}

function stop() {
    if (timer != null) {

        clearInterval(timer);
        timer = null;
    }
    startBtn.disabled = false;
    stopBtn.disabled = true;
}