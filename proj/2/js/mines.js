// global var and const
const MINE = '💣';

function createMines(board, pos) {
    for (var x = 0; x < gLevel.mines; x++) {
        var boardCells = getEmptyCells(board, pos);
        var rndNum = getRandomInteger(0, boardCells.length - 1);
        var placeForMine = boardCells.splice(rndNum, 1);
        if(board[placeForMine[0].i][placeForMine[0].j].isMine) {
            x--;
            continue;
        }
        board[placeForMine[0].i][placeForMine[0].j].isMine = true;
        board[placeForMine[0].i][placeForMine[0].j].minesAroundCount = MINE;   
    }
    createNigh(board);
}
function createNigh(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].minesAroundCount !== MINE) {
                setMinesNegsCount(board, { i, j })
            }
        }
    }
}

function setMinesNegsCount(mat, pos) {
    var row = pos.i;
    var col = pos.j;
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j >= mat[0].length) continue;
            if (mat[i][j].minesAroundCount === MINE) {
                if (mat[row][col].minesAroundCount === ' ') {
                    mat[row][col].minesAroundCount = 0;
                }
                mat[row][col].minesAroundCount += 1;
            }
        }

    }
}


function exposeMines(mat) {
    for (var i = 0; i < mat.length; i++) {
        for (var j = 0; j < mat[0].length; j++) {
            if (mat[i][j].isMine) {
                var elCard = document.querySelector(`[data-ii="${i}"][data-jj="${j}"]`);
                elCard.classList.add('hideElem');
                var elCellBenith = document.querySelector(`[data-i="${i}"][data-j="${j}"]`);
                elCellBenith.classList.remove('hideElem');
                if (mat[i][j].isMarked) {
                    elCellBenith.style.backgroundColor = '#70a570';
                }
            }
        }
    }
}