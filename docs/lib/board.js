const Board = function(parent, width = 0, height = 0) {
  this.board = document.createElement('pre');
  this.lines;
  this.steps = [];
  this.size = [width, height];
  this.border = [];
  this.cursor = 0;

  this.clear();

  if(parent) {
    document.querySelector(parent).appendChild(this.board);
  }
};

Board.prototype.clear = function() {
  if(this.size[1] > 0) {
    this.lines = [];
    for(let l = 0; l < this.size[1]; l++) {
      this.lines.push('');
    }
  } else {
    this.lines = [];
  }

  this.steps = [];
  this.cursor = 0;
};

Board.prototype.render = function() {
  let steps = this.steps.slice(0);
  this.clear();
  this.sequence(steps);

  if(this.border.length > 0) {
    this.lines = ChatBubble.addBorder(this.lines, this.border[0]);
  }

  this.board.textContent = this.lines.join('\n');
};

Board.prototype.draw = function(text, line = this.cursor, addToSequence = true) {
  if(typeof text === 'string') {
    text = [text];
  }

  let maxLength = 0,
      cursor = line;
  
  if(cursor > this.lines.length - 1 && !this.size[1]) {
    for(let n = this.lines.length; n < cursor; n++) {
      this.lines.push('');
    }
  } else {
    maxLength = this.lines.slice(line, line + text.length)
      .reduce(utils.getMaxLine)
      .length
  }
  
  for(let l = 0; l < text.length; l++) {
    if(cursor > this.lines.length - 1 && !this.size[1]) {
      this.lines.push(utils.getSpaces(maxLength) + text[l]);
    } else if(this.lines[cursor] && this.lines[cursor].length < maxLength) {
      this.lines[cursor] +=
        utils.getSpaces(maxLength - this.lines[cursor].length) + text[l];
    } else if(cursor < this.size[1] || !this.size[1]) {
      this.lines[cursor] += text[l];
    }
    
    cursor++;
  }

  for(let l = line; l < cursor; l++) {
    if(this.size[0] > 0 && this.lines[l]) {
      this.lines[l] = this.lines[l].substring(0, this.size[0]);
    }
  }

  if(addToSequence) {
    this.steps.push([Types.DRAW, text, line]);
  }
};

Board.prototype.sprite = function(name, line) {
  if(SpriteManager.has(name)) {
    this.draw(SpriteManager.get(name), line, false);
    this.steps.push([Types.SPRITE, name, line]);
  }
};

Board.prototype.bubble = function(text, arrow) {
  this.steps.push([Types.BUBBLE, text, arrow]);
  this.draw(ChatBubble.get(text, arrow), undefined, false);
};

Board.prototype.feed = function(lines = 0) {
  this.cursor = -1;
  this.lines.forEach((line, index) => {
    if(line.length > 0) {
      this.cursor = -1;
    } else if(this.cursor < 0) {
      this.cursor = index;
    }
  });

  if(this.cursor < 0) {
    this.cursor = this.lines.length;
  }

  this.cursor += lines;

  this.steps.push([Types.FEED, lines]);
};

Board.prototype.space = function(space = 1) {
  this.steps.push([Types.SPACE, space]);
  this.draw(
    new Array(this.lines.length - this.cursor).fill(utils.getSpaces(space)), 
    undefined, false);
};

Board.prototype.sequence = function(steps) {
  for(let s = 0; s < steps.length; s++) {
    switch(steps[s][0]) {
      case Types.SPRITE:
        this.sprite(steps[s][1], steps[s][2]);
        break;
      case Types.FEED:
        this.feed(steps[s][1])
        break;
      case Types.SPACE:
        this.space(steps[s][1]);
        break;
      case Types.BUBBLE:
        this.bubble(steps[s][1], steps[s][2]);
        break;
      case Types.DRAW:
        this.draw(steps[s][1], steps[s][2]);
        break;
    }
  }
};

Board.prototype.setBorder = function(corners = '/\\\\/') {
  this.border = [corners]; //placeholder prop for now
};