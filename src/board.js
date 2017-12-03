import Phaser from 'phaser';

export default class Board {
  constructor (width, height, gridSizeX, gridSizeY, tileOptions, scale) {
    console.log(width);
    this.tileOptions = tileOptions;
    this.gridSizeX = gridSizeX;
    this.gridSizeY = gridSizeY;
    this.initHexWidth = width;
    this.initHexHeight = height;
    this.gameTileState = [];
    this.reScale(scale);
    this.generateTiles();
  }

  reScale (scaleFactor) {
    this.scaleFactor = scaleFactor;
    this.hexHeight = this.initHexHeight * scaleFactor;
    this.hexWidth = this.initHexWidth * scaleFactor;
    this.hexWidth += (1 * scaleFactor);
    this.firstPosition = {
      x: (0 + this.hexWidth / 2),
      y: (0 + this.hexHeight / 3)
    };
    if (this.gameTileState.length > 0) {
      this.gameTileState.forEach(tile => {
        if (tile) {
          tile.scale = scaleFactor;
        }
      });
    }
  }

  generateTiles () {
    if (this.gameTileState.length === 0) {
      for (let i = 0; i < this.gridSizeY; i++) {
        for (let j = 0; j < this.gridSizeX; j++) {
          let xPosition = this.firstPosition.x + (this.hexWidth * j);
          let yPosition = this.firstPosition.y + (this.hexHeight* i);
          if (i % 2 == 0) {
            let tileType = this.tileOptions[Math.floor(Math.random()*(this.tileOptions.length ))];
            let tile = {type: tileType, x: xPosition, y: yPosition, scale: this.scaleFactor };
            this.gameTileState.push(tile);
          } else if (j != 0) {
            let tileType = this.tileOptions[Math.floor(Math.random()*(this.tileOptions.length ))];
            let tile = {type: tileType, x: xPosition - (0.5 * this.hexWidth), y: yPosition, scale: this.scaleFactor };
            this.gameTileState.push(tile);
          } else {
            this.gameTileState.push(null);
          }
        }
      }
    } else {
      for (let i = 0, counter = 0; i < this.gridSizeY; i++) {
        for (let j = 0; j < this.gridSizeX; j++, counter++) {
          let xPosition = this.firstPosition.x + (this.hexWidth * j);
          let yPosition = this.firstPosition.y + (this.hexHeight* i);
          if (i % 2 == 0) {
            this.gameTileState[counter].x = xPosition;
            this.gameTileState[counter].y = yPosition;
          } else if (j != 0) {
            this.gameTileState[counter].x = xPosition - (0.5 * this.hexWidth)
            this.gameTileState[counter].y = yPosition;
            this.gameTileState[counter].scale = this.scaleFactor;
          }
        }
      }
    }
  }

}