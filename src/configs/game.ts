import Phaser from 'phaser'

export default {
  type: Phaser.AUTO,
  parent: 'game',
  scale: {
    width: 1280,
    height: 720,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
}
