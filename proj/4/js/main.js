'use strict';
console.log('Touch The Nums');
var gNums = [];
var gBoard = [];
var gSize = 0;
var gtimeDiv = document.querySelector('.timing span');
var gCounter = 1;
var gMsg = document.querySelector('.msg span');
var gRec = document.querySelector('.best span');
var gTimeInterval = 0;
var gstartTime = Date.now();

function timer() {
    var now = (Date.now() - gstartTime) / 1000;
    var timeDiv = document.querySelector('.timing span');
    timeDiv.innerText = now;
}
function checkWin() {
    if (gCounter == (gSize ** 2) + 1) {
        clearInterval(gTimeInterval);
        gMsg.innerText = 'You Win!';
        gMsg.style.color = 'green';
        gCounter = 0;
    }
}

function chnageDiff(diff) {
    gNums = [];
    clearInterval(gTimeInterval);
    gMsg.innerText = 1;
    gSize = (diff.innerText == 'Easy') ?
        4 : (diff.innerText == 'Hard') ?
            5 : (diff.innerText == 'Extreme') ?
                6 : 10;

    for (var i = 1; i <= gSize ** 2; i++) { gNums[i] = i; }
    gNums = shuffle(gNums);
    gBoard = createBoard();
    gCounter = 1;
    renderBoard(gBoard);
}

//shuffle array
function shuffle(nums) {
    var newNums = [];
    var len = nums.length;
    for (var i = 1; i < len; i++) {
        var rnd = nums[getRandomInteger(1, nums.length)];
        if (nums.indexOf(rnd) !== -1) {
            newNums[i] = rnd;
            nums.splice(nums.indexOf(rnd), 1);
        } else i--;
    }
    return newNums;
}

function createBoard() {
    var board = [];
    for (var i = 0; i < gSize; i++) {
        board[i] = [];
        for (var j = 0; j < gSize; j++) {
            board[i][j] = gNums[i];
        }
    }
    return board;
}

function checkCell(pos) {
    var elCell = document.querySelector(`[data-i="${pos.i}"][data-j="${pos.j}"]`);
    if (elCell.innerText == gCounter) {
        gMsg.innerHTML = gCounter + 1;
        renderCell(pos);
        gCounter++;
    }
}


function renderBoard(board) {
    // console.table(board);
    var strHTML = ''
    var cnt = 1;
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            board[i][j] = gNums[cnt];
            var strData = `data-i="${i}" data-j="${j}"`;
            strHTML += `<td class="num" ${strData} onclick="cellClicked(this, ${i}, ${j})">`;
            strHTML += board[i][j];
            strHTML += '</td>';
            cnt++;
        }
        strHTML += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}
function cellClicked(elCell, i, j) {
    if (gBoard[i][j] === 1) {
        renderCell({ i, j });
        gMsg.style.color = 'black';
        gMsg.innerHTML = gCounter + 1;
        gCounter++;
        gstartTime = Date.now();
        gTimeInterval = setInterval(timer, 50);
    } else {
        checkCell({ i, j });
    }
    checkWin();
}


function renderCell(pos) {
    var elCell = document.querySelector(`[data-i="${pos.i}"][data-j="${pos.j}"]`);
    elCell.classList.add('done');
}

function printMyij(row, col) {
    console.log(row);
    console.log(col);
}
