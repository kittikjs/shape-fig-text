"use strict";

const FigText = require('../lib/FigText').default;
const cursor = require('kittik-cursor').Cursor.create().resetTTY();

FigText.create({
  text: 'KittikJS Rules',
  y: 3,
  font: 'Red Phoenix',
  foreground: cursor.COLORS.WHITE
}).render(cursor);

cursor.flush();
