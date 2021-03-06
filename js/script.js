(function(){
var start = '<div class="screen screen-start" id="start">' +
			        '<header>'+
			        '<h1>Tic Tac Toe</h1>'+
			          '<a href="#" class="button">Start game</a>'+
			        '</header>' +
			      '</div>';

var board = '<div class="board" id="board">'+
				      '<header>'+
				        '<h1>Tic Tac Toe</h1>'+
				        '<ul>'+
					        '<li class="players" id="player1">'+
					        '<svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg>'+
					        '</li>'+
					        '<li class="players" id="player2">'+
					        '<svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg>'+
					        '</li>'+
				        '</ul>'+
				      '</header>'+
			        '<ul class="boxes">'+
			          '<li class="box"></li>'+
			          '<li class="box"></li>'+
			          '<li class="box"></li>'+
			          '<li class="box"></li>'+
			          '<li class="box"></li>'+
			          '<li class="box"></li>'+
			          '<li class="box"></li>'+
			          '<li class="box"></li>'+
			          '<li class="box"></li>'+
			        '</ul>'+
			      '</div> ';
var winner ='<div class="screen screen-win" id="finish">'+
              '<header>'+
                '<h1>Tic Tac Toe</h1>'+
                '<p class="message"></p>'+
                '<a href="#" class="button">New game</a>'+
              '</header>'+
            '</div>';


 
function Agame(){
  
  this.game = [0,0,0,0,0,0,0,0,0];//represents each square
  this.turnsRemaining = 9;
}

//insert javascript for winning player screen
Agame.prototype.winner = function(player){
  $('body div').remove();
  $('body').append(winner);
  if(player == 1){
    $('#finish').addClass('screen-win-one');
    $('.message').text('Winner');
  }
  else if(player==2){
    $('#finish').addClass('screen-win-two');
    $('.message').text('Winner');
  }
  else{
    $('#finish').addClass('screen-win-tie');
    $('.message').text("It's a Tie!");
  }

  
  $('.button').click(function(){
    $('body div').remove();
    $('body').append(board);
    startGame();
  });
};

//check each win combination and tie 
Agame.prototype.win = function(){
   if(this.game[0] == this.game[1] && this.game[1] == this.game[2] && this.game[0] !== 0){
        this.winner(this.game[0]);
    }
    else if(this.game[3] == this.game[4] && this.game[4] == this.game[5] && this.game[3] !== 0){
      this.winner(this.game[3]);
    }
    else if(this.game[6] == this.game[7] && this.game[7] == this.game[8] && this.game[6] !== 0){
      this.winner(this.game[6]);
    }
    //diagonal
    else if(this.game[0] == this.game[4] && this.game[4] == this.game[8] && this.game[0] !== 0){
      this.winner(this.game[0]);
    }
    else if(this.game[2] == this.game[4] && this.game[4] == this.game[6] && this.game[2] !== 0){
      this.winner(this.game[2]);
    }
    //vertical
    else if(this.game[0] == this.game[3] && this.game[3] == this.game[6] && this.game[0] !==0){
      this.winner(this.game[0]);
    }
    else if(this.game[1]==this.game[4]&& this.game[4]==this.game[7] && this.game[1] !== 0){
      this.winner(this.game[1]);
    }
    else if(this.game[2]==this.game[5]&&this.game[5]==this.game[8] && this.game[2] !== 0){
      this.winner(this.game[2]);
    }
    else if(this.turnsRemaining > 0){
      return;
    }
    else{
      this.winner(0);
    }
};


//append html for start screen
$('body div').remove();
$('body').append(start);
//event handler - start game when button is clicked
$('.button').click(function(){
	$('body div').remove();
  $('body').append(board);
  startGame();
});

//this function will start by setting player 'X' to move first
//initialize a game object and the funcitonality for each square
function startGame(){
  $('#player2').addClass('active');
  var thisGame = new Agame();
  $('.boxes li').hover(function(){
    if($('.players.active').attr('id') === 'player1'){
      $(this).css('background-image', 'url(img/o.svg)');
    }
    else{
      $(this).css('background-image', 'url(img/x.svg)');
    }
  },function(){
    $(this).css('background-image', '');
  });
  
  //add click funtionality to tic-tac-toe board
  $('.box').click(function(){
    //player1 turn
    if($('.players.active').attr('id') === 'player1'){
      $('#player1').removeClass('active'); //class to signify a players turn
      $('#player2').addClass('active');
      $(this).addClass('box-filled-1'); //addclass to represent clicked box
      $(this).off();  //disable all events for that box
      thisGame.game[$(this).index()] = 1; //puts a 1 into the game array for position of selected square
      thisGame.turnsRemaining--;
      thisGame.win();
      
    }//player2 turn
    else{
      $('#player2').removeClass('active'); //same as above except for player2
      $('#player1').addClass('active');
      $(this).addClass('box-filled-2');
      $(this).off();
      thisGame.game[$(this).index()] = 2;
      thisGame.turnsRemaining--;
      thisGame.win();

    }
  });
}

})();
