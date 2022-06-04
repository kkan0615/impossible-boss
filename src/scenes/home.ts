import Phaser from 'phaser'
import StageOneScene from './stageOne'

export default class HomeScene extends Phaser.Scene {
  constructor() {
    super(HomeScene.name)
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png')
    this.load.image('newGameBtn', 'assets/buttons/new-game.png')
    this.load.image('extBtn', 'assets/buttons/exit.png')
  }

  create() {
    console.log('test', this.scene)

    const logo = this.add.image(this.cameras.main.centerX, 150, 'logo')

    const newGameSpriteBtn = this.add.sprite(this.cameras.main.centerX, this.cameras.main.height - 180, 'newGameBtn')
      .setScale(0.3)
      .setInteractive({ useHandCursor: true, })
      .addListener('pointerdown', () => {
        this.startNewGame(this.scene)
      })

    const exitSpriteBtn = this.add.sprite(this.cameras.main.centerX, this.cameras.main.height - 100, 'extBtn')
      .setScale(0.3)
      .setInteractive({ useHandCursor: true, })
      .addListener('pointerdown', () => {
        this.exitGame()
      })
  }

  startNewGame(scene: Phaser.Scenes.ScenePlugin) {
    scene.start(StageOneScene.name)
  }

  exitGame() {
    console.log('exit!')
  }
}
