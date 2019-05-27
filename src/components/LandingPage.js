import React, { Component } from "react";
import Countdown from "./timer/countdown/Countdown";
import ImageSlider from "./image-slider/ImageSlider"

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
    firstTimer: true,
    secondTimer: false,
    thirdTimer: false
  };

  componentDidMount() {
    this.startTimer();
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      this.setState({
        currentTime: new Date().getHours()
      });
    }, 1000);
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
    const isDark = currentTime < 18;
    return (
      <div
        className={`main-container ${
          isDark ? "main-container--light" : "main-container--dark"
        }`}
      >
        <div className="row">
          <div className="col-md-6">
            <div className="description-container">
              <div>
                <p className="description-container__main-description mb-0">
                  Blackbird TM Timer is a simplistic timer for all of you doing
                  Trancendental Meditation.
                </p>
                <p className="description-container__main-description">
                  With creative energy from learning TM in Rishikesh in 1968
                  Paul McCartney composed the simple and beautiful song
                  Blackbird.
                </p>

                <div className="mt-4 ml-2">
                  <img src={isDark ? playIconLight : playIconDark} />
                </div>
                <p className="description-container__main-description mt-3">
                  Please try the timer here or download it on Appstore and
                  Google play.
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
              <img className="device-frame" src={device} />
              <div className={"background-image " + ( isDark ? 'image-overlay-light' : 'image-overlay-dark')}></div>
              <ImageSlider className="device-background"  typeOfDay={isDark ? 'light' :'dark'}/>
              <div className="device-container__timers">
                {firstTimer && (
                  <Countdown duration={30000} endTimer={this.endFirstTimer} />
                )}
                {secondTimer && (
                  <Countdown duration={40000} endTimer={this.endSecondTimer} />
                )}
                {thirdTimer && (
                  <Countdown duration={50000} endTimer={this.endThirdTimer} />
                )}
              </div>
              <img
                className="device-container__restart-icon"
                src={restartIcon}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
