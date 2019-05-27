import React, { Component } from 'react';
import Countdown from "./timer/countdown/Countdown";

class LandingPage extends Component {

    state = {
      timer: true,
    };

  render() {
    const { timer} = this.state;
    return (
      <div className="App">
        <div className="row">
          <div className="col-md-6">
            <p className="discription"></p>
          </div>
          <div className="col-md-6">
            <div className="Timers">{ timer &&
              <div>         
                <p>1</p>
                <Countdown duration={30000}/>
              </div>  }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
