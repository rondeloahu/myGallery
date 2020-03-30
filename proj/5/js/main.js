'use strict';
console.log('Ballon poping');
// Load an audio file
var audioWin = new Audio('/pop.wav');
var elMsg = document.querySelector('.msg');
var gBallon = [
    { id: 6000, bottom: 0, speed: 15 },
    { id: 1001, bottom: 0, speed: 10 },
    { id: 3001, bottom: 0, speed: 12 }
]
var gInterval;
var w = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
console.log('The height is:', w)

function init() {
    var elemWay = document.querySelector('.wayUp');
    var strHTML = '';

    for (var i = 0; i < gBallon.length; i++) {
        strHTML += '<label class="balloon balloon' + (i + 1) + '" onclick="popit(' + i + ')"></label>';
    }
    elemWay.innerHTML = strHTML;
    startRace();
}

function startRace() {
    gInterval = setInterval(UpBallon, 500);
}

function UpBallon() {
    var eleBalloon = document.querySelectorAll('.balloon');
    var cnt = 0;
    for (var i = 0; i < eleBalloon.length; i++) {
        eleBalloon[i].style.bottom = gBallon[i].bottom + 'px';
        gBallon[i].bottom += gBallon[i].speed;
        if (gBallon[i].speed === 0) {
            cnt++;
            if (cnt === gBallon.length) {
                clearInterval(gInterval);
                console.log('everything popped');

            }
        }
        if (gBallon[i].bottom < w - 200) {

        } else {
            clearInterval(gInterval);
            elMsg.innerHTML = '<h3>you didnt pop the balloon id : ' + gBallon[i].id + '</h3>'
        }
    }
}
function opicityCahnge(balloon) {
    balloon.style.opacity -= 10;
}
function popit(ballIdx) {
    gBallon[ballIdx].speed = 0;
    audioWin.play();
    var eleBalloon = document.querySelectorAll('.balloon');
    var popdone = setInterval(opicityCahnge(eleBalloon[ballIdx], 800));
    elMsg.innerHTML = '<h3>you DID IT !</h3>'
}