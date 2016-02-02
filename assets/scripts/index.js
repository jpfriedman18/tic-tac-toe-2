'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');

// load sass manifest
require('../styles/index.scss');

let playGame = function(){
  let currentPlayer = 'X';
  let boardArray = ['','','','','','','','',''];
  let turnCounter = 0;
  let xWins = 0;
  let oWins = 0;

  let changePlayer = function(){
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  };

  let checkWinner = function(player){
    //top row
    if ($('#1').text() === player && $('#2').text() === player && $('#3').text() === player){
      alert(player + ' is the winner!');
      updateScoreboard(player);
      changePlayer();
      resetBoard();
    }
    //middle row
    if ($('#4').text() === player && $('#5').text() === player && $('#6').text() === player){
      alert(player + ' is the winner!');
      updateScoreboard(player);
      changePlayer();
      resetBoard();
    }
    //bottom row
    if ($('#7').text() === player && $('#8').text() === player && $('#9').text() === player){
      alert(player + ' is the winner!');
      updateScoreboard(player);
      changePlayer();
      resetBoard();
    }
    //left column
    if ($('#1').text() === player && $('#4').text() === player && $('#7').text() === player){
      alert(player + ' is the winner!');
      updateScoreboard(player);
      changePlayer();
      resetBoard();
    }
    //middle column
    if ($('#2').text() === player && $('#5').text() === player && $('#8').text() === player){
      alert(player + ' is the winner!');
      updateScoreboard(player);
      changePlayer();
      resetBoard();
    }
    //right column
    if ($('#3').text() === player && $('#6').text() === player && $('#9').text() === player){
      alert(player + ' is the winner!');
      updateScoreboard(player);
      changePlayer();
      resetBoard();
    }
    //left diagonal
    if ($('#1').text() === player && $('#5').text() === player && $('#9').text() === player){
      alert(player + ' is the winner!');
      updateScoreboard(player);
      changePlayer();
      resetBoard();
    }
    //right diagonal
    if ($('#3').text() === player && $('#5').text() === player && $('#7').text() === player){
      alert(player + ' is the winner!');
      updateScoreboard(player);
      changePlayer();
      resetBoard();
    }
    //Check for a draw
    if (turnCounter === 9){
      alert('It\'s a draw!');
      changePlayer();
      resetBoard();
    }
  };

  //play an individual turn
  $('#board').find('td').on('click', function(){
    if ($(this).text() === ''){
      $(this).text(currentPlayer);
      boardArray[Number($(this).attr('id')) - 1] = currentPlayer;
      checkWinner(currentPlayer);
      changePlayer();
      $('#currentPlayer').text('Current Player: ' + currentPlayer);
      turnCounter++;
    }
  });

  //clear board, switch player (loser goes first), reset turn counter
  //reset boardArray with empty strings
  let resetBoard = function(){
    $('#board').find('td').text('');
    changePlayer();
    turnCounter = 0;
    console.log(boardArray);
    boardArray = ['','','','','','','','',''];
  };

  let updateScoreboard = function(player){
    if (player === 'X'){
      xWins++;
      $('#x-score').text('X Wins: ' + xWins);
    }
    else{
      oWins++;
      $('#o-score').text('O Wins: ' + oWins);
    }
  };
};

$(document).ready(() => {
  playGame();
});

/*$(".btn-primary").click(function(){
  console.log($("#formGroupExampleInput").val());
  $("#formGroupExampleInput").val('');
});*/
