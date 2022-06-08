import { Player, } from '@/classes/player'
import { Boss, } from '@/classes/enermies/bosses/boss'

export class UndeadExcutionerPuppetBoss extends Boss {
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
    // For debugging
    this.hitBox.isFilled = false
    this.hitBox.isStroked = true
  }

  update() {
    super.update()
    this.hitBox.setPosition(this.x, this.y)

  }
}
