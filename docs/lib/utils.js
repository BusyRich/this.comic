const utils = {
  getMaxLine:  function(a, b) {
    return a.length > b.length ? a : b;
  },
  getSpaces: function(count) {
    return ' '.repeat(count);
  }
};

const Types = {
  SPRITE: 'sprite',
  FEED: 'feed',
  SPACE: 'space',
  BUBBLE: 'bubble',
  DRAW: 'draw'
};