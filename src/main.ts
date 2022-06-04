import './style.css'
import Phaser from 'phaser'
import config from './config'
import HomeScene from './scenes/home'

new Phaser.Game(
  Object.assign(config, {
    scene: [HomeScene,],
  })
)
