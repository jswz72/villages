import Phaser from 'phaser';

export default class Main extends Phaser.State {
  constructor () {
    super();
    this.initialHexWidth = 122;
    this.initialHexHeight = 108;
    this.gridSizeX = 20;
    this.gridSizeY = 15;
    this.columns = [Math.ceil(this.gridSizeY / 2), Math.floor(this.gridSizeY / 2)];
    this.moveIndex;
    this.sectorWidth = this.hexagonWidth / 4 * 3;
    this.sectorHeight = this.hexHeight;
    this.gradient = (this.hexWidth / 4) / (this.hexHeight / 2);
    this.marker;
    this.hexGroup;
    this.scaleFactor = 0.4;
    this.sliderPosition;
    this.gameTileState = [];
  }

  drawTiles () {
    this.hexHeight = this.initialHexHeight * this.scaleFactor;
    this.hexWidth = this.initialHexWidth * this.scaleFactor;
    this.hexWidth += (1 * this.scaleFactor);
    this.firstPosition = {
      x: (0 + this.hexWidth / 2),
      y: (0 + this.hexHeight / 3)
    };
    if (this.gameTileState.length === 0) {
      for (let i = 0; i < this.gridSizeY; i++) {
        for (let j = 0; j < this.gridSizeX; j++) {
          let xPosition = this.firstPosition.x + (this.hexWidth * j);
          let yPosition = this.firstPosition.y + (this.hexHeight* i);
          if (i % 2 == 0) {
            let tileType = this.tileOptions[Math.floor(Math.random()*(this.tileOptions.length ))];
            this.gameTileState.push(tileType);
            let tile = this.game.add.sprite(xPosition, yPosition, tileType);
            tile.scale.setTo(this.scaleFactor, this.scaleFactor);
            this.hexGroup.add(tile);
          } else if (j != 0) {
            let tileType = this.tileOptions[Math.floor(Math.random()*(this.tileOptions.length ))];
            this.gameTileState.push(tileType);
            let tile = this.game.add.sprite(xPosition - (0.5 * this.hexWidth), yPosition, tileType);
            tile.scale.setTo(this.scaleFactor, this.scaleFactor);
            this.hexGroup.add(tile);
          } else {
            this.gameTileState.push('');
          }
        }
      }
    } else {
      for (let i = 0, counter = 0; i < this.gridSizeY; i++) {
        for (let j = 0; j < this.gridSizeX; j++, counter++) {
          let xPosition = this.firstPosition.x + (this.hexWidth * j);
          let yPosition = this.firstPosition.y + (this.hexHeight* i);
          if (i % 2 == 0) {
            let tile = this.game.add.sprite(xPosition, yPosition, this.gameTileState[counter]);
            tile.scale.setTo(this.scaleFactor, this.scaleFactor);
            this.hexGroup.add(tile);
          } else if (j != 0) {
            let tile = this.game.add.sprite(xPosition - (0.5 * this.hexWidth), yPosition, this.gameTileState[counter]);
            tile.scale.setTo(this.scaleFactor, this.scaleFactor);
            this.hexGroup.add(tile);
          }
        }
      }
    }
    
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
    this.gameTileState = [];
    this.tileOptions = ['dirt','sand','grass','dirtMountain', 'sandMountain', 'grassMountain', 'dirtForest', 'sandForest', 'grassForest'];
    this.hexGroup = this.game.add.group();
    this.drawTiles();
    this.physics.startSystem(Phaser.Physics.ARCADE);

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
      this.hexGroup.removeAll();
      this.scaleFactor = (this.slider.y) / this.game.world.height;
      this.drawTiles();
    }
  }
}