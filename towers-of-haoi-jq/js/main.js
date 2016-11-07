const Game = require("./game");
const HanoiView = require("./hanoi-view");

$( () => {
  const rootEl = $('.hanoi');
  const game = new Game();
  new HanoiView(game, rootEl);
console.log('dogs');
});


// Use jQuery to find the container element in the view that we created in index.html. 
// Make sure you do this inside the $( () => {...}) so that we 
// can be sure that the container element has been loaded.

