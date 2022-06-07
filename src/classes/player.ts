import { Actor, } from './actor'
import { Physics, } from 'phaser'

export class Player extends Actor {
  private keyUp!: Phaser.Input.Keyboard.Key
  private keyLeft!: Phaser.Input.Keyboard.Key
  private keyDown!: Phaser.Input.Keyboard.Key
  private keyRight!: Phaser.Input.Keyboard.Key
  private keyX!: Phaser.Input.Keyboard.Key
  private keyC!: Phaser.Input.Keyboard.Key
  private _attackRange!: Phaser.GameObjects.Rectangle
  private isWalking = false
  private _isAttacking = false

  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, scale = 1) {
    super(scene, x, y, texture, scale)
    // KEYS
    this.keyUp = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
    this.keyLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
    this.keyDown = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
    this.keyRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    this.keyX = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X)
    this.keyC = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
    /* UI */
    this._attackRange = this.scene.add.rectangle(this.x, this.y, this.width / 2, this.height, )
    this._attackRange.isFilled = false
    this._attackRange.isStroked = true
    scene.add.existing(this._attackRange)
    scene.physics.add.existing(this._attackRange)
    scene.physics.world.remove(this._attackRangeBoxBody)
    this._attackRangeBoxBody.enable = false
    scene.cameras.main.startFollow(this)
    // Hitbox
    this.hitBox = this.scene.add.rectangle(this.x, this.y, this.width / 2.2, this.height / 1.5)
    this.hitBox.isFilled = false
    scene.add.existing(this.hitBox)
    scene.physics.add.existing(this.hitBox)

    // For debugging
    this.hitBox.isStroked = true
    this.hitBox.strokeColor = 100
    // PHYSICS
    this.play({ key: 'Idle', duration: 20, repeat: -1, })
    this.on('animationcomplete', this._animationcomplete)
    this.speed = 200
    this.getBody().setSize(30, 25)
    this.getBody().setOffset(8, 5)
  }

  update() {
    if (!this.getBody())
      return
    this._attackRange.setPosition(this.flipX ? this.x - (this.width / 4) : this.x + (this.width / 4), this.y)
    this.hitBox.setPosition(this.x - 2, this.y + 5, )
    this.getBody().setVelocity(0)
    if (this._isAttacking === false) {
      if (this.keyUp.isDown) {
        this.body.velocity.y = -this.speed
        // this.getBody().setAngularVelocity()
        if (this.isWalking == false) {
          this._playRun()
        }
      }
      else if (this.keyLeft.isDown) {
        this.body.velocity.x = -this.speed
        this.flipX = true
        if (this.isWalking == false) {
          this._playRun()
        }
      }
      else if (this.keyDown.isDown) {
        this.body.velocity.y = this.speed
        if (this.isWalking == false) {
          this._playRun()
        }
      }
      else if (this.keyRight.isDown) {
        this.body.velocity.x = this.speed
        this.flipX = false
        if (this.isWalking == false) {
          this._playRun()
        }
      }

      if (this.keyUp.isDown && this.keyLeft.isDown) {
        this.body.velocity.x = -this.speed
        this.body.velocity.y = -this.speed
        this.flipX = true
        if (this.isWalking == false) {
          this._playRun()
        }
      }
      else if (this.keyDown.isDown && this.keyLeft.isDown) {
        this.body.velocity.x = -this.speed
        this.body.velocity.y = this.speed
        this.flipX = true
        if (this.isWalking == false) {
          this._playRun()
        }
      }
      else if (this.keyUp.isDown && this.keyRight.isDown) {
        this.body.velocity.x = this.speed
        this.body.velocity.y = -this.speed
        this.flipX = false
        if (this.isWalking == false) {
          this._playRun()
        }
      }
      else if (this.keyDown.isDown && this.keyRight.isDown) {
        this.body.velocity.x = this.speed
        this.body.velocity.y = this.speed
        this.flipX = false
        if (this.isWalking == false) {
          this._playRun()
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

  get attackRange(): Phaser.GameObjects.Rectangle {
    return this._attackRange
  }

  set attackRange(value: Phaser.GameObjects.Rectangle) {
    this._attackRange = value
  }

  get isAttacking(): boolean {
    return this._isAttacking
  }

  set isAttacking(value: boolean) {
    this._isAttacking = value
  }

  private _animationcomplete (anim: Phaser.Animations.Animation) {
    if (anim.key === 'Attack 1') {
      this._playIdle()
      this._isAttacking = false
      this.isWalking = false
      this._attackRangeBoxBody.enable = false
      this.scene.physics.world.remove(this._attackRangeBoxBody)
    }
  }

  private _playIdle () {
    this.play({ key: 'Idle', repeat: -1, timeScale: 1, })
  }

  private _playRun () {
    this.isWalking = true
    this.play({ key: 'Run', repeat: -1, timeScale: 1, })
  }

  private get _attackRangeBoxBody(): Physics.Arcade.Body {
    return this.attackRange.body as Physics.Arcade.Body
  }

  public attack() {
    if (this._isAttacking === false) {
      this.play({ key: 'Attack 1', timeScale: 2, })
      this._isAttacking = true
      this._attackRangeBoxBody.enable = true
      this.scene.physics.world.add(this._attackRangeBoxBody)
      this.scene.game.events.emit('player_attack')
    }
  }

  public getDamage(value?: number): void {
    // super.getDamage(value)
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
        }
      },
      onComplete: () => {
        this.setAlpha(1)
        this.isDamaging = false

        if (this.hp <= 0) {
          this.scene.game.events.emit('game-over')
          this.destroy()
        }
      },
    })

  }

  public destroy() {
    super.destroy()
    this.attackRange.destroy()
  }
}
