import React, { Component } from 'react';


class Report extends Component {
  state = {
    favColors: this.props.favColors
  }
  render() {
    let colors = {
      BLACK: 0,
      BLUE: 0,
      RED: 0,
      GREEN: 0
    }

    //count # for each favorite color
    for(let entry of this.state.favColors){
      if(entry.color === "BLACK"){
        colors.BLACK += 1;
      }
      else if(entry.color === "BLUE"){
        colors.BLUE += 1;
      }
      else if(entry.color === "RED"){
        colors.RED += 1;
      }
      else if(entry.color === "GREEN"){
        colors.GREEN += 1;
      }
    }

    return (
      <div className="container">
        <h4>REPORT</h4>
        <div>BLACK: {colors.BLACK}</div>
        <div>BLUE: {colors.BLUE}</div>
        <div>RED: {colors.RED}</div>
        <div>GREEN: {colors.GREEN}</div>
      </div>
    );
  }
}

export default Report;