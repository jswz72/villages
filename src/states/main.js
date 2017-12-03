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
    this.game.world.setBounds(0,0, 1400, 1400);
    this.hexGroup = this.game.add.group();
    this.board = new Board(this.initHexWidth, this.initHexHeight, this.gridSizeX, this.gridSizeY, this.tileOptions, 1);
    this.drawBoard();

    this.slider = this.game.add.sprite(this.game.world.width - 50, this.game.world.height / 2, 'slider');
    this.slider.enableBody = true;
    this.slider.inputEnabled = true;
    this.slider.input.useHandCursor = true;
    this.slider.input.enableDrag(false, true);
    this.slider.input.setDragLock(false, true);
    this.game.physics.enable(this.slider);
    this.slider.scale.setTo(0.5, 0.5);

    let playerStartingPos = {
      x: this.board.firstPosition.x + (this.board.hexWidth / 2) * (Math.random() * this.board.gridSizeX),
      y: this.board.firstPosition.y + (this.board.hexHeight / 2) * (Math.random() * this.board.gridSizeY)
    }
    this.player = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, 'dot');
    this.player.enableBody = true;
    this.player.scale.setTo(0.2, 0.2);
    this.cursors = game.input.keyboard.createCursorKeys();
    this.game.camera.follow(this.player);
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
  }

  update () {
    if (this.slider.y != this.sliderPosition && this.slider.y > (this.game.world.height / 4) && this.slider.y < (this.game.world.height * (3/4))) {
      this.sliderPosition = this.slider.y;
      let scaleFactor = (this.slider.y) / this.game.world.height;
      this.hexGroup.removeAll();
      this.board.reScale(scaleFactor);
      this.board.generateTiles();
      this.drawBoard();
    }

    
        if (this.cursors.up.isDown)
        {
            this.player.y += 10;
        }
        else if (this.cursors.down.isDown)
        {
            this.player.y  += -10;
        }
    
        if (this.cursors.left.isDown)
        {
            this.player.x += -10;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.x +=10
        }
  }
}