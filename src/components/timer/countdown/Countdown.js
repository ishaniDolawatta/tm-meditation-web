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

  firstSessionTimeOut = this.calculateDuration(0, 30);
  secondSessionTimeOut = this.calculateDuration(20, 0);
  thirdSessionTimeOut = this.calculateDuration(2, 0);

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
        currentsessionIndex: this.state.currentsessionIndex + 1,
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
    const { timerTime, timerStart, currentsessionIndex } = this.state;
    const showProgressBar = currentsessionIndex === 1;
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);

    const percentage =
      currentsessionIndex === 1
        ? ((timerStart - timerTime) / timerStart) * 100
        : 0;

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
                  stroke: this.props.isDark ? "#E4E4E4" : "#8F8F8F"
                },
                path: {
                  stroke: this.props.isDark ? "#676767" : "#4D4D4D"
                },
                text: {
                  fill: this.props.isDark ? "#4D4D4D" : "#4D4D4D"
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
