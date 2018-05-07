const sprites = {
  "facebase": "*-----*\n| o o |\n|  -  |\n*-----*",
  "cowboy": "   ___\n  |   |\n/-------\\\n | o o |\n |  -  |\n  *---*",
  "beardman": " /+++\\\n| o o |\n|V(-)V|\n \\VVV/\n  \\V/",
  "crazydino": "\\,--------\\\n | (.)   (@))  \n  \\   /\\__o_o) \n   \\_| / VVVVV  \n    \\ \\    \\   \n      `-`^^^^' ",
  "nerd": ".#####.\n|-o^o-|\n[__-__]",
  "ninjabot": " .---.\n|=====|&\n \\___/"
};

for(let s in sprites) {
  SpriteManager.set(s, sprites[s]);
}