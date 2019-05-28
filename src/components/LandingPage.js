import React, { Component } from "react";
import Countdown from "./timer/countdown/Countdown";
import ImageSlider from "./image-slider/ImageSlider";
import moment from "moment";

import playIconDark from "../assets/icons/play-icon-dark.svg";
import googlePlay from "../assets/images/google-play.svg";
import appStore from "../assets/images/app-store.svg";
import device from "../assets/images/iphone.svg";
import restartIcon from "../assets/icons/restart.svg";
import playIconLight from "../assets/icons/play-icon-light.svg";
import * as theme from "../config/constants/theme";

import "./LandingPage.scss";

class LandingPage extends Component {
  state = {
    currentTheme: this.getCurrentTheme(),
    firstTimer: false,
    secondTimer: false,
    thirdTimer: false
  };

  componentDidMount() {
    this.setupTheme();
  }

  setupTheme = () => {
    this.themeTimer = setTimeout(changeDayNightTheme => {
      this.changeDayNight();
      this.themeTimer = setTimeout(
        changeDayNightTheme,
        this.getDayNightTimeDuration()
      );
    }, this.getDayNightTimeDuration());
  };

  getDayNightTimeDuration = () => {
    const now = moment();

    if (now.isBefore(theme.DAY_TIME)) {
      return theme.DAY_TIME.diff(now);
    }

    if (now.isBetween(theme.DAY_TIME, theme.NIGHT_TIME)) {
      return theme.NIGHT_TIME.diff(now);
    }

    if (now.isSameOrAfter(theme.NIGHT_TIME)) {
      const tomorrowSixAM = theme.DAY_TIME.clone().add(1, "d");
      return tomorrowSixAM.diff(now);
    }

    return 0;
  };

  changeDayNight = () => {
    const theme = this.getCurrentTheme;
    this.setState({ currentTheme: theme });
  };

  getCurrentTheme() {
    const now = moment();
    return now.isBetween(theme.DAY_TIME, theme.NIGHT_TIME)
      ? theme.THEME_TYPE_DAY
      : theme.THEME_TYPE_NIGHT;
  }

  clearDayNight() {
    clearTimeout(this.themeTimer);
  }

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

  calculateDuration = (min, sec) => {
    return min * 60000 + sec * 1000;
  };

  render() {
    const { firstTimer, secondTimer, thirdTimer, currentTheme } = this.state;
    const isDark = currentTheme === theme.THEME_TYPE_NIGHT;

    return (
      <div
        className={`main-container ${
          isDark ? "main-container--dark" : "main-container--light"
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
                <img src={isDark ? playIconDark : playIconLight} alt="" />
              </div>
              <p className="mt-3">
                Please try the timer here or download it on Appstore and Google
                play.
              </p>
            </div>
            <div className="description-container__app-links mt-5 ">
              <img src={googlePlay} alt="" />
              <img src={appStore} alt="" />
            </div>
          </div>

          <div className="device-container">
            <div className="device-wrapper">
              <img
                className="device-wrapper__device-frame"
                src={device}
                alt=""
              />
              <ImageSlider
                typeOfDay={isDark ? "light" : "dark"}
                ref="imageSlider"
              />
              <div
                className={
                  "device-wrapper__background-image-overlay " +
                  (isDark
                    ? "device-wrapper__background-image-overlay--light"
                    : "device-wrapper__background-image-overlay--dark")
                }
              />
              <img
                className="device-wrapper__restart-icon"
                src={restartIcon}
                onClick={this.startTimer}
                alt=""
              />

              <div className="device-wrapper__timers">
                {firstTimer && (
                  <Countdown
                    duration={this.calculateDuration(0, 3)}
                    endTimer={this.endFirstTimer}
                    ref="firstCountdown"
                    isDark
                  />
                )}
                {secondTimer && (
                  <Countdown
                    showProgressBar
                    duration={this.calculateDuration(20, 0)}
                    endTimer={this.endSecondTimer}
                    isDark
                  />
                )}
                {thirdTimer && (
                  <Countdown
                    duration={this.calculateDuration(2, 0)}
                    endTimer={this.endThirdTimer}
                    isDark
                  />
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
