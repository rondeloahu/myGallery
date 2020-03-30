'use strict';

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function timer() {
    var time = (Date.now() - gstartTime);
    if (gGame.isOn = true) {
        elTime.innerText = Math.floor(time / 1000);

    }
}


function isWin() {
    if (gFlagNumCorrect === gMineToCover && allFlipped()) {
        gGame.isOn = false;
        return true;
    }
    return false;
}
function allFlipped() {
    var flippedCount = ((gLevel.size ** 2) - gLevel.mines);
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isShown && !gBoard.isMine) {
                flippedCount--;
            }
            if (flippedCount === 0) {
                return true
            }
        }
    }
    return false;
}

function resetGame() {
    clearInterval(gGame.secsPassed);
    gGame.secsPassed = 0;
    gBoard = [];
    gstartTime = 0;
    gSafeClicks = 3;
    gSafeClickBtn.classList.remove('disable-btn');
    gSafeClickBtn.innerHTML = `Safe Click [<span>3</span>]`;
    gLives = 2;
    gHint = false;
    gGame.isOn = false;
    gFlagNumCorrect = 0;
    elTime.innerText = 0;
    gLevel.mines = (gLevel.Difficulty === 1) ? 2 :
        (gLevel.Difficulty === 2) ? 12 :
            (gLevel.Difficulty === 3) ? 30 : 10;
    elIcon.innerHTML = ' 😁';
    elMsg.classList.add('hideElem');
    var hints = document.querySelectorAll('.hint-btn');
    for (var i = 0; i < hints.length; i++) {
        hints[i].classList.remove('hideElem');
    }
    for (var i = 0; i < livesShowns.length; i++) {
        livesShowns[i].classList.remove('hideElem');
    }
    init();
}


// --------------- hint section -------------
function getHint(elm) {
    elm.classList.add('hideElem');
    gHint = true;
}
function openHintSquare(elCell, row, col) {
    for (var x = row - 1; x <= row + 1; x++) {
        if (x < 0 || x >= gBoard.length) continue;
        for (var y = col - 1; y <= col + 1; y++) {
            if (y < 0 || y >= gBoard[0].length) continue;
            if (gBoard[x][y].isShown === false) {
                var elCellBenith = document.querySelector(`[data-i="${x}"][data-j="${y}"]`);
                elCellBenith.classList.remove('hideElem');
                var elCellup = document.querySelector(`[data-ii="${x}"][data-jj="${y}"]`);
                elCellup.classList.add('hideElem');
            }
        }
    }
    setTimeout(closeHintMode, 1000, elCell, row, col)
    gHint = false;
}

function closeHintMode(elCell, i, j) {
    for (var x = i - 1; x <= i + 1; x++) {
        if (x < 0 || x >= gBoard.length) continue;
        for (var y = j - 1; y <= j + 1; y++) {
            if (y < 0 || y >= gBoard[0].length) continue;
            if (gBoard[x][y].isShown === false) {
                var elCellBenith = document.querySelector(`[data-i="${x}"][data-j="${y}"]`);
                elCellBenith.classList.add('hideElem');
                var elCellup = document.querySelector(`[data-ii="${x}"][data-jj="${y}"]`);
                elCellup.classList.remove('hideElem');
            }
        }
        gHint = false;
    }
}


function getEmptyCells(board, pos) {
    var row = pos.i;
    var col = pos.j;
    var emptyCells = [];
    for (var i = 0; i < board.length; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = 0; j < board[0].length; j++) {
            if (j < 0 || j >= board[0].length) continue;
            if (i === row && j === col) continue;
            if (board[i][j]) emptyCells.push({ i, j });
        }
    }
    return emptyCells;
}

//--------------------------- RECORDS ------------------
function checkRecords() {
    if (!localStorage.getItem('easyRecord')) {
        localStorage.setItem('easyRecord', Infinity);
    }
    if (!localStorage.getItem('normalRecord')) {
        localStorage.setItem('normalRecord', Infinity);
    }
    if (!localStorage.getItem('hardRecord')) {
        localStorage.setItem('hardRecord', Infinity);
    }
}

function getRecord(time) {
    if (gLevel.Difficulty === 1) {
        if (time < localStorage.getItem('easyRecord')) {
            localStorage.setItem('easyRecord', time);
        }
        elRecord.innerText = localStorage.getItem('easyRecord');
    } else if (gLevel.Difficulty === 2) {
        if (time < localStorage.getItem('normalRecord')) {
            localStorage.setItem('normalRecord', time);
        }
        elRecord.innerText = localStorage.getItem('normalRecord');
    } else {
        if (time < localStorage.getItem('hardRecord')) {
            localStorage.setItem('hardRecord', time);
        }
        elRecord.innerText = localStorage.getItem('hardRecord');
    }
}
function printBestScore(diff) {
    var print = (diff === 1) ? localStorage.getItem('easyRecord') :
        (diff === 2) ? localStorage.getItem('normalRecord') :
            localStorage.getItem('hardRecord');

    return print;
}