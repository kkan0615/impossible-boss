import Phaser from 'phaser'
// import { Player, } from '../classes/player'

export default class StageOneScene extends Phaser.Scene {
  // private player!: Player

  constructor() {
    super(StageOneScene.name)
  }

  preload() {
    this.load.image('hobbit', 'assets/characters/hobbit/hobbit.png')
    // this.load.aseprite('hobbit', 'assets/characters/hobbit/hobbit.png', 'assets/characters/hobbit/hobbit.json')
  }

  create() {
    // this.player = new Player(this, 100, 100)
    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Stage 1')
    // const tags = this.anims.createFromAseprite('hobbit')
    // console.log('tags', tags)
    this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY - 100, 'hobbit')
      // .play({ key: 'idle', })
      .setScale(4)
  }
}
