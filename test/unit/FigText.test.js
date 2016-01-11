import { assert } from 'chai';
import { Cursor } from 'kittik-cursor';
import sinon from 'sinon';
import FigText from '../../src/FigText';

describe('Shape::FigText', () => {
  it('Should properly create FigText instance', () => {
    let text = new FigText();
    assert.instanceOf(text, FigText);
  });

  it('Should properly get/set font', () => {
    let text = new FigText();
    assert.equal(text.getFont(), 'Standard');
    assert.instanceOf(text.setFont('Ghost'), FigText);
    assert.equal(text.getFont(), 'Ghost');
  });

  it('Should properly get/set horizontal layout', () => {
    let text = new FigText();
    assert.equal(text.getHorizontalLayout(), 'default');
    assert.instanceOf(text.setHorizontalLayout('full'), FigText);
    assert.equal(text.getHorizontalLayout(), 'full');
  });

  it('Should properly throw exception if horizontal layout is wrong', () => {
    let text = new FigText();
    assert.throws(() => text.setHorizontalLayout('wrong'), Error, 'Unrecognized layout: wrong');
  });

  it('Should properly get/set vertical layout', () => {
    let text = new FigText();
    assert.equal(text.getVerticalLayout(), 'default');
    assert.instanceOf(text.setVerticalLayout('fitted'), FigText);
    assert.equal(text.getVerticalLayout(), 'fitted');
  });

  it('Should properly throw exception if vertical layout is wrong', () => {
    let text = new FigText();
    assert.throws(() => text.setVerticalLayout('wrong'), Error, 'Unrecognized layout: wrong');
  });

  it('Should properly render with default options', () => {
    let cursor = Cursor.create();
    let text = new FigText();
    let mock = sinon.mock(cursor);

    mock.expects('background').never();
    mock.expects('foreground').never();
    mock.expects('moveTo').exactly(6).returns(cursor);
    mock.expects('write').exactly(6).withArgs('').returns(cursor);

    text.render(cursor);

    mock.verify();
  });

  it('Should properly render with custom options', () => {
    let cursor = Cursor.create();
    let text = new FigText({background: 'black', foreground: 'white'});
    let mock = sinon.mock(cursor);

    mock.expects('background').once().withArgs('black');
    mock.expects('foreground').once().withArgs('white');
    mock.expects('moveTo').exactly(6).returns(cursor);
    mock.expects('write').exactly(6).returns(cursor);

    text.render(cursor);

    mock.verify();
  });

  it('Should properly create Object representation', () => {
    let text = new FigText({text: 'test', font: 'Ghost', horizontalLayout: 'full', verticalLayout: 'fitted'});
    let obj = text.toObject();

    assert.deepEqual(obj, {
      type: 'FigText',
      options: {
        text: 'test',
        width: 15,
        height: 5,
        x: 10,
        y: 10,
        background: undefined,
        foreground: undefined,
        font: 'Ghost',
        horizontalLayout: 'full',
        verticalLayout: 'fitted'
      }
    });
  });

  it('Should properly create FigText instance from Object representation', () => {
    let text = FigText.fromObject({
      type: 'FigText',
      options: {
        text: 'test',
        x: 'center',
        y: 'middle',
        background: undefined,
        foreground: undefined,
        font: 'Ghost',
        horizontalLayout: 'full',
        verticalLayout: 'fitted'
      }
    });

    assert.instanceOf(text, FigText);
    assert.equal(text.getText(), 'test');
    assert.equal(text.get('x'), 'center');
    assert.equal(text.get('y'), 'middle');
    assert.isUndefined(text.getBackground());
    assert.isUndefined(text.getForeground());
    assert.equal(text.getFont(), 'Ghost');
    assert.equal(text.getHorizontalLayout(), 'full');
    assert.equal(text.getVerticalLayout(), 'fitted');
  });
});
