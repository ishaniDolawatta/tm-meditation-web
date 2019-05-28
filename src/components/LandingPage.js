import React, { Component } from "react";
import Countdown from "./timer/countdown/Countdown";
import ImageSlider from "./image-slider/ImageSlider";

import playIconDark from "../assets/icons/play-icon-dark.svg";
import googlePlay from "../assets/images/google-play.svg";
import appStore from "../assets/images/app-store.svg";
import device from "../assets/images/iphone.svg";
import restartIcon from "../assets/icons/restart.svg";
import playIconLight from "../assets/icons/play-icon-light.svg";

import "./LandingPage.scss";

class LandingPage extends Component {
  state = {
    currentTime: new Date().getHours(),
    firstTimer: false,
    secondTimer: false,
    thirdTimer: false
  };

  componentDidMount() {
    this.getCurrentTime();
  }

  getCurrentTime = () => {
    this.timer = setInterval(() => {
      this.setState({
        currentTime: new Date().getHours()
      });
    }, 1000);
  };

  startTimer = () => {
    this.setState({ firstTimer: true, secondTimer: false, thirdTimer: false });
    this.refs.imageSlider.startTimer();

    if (this.state.firstTimer) {
      this.refs.firstCountdown.resetTimer();
    }
  };

  endFirstTimer = () => {
    this.setState({ firstTimer: false, secondTimer: true });
  };

  endSecondTimer = () => {
    this.setState({ secondTimer: false, thirdTimer: true });
  };

  endThirdTimer = () => {
    this.setState({ thirdTimer: false });
  };

  render() {
    const { firstTimer, secondTimer, thirdTimer, currentTime } = this.state;
    const isDark = currentTime > 18;

    return (
      <div
        className={`main-container ${
          isDark ? "main-container--light" : "main-container--dark"
        }`}
      >
        <div className="container main-wrapper">
          <div className="description-container">
            <div className="description-container__description-wrapper">
              <p className=" mb-0">
                Blackbird TM Timer is a simplistic timer for all of you doing
                Trancendental Meditation.
              </p>
              <p>
                With creative energy from learning TM in Rishikesh in 1968 Paul
                McCartney composed the simple and beautiful song Blackbird.
              </p>

              <div className="ml-2">
                <img src={isDark ? playIconLight : playIconDark} />
              </div>
              <p className="mt-3">
                Please try the timer here or download it on Appstore and Google
                play.
              </p>
            </div>
            <div className="description-container__app-links mt-5 ">
              <img src={googlePlay} />
              <img src={appStore} />
            </div>
          </div>

          <div className="device-container">
            <div className="device-wrapper">
              <img className="device-wrapper__device-frame" src={device} />
              <ImageSlider
                typeOfDay={isDark ? "dark" : "light"}
                ref="imageSlider"
              />
              <div
                className={
                  "device-wrapper__background-image-overlay " +
                  (isDark
                    ? "device-wrapper__background-image-overlay--dark"
                    : "device-wrapper__background-image-overlay--light")
                }
              />
              <img
                className="device-wrapper__restart-icon"
                src={restartIcon}
                onClick={this.startTimer}
              />

              <div className="device-wrapper__timers">
                {firstTimer && (
                  <Countdown
                    duration={30000}
                    endTimer={this.endFirstTimer}
                    ref="firstCountdown"
                  />
                )}
                {secondTimer && (
                  <Countdown
                    showProgressBar
                    duration={40000}
                    endTimer={this.endSecondTimer}
                  />
                )}
                {thirdTimer && (
                  <Countdown duration={50000} endTimer={this.endThirdTimer} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
