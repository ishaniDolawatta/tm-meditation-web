import React, { Component } from "react";

import "./ImageSlider.scss";

class ImageSlider extends Component {
  state = {
      imageList: []
  };

  componentDidMount() {
    this.setState({ imageList: this.getImages() });   
  }

  getImages = () => {
    let images = [];
    for (let index = 1; index < 28; index++) {
        images.push("https://s3.us-east-2.amazonaws.com/tm-meditation/"+this.props.x+"/"+index+".jpg");
    }

    images.forEach( (image,index) => {
      let randomIndex = Math.floor(Math.random()*(index+1)); 
      let itemAtIndex = images[randomIndex]; 
       
      images[randomIndex] = images[index]; 
      images[index] = itemAtIndex;
    });
    return images.splice(0,20);
  };

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default ImageSlider;
