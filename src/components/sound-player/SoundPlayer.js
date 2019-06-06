import React, { Component } from "react";
import sound from "../../assets/sounds/audio.mp3";
import Sound from "react-sound";

class SoundPlayer extends Component {
  render() {
    return (
      <Sound
        url={sound}
        playStatus={Sound.status.PLAYING}
        playFromPosition={2000}
      />
    );
  }
}

export default SoundPlayer;
