import Shape from 'kittik-shape-basic';
import figlet from 'figlet';

export default class FigText extends Shape {
  /**
   * Create ASCII-art shape.
   *
   * @param {Cursor} cursor Cursor instance
   * @param {Object} [options]
   * @param {String} [options.font]
   * @param {String} [options.horizontalLayout]
   * @param {String} [options.verticalLayout]
   */
  constructor(cursor, options = {}) {
    super(cursor, options);

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
   * @returns {FigText}
   */
  render() {
    const cursor = this.getCursor();
    const text = this._render().split('\n');
    const x = this.getX();
    const y = this.getY();
    const background = this.getBackground();
    const foreground = this.getForeground();

    cursor.background(background).foreground(foreground);

    text.forEach((item, index) => cursor.moveTo(x, y + index).write(item));

    return this;
  }

  /**
   * Serialize shape to object representation.
   *
   * @returns {{name, options}|*}
   */
  toObject() {
    const obj = super.toObject();

    Object.assign(obj.options, {
      font: this.get('font'),
      horizontalLayout: this.get('horizontalLayout'),
      verticalLayout: this.get('verticalLayout')
    });

    return obj;
  }
}
