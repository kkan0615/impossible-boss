import { Physics, } from 'phaser'

export class Actor extends Physics.Arcade.Sprite {
  private _hp = 100
  private _maxHp = 100
  private _speed = 150

  private _hitBox!: Phaser.GameObjects.Rectangle
  private _isDamaging = false

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, scale = 1, frame?: string | number) {
    super(scene, x, y, texture, frame)
    scene.anims.createFromAseprite(texture)
    this.setScale(scale)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.getBody().setCollideWorldBounds(true)
  }

  public getDamage(value?: number): void {
    this.scene.tweens.add({
      targets: this,
      duration: 100,
      repeat: 3,
      yoyo: true,
      alpha: 0.5,
      onStart: () => {
        if (value) {
          this._isDamaging = true
          this._hp = this._hp - value
        }
      },
      onComplete: () => {
        this.setAlpha(1)
        this._isDamaging = false

        if (this.hp <= 0) {
          this.destroy()
        }
      },
    })
  }

  public get hp(): number {
    return this._hp
  }

  public set hp(value: number) {
    this._hp = value
  }

  public get speed(): number {
    return this._speed
  }

  public set speed(value: number) {
    this._speed = value
  }

  public get maxHp(): number {
    return this._maxHp
  }

  public set maxHp(value: number) {
    this._maxHp = value
  }

  get hitBox(): Phaser.GameObjects.Rectangle {
    return this._hitBox
  }

  set hitBox(value: Phaser.GameObjects.Rectangle) {
    this._hitBox = value
  }

  get isDamaging(): boolean {
    return this._isDamaging
  }

  set isDamaging(value: boolean) {
    this._isDamaging = value
  }

  protected checkFlip(): void {
    if (this.body.velocity.x < 0) {
      this.scaleX = -1
    } else {
      this.scaleX = 1
    }
  }

  protected getBody(): Physics.Arcade.Body {
    return this.body as Physics.Arcade.Body
  }

  protected attack() {
  //
  }

  public destroy() {
    super.destroy()
    this._hitBox.destroy()
  }
}
