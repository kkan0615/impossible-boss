import Phaser from 'phaser'

export default class UIScene extends Phaser.Scene {
  // private hpBar!: Phaser.GameObjects.Graphics

  constructor(stageKey: string) {
    super(stageKey)
  }

  preload() {
  //
  }

  create() {
    // Init user
    // this._player = new Player(this, 200, 200, 'knight', 1)
  }

  // private _initPlayerUI() {
  //   this.hpBar = this.add.graphics()
  //     .setScrollFactor(0)
  //   //color the bar
  //   this.hpBar.fillStyle(0x2ecc71, 1)
  //
  //   //fill the bar with a rectangle
  //   this.hpBar.fillRect(0, 0, 200, 50)
  //
  //   //position the bar
  //   this.hpBar.x = this.cameras.main.centerX
  //   this.hpBar.y = this.cameras.main.centerY
  //   this.hpBar.scaleX = 50
  // }
}