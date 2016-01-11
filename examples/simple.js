"use strict";

const FigText = require('../lib/FigText').default;
const cursor = require('kittik-cursor').Cursor.create().resetTTY();

FigText.create({
  text: 'KittikJS\n    Rules\n           !!!',
  x: 'center',
  y: 'middle',
  font: 'Star Wars',
  foreground: 'yellow_1',
  horizontalLayout: 'full'
}).render(cursor);

cursor.flush();
