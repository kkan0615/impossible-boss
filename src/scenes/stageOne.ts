import Phaser from 'phaser'
import { Player, } from '@/classes/player'
import { UndeadExcutionerPuppetBoss, } from '@/classes/enermies/bosses/undeadExcutionerPuppet'

export default class StageOneScene extends Phaser.Scene {
  private map!: Phaser.Tilemaps.Tilemap
  private basicGreenTileset!: Phaser.Tilemaps.Tileset
  private darkCastleTileset!: Phaser.Tilemaps.Tileset
  private wallsLayer!: Phaser.Tilemaps.TilemapLayer
  private groundLayer!: Phaser.Tilemaps.TilemapLayer
  private player!: Player
  private boss!: UndeadExcutionerPuppetBoss
  private hpBar!: Phaser.GameObjects.Graphics
  private backgroundSound!: Phaser.Sound.BaseSound
  private _nextNormalAttack = 2000

  constructor() {
    super(StageOneScene.name)
  }

  preload() {
    this.load.image({ key: 'basicGreenTiles', url: 'assets/tileMaps/stageOne/tiles/BasicGreen.png', })
    this.load.image({ key: 'darkCastleTiles', url: 'assets/tileMaps/stageOne/tiles/DarkCastle.png', })
    this.load.tilemapTiledJSON('tileMap', 'assets/tileMaps/stageOne/stageOne.json')
    this.load.aseprite('knight', 'assets/characters/knight/knight.png', 'assets/characters/knight/knight.json')
    this.load.aseprite('trashMonster', 'assets/enemies/bosses/trashMonster/trashMonster.png', 'assets/enemies/bosses/trashMonster/trashMonster.json')
    this.load.aseprite('undeadExcutionerPuppet', 'assets/enemies/bosses/undeadExcutionerPuppet/undeadExcutionerPuppet.png', 'assets/enemies/bosses/undeadExcutionerPuppet/undeadExcutionerPuppet.json')
    this.load.image('bullet', 'assets/effects/fire1.png')
    this.load.audio('backgroundSound', 'assets/sounds/backgrounds/xDeviruchi - Decisive Battle.wav')
  }

  create() {
    this._initMap()
    // play sound
    this.backgroundSound = this.sound.add('backgroundSound', { loop: true, })
    this.backgroundSound.play()
    // Init user
    this.player = new Player(this, 200, 200, 'knight', 1).setDepth(10)
    // Init boss
    this.boss = new UndeadExcutionerPuppetBoss(this, 400, 300, this.player)
    // @TODO: TEST
    this.time.addEvent({
      delay: 2000, // ms
      callback: () => {
        this.boss.fireAttack(this.player)

      },
      loop: true,
      callbackScope: this,
    })
    /* Physics */
    this.physics.add.collider(this.player, this.wallsLayer)
    this.physics.add.collider(this.boss, this.wallsLayer)

    // Player get damage
    this.physics.add.overlap(this.boss, this.player.hitBox, this.playerDamageOverlapCallback, null, this)

    // boss get damage
    this.physics.add.overlap(this.player.attackRange, this.boss.hitBox, this.hitOverlapCallback, null, this)
    /* Cameras setting */
    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height)
    this.cameras.main.setZoom(2)


    /* Set game over */
    this.game.events.once('boss-dead', this._bossDead, this)
    this.game.events.once('game-over', this._gameOver, this)
  }

  update() {
    this.player.update()
    if (this.boss.hp <= 0) {
      // console.log('boss die')
    }
  }

  private _initMap(): void {
    this.map = this.make.tilemap({ key: 'tileMap', })
    this.basicGreenTileset = this.map.addTilesetImage('BasicGreen', 'basicGreenTiles')
    this.darkCastleTileset = this.map.addTilesetImage('DarkCastle', 'darkCastleTiles')
    this.groundLayer = this.map.createLayer('Ground', this.basicGreenTileset, 0, 0)
    this.wallsLayer = this.map.createLayer('Wall', this.darkCastleTileset, 0, 0)
    this.wallsLayer.setCollisionBetween(0, 5)
    this.wallsLayer.setCollisionByProperty({ collides: true, })
    this.physics.world.setBounds(0, 0, this.wallsLayer.width, this.wallsLayer.height)
  }

  private playerDamageOverlapCallback() {
    if (!this.player.isDamaging) {
      this.player.getDamage(50)
    }
  }

  private hitOverlapCallback() {
    if (this.player.isAttacking && !this.boss.isDamaging) {
      this.boss.getDamage(this.player.attackDamage)
    }
  }

  private _gameOver() {
    // this.backgroundSound.destroy()
  }

  private _bossDead() {
    // this.backgroundSound.destroy()
    this.game.events.emit('clear-stage')
  }
}
