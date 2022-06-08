import { Actor, } from '@/classes/actor'
import { Player, } from '@/classes/player'
import { GameEvent, } from '@/types/gameEvent'

export class Boss extends Actor {
  private target!: Player
  private AGRESSOR_RADIUS = 300
  private isWalking = false
  private _isAttacking = false

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, target: Player,) {
    super(scene, x, y, texture, 1)
    this.target = target
    this.hp = 100
    this.maxHp = 100
    /* UI */
    /* PHYSICS */
    this._playIdle()
    this.on('animationcomplete', this._animationcomplete)
  }

  update() {
    // this.hitBox = this.scene.add.rectangle(this.x, this.y, this.width, this.height, 1)
  }

  get isAttacking(): boolean {
    return this._isAttacking
  }

  set isAttacking(value: boolean) {
    this._isAttacking = value
  }

  private _animationcomplete (anim: Phaser.Animations.Animation) {
    if (anim.key === 'attack') {
      this._isAttacking = false
      this._playIdle()
    }
  }

  private _playIdle () {
    this.play({ key: 'idle', repeat: -1, timeScale: 1, })
  }

  public attack() {
    if (this._isAttacking === false) {
      this.play({ key: 'attack', timeScale: 1, })
      this._isAttacking = true
    }
  }

  public getDamage(value?: number) {
    super.getDamage()
  }
}
