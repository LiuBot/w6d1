class HanoiView {
  constructor(game, $el) {
  	this.game = game;
  	this.$el = $el;
  	this.fromTowerIdx = null;

    this.$el.on(
      "click",
      "ul",
      this.clickTower.bind(this)
    );

  	this.setupTowers();
  	this.render();
  }


// In the constructor, install a click handler on each pile. I wrote a 
// clickTower method. On the first click to a pile, get the pile number 
// and store this in an instance variable. On the second click (which 
// you can identify because the ivar has been set), perform the move. 
// Reset the ivar after. Alert the user if this was an invalid move.

	unbindEvents(){
		$("ul").off();
	}

	clickTower(event){
// the index() method returns the index position of
// specified elements relative to other specified elements
	 const clickedTowerIdx = $(event.currentTarget).index();

	 if (this.fromTowerIdx === null){
	 	this.fromTowerIdx = clickedTowerIdx;
	 } else {
		 	if (!this.game.move(this.fromTowerIdx, clickedTowerIdx)){

		 		alert("Invalid move! Try again.");
		 	} 

		 		this.fromTowerIdx = null;
			}
		 
		 this.render();

		if (this.game.isWon()){
			this.unbindEvents();
			this.$el.append(`<h2>You've solved the Towers of Hanoi!</h2>`);
 		}
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




// Write a View.prototype.render to alter the DOM elements to reflect 
// the current game state. You should call this in your constructor, too.

// Used .removeClass: Remove a single class, 
// multiple classes, or all classes from each element in the set of matched elements.

	render(){
		const $towers = this.$el.find("ul");
		$towers.removeClass();

		if (this.fromTowerIdx !== null){
			// eq method returns an element using a specific index number of the selected elements
			$towers.eq(this.fromTowerIdx).addClass("selected");
		}

    this.game.towers.forEach( (disks, towerIdx) => {
    	// .find() and .children() methods are similar, except that the latter only travels a single level down the DOM tree.
      const $disks = $towers.eq(towerIdx).children(); // children = the disks at that stack
      $disks.removeClass();

      disks.forEach( (diskWidth, diskIdx) => {
        /*
        Since our disks are stacked from bottom to top
        as [3, 2, 1], we have to select from the back
        of our jQuery object, using negative indices.
        */
        $disks.eq(-1 * (diskIdx + 1)).addClass(`disk-${diskWidth}`);
	
	      });
    });
  }


}


 module.exports = HanoiView;