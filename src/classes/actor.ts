import { Physics, } from 'phaser'

export class Actor extends Physics.Arcade.Sprite {
  protected hp = 100
  protected speed = 150
  // protected scene!: Phaser.Scene

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
          this.hp = this.hp - value
        }
      },
      onComplete: () => {
        this.setAlpha(1)
      },
    })
  }

  public getHPValue() {
    return this.hp
  }

  public get getSpeedValue() {
    return this.speed
  }

  public set setSpeedValue(newSpeed: number) {
    this.speed = newSpeed
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
}
