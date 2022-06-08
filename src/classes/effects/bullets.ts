import { Bullet, } from '@/classes/effects/bullet'

export class Bullets extends Phaser.Physics.Arcade.Group {
  constructor (scene) {
    super(scene.physics.world, scene)

    this.createMultiple({
      frameQuantity: 5,
      key: 'bullet',
      active: false,
      visible: false,
      classType: Bullet,
    })
  }

  fireBullet (x: number, y: number, targetX?: number, targetY?: number) {
    const bullet = this.getFirstDead(false)

    if (bullet) {
      bullet.fire(x, y)
    }
  }
}
