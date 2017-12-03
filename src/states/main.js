import Phaser from 'phaser';
import Board from '../board.js';
import UI from '../UI/uiElement';
import Slider from '../UI/Slider';

export default class Main extends Phaser.State {
  constructor () {
    super();
    this.gameHeight = 400;
    this.initHexWidth = 122;
    this.initHexHeight = 108;
    this.gridSizeX = 20;
    this.gridSizeY = 15;
    this.sliderPosition;
    this.tileOptions = [];
  }

  drawBoard () {
    this.board.gameTileState.forEach(tile => {
      if (tile) {
        let newTile = this.game.add.sprite(tile.x, tile.y, tile.type);
        newTile.scale.setTo(tile.scale, tile.scale);
        this.hexGroup.add(newTile);
      }
    })
  }
     
  preload () {
    this.load.image('dirt', 'assets/images/dirt.png');
    this.tileOptions.push('dirt');
    this.load.image('dirtForest', 'assets/images/dirtForest_1.png');
    this.tileOptions.push('dirtForest');
    this.load.image('dirtMountain', 'assets/images/dirtMountain_1.png');
    this.tileOptions.push('dirtMountain');
    this.load.image('grass', 'assets/images/grass.png');
    this.tileOptions.push('grass');
    this.load.image('grassMountain', 'assets/images/grassMountain_1.png');
    this.tileOptions.push('grassMountain');
    this.load.image('grassForest', 'assets/images/grassForest_1.png');
    this.tileOptions.push('grassForest');
    this.load.image('sand', 'assets/images/sand.png');
    this.tileOptions.push('sand');
    this.load.image('sandForest', 'assets/images/sandForest_1.png');
    this.tileOptions.push('sandForest');
    this.load.image('sandMountain', 'assets/images/sandMountain_1.png');
    this.tileOptions.push('sandMountain');
    this.load.image('slider', 'assets/images/mushroom2.png');
this.load.image('dot', 'assets/images/dot.png');
  }

  create () {
    this.game.world.setBounds(0, 0, 1000, 600);
    this.hexGroup = this.game.add.group();
    this.board = new Board(this.initHexWidth, this.initHexHeight, this.gridSizeX, this.gridSizeY, this.tileOptions, 1);
    this.drawBoard();

    this.slider = new Slider('ui-slider');
    this.sliderPosition = this.slider.top;
    this.slider.makeDraggable();

    this.playerPos = {
      x: this.board.firstPosition.x + (this.board.hexWidth / 2) * (Math.random() * this.board.gridSizeX),
      y: this.board.firstPosition.y + (this.board.hexHeight / 2) * (Math.random() * this.board.gridSizeY)
    }
    this.player = this.game.add.sprite(this.playerPos.x, this.playerPos.y, 'dot');
    this.player.enableBody = true;
    this.player.scale.setTo(0.01, 0.01);
    this.cursors = game.input.keyboard.createCursorKeys();
    this.game.camera.follow(this.player);
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
  }

  update () {
    if (this.slider.top != this.sliderPosition && this.slider.top >= (this.gameHeight / 4) && this.slider.top <= (this.gameHeight * (3/4))) {
      this.sliderPosition = this.slider.top;
      let scaleFactor = this.sliderPosition / this.gameHeight;
      this.hexGroup.removeAll();
      this.board.reScale(scaleFactor);
      this.board.generateTiles();
      this.drawBoard();

      console.log(scaleFactor);
      this.player.x = this.playerPos.x * scaleFactor
      this.player.y = this.playerPos.y *  scaleFactor
    }

    
        if (this.cursors.up.isDown)
        {
            this.player.y += -10;
            this.playerPos.y += -10;
        }
        else if (this.cursors.down.isDown)
        {
            this.player.y  += 10;
            this.playerPos.y += 10;
        }
    
        if (this.cursors.left.isDown)
        {
            this.player.x += -10;
            this.playerPos.x += -10;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.x +=10
            this.playerPos.x += 10;
        }
  }
}