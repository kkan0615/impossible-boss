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
    // this._playIdle()
    // this.attack()
    this.play({ key: 'idle', repeat: -1, })
    this.on('animationcomplete', this._animationcomplete)
    this.getBody().setSize(30, 30)
    this.getBody().setOffset(8, 0)
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
}
