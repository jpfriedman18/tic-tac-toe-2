'use strict';

// use require without a reference to ensure a file is bundled
require('./example');

// load sass manifest
require('../styles/index.scss');

const myApp = {
  BASE_URL: 'http://tic-tac-toe.wdibos.com'
};

  let currentPlayer = 'X';
  let turnCounter = 0;
  let xWins = 0;
  let oWins = 0;

  let changePlayer = function(){
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  };

  //clear board, switch player (loser goes first), reset turn counter
  let resetBoard = function(){
    setTimeout(function() {
      ajaxCreateGame();
      $('#board').find('td').text('');
      changePlayer();
      turnCounter = 0;
    }, 500);
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

  let checkWinner = function(player){
    let arr = myApp.game.cells;
    let isFilled = function(element){
      return element !== '';
    };

    if ((arr[0] === player && arr[1] === player && arr[2] === player)
      || (arr[3] === player && arr[4] === player && arr[5] === player)
      || (arr[6] === player && arr[7] === player && arr[8] === player)
      || (arr[0] === player && arr[3] === player && arr[6] === player)
      || (arr[1] === player && arr[4] === player && arr[7] === player)
      || (arr[2] === player && arr[5] === player && arr[8] === player)
      || (arr[0] === player && arr[4] === player && arr[8] === player)
      || (arr[2] === player && arr[4] === player && arr[6] === player)){
        createWinAlert(player);
        updateScoreboard(player);
        changePlayer();
        resetBoard();
      }
      else if (arr.every(isFilled)){
        createWinAlert('Nobody');
        changePlayer();
        resetBoard();
      }
  };

  let createWinAlert = function(player){
    $('#alert-template').append('<div class="alert alert-info" id="alert-template" role="alert">'+player+' Wins!</div>');
    $('#alert-template').show();
    setTimeout(function() {
        $("#alert-template").hide();
    }, 2500);
  };

  //play an individual turn
  $('#board').find('td').on('click', function(){
    if ($(this).text() === ''){
      ajaxUpdateGame(currentPlayer, ($(this).attr('id')) - 1);
    }
  });


  let renderBoard = function(gameArray){
    gameArray.forEach(function(element, index){
      let square = index + 1;
      $('#' + square).text(element);
    });
  };

  //AJAX requests

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
      renderBoard(myApp.game.cells);
      console.log(myApp.game);
      checkWinner(currentPlayer);
      changePlayer();
      $('#currentPlayer').text('Current Player: ' + currentPlayer);
      turnCounter++;
    })
    .fail(function(jqxhr) {
      console.error(jqxhr);
    });
  };

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
      renderBoard(myApp.game.cells);
      //ajaxGetGame();
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

  //Account AJAX requests
  $(document).ready(() => {
    $('.alert').hide();
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
        signIn(e);
        $('#sign-up-modal').modal('hide');
      }).fail(function(jqxhr) {
        console.error(jqxhr);
      });
    });

    //Makes Sign In AJAX request
    //called by clicking sign-in button OR successfully signing up
    let signIn = function(e){
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
    };

    //Login as existing user
    $('#sign-in').on('submit', function(e) {
      e.preventDefault();
      signIn(e);
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
