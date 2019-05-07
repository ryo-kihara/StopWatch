'use strict';

var timer = document.getElementById('timer');
var start = document.getElementById('start');
var stop = document.getElementById('stop');
var reset = document.getElementById('reset');

var startTime;
var countTime = 0;
var isRunnning = false;
var timerId;
var elapsedTime = 0;

function updateTimer(t){
  var time = new Date(t);
  var m = time.getMinutes();
  var s = time.getSeconds();
  var ms = time.getMilliseconds();

  timer.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(3, '0')}`
}

function count() {
  timerId = setTimeout(function(){
    countTime = Date.now() - startTime + elapsedTime;
    updateTimer(countTime);
    count();
  }, 10)
}

start.addEventListener('click', function(){
  if (isRunnning === false) {
    isRunnning = true;
    startTime = Date.now();
    this.className = 'off';
    stop.className = '';
    reset.className = 'off';
    count();
  }
  else {
    return;
  }
});

stop.addEventListener('click', function(){
  if (isRunnning === true) {
    isRunnning = false;
    this.className = 'off';
    start.className = '';
    reset.className = '';
    clearTimeout(timerId);
    elapsedTime += Date.now() - startTime;
  }
  else {
    return;
  }
});

reset.addEventListener('click', function(){
  if (isRunnning === false) {
    timer.textContent = '00:00.000'
    start.className = '';
    stop.className = 'off';
    this.className = 'off';
    elapsedTime = 0;
  }
  else {
    return;
  }
});
