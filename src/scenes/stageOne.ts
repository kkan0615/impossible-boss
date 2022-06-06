import Phaser from 'phaser'
import { Player, } from '../classes/player'
import { Boss, } from '../classes/enermies/bosses/boss'

export default class StageOneScene extends Phaser.Scene {
  private map!: Phaser.Tilemaps.Tilemap
  private basicGreenTileset!: Phaser.Tilemaps.Tileset
  private darkCastleTileset!: Phaser.Tilemaps.Tileset
  private wallsLayer!: Phaser.Tilemaps.TilemapLayer
  private groundLayer!: Phaser.Tilemaps.TilemapLayer
  private player!: Player
  private boss!: Boss

  constructor() {
    super(StageOneScene.name)
  }

  preload() {
    this.load.image({ key: 'basicGreenTiles', url: 'assets/tileMaps/stageOne/tiles/BasicGreen.png', })
    this.load.image({ key: 'darkCastleTiles', url: 'assets/tileMaps/stageOne/tiles/DarkCastle.png', })
    this.load.tilemapTiledJSON('tileMap', 'assets/tileMaps/stageOne/stageOne.json')
    this.load.aseprite('knight', 'assets/characters/knight/knight.png', 'assets/characters/knight/knight.json')
    this.load.aseprite('trashMonster', 'assets/enemies/bosses/trashMonster/trashMonster.png', 'assets/enemies/bosses/trashMonster/trashMonster.json')
  }

  create() {
    this._initMap()
    this.player = new Player(this, 200, 200, 'knight', 1)
    this.boss = new Boss(this, 400, 300, 'trashMonster', this.player,1)
    this.physics.add.collider(this.player, this.wallsLayer)
    this.physics.add.collider(this.boss, this.wallsLayer)

    // Player get damage
    this.physics.add.overlap(this.boss, this.player.hitBox, this.playerDamageOverlapCallback, null, this)

    // boss get damage
    this.physics.add.overlap(this.player.attackRange, this.boss.hitBox, this.hitOverlapCallback, null, this)
    /* Cameras setting */
    this.cameras.main.startFollow(this.player)
    this.cameras.main.zoom = 2

  }

  update() {
    this.player.update()
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
      this.player.getDamage(10)
    }
  }

  private hitOverlapCallback() {
    if (this.player.isAttacking && !this.boss.isDamaging) {
      this.boss.getDamage(this.player.attackDamage)
    }
  }
}
