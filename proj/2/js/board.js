'use strict';
//global var and const
var gBoard = [];
var elTime = document.querySelector('.timing span');
var gWarper = document.querySelector('.warper');
var gDifficulty = 1;
function chnageDiff(diff) {
    switch (diff.innerText) {
        case 'Normal':
            {
                gLevel.Difficulty = 2;
                gLevel.size = 8;
                gLevel.mines = 12;
                gWarper.classList.add('warper');
                gWarper.classList.remove('warper-big');
                resetGame();
                break;
            }
        case 'Hard':
            {
                gLevel.Difficulty = 3;
                gLevel.size = 12;
                gLevel.mines = 30;
                gWarper.classList.add('warper-big');
                gWarper.classList.remove('warper');
                resetGame();
                break;
            }
        case 'Manualy':
            {
                gLevel.Difficulty = 4;
                gLevel.size = 5;
                gLevel.mines = 10;
                if (gLevel.size > 9) {
                    gWarper.classList.add('warper-big');
                    gWarper.classList.remove('warper');
                } else {
                    gWarper.classList.add('warper');
                    gWarper.classList.remove('warper-big');
                }
                resetGame();
                break;
            }
        default:
            {
                gLevel.Difficulty = 1;
                gLevel.size = 4;
                gLevel.mines = 2;
                gWarper.classList.add('warper');
                gWarper.classList.remove('warper-big');
                resetGame();
            }
    }
}


function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.size; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.size; j++) {
            board[i][j] = {
                minesAroundCount: ' ',
                isShown: false,
                isMine: false,
                isMarked: false
            };;
        }
    }
    return board;
}


//-----------------------------Render
function renderBoard(board, pos) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var className = 'occupied';
            var firstclass = (i == pos.i && j == pos.j) ? 'hideElem' : '';
            className += (board[i][j].minesAroundCount === 1) ? ' one' :
                (board[i][j].minesAroundCount === 2) ? ' two' :
                    (board[i][j].minesAroundCount === 3) ? ' three' :
                        (board[i][j].minesAroundCount === 4) ? ' four' : ' five';
            var strData = `data-i="${i}" data-j="${j}"`;
            var strDataCard = `data-ii="${i}" data-jj="${j}"`;
            strHTML += '<td>'
            strHTML += `<div class="upper-card ${firstclass}" ${strDataCard} onmousedown="cellClicked(this, ${i}, ${j},event)"></div>`
            strHTML += `<div class="${className} hideElem" ${strData}>`;
            strHTML += `${board[i][j].minesAroundCount} </div>`;
            strHTML += '</td>';
        }
        strHTML += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}