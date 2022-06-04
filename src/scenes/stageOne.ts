import Phaser from 'phaser'
// import { Player, } from '../classes/player'

export default class StageOneScene extends Phaser.Scene {
  // private player!: Player

  constructor() {
    super(StageOneScene.name)
  }

  preload() {
    this.load.image('hobbit', 'assets/characters/hobbit/hobbit.png')

  }

  create() {
    // this.player = new Player(this, 100, 100)
    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Stage 1')
    this.add.sprite(100, 100, 'hobbit')
  }
}
