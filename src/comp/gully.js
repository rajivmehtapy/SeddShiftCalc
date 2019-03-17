import React, { Component } from "react";
import { fromProgressArray, toArray, toVolume } from "@sedd/utils/segment";
import "../App.css";

// const startArray = [
//   { diameter: 30, distance: 0 },
//   { diameter: 24, distance: 0 }
// ];

// let newArray;
// function getNewProgressArray(startArray, progress) {
//   newArray = toArray(fromProgressArray(startArray.concat(progress)));
//   console.log(newArray);
// }

// const endingArray = () => getNewProgressArray(startArray, newProgress);

// let newVol;
// function getNewVolume(segment) {
//   newVol = toVolume(fromProgressArray(segment));
//   console.log(`volume is ${newVol}`);
// }

// const getStartVolume = () => getNewVolume(startArray);
// const getEndVolume = () => getNewVolume(newArray);
// const getShiftVolume = () => console.log("TODO: get shiftVolume"); // This is in process

export default class SegmentCalculator extends Component {
  startArray = [
    { diameter: 36, distance: 100 },
    { diameter: 30, distance: 200 },
    { diameter: 24, distance: 300 },
    { diameter: 11, distance: 100 }
  ];

  newProgress = [
    { diameter: 30, distance: 50 },
    { diameter: 24, distance: 75 }
  ];

  newArray = [];

  state = {
    startArray: JSON.stringify(this.startArray),
    newProgress: JSON.stringify(this.newProgress)
  };

  getNewProgressArray(startArray, progress) {
    this.newArray = toArray(fromProgressArray(startArray.concat(progress)));
    console.log(this.newArray);
  }

  endingArray = () =>
    this.getNewProgressArray(this.startArray, this.newProgress);

  newVol = [];
  getNewVolume(segment) {
    this.newVol = toVolume(fromProgressArray(segment));
    console.log(`volume is ${this.newVol}`);
  }

  getStartVolume = () => this.getNewVolume(this.startArray);
  getEndVolume = () => this.getNewVolume(this.newArray);
  getShiftVolume = () => console.log("TODO: get shiftVolume"); // This is in process

  render() {
    return (
      <div>
        <p>Calculate Segment and Volume</p>
        <div>
          <div>
            <span>Start Array:</span>
            <textarea onChange={() => {}} value={this.state.startArray} />
          </div>
          <div>
            <span>New Array:</span>
            <textarea onChange={() => {}} value={this.state.newProgress} />
          </div>
        </div>
        <button onClick={() => this.endingArray()} label="MakeNewArray">
          MakeNewArray
        </button>
        <button onClick={() => this.getStartVolume()} label="Start Volume">
          Start Volume
        </button>
        <button onClick={() => this.getEndVolume()} label="End Volume">
          End Volume
        </button>
        <button onClick={() => this.getShiftVolume()} label="Shift Volume">
          Shift Volume
        </button>
      </div>
    );
  }
}
