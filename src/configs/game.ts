import Phaser from 'phaser'

export default {
  type: Phaser.AUTO,
  parent: 'game',
  scale: {
    width: 1280,
    height: 720,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  autoFocus: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
  audio: {
    disableWebAudio: false,
  },
}
