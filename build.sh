LIB_FILES="docs/lib/utils.js\
  docs/lib/spriteManager.js\
  docs/content/sprites.js\
  docs/lib/chatBubble.js\
  docs/lib/board.js\
  docs/lib/comic.js\
  docs/content/comics.js";

uglifyjs $LIB_FILES\
  -o docs/lib/lib.min.js

  