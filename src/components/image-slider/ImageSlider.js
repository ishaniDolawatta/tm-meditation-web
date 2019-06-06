import React, { Component } from "react";

import "./ImageSlider.scss";

class ImageSlider extends Component {
  state = {
    imageList: [],
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    currentImage: "",
    imageCount: 0
  };

  duration = 1350000;
  interval = 67500;
  initialImageount = 27;
  shuffleImageCount = 20;

  componentDidMount() {
    this.setState(
      {
        imageList: this.getImages()
      },
      () => {
        this.setState({
          currentImage: this.state.imageList[0]
        });
      }
    );
  }

  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime
    });

    this.timer = setInterval(() => {
      if (this.state.timerTime < this.duration) {
        this.setState({
          timerTime: Date.now() - this.state.timerStart
        });

        let currentImageCount = Math.floor(
          this.state.timerTime / this.interval
        );

        if (currentImageCount !== this.state.imageCount) {
          this.setState({
            imageCount: currentImageCount,
            currentImage: this.state.imageList[currentImageCount]
          });
        }
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
        this.stopTimer();
      }
      this.setState({
        timerTime: Date.now() - this.state.timerStart
      });
    }, 10);
  };

  stopTimer = () => {
    this.setState({ timerOn: false });
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({
      timerStart: 0,
      timerTime: 0
    });
  };

  getImages = () => {
    let images = [];
    for (let index = 1; index < this.initialImageount; index++) {
      images.push(
        "https://s3.us-east-2.amazonaws.com/tm-meditation/" +
          this.props.typeOfDay +
          "/" +
          index +
          ".jpg"
      );
    }

    images = this.shuffleImages(images);
    return images.splice(0, this.shuffleImageCount);
  };

  shuffleImages(images) {
    images.forEach((image, index) => {
      let randomIndex = Math.floor(Math.random() * (index + 1));
      let itemAtIndex = images[randomIndex];

      images[randomIndex] = images[index];
      images[index] = itemAtIndex;
    });
    return images;
  }

  render() {
    const { currentImage } = this.state;
    return (
      <div>
        <img className="background-image" src={currentImage} alt="" />
      </div>
    );
  }
}

export default ImageSlider;
