import { assert } from 'chai';
import FigText from '../../src/FigText';

describe('Shape::FigText', () => {
  it('Should properly create FigText instance', () => {
    let text = new FigText();
    assert.instanceOf(text, FigText);
  });
});
