import React, { Component } from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './Countdown.scss';

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
  };
  
  resetTimer = () => {
    if (this.state.timerOn === false) {
      this.setState({
        timerTime: this.state.timerStart
      });
    }
  };

  render() {
    const { timerTime, timerStart } = this.state;
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let timeWeight = (((timerStart-timerTime)/timerStart)*100).toFixed(3);

    return (
      <div className="Countdown">
        <div className="Countdown-display">
          <div className="Countdown-time">
           <CircularProgressbar value={timeWeight} text={`${minutes} : ${seconds}`} strokeWidth={5} />
           <p> {timeWeight}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Countdown;