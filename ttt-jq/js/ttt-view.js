class View {
  constructor(game, $el) {
  	this.game = game;
  	this.$el = $el;
  	this.setupBoard();
  	this.bindEvents();
  }

  bindEvents() {
   let view = this
    $('li').click(function(e) {
      e.preventDefault();
      view.makeMove($(this));
    });
  }

  unbindEvents(){
    $('li').off();
  }

  makeMove($square) {
  	const pos = $square.data("pos");

  	if (this.game.board.isEmptyPos(pos)){
  		const mark = this.game.currentPlayer;
  		this.game.playMove(pos);
  		$square.html(mark).addClass('played').addClass(mark);
  	} else {
  		alert('Invalid Move! That pos is already taken.');
  	}
// // if move is invalid
//   	try {
//   		this.game.playMove(pos);
//   	} catch(e){
//   		alert("Invalid move! Choose a different position");


  	if (this.game.isOver()){
		const winner = this.game.winner();
    this.unbindEvents();
      

        //how do we select the winning pos? 
      if (winner){
        this.$el.addClass(`winner-${winner}`)
        $("li.x").not(`winner-${winner}`).addClass('loser'); // ones without winner class are lp
        $("li.o").not(`winner-${winner}`).addClass('loser'); // ones without winner class are lp

       this.$el.append(`<h2>You win, player ${winner.toUpperCase()}!</h2>`);
      } else {
    this.$el.append("<h2>It's a draw!</h2>"); 
    }
    }
  }


// Write a View.prototype.setupBoard method; it should make a grid to 
// represent the board. Build the grid using an unordered list (<ul>). 
// The cells can be represented inside the grid using <li> elements. By 
// floating the <li> elements left and giving the <ul> a fixed width, 
// the cells will appear on the same line and nicely wrap around to form 
// a 3x3 grid. Set a border on the cells to make it look like a real 
// grid. Style unclicked cells with a gray background. Change the 
// background to yellow while the user :hovers over an unclicked cell.

  setupBoard() {
  	const $ul = $("<ul>");
  	$ul.addClass("cf");

  	for (let rowIdx = 0; rowIdx < 3 ; rowIdx++){
  		for(let colIdx=0; colIdx <3; colIdx++){
  			let $li = $("<li>");
  			$li.data("pos", [rowIdx, colIdx]);
  			
  			$ul.append($li); // add li to ul
  		}
  	}
  	this.$el.append($ul); // add ul/grid to view
  }
}

module.exports = View;
