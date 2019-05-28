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
import * as description from "../config/constants/description";

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
        <div className="row">
          <div className="col-md-6">
            <div className="description-container">
              <div>
                <p className="description-container__main-description mb-0">
                  {description.FIRST_DESCRIPTION}
                </p>
                <p className="description-container__main-description">
                  {description.SECOND_DESCRIPTION}
                </p>

                <div className="mt-4 ml-2">
                  <img src={isDark ? playIconDark : playIconLight} />
                </div>

                <p className="description-container__main-description mt-3">
                  {description.APP_LINKS_DESCRIPTION}
                </p>
              </div>
              <div className="description-container__app-links mt-5 ">
                <img src={googlePlay} />
                <img src={appStore} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="device-container">
              <img className="device-container__device-frame" src={device} />
              <div
                className={
                  "device-container__background-image-overlay " +
                  (isDark
                    ? "device-container__background-image-overlay--light"
                    : "device-container__background-image-overlay--dark")
                }
              />
              <ImageSlider
                typeOfDay={isDark ? "light" : "dark"}
                ref="imageSlider"
              />

              <div className="device-container__timers">
                {firstTimer && (
                  <Countdown
                    duration={this.calculateDuration(0, 30)}
                    endTimer={this.endFirstTimer}
                    ref="firstCountdown"
                  />
                )}
                {secondTimer && (
                  <Countdown
                    showProgressBar
                    duration={this.calculateDuration(20, 0)}
                    endTimer={this.endSecondTimer}
                  />
                )}
                {thirdTimer && (
                  <Countdown
                    duration={this.calculateDuration(2, 0)}
                    endTimer={this.endThirdTimer}
                  />
                )}
              </div>
              <img
                className="device-container__restart-icon"
                src={restartIcon}
                onClick={this.startTimer}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
