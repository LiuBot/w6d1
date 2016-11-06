const View = require('./ttt-view')
const Game = require('./game')


// Use jQuery to find the container element in the view that we created in index.html. 
// Make sure you do this inside the $( () => {...}) so that we 
// can be sure that the container element has been loaded.
$( () => {
  // Your code here
  const game = new Game();
  const rootEl = $('.ttt')
  new View(game, rootEl);
});

