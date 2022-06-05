import Phaser from 'phaser'

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  parent: 'game',
  scale: {
    mode: Phaser.Scale.ScaleModes.NONE,
    width: window.innerWidth,
    height: window.innerHeight,
    // mode: Phaser.Scale.ScaleModes.RESIZE,
    // width: 1280,
    // height: 720,
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
  canvasStyle: 'display: block; width: 100%; height: 100%;',
  audio: {
    disableWebAudio: false,
  },
}

export default gameConfig
