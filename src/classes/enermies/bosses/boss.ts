import { Actor, } from '@/classes/actor'
import { Player, } from '@/classes/player'
import { GameEvent, } from '@/types/gameEvent'

export class Boss extends Actor {
  private target!: Player
  private AGRESSOR_RADIUS = 300
  private isWalking = false
  private isAttacking = false

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

  private _animationcomplete (anim: Phaser.Animations.Animation) {
    if (anim.key === 'attack') {
      this.isAttacking = false
      this._playIdle()
    }
  }

  private _playIdle () {
    this.play({ key: 'idle', repeat: -1, timeScale: 1, })
  }

  public attack() {
    if (this.isAttacking === false) {
      this.play({ key: 'attack', timeScale: 1, })
      this.isAttacking = true
    }
  }

  public getDamage(value?: number) {
    this.scene.tweens.add({
      targets: this,
      duration: 100,
      repeat: 3,
      yoyo: true,
      alpha: 0.5,
      onStart: () => {
        if (value) {
          this.isDamaging = true
          this.hp = this.hp - value
          console.log(this.hp / this.maxHp * 100)
          this.scene.game.events.emit(GameEvent.BOSS_GET_DAMAGE, this.hp / this.maxHp * 100)
        }
      },
      onComplete: () => {
        this.setAlpha(1)
        this.isDamaging = false

        if (this.hp <= 0) {
          this.scene.game.events.emit('boss-dead')
          this.destroy()
        }
      },
    })
  }
}
