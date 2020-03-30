'use strict';
// random num fnction - min and max include
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//important notice:
/*If you do not use Dates, functions, undefined,
Infinity, RegExps, Maps, Sets, Blobs, FileLists, ImageDatas,
sparse Arrays, Typed Arrays or other complex types within your object, 
a very simple one liner to deep clone an object is:
*/
function deepcopyObj(obj) {
    return JSON.parse(JSON.stringify(obj));
}


// Both functions below will not perform a DEEP COPY
// If the mat's cell is an object reference, no new objects will be created 
function copy2Darray(mat) {
    // console.table(mat);
    var board = [];
    for (var i = 0; i < mat.length; i++) {
        var row = mat[i].slice();
        board.push(row);
    }

    return board;
}

function mySlice(mat) {
    var board = [];

    for (var i = 0; i < mat.length; i++) {
        var row = [];
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            row.push(cell);
        }
        board.push(row);
    }
    console.table(board);
    return board;
}

//function calc timer
function timer(timing) {
    var time = (Date.now() - gstartTime) / timing;
    return time;
}

// creates board with X size with array inside
function createBoard(size, array) {
    var board = [];
    for (var i = 0; i < size; i++) {
        board[i] = [];
        for (var j = 0; j < size; j++) {
            board[i][j] = array[i];
        }
    }
    return board;
}

// //calc nighbers

// function countNeighbors(row, col, board) {
//     for (var i = row - 1; i <= row + 1; i++){
//         if (i < 0 || i >= board.length) continue; // check its not outside the table
//         for (var j = col - 1; j <= col + 1; j++){
//             if (j < 0 || j >= board[0].length) continue; // check its not outside the table
//             if (i === row && j === col) continue; //check we dont look at this point
//             if (board[i][j] === /* what we wanna check if nigber have */ ) /* what gonna happen if its true */;
//         }
//     }
// }
