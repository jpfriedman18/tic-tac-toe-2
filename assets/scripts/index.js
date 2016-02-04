'use strict';

// user require with a reference to bundle the file and use it in this file
// var example = require('./example');

// use require without a reference to ensure a file is bundled
require('./example');

// load sass manifest
require('../styles/index.scss');

const myApp = {
  BASE_URL: 'http://tic-tac-toe.wdibos.com'
};

//AJAX requests
$(document).ready(() => {
  $('.signed-out').show();
  $('.signed-in').hide();
  //Create new user
  $('#sign-up').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    $.ajax({
      url: myApp.BASE_URL + '/sign-up',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
      $('#sign-up-modal').modal('hide');
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

  //Login as existing user
  $('#sign-in').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    $.ajax({
      url: myApp.BASE_URL + '/sign-in',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
      myApp.user = data.user;
      console.log(myApp.user);
      $('.signed-out').hide();
      $('.signed-in').show();
      $('#sign-in-modal').modal('hide');
      ajaxCreateGame();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

  //Change password of currently logged-in user
  $('#change-password').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    $.ajax({
      url: myApp.BASE_URL + '/change-password/' + myApp.user.id,
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      console.log(data);
      $('#change-password-modal').modal('hide');
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });

  //Log out
  $('#sign-out-button').on('click', function(e) {
    e.preventDefault();
    $.ajax({
      url: myApp.BASE_URL + '/sign-out/' + myApp.user.id,
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
    }).done(function() {
      console.log("Logged Out!");
      $('.signed-out').show();
      $('.signed-in').hide();
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });
});

//Create new game instance on server with blank board
//associated with currently logged-in email
let ajaxCreateGame = function(){
  $.ajax({
    url: myApp.BASE_URL + '/games',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
    data: {}
  })
  .done(function(data){
    myApp.game = data.game;
    console.log(myApp.game);
    ajaxGetGame();
  })
  .fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

//Updates back-end game instance with new move
let ajaxUpdateGame = function(player, index){
  $.ajax({
    url: myApp.BASE_URL + '/games/' + myApp.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
    data: {
      "game": {
        "cell": {
          "index": index,
          "value": player
        }
//    "over": false
      }
    }
  })
  .done(function(){
    ajaxGetGame();
  })
  .fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

//Retrieves current game state from back-end
let ajaxGetGame = function(){
  $.ajax({
    url: myApp.BASE_URL + '/games/' + myApp.game.id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    }
  })
  .done(function(data){
    myApp.game = data.game;
    console.log(myApp.game);
    console.log(myApp.game.cells);
  })
  .fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

let playGame = function(){
  let currentPlayer = 'X';
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
      ajaxUpdateGame(currentPlayer, ($(this).attr('id')) - 1);
      checkWinner(currentPlayer);
      changePlayer();
      $('#currentPlayer').text('Current Player: ' + currentPlayer);
      turnCounter++;
    }
  });

  let renderBoard = function(gameArray){
    gameArray.forEach(function(element, index){
      
    });
  };

  //clear board, switch player (loser goes first), reset turn counter
  let resetBoard = function(){
    ajaxCreateGame();
    $('#board').find('td').text('');
    changePlayer();
    turnCounter = 0;
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
