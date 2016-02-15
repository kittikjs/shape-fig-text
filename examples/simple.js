"use strict";

const FigText = require('../lib/FigText');
const cursor = require('kittik-cursor').create().resetTTY();

FigText.create({
  text: 'KittikJS',
  x: 'center',
  y: 'middle',
  font: 'Star Wars',
  foreground: 'yellow_1',
  horizontalLayout: 'full'
}).render(cursor);

cursor.moveTo(1, process.stdout.rows).flush();
