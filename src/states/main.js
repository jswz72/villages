import Phaser from 'phaser';
import Board from '../board.js'

export default class Main extends Phaser.State {
  constructor () {
    super();
    this.initHexWidth = 122;
    this.initHexHeight = 108;
    this.gridSizeX = 20;
    this.gridSizeY = 15;
    this.sliderPosition;
  }
     
  preload () {
    this.load.image('dirt', 'assets/images/dirt.png');
    this.load.image('dirtForest', 'assets/images/dirtForest_1.png');
    this.load.image('dirtMountain', 'assets/images/dirtMountain_1.png');
    this.load.image('grass', 'assets/images/grass.png');
    this.load.image('grassMountain', 'assets/images/grassMountain_1.png');
    this.load.image('grassForest', 'assets/images/grassForest_1.png');
    this.load.image('sand', 'assets/images/sand.png');
    this.load.image('sandForest', 'assets/images/sandForest_1.png');
    this.load.image('sandMountain', 'assets/images/sandMountain_1.png');
    this.load.image('slider', 'assets/images/mushroom2.png');
  }

  create () {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.board = new Board(this.initHexWidth, this.initHexHeight, this.gridSizeX, this.gridSizeY, this.game);
    this.slider = this.game.add.sprite(this.game.world.width - 50, this.game.world.height / 2, 'slider');
    this.slider.enableBody = true;
    this.slider.inputEnabled = true;
    this.slider.input.useHandCursor = true;
    this.slider.input.enableDrag(false, true);
    this.slider.input.setDragLock(false, true);
    this.game.physics.enable(this.slider);
    this.slider.scale.setTo(0.5, 0.5);
  }

  update () {
    if (this.slider.y != this.sliderPosition && this.slider.y > (this.game.world.height / 4) && this.slider.y < (this.game.world.height * (3/4))) {
      this.sliderPosition = this.slider.y;
      let scaleFactor = (this.slider.y) / this.game.world.height;
      this.board.reScale(scaleFactor);
    }
  }
}