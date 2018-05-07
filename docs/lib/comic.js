const Comic = function(container) {
  this.name = 'Comic ' + Math.round(Math.random() * 1000000);
  this.page = new Board(container);
  this.panels = [];
};

Comic.prototype.createPanel = function() {
  let panel = new Board();
  panel.setBorder();

  this.addPanel(panel);
  return panel;
};

Comic.prototype.addSequence = function(sequence) {
  let panel = this.createPanel();
  panel.sequence(sequence);
  return panel;
};

Comic.prototype.addPanel = function(board) {
  this.panels.push(board);
};

Comic.prototype.feed = function() {
  this.panels.push(Types.FEED);
};

Comic.prototype.load = function(data) {
  this.name = data.name;
  this.panels = [];

  for(let p = 0; p < data.panels.length; p++) {
    if(data.panels[p] === Types.FEED) {
      this.feed();
    } else {
      this.addSequence(data.panels[p]);
    }
  }
};

Comic.prototype.render = function() {
  this.page.clear();

  for(let p = 0; p < this.panels.length; p++) {
    if(this.panels[p] === Types.FEED) {
      this.page.feed(1);
    } else {
      this.panels[p].render();
      this.page.draw(this.panels[p].lines);

      if(p !== this.panels.length - 1 && this.panels[p + 1] !== Types.FEED) {
        this.page.space(2);
      }
    }
  }

  this.page.render();
};

Comic.prototype.export = function() {
  let comic = {
    name: this.name,
    panels: [] 
  };

  for(let p = 0; p < this.panels.length; p++) {
    if(this.panels[p] === Types.FEED) {
      comic.panels.push(Types.FEED);
    } else {
      comic.panels.push(this.panels[p].steps);
    }
  }

  return JSON.stringify(comic).replace(Comic.nullReplace, '');
};

Comic.nullReplace = /,null/g;