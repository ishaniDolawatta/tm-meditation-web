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
    const { timerTime } = this.state;
    const { showProgressBar } = this.props;
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    const durationInSeconds = this.props.duration / 1000;

    const percentage = ((minutes * 60) / durationInSeconds) * 100;

    return (
      <div className="countdown">
        <div className="countdown-display">
          <div
            className={`countdown-time ${
              showProgressBar ? "countdown-time__show-progress-bar" : ""
            }`}
          >
            <CircularProgressbar
              value={percentage}
              text={`${minutes} : ${seconds}`}
              styles={{
                trail: {
                  stroke: this.props.isDark ? "#E4E4E4" : "green"
                },
                path: {
                  stroke: this.props.isDark ? "blue" : "yellow"
                },
                text: {
                  fill: this.props.isDark ? "#E4E4E4" : "black"
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
