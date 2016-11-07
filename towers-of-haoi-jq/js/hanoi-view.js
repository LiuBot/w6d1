class HanoiView {
  constructor(game, $el) {
  	this.game = game;
  	this.$el = $el;
  	this.setupTowers();
  }

// Write a View.prototype.setupTowers method to fill the main DOM 
// element with a "naive" representation of the game (i.e., not 
// reflecting the current game state). Use <ul> elements to store three 
// piles. Inside, use <li>s to store the discs. Call this in your 
// constructor.


  setupTowers(){
  	this.$el.empty();
  	this.$el.addClass("cf");

  	let $tower, $disk;

  	for (let towerIdx = 0; towerIdx < 3 ; towerIdx++){
  		$tower = $("<ul>");

  		for(let diskIdx = 0; diskIdx <3; diskIdx++){
  			$disk = $("<li>");
  			$tower.append($disk);
  			$disk.data("pos", towerIdx, diskIdx);
  		}
  		this.$el.append($tower);
  	}
	}



}


 module.exports = HanoiView;