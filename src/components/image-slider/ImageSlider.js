import React, { Component } from "react";

import "./ImageSlider.scss";

class ImageSlider extends Component {
  state = {
    currentImage: ""
  };

  initialImageount = 27;
  shuffleImageCount = 20;
  imageList = [];
  imageCount = 0;

  componentDidMount() {
    this.setImages();
  }

  changeImage = () => {
    if (this.imageCount === this.imageList.length) {
      this.setImages();
    } else {
      this.assignImage();
    }
  };

  setImages = async () => {
    this.imageList = await this.getImages();
    this.setState({
      currentImage: this.imageList[0]
    });
  };

  assignImage = () => {
    this.imageCount = this.imageCount + 1;
    this.setState({
      currentImage: this.imageList[this.imageCount]
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
