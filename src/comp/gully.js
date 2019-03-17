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

  newStartArray = [];

  state = {
    startArray: JSON.stringify(this.startArray),
    newProgress: JSON.stringify(this.newProgress),
    startVolume: 0,
    endVolume: 0
  };

  getNewProgressArray(startArray, progress) {
    this.newStartArray = JSON.parse(JSON.stringify(this.startArray));
    this.newArray = toArray(fromProgressArray(startArray.concat(progress)));
    console.log(this.newArray);
  }

  endingArray = () => {
    this.newArray = [];
    this.newStartArray = JSON.parse(JSON.stringify(this.startArray));
    this.startArray = JSON.parse(this.state.startArray);
    this.newProgress = JSON.parse(this.state.newProgress);
    this.getNewProgressArray(this.startArray, this.newProgress);
  };
  newVol = [];
  getNewVolume(segment) {
    this.newVol = toVolume(fromProgressArray(segment));
    console.log(`volume is ${this.newVol}`);

    this.setState({
      ...this.state,
      endVolume: this.newVol,
      startVolume: toVolume(fromProgressArray(this.newStartArray))
    });
  }

  getStartVolume = () => this.getNewVolume(this.newStartArray);
  getEndVolume = () => this.getNewVolume(this.newArray);
  getShiftVolume = () => console.log("TODO: get shiftVolume"); // This is in process
  trackChanges = ev => {
    this.setState({ ...this.state, startArray: ev.currentTarget.value });
  };

  trackChangesSecond = ev => {
    this.setState({ ...this.state, newProgress: ev.currentTarget.value });
  };

  render() {
    return (
      <div>
        <p>Calculate Segment and Volume</p>
        <div>
          <div>
            <span>Start Array:</span>
            <textarea
              style={{ height: "100px", width: "300px" }}
              onChange={ev => this.trackChanges(ev)}
              value={this.state.startArray}
            />
          </div>
          <div>
            <span>New Array:</span>
            <textarea
              style={{ height: "100px", width: "300px" }}
              onChange={ev => this.trackChangesSecond(ev)}
              value={this.state.newProgress}
            />
          </div>
          <div>
            <div>Start Volume : {this.state.startVolume}</div>
            <div>End Volume : {this.state.endVolume}</div>
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
