import Phaser from 'phaser'
import { Player, } from '../classes/player'

export default class StageOneScene extends Phaser.Scene {
  private player!: Player
  // private knightSprite!: Phaser.GameObjects.Sprite
  // private keyW: Phaser.Input.Keyboard.Key
  // private keyA: Phaser.Input.Keyboard.Key
  // private keyS: Phaser.Input.Keyboard.Key
  // private keyD: Phaser.Input.Keyboard.Key

  constructor() {
    super(StageOneScene.name)
  }

  preload() {
    // this.load.image('knight', 'assets/characters/knight/knight.png')
    this.load.aseprite('knight', 'assets/characters/knight/knight.png', 'assets/characters/knight/knight.json')
    this.load.aseprite('paladin', 'assets/characters/paladin/paladin.png', 'assets/characters/paladin/paladin.json')
    // this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    // this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    // this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    // this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
  }

  create() {
    // console.log(this)
    this.player = new Player(this, 100, 100, 'knight', 2)
    // const knightTags = this.anims.createFromAseprite('knight')
    // this.knightSprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'knight')
    //   .setScale(4)
    // this.knightSprite.play({ key: 'Attack 1', duration: 20, repeat: -1, })

    // this.add.existing(this.knightSprite)
  }

  update() {
    this.player.update()
  }
}
