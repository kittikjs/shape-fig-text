"use strict";

const FigText = require('../lib/FigText').default;
const cursor = require('kittik-cursor').Cursor.create().resetTTY();

FigText.create({
  text: 'Hello, there!',
  font: 'Ghost',
  background: cursor.COLORS.LIGHT_CORAL,
  foreground: cursor.COLORS.BLACK
}).render(cursor);

cursor.flush();
