import React, { Component } from "react";
import sound from "../../assets/sounds/audio.mp3";

class SoundPlayer extends Component {

  render() {
    return (
      <div>
        <audio src={sound} />
      </div>
    );
  }
}

export default SoundPlayer;
