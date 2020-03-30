'use strict';
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
//---------------
var gQuests = [
    { id: 1, opts: ['eating cake', 'eating banna'], correctOptIndex: 1 },
    { id: 2, opts: ['mac', 'windows'], correctOptIndex: 1 },
    { id: 3, opts: ['mario', 'random italian dude'], correctOptIndex: 1 }
];
console.log(gQuests);

var gInterval;
var gImsg = document.querySelector('.msg');
var gCurrQuestIdx = 0;
function wrongQuestion() {
    gImsg.innerHTML = 'WRONG!';
}

function initGame() {
    createQuests();
    gCurrQuestIdx = 0;
    if (!gCurrQuestIdx) {
        renderQuestion(gCurrQuestIdx);
    }
}
function checkAnswer(optIdx) {
    if (gCurrQuestIdx < 2) {
        if ((optIdx == 1)) {
            gCurrQuestIdx++;
            gImsg.innerHTML = 'GOOD JOB';
            gImsg.style.color = 'green';
            renderQuestion(gCurrQuestIdx);
        } else {
            gImsg.innerHTML = 'WRONG - start over!'
            gImsg.style.color = 'red';
            gCurrQuestIdx = 0;
            renderQuestion(gCurrQuestIdx);
        }
    } else {
        gImsg.innerHTML = 'You Win!';
        gImsg.style.color = 'green';
        gCurrQuestIdx = 0;
        renderQuestion(gCurrQuestIdx);
    }
}

function createQuests() {
    return gQuests;
}
function renderQuestion(Idx) {
    var img = document.querySelector('.picture');
    img.src = `img/${Idx + 1}.jpg`;
    var answers = document.querySelector('.answers');
    console.log(answers[0]);
    answers.innerHTML = `<button onclick="checkAnswer('1')" class="answer">${gQuests[Idx].opts[0]}</button>
    <button onclick="checkAnswer('2')" class="answer">${gQuests[Idx].opts[1]}</button>`
}
