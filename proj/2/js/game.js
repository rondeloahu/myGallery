'use strict';
// global var and const
const FLAG = '🚩';
var elMsg = document.querySelector('.msg');
var elIcon = document.querySelector('.btn');
var mineCount = document.querySelector('.how-much span');
var gstartTime = 0;
var gFlagNumCorrect = 0;
var gHint = false;
var gLives = 2;
var gSafeClicks = 3;
var livesShowns = document.querySelectorAll('.hp-show span');
var gSafeClickBtn = document.querySelector('.safe-btn');
var elRecord = document.querySelector('.records span');
var gManuallyCounter = 0;
var gLevel = {
    size: 8,
    mines: 12,
    Difficulty: 2
};
var gGame = {
    isOn: false,
    secsPassed: 0
};

// ---------------------------- END VAR ------------------

function init() {
    checkRecords()
    document.addEventListener('contextmenu', event => event.preventDefault());
    gBoard = buildBoard();
    renderBoard(gBoard, { i: 7, j: 7 });
    mineCount.innerText = gLevel.mines;
    gMineToCover = gLevel.mines;
    elRecord.innerText = printBestScore(gLevel.Difficulty);
}
var gMineToCover = gLevel.mines;


function cellClicked(elCell, i, j, e) {
    if (gLevel.Difficulty === 4) { // manually diff
        var elCellBenith = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
        elCellBenith.classList.remove('hideElem');
        elCell.classList.add('hideElem');
        gBoard[i][j].isMine = true;
        elCellBenith.innerText = '💣';
        gManuallyCounter++;
        if (gManuallyCounter === gLevel.mines) {
            createNigh(gBoard);
            init();
            gLevel.Difficulty = 5;
            alert('its not workin yet');
        }
    } else {
        if (gGame.secsPassed === 0 && gGame.isOn === false) { // first click
            gstartTime = Date.now();
            gGame.secsPassed = setInterval(timer, 1000);
            gGame.isOn = true;
            if (gLevel.Difficulty !== 5) createMines(gBoard, { i, j });
            renderBoard(gBoard, { i, j });
            gBoard[i][j].isShown = true;
        }
        if (e.buttons === 1) { //left click
            if (!gHint) {
                var elCellBenith = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
                elCellBenith.classList.remove('hideElem');
                elCell.classList.add('hideElem');
                gBoard[i][j].isShown = true;
                if (gBoard[i][j].isMine === true) {
                    gMineToCover--;
                    if (gLives > 0) {
                        gLives--;
                        livesShowns[gLives].classList.add('hideElem');
                    }
                    else if ((gLives === 0)) {
                        gGame.isOn = false;
                        elCell.classList.add('hideElem');
                        elCellBenith.classList.add('blown');
                        elMsg.classList.remove('hideElem')
                        elMsg.innerText = 'Game Over!';
                        elCellBenith.classList.remove('occupied')
                        elIcon.innerHTML = ' 🤯';
                        livesShowns[2].classList.add('hideElem');
                        exposeMines(gBoard);
                        clearInterval(gGame.secsPassed);
                    }

                } else if (gBoard[i][j].minesAroundCount === ' ') {
                    expandShown(i, j, gBoard);
                }
            } else {
                var row = i;
                var col = j;
                openHintSquare(elCell, row, col);
            }
        } else if (e.buttons === 2) {//right click
            if (gBoard[i][j].isMarked) {
                gBoard[i][j].isMarked = false;
                elCell.innerText = ' ';
                if (gBoard[i][j].isMine === true) {
                    gFlagNumCorrect--;
                }
            }
            else {
                if (gBoard[i][j].isMine === true) {
                    gFlagNumCorrect++;
                }
                gBoard[i][j].isMarked = true;
                elCell.innerText = FLAG;
            }
        }

        if (isWin()) {
            elIcon.innerHTML = '😎';
            elMsg.classList.remove('hideElem');
            elMsg.innerText = '🥳you win!!!🏅 🎖';
            getRecord(parseInt(elTime.innerText));
            clearInterval(gGame.secsPassed);
            gGame.isOn = false;
        }
    }
}
function expandShown(cellI, cellJ, mat) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue;
            if (!mat[i][j].isMine && !mat[i][j].isShown) {
                var elCard = document.querySelector(`[data-ii="${i}"][data-jj="${j}"]`);
                elCard.classList.add('hideElem');
                var elCellBenith = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
                elCellBenith.classList.remove('hideElem');
                mat[i][j].isShown = true;
                if (mat[i][j].minesAroundCount === ' ') {
                    expandShown(i, j, mat);
                }
            }
        }
    }
}


function safeClick(elm) {
    var emptyCells = [];
    if (gSafeClicks > 0) {
        for (var i = 0; i < gBoard.length; i++) {
            for (var j = 0; j < gBoard[0].length; j++) {
                if (!gBoard[i][j].isMine && !gBoard[i][j].isShown) {
                    emptyCells.push({ i, j });
                }
            }
        }
        var rndIndex = getRandomInteger(0, emptyCells.length - 1);
        var rndSafeSpot = emptyCells.splice(rndIndex, 1);
        emptyCells.splice(rndIndex, 1);
        var safeSpot = document.querySelector(`[data-ii="${rndSafeSpot[0].i}"][data-jj="${rndSafeSpot[0].j}"]`);
        safeSpot.classList.add('mark');
        gSafeClicks--;
        var numberOfSafe = document.querySelector('.safe-btn span')
        console.log(numberOfSafe.innerText);
        numberOfSafe.innerText = gSafeClicks;
        setTimeout(remMarkCell, 1000, safeSpot);
    } else if (gSafeClicks === 0) {
        elm.innerText = 'no more help';
        elm.classList.add('disable-btn');

    }
}
function remMarkCell(elCell) {
    elCell.classList.remove('mark');
}