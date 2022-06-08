import './style.css'
import Phaser from 'phaser'
import gameConfig from './configs/game'
import HomeScene from './scenes/home'
import StageOneScene from './scenes/stageOne'
import UIScene from '@/scenes/ui'

new Phaser.Game(
  Object.assign(gameConfig, {
    scene: [HomeScene, UIScene, StageOneScene,],
  })
)
