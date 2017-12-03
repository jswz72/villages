import Phaser from 'phaser';

export default class Board {
  constructor (width, height, gridSizeX, gridSizeY, game, scale = 1) {
    
    this.game = game;
    console.log(this.game);
    
    this.tileOptions = ['dirt','sand','grass','dirtMountain', 'sandMountain', 'grassMountain', 'dirtForest', 'sandForest', 'grassForest'];
    this.gameTileState = [];
    this.reScale(scale);
    this.hexGroup = this.game.add.group();
    this.drawTiles();
  }

  reScale (scaleFactor) {
    this.hexHeight = this.initialHexHeight * this.scaleFactor;
    this.hexWidth = this.initialHexWidth * this.scaleFactor;
    this.hexWidth += (1 * this.scaleFactor);
    this.firstPosition = {
      x: (0 + this.hexWidth / 2),
      y: (0 + this.hexHeight / 3)
    };
  }

  drawTiles () {
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
      this.hexGroup.removeAll();
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

}