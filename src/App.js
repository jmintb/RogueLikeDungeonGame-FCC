import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const typeClasses = {
  wall: 'wall',
  ground: 'ground',
  enemy: 'enemy',
  health: 'health',
  weapon: 'weapon',
  boss: 'boss',
  player: 'player'
}

const typeNumbers = {
  wall: 0,
  ground: 1,
  enemy: 2,
  health: 3,
  weapon: 4,
  boss: 5,
  player: 6
}

class RogueLike extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return(
      <div>
        <Grid grid={this.state.grid}/>
      </div>
    );
  }
}

class Grid extends Component {
  constructor(props) {
    super(props);
    this.createGrid = this.createGrid.bind(this);
  }

  createGrid() {
    var currentGrid = this.props.grid;
    var divRows = [];

    for (var row = 0; row < currentGrid.length; row++) {
      let divRow = [];
      for (var column = 0; column < array.length; column++) {
        divRow.push(<Tile type={currentGrid[row][column].type}/>)
      }
      divRows.push(<div className="row">{divRow}</div>);
    }

    return divRows;
  }

  render() {
    return(
      <div>
        {this.createGrid()}
      </div>
    );
  }
}

class Tile extends Component {
  render(){
    return(
      <div className={"tile " + this.props.class}></div>
    );
  }
}

export default RogueLike;
