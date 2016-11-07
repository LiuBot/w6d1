/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const HanoiView = __webpack_require__(2);

	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new Game();
	  new HanoiView(game, rootEl);
	console.log('dogs');
	});


	// Use jQuery to find the container element in the view that we created in index.html. 
	// Make sure you do this inside the $( () => {...}) so that we 
	// can be sure that the container element has been loaded.



/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);