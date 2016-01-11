import Shape from 'kittik-shape-basic';
import figlet from 'figlet';

export default class FigText extends Shape {
  constructor(options = {}) {
    super(options);

    this.setFont(options.font);
    this.setHorizontalLayout(options.horizontalLayout);
    this.setVerticalLayout(options.verticalLayout);
  }

  /**
   * Get actual width of the shape.
   *
   * @returns {Number}
   */
  getWidth() {
    const text = this._render().split('\n').map(item => item.length);
    return Math.max(...text);
  }

  /**
   * Get actual height of the shape.
   *
   * @returns {Number}
   */
  getHeight() {
    return this._render().split('\n').length;
  }

  /**
   * Get font that uses for rendering text.
   *
   * @returns {String}
   */
  getFont() {
    return this.get('font');
  }

  /**
   * Set font that will be used for rendering the text.
   *
   * @param {String} [font=Standard]
   * @returns {FigText}
   */
  setFont(font = 'Standard') {
    return this.set('font', font);
  }

  /**
   * Get horizontal layout.
   *
   * @returns {String}
   */
  getHorizontalLayout() {
    return this.get('horizontalLayout');
  }

  /**
   * Set horizontal layout.
   *
   * @param {String} [layout=default]
   * @returns {FigText}
   */
  setHorizontalLayout(layout = 'default') {
    if (['default', 'full', 'fitted'].indexOf(layout) === -1) throw new Error(`Unrecognized layout: ${layout}`);
    return this.set('horizontalLayout', layout);
  }

  /**
   * Get vertical layout.
   *
   * @returns {String}
   */
  getVerticalLayout() {
    return this.get('verticalLayout');
  }

  /**
   * Set vertical layout.
   *
   * @param {String} [layout=default]
   * @returns {FigText}
   */
  setVerticalLayout(layout = 'default') {
    if (['default', 'full', 'fitted'].indexOf(layout) === -1) throw new Error(`Unrecognized layout: ${layout}`);
    return this.set('verticalLayout', layout);
  }

  /**
   * Pre render the ASCII art without writing it to the cursor.
   *
   * @returns {String} Returns string of ASCII art
   * @private
   */
  _render() {
    const font = this.getFont();
    const horizontalLayout = this.getHorizontalLayout();
    const verticalLayout = this.getVerticalLayout();

    return figlet.textSync(this.getText(), {font, horizontalLayout, verticalLayout});
  }

  /**
   * Render the shape.
   *
   * @param {Cursor} cursor
   */
  render(cursor) {
    let text = this._render().split('\n');
    let x = this.getX();
    let y = this.getY();
    let background = this.getBackground();
    let foreground = this.getForeground();

    if (typeof background !== 'undefined') cursor.background(background);
    if (typeof foreground !== 'undefined') cursor.foreground(foreground);

    text.forEach((item, index) => cursor.moveTo(x, y + index).write(item));
  }

  /**
   * Serialize shape to object representation.
   *
   * @returns {{name, options}|*}
   */
  toObject() {
    let obj = super.toObject();

    Object.assign(obj.options, {
      font: this.getFont(),
      horizontalLayout: this.getHorizontalLayout(),
      verticalLayout: this.getVerticalLayout()
    });

    return obj;
  }
}
