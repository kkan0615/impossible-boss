import './style.css'
import Phaser from 'phaser'
import gameConfig from './configs/game'
import HomeScene from './scenes/home'
import StageOneScene from './scenes/stageOne'

new Phaser.Game(
  Object.assign(gameConfig, {
    scene: [HomeScene, StageOneScene,],
  })
)
