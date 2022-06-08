import Phaser from 'phaser'
import StageOneScene from '@/scenes/stageOne'
import { GameEvent, } from '@/types/gameEvent'

export default class UIScene extends Phaser.Scene {
  private maxHpBar!: Phaser.GameObjects.Rectangle
  private hpBar!: Phaser.GameObjects.Rectangle
  private hpWarning: Phaser.Tweens.Tween | null = null
  private hpBarText!: Phaser.GameObjects.Text
  private _maxBoosHpBar!: Phaser.GameObjects.Rectangle
  private _bossHpBar!: Phaser.GameObjects.Rectangle
  private _bossText!: Phaser.GameObjects.Text
  private continueBtn!: Phaser.GameObjects.Sprite
  private menuBtn!: Phaser.GameObjects.Sprite

  constructor() {
    super(UIScene.name)
  }

  preload() {
    this.load.image('continueBtn', 'assets/buttons/continue.png')
    this.load.image('menuBtn', 'assets/buttons/menu.png')
  }

  create() {
    this.scene.bringToTop(UIScene.name)
    // init player hp
    this._initPlayerHpBar()
    this._initBossText()
    this._initBossHpBar()

    this.continueBtn = this.add.sprite(this.cameras.main.centerX, this.cameras.main.height - 300, 'continueBtn')
      .setScale(0.3)
      .setInteractive({ useHandCursor: true, })

      .setVisible(false)

    this.menuBtn = this.add.sprite(this.cameras.main.centerX, this.cameras.main.height - 220, 'menuBtn')
      .setScale(0.3)
      .setInteractive({ useHandCursor: true, })
      .addListener('pointerdown', () => {
        // this.exitGame()
      })
      .setVisible(false)

    this.game.events.on('clear-stage', this._clearStage, this)
    this.game.events.once('game-over', this._gameOver, this)
    this.game.events.on(GameEvent.PLAYER_GET_DAMAGE, this._playerGetDamage, this)
    this.game.events.on(GameEvent.BOSS_GET_DAMAGE, this._bossGetDamage, this)
  }

  update() {
    // this.hpBar.x = this.cameras.main.centerX
    // this.hpBar.y = this.cameras.main.centerY
  }

  get bossText(): Phaser.GameObjects.Text {
    return this._bossText
  }

  set bossText(value: Phaser.GameObjects.Text) {
    this._bossText = value
  }

  private _initPlayerHpBar() {
    this.maxHpBar = this.add.rectangle(0, 0, this.game.scale.width / 4, 25)
    this.maxHpBar.isFilled = true
    this.maxHpBar.fillColor = 0x515A5A
    this.maxHpBar.x = (this.game.scale.width / 2)
    this.maxHpBar.y = (this.game.scale.height - 25)

    this.hpBar = this.add.rectangle(0, 0, this.game.scale.width / 4, 25)
    this.hpBar.isFilled = true
    this.hpBar.fillColor = 0x2ecc71
    this.hpBar.x = (this.game.scale.width / 2)
    this.hpBar.y = (this.game.scale.height - 25)
  }

  private _initBossHpBar() {
    this._maxBoosHpBar = this.add.rectangle((this.game.scale.width / 2), 25, this.game.scale.width , 25)
    this._maxBoosHpBar.isFilled = true
    this._maxBoosHpBar.fillColor = 0x515A5A

    this._bossHpBar = this.add.rectangle((this.game.scale.width / 2), 25, this.game.scale.width, 25)
    this._bossHpBar.isFilled = true
    this._bossHpBar.fillColor = 0xA93226
  }

  private _initBossText() {
    this._bossText = this.add.text(0
      , 0
      , '', {
        align: 'center',
        fontSize: '32px',
      })
    this._bossText.setPosition(this.game.scale.width / 2 - this.bossText.width / 2, 64)
  }

  private _clearStage() {
  //  clear stage logic
    this._bossText.destroy()
    this.continueBtn.setVisible(true)
      .addListener('pointerdown', () => {
        this._startNextStage()
      })
    this.menuBtn.setVisible(true)
    this.cameras.main.setBackgroundColor('rgba(0,0,0,0.6)')
    this.game.scene.pause(StageOneScene.name)
    const gameEndPhrase = this.add.text(0, 0,
      'clear', {
        fontSize: '128px',
        align: 'center',
      })
    gameEndPhrase.setPosition((this.game.scale.width / 2) - (gameEndPhrase.width / 2),
      this.game.scale.height / 4,)
  }

  private _gameOver() {
    this._bossText.destroy()
    this.continueBtn.setVisible(true)
      .addListener('pointerdown', () => {
        this._restart()
      })
    this.menuBtn.setVisible(true)
    this.cameras.main.setBackgroundColor('rgba(0,0,0,0.6)')
    this.game.scene.pause(StageOneScene.name)
    const gameEndPhrase = this.add.text(0, 0,
      'WASTED', {
        fontSize: '128px',
        color: '#ff0000',
        align: 'center',
      })
    gameEndPhrase.setPosition((this.game.scale.width / 2) - (gameEndPhrase.width / 2),
      this.game.scale.height / 4,)

  }

  private _restart() {
    this.scene.start(StageOneScene.name)
    this.scene.restart()
  }

  private _startNextStage() {
    console.log('_startNextStage')
  }

  private _playerGetDamage(hpPer: number) {
    this.hpBar.width = (this.game.scale.width / 4) * (hpPer / 100)
    if (hpPer <= 50 && !this.hpWarning) {
      this.hpWarning = this.tweens.add({
        targets: this.hpBar,
        alpha: 0,
        ease: 'Cubic.easeOut',
        duration: 800,
        repeat: -1,
        yoyo: true,
      })
    } else if (hpPer > 0 && this.hpWarning) {
      this.hpWarning.destroy()
      this.hpWarning = null
    }
  }

  private _bossGetDamage(hpPer: number) {
    console.log((this.game.scale.width * 2) * (hpPer / 100))
    if (hpPer === 0) {
      this._bossHpBar.width = 0
    } else {
      this._bossHpBar.width = (this.game.scale.width) * (hpPer / 100)
    }
  }

  public updateBossTextText(value?: string) {
    this.bossText.setVisible(!!value)
    this.bossText.setText(value)
  }
}
