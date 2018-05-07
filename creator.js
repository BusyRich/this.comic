const Creator = {
  comic: null,
  panel: null,
  $sprites: null,
  $tabs: null,
  $tabLinks: null,
  $spriteFields: {
    name: null,
    text: null
  },
  $bubbleFields: {
    text: null,
    arrow: null
  },
  $settings: {
    comicJSON: null,
    spritesJSON: null
  },
  addSprite: function(name, sprite) {
    this.$sprites.append($('<pre/>', {
      text: sprite,
      'data-name': name
    }));

    this.setSpritesJSON();
  },
  addPanelToPage: function() {
    this.comic.addSequence(Creator.panel.steps);
    this.panel.clear();
  
    this.comic.render();
    this.panel.render();

    Creator.$settings.comicJSON.text(Creator.comic.export());
  },
  setSpritesJSON: function() {
    let sprites = {};
    for(let s in SpriteManager.sprites) {
      sprites[s] = SpriteManager.sprites[s].join('\n');
    }

    this.$settings.spritesJSON.text(
      JSON.stringify(sprites, null, 2));
  }
};

$(document).ready(function() {
  Creator.comic = new Comic('#page');
  Creator.panel = new Board('#panel');

  Creator.panel.setBorder();
  Creator.panel.render();

  Creator.$tabs = $('#tabs .content');
  Creator.$tabLinks = $('#tabs #links a');

  Creator.$sprites = $('#sprites');

  Creator.$spriteFields.name = $('#spriteName');
  Creator.$spriteFields.text = $('#spriteText');

  Creator.$bubbleFields.text = $('#bubbleText');
  Creator.$bubbleFields.arrow = $('#bubbleArrow');

  Creator.$settings.comicJSON = $('#comicJSON');
  Creator.$settings.spritesJSON = $('#spritesJSON');

  Creator.$tabLinks.on('click', function(evt) {
    Creator.$tabLinks.removeClass('active');
    Creator.$tabs.hide();

    $(this).addClass('active');
    Creator.$tabs.filter(this.getAttribute('href')).show();

    evt.preventDefault();
  });

  Creator.$sprites.on('click', 'pre', function() {
    Creator.panel.sprite($(this).data('name'));
    Creator.panel.render();
  });

  for(let s in sprites) {
    Creator.addSprite(s, sprites[s]);
  }

  $('#setSprite').click(function() {
    let name = Creator.$spriteFields.name.val(),
        text = Creator.$spriteFields.text.val();
    
    Creator.addSprite(name, text);
    SpriteManager.set(name, text);
  });

  $('#addBubble').click(function() {
    Creator.panel.bubble(
      Creator.$bubbleFields.text.val().split('\n'),
      Creator.$bubbleFields.arrow.val()
    );
    Creator.panel.render();
  });

  $('#addPanel').click(function() {
    Creator.addPanelToPage();
  });

  $('#pageFeed').click(function() {
    Creator.comic.feed();
  });

  Creator.$tabLinks.get(0).click();
});