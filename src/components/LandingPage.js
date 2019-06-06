import React, { Component } from "react";
import Countdown from "./timer/countdown/Countdown";
import ImageSlider from "./image-slider/ImageSlider";
import SoundPlayer from "./sound-player/SoundPlayer";
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
    isTimerOn: false,
    isSoundOn: false
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
    this.setState(
      {
        isTimerOn: true,
        isSoundOn: true
      },
      () => {
        this.refs.imageSlider.startTimer();
        this.refs.countdown.resetTimer();
      }
    );
  };

  changeTimerSession = session => {
    if (session === 3) {
      this.setState({
        isTimerOn: false
      });
    } else {
      this.setState(
        {
          isSoundOn: true
        },
        () => {
          this.refs.countdown.startTimer();
        }
      );
    }
  };

  calculateDuration = (min, sec) => {
    return min * 60000 + sec * 1000;
  };

  render() {
    const { isTimerOn, currentTheme, isSoundOn } = this.state;
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
              <p className=" mb-0">{description.FIRST_DESCRIPTION}</p>
              <p>{description.SECOND_DESCRIPTION}</p>

              <div className="ml-2">
                <a
                  target="_blank"
                  href="https://open.spotify.com/track/2oMVSmJx1l2FVXjVbx5DTc?si=Mo6Nb5rLQ5a_maumAOvzMg"
                >
                  <img src={isDark ? playIconDark : playIconLight} alt="" />
                </a>
              </div>
              <p className="mt-3">{description.APP_LINKS_DESCRIPTION}</p>
            </div>
            <div className="description-container__app-links  ">
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
                {isTimerOn && (
                  <Countdown
                    duration={this.calculateDuration(22, 30)}
                    changeTimerSession={this.changeTimerSession}
                    isDark={isDark}
                    ref="countdown"
                  />
                )}
                {isSoundOn && <SoundPlayer />}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
