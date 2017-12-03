export default class uiElement {
  constructor (id) {
    this.el = $('#' + id);
  }

  get top () {
    return this.el.position().top;
  }

  get left () {
    return this.el.position().left;
  }

  set top (offset) {
     this.el.css('top', this.top + offset)
  }

  set left (offset) {
    this.el.css('left', this.left + offset);
  }
}