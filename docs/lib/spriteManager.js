const SpriteManager = {
  sprites: {},
  has: function(name) {
    return this.sprites.hasOwnProperty(name);
  },
  get: function(name) {
    return this.sprites[name];
  },
  set: function(name, text) {
    this.sprites[name] = text.split('\n');
  }
};