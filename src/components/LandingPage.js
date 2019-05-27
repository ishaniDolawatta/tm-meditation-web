import React, { Component } from "react";
import Countdown from "./timer/countdown/Countdown";

import playIconDark from "../assets/icons/play-icon-dark.svg";
import googlePlay from "../assets/images/google-play.svg";
import appStore from "../assets/images/app-store.svg";

import "./LandingPage.scss";

class LandingPage extends Component {
  state = {
    firstTimer: true,
    secondTimer: false,
    thirdTimer: false
  };

  endedFirstTimer = () => {
    this.setState({ firstTimer: false });
    this.setState({ secondTimer: true });
  }

  endedSecondTimer = () => {
    this.setState({ secondTimer: false });
    this.setState({ thirdTimer: true });
  }

  endedThirdTimer = () => {
    this.setState({ thirdTimer: false });
  }

  render() {
    const { firstTimer, secondTimer, thirdTimer } = this.state;
    return (
      <div className="background-color-day">
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
                  <img src={playIconDark} />
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
            <div className="Timers">{ firstTimer &&
              <div>         
                <p>1</p>
                <Countdown duration={30000} endTimer={this.endedFirstTimer}/>
              </div>  }
            </div>
            <div className="Timers"> { secondTimer &&
              <div>         
                <p>2</p>
                <Countdown duration={40000} endTimer={this.endedSecondTimer}/>
              </div>  }
            </div>
            <div className="Timers">{ thirdTimer && 
              <div>         
                <p>3</p>
                <Countdown duration={50000} endTimer={this.endedThirdTimer}/>
              </div>  }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
