import Phaser from 'phaser';

export default class Main extends Phaser.State {
  constructor () {
    super();
    this.hexWidth = 65;
    this.hexHeight = 65;
    this.gridSizeX = 10;
    this.gridSizeY = 12;
    this.columns = [Math.ceil(this.gridSizeY / 2), Math.floor(this.gridSizeY / 2)];
    this.moveIndex;
    this.sectorWidth = this.hexagonWidth / 4 * 3;
    this.sectorHeight = this.hexHeight;
    this.gradient = (this.hexWidth / 4) / (this.hexHeight / 2);
    this.marker;
    this.hexGroup;
  }
  
  preload () {
    this.load.image('dirtTile', 'assets/images/dirt_06.png');
  }

  create () {
    const center = [this.game.world.width / 2, this.game.world.height / 2];
    this.hexGroup = this.game.add.group();
    this.physics.startSystem(Phaser.Physics.ARCADE);
    // for (let i = 0; i < this.gridSizeX; i++) {
    //   for (let j = 0; j < this.gridSizeY; j++) {
    //     let x = center[0] + (i * this.hexWidth) + 20;
    //     let y = center[1] + (j * this.hexHeight) + 20;
    //     let tile = this.game.add.sprite(x, y, 'dirtTile');
    //     tile.scale.setTo(0.5, 0.5);
    //   }
    // }
    let tile0 = this.game.add.sprite(center[0], center[1], 'dirtTile');
    let tile1 = this.game.add.sprite(center[0] + this.hexWidth, center[1] + this.hexHeight, 'dirtTile');
    tile0.scale.setTo(0.5, 0.5)
    tile1.scale.setTo(0.5, 0.5)
  }

  update () {

  }
}