import { Actor, } from './actor'

export class Player extends Actor {
  private keyUp!: Phaser.Input.Keyboard.Key
  private keyLeft!: Phaser.Input.Keyboard.Key
  private keyDown!: Phaser.Input.Keyboard.Key
  private keyRight!: Phaser.Input.Keyboard.Key
  private keyX!: Phaser.Input.Keyboard.Key

  private isWalking = false
  private isAttacking = false

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, scale = 1) {
    super(scene, x, y, texture, scale)
    // KEYS
    this.keyUp = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    this.keyLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    this.keyDown = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    this.keyRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    this.keyX = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X)
    // PHYSICS
    this.play({ key: 'Idle', duration: 20, repeat: -1, })
    this.on('animationcomplete', this._animationcomplete)
    this.speed = 200
    this.getBody().setSize(30, 30)
    this.getBody().setOffset(8, 0)
  }

  update() {
    this.getBody().setVelocity(0)
    if (this.isAttacking === false) {
      // console.log('no attacking', this.isWalking)
      if (this.keyUp.isDown) {
        this.body.velocity.y = -this.speed
        if (this.isWalking == false) {
          this.isWalking = true
          this.play({ key: 'Run', repeat: -1, timeScale: 1, })
        }
      }
      if (this.keyLeft.isDown) {
        this.body.velocity.x = -this.speed
        this.flipX = true
        if (this.isWalking == false) {
          this.isWalking = true
          this.play({ key: 'Run', repeat: -1, timeScale: 1, })
        }
      }
      if (this.keyDown.isDown) {
        this.body.velocity.y = this.speed
        if (this.isWalking == false) {
          this.isWalking = true
          this.play({ key: 'Run', repeat: -1, timeScale: 1, })
        }
      }
      if (this.keyRight.isDown) {
        this.body.velocity.x = this.speed
        this.flipX = false
        if (this.isWalking == false) {
          this.isWalking = true
          this.play({ key: 'Run', repeat: -1, timeScale: 1, })
        }
      }

      if (!this.keyUp.isDown && !this.keyLeft.isDown && !this.keyDown.isDown && !this.keyRight.isDown && this.isWalking) {
        this._playIdle()
        this.isWalking = false
      }
    }
    if (this.keyX.isDown) {
      this.attack()
    }
  }

  private _animationcomplete (anim: Phaser.Animations.Animation) {
    if (anim.key === 'Attack 1') {
      this._playIdle()
      this.isAttacking = false
      this.isWalking = false
    }
  }

  private _playIdle () {
    this.play({ key: 'Idle', repeat: -1, timeScale: 1, })
  }

  public attack() {
    if (this.isAttacking === false) {
      this.play({ key: 'Attack 1', timeScale: 2, })
      this.isAttacking = true
    }
  }
}
