const ChatBubble = {
  addBorder: function(lines, corners = '****') {
    let maxLength = lines.reduce(utils.getMaxLine).length,
        line,
        padding = 0,
        text = lines.slice(0);

    for(var l = 0; l < text.length; l++) {
      line = '| ';

      if(text[l].length === maxLength) {
        line += text[l];
      } else {
        padding = maxLength - text[l].length;
        line += text[l] + utils.getSpaces(padding);
      }

      line += ' |'

      text[l] = line;
    }

    if(corners.length === 1) {
      corners = corners.repeat(4);
    } else if(corners.length === 2) {
      corners = corners[0].repeat(2) + corners[1].repeat(2);
    } else if(corners.length === 3) {
      corners += '*';
    } else if(corners.length > 4) {
      corners = corners.substring(0, 4);
    }

    //Add a top
    text.unshift(
        ' ' + '_'.repeat(text[0].length - 2) + ' ',
        corners[0] + ' '.repeat(text[0].length - 2) + corners[1]);

    //Add a bottom
    text.push(corners[2] + '_'.repeat(text[0].length - 2) + corners[3]);

    return text;
  },
  addLeftArrow: function(text) {
    for(var l = 0; l < text.length; l++) {
       text[l] = ' ' + text[l];
    }
    
    text[2] = '< ' + text[2].substring(2);
  },
  addTopArrow: function(text) {
    text[0] = text[0][0] + '/\\' + text[0].substring(3);
  },
  addBottomArrow: function(text) {
    let l = text.length - 1;
    text[l] = text[l][0] + '  ' + text[l].substring(3);
    text.push(' \\/');
  },
  addRightArrow: function(text) {
    let l = text.length - 1;
    text[2] = text[2].slice(0, -1) + ' >'
  },
  get: function(lines, arrow = 'l', corners) {
    text = lines.slice(0);

    if(typeof text === 'string') {
      text = [text];
    }

    text = this.addBorder(text, corners);

    switch(arrow) {
      case 't':
        this.addTopArrow(text);
        break;
      case 'l':
        this.addLeftArrow(text);
        break;
      case 'b':
        this.addBottomArrow(text);
        break;
      case 'r':
        this.addRightArrow(text);
        break;
    }
    
    return text;
  }
};