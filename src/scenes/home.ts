import Phaser from 'phaser'

export default class HomeScene extends Phaser.Scene {
  constructor() {
    super(HomeScene.name)
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png')
  }

  create() {
    const logo = this.add.image(400, 300, 'logo')
  }
}