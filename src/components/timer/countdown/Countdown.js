import React, { Component } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Countdown.scss";

class Countdown extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    currentsessionIndex: 0
  };

  firstSessionTimeOut = this.calculateDuration(0, 5);
  secondSessionTimeOut = this.calculateDuration(0, 6);
  thirdSessionTimeOut = this.calculateDuration(0, 8);

  sessions = [
    this.firstSessionTimeOut,
    this.secondSessionTimeOut,
    this.thirdSessionTimeOut
  ];

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.sessions[this.state.currentsessionIndex],
      timerStart: this.sessions[this.state.currentsessionIndex]
    });

    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 1000;
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime
        });
      } else {
        this.stopTimer();
      }
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState(
      {
        currentsessionIndex: (this.state.currentsessionIndex += 1),
        timerOn: false
      },
      () => {
        if (this.sessions.length + 1 > this.state.currentsessionIndex) {
          this.props.changeTimerSession(this.state.currentsessionIndex);
        }
      }
    );
  };

  resetTimer = () => {
    clearInterval(this.timer);
    this.setState(
      {
        timerOn: true,
        currentsessionIndex: 0
      },
      () => {
        this.startTimer();
      }
    );
  };

  calculateDuration(min, sec) {
    return min * 60000 + sec * 1000;
  }

  render() {
    const { timerTime, timerStart } = this.state;
    const { showProgressBar } = this.props;
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    const durationInSeconds = this.props.duration / 1000;

    const percentage = ((minutes * 60 + seconds) / durationInSeconds) * 100;

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
              strokeWidth={showProgressBar ? 3 : 0}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Countdown;
