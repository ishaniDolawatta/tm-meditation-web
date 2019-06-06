import React, { Component } from "react";
import sound from "../../assets/sounds/audio.mp3";
import Sound from "react-sound";

class SoundPlayer extends Component {
<<<<<<< HEAD
  
=======
>>>>>>> 76787a3eaf21af058da43dfe46d565e3425df093
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
