import uiElement from './uiElement';

export default class Slider extends uiElement {
  constructor (id) {
   super(id);
  }

  makeDraggable () {
    this.el.mousedown(() => {
      $('body').on('mouseup', () => {
        $('body').off('mousemove');
        $('body').off('mouseup');
      })
      $('body').on('mousemove', (e) => {
        if (e.pageY <= 360)
        this.el.offset({top: e.pageY})
      })
    });
  }



}