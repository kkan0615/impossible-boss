import { Actor, } from '../../actor'
import { Player, } from '@/classes/player'

export class Boss extends Actor {
  private target!: Player
  private AGRESSOR_RADIUS = 300
  private isWalking = false
  private isAttacking = false

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, target: Player, scale = 1) {
    super(scene, x, y, texture, scale)
    this.target = target
    // PHYSICS
    this.play({ key: 'idle', repeat: -1, })
    this.on('animationcomplete', this._animationcomplete)
    /* UI */
    this.hitBox = this.scene.add.rectangle(this.x, this.y, this.width, this.height / 1.2, 0)
    scene.add.existing(this.hitBox)
    scene.physics.add.existing(this.hitBox)
    this.getBody().setImmovable(false)
    // For debugging
    this.hitBox.isFilled = false
    this.hitBox.isStroked = true

    /* PHYSICS */
    // this.getBody().setSize(30, 30)
    // this.getBody().setOffset(8, 0)
  }

  update() {
    this.hitBox = this.scene.add.rectangle(this.x, this.y, this.width, this.height / 1.2, 1)
  }

  private _animationcomplete (anim: Phaser.Animations.Animation) {
  //
  }

  private _playIdle () {
    this.play({ key: 'idle', repeat: -1, timeScale: 1, })
  }

  public attack() {
    if (this.isAttacking === false) {
      this.play({ key: 'attack',repeat: -1, timeScale: 1, })
      this.isAttacking = true
    }
  }
  //
  // public getDamage(value?: number) {
  //   super.getDamage(value)
  // }
}
