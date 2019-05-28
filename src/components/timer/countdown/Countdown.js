import React, { Component } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Countdown.scss";

class Countdown extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0
  };

  componentDidMount() {
    this.startTimer();
  }

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.props.duration,
      timerStart: this.props.duration
    });

    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime
        });
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
        this.stopTimer();
      }
    }, 10);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
    this.props.endTimer();
  };

  resetTimer = () => {
    this.setState({
      timerTime: this.state.timerStart
    });
  };

  render() {
    const { timerTime, timerStart } = this.state;
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    const durationInSeconds = this.props.duration / 1000;

    const percentage = ((minutes * 60 + seconds) / durationInSeconds) * 100;

    return (
      <div className="countdown">
        <div className="countdown-display">
          <div className="countdown-time">
            <CircularProgressbar
              value={percentage}
              text={`${minutes} : ${seconds}`}
              strokeWidth={5}
              styles={{
                pathColor: `red`,
                trail: {
                  stroke: this.props.isDay ? "#8F8F8F" : "#E4E4E4"
                },
                path: {
                  stroke: this.props.isDay ? "#4D4D4D" : "#676767"
                },
                text: {
                  fill: this.props.isDay ? "#4D4D4D" : "#676767"
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Countdown;
