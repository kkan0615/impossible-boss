import { Player, } from '@/classes/player'
import { Boss, } from '@/classes/enermies/bosses/boss'
import Phaser from 'phaser'
import { GameEvent, } from '@/types/gameEvent'

export class UndeadExcutionerPuppetBoss extends Boss {
  private _fires!: Fires

  constructor(scene: Phaser.Scene, x: number, y: number, target: Player) {
    super(scene, x, y, 'undeadExcutionerPuppet', target)
    /* UI */
    this.setScale(1.2, 1.5)
    this.setSize(this.width * 0.5, this.height / 1.5)
    this.setOffset(20, 16)
    this.setDebugBodyColor(1000)
    this.hitBox = this.scene.add.rectangle(this.x, this.y,this.width / 2, this.height, 0)
    scene.add.existing(this.hitBox)
    scene.physics.add.existing(this.hitBox)
    /* Attacks */
    this._fires = new Fires(scene, this)
    // For debugging
    this.hitBox.isFilled = false
    this.hitBox.isStroked = true
  }

  update() {
    super.update()
    this.hitBox.setPosition(this.x, this.y)

  }

  get fires(): Fires {
    return this._fires
  }

  set fires(value: Fires) {
    this._fires = value
  }

  private _playAttack() {
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
          this.scene.game.events.emit(GameEvent.BOSS_GET_DAMAGE, this.hpPercentage)
          if (this.hpPercentage <= 50) {
            this.scene.game.events.emit(GameEvent.UPDATE_BOSS_MESSAGE, '보스가 광폭화 상태 돌입했습니다.')
          }
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

  public fireAttack(target: Player) {
    this._playAttack()
    this._fires.fireBullet(this.x, this.y, target.x, target.y)
  }
}

class Fire extends Phaser.Physics.Arcade.Sprite {
  constructor (scene, x, y) {
    super(scene, x, y, 'bullet')
  }

  fire (x: number, y: number, tx: number, ty: number, speed: number) {
    this.setSize(16, 16)
    this.enableBody(true, x, y, true, true)
    const angle = Phaser.Math.Angle.Between(x, y, tx, ty)
    this.setRotation(angle)
    this.scene.physics.velocityFromRotation(angle, speed, this.body.velocity)
    this.setState(1000)
  }

  preUpdate (time, delta) {
    super.preUpdate(time, delta)

    if (this.y <= -32) {
      this.setActive(false)
      this.setVisible(false)
    }
  }
}


class Fires extends Phaser.Physics.Arcade.Group {
  private boss!: UndeadExcutionerPuppetBoss

  constructor (scene: Phaser.Scene, boss: UndeadExcutionerPuppetBoss) {
    super(scene.physics.world, scene)
    this.boss = boss

    const extendedScene = scene as Phaser.Scene & { wallsLayer: Phaser.Tilemaps.TilemapLayer, player: Player }
    scene.physics.add.group({
      name: 'undeadExcutionerPuppetBossFire',
      enable: false,
    })

    this.createMultiple({
      frameQuantity: 5,
      key: 'enemyBullet',
      active: false,
      visible: false,
      classType: Fire,
    })

    this.scene.physics.add.collider(this, extendedScene.wallsLayer, (object1, object2) => {
      (object1 as Phaser.Physics.Arcade.Sprite).disableBody(true, true)
    },null, this)

    this.scene.physics.add.collider(extendedScene.player, this, (player, bullet) => {
      (bullet as Phaser.Physics.Arcade.Sprite).disableBody(true, true);
      (player as Player).getDamage(10)
    }, null, this)
  }

  fireBullet (x: number, y: number, targetX: number, targetY: number) {
    const bullet = this.getFirstDead(false)
    let speed = 500
    if ((this.boss.hp / this.boss.maxHp) * 100 <= 50) {
      speed = 1000
    }
    if (bullet) {
      bullet.fire(x, y, targetX, targetY, speed)
    }
  }
}
