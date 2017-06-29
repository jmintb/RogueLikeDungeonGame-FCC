import React, { Component } from 'react';
import './App.css';

const gridHeight = 10;
const gridWidth = 10;

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

const keys = {
  up: 38,
  down: 40,
  left: 37,
  right: 39
}

const levelOneMap = [
  [typeClasses.ground, typeClasses.ground, typeClasses.wall, typeClasses.ground, typeClasses.ground, typeClasses.ground, typeClasses.ground, typeClasses.ground, typeClasses.ground, typeClasses.ground],
  [typeClasses.ground, typeClasses.ground, typeClasses.wall, typeClasses.ground, typeClasses.ground, typeClasses.ground, typeClasses.ground, typeClasses.ground, typeClasses.ground, typeClasses.ground],
  [typeClasses.ground, typeClasses.ground, typeClasses.wall, typeClasses.wall, typeClasses.wall, typeClasses.wall, typeClasses.wall, typeClasses.ground, typeClasses.ground, typeClasses.ground],
  [typeClasses.ground, typeClasses.ground, typeClasses.ground, typeClasses.ground, typeClasses.ground, typeClasses.ground, typeClasses.wall, typeClasses.ground, typeClasses.ground, typeClasses.ground],
  [typeClasses.ground, typeClasses.ground, typeClasses.ground, typeClasses.ground, typeClasses.ground, typeClasses.ground, typeClasses.wall, typeClasses.ground, typeClasses.ground, typeClasses.ground],
  [typeClasses.wall, typeClasses.wall, typeClasses.wall, typeClasses.wall, typeClasses.wall, typeClasses.ground, typeClasses.wall, typeClasses.ground, typeClasses.ground, typeClasses.ground],
  [typeClasses.ground, typeClasses.ground, typeClasses.ground, typeClasses.ground, typeClasses.wall, typeClasses.ground, typeClasses.wall, typeClasses.ground, typeClasses.ground, typeClasses.ground],
  [typeClasses.ground, typeClasses.ground, typeClasses.ground, typeClasses.ground, typeClasses.wall, typeClasses.ground, typeClasses.wall, typeClasses.ground, typeClasses.ground, typeClasses.ground],
  [typeClasses.ground, typeClasses.ground, typeClasses.ground, typeClasses.ground, typeClasses.wall, typeClasses.ground, typeClasses.wall, typeClasses.ground, typeClasses.ground, typeClasses.ground],
  [typeClasses.ground, typeClasses.ground, typeClasses.ground, typeClasses.ground, typeClasses.wall, typeClasses.ground, typeClasses.wall, typeClasses.ground, typeClasses.ground, typeClasses.ground]
]

const playerStartPosition = [0, 0];

class RogueLike extends Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this);
    this.updatePlayerPosition = this.updatePlayerPosition.bind(this);
    document.onkeydown = this.handleInput;
    this.state = {grid: levelOneMap, playerPosition: playerStartPosition};
  }

  handleInput(event) {
    console.log('key: '+event.keyCode);
    if(37 <= event.keyCode <= 40) {
      this.updatePlayerPosition(event.keyCode);
    }
  }

  updatePlayerPosition(key) {
    var playerPosition = this.state.playerPosition.slice();

    if(key === keys.up && playerPosition[0] > 0) {
      playerPosition[0] --;
    } else if (key === keys.down && playerPosition[0] < gridHeight-1) {
      playerPosition[0] ++;
    } else if (key === keys.left && playerPosition[1] > 0) {
      playerPosition[1] --;
    } else if (key === keys.right && playerPosition[1] < gridWidth-1) {
      playerPosition[1] ++;
    }
    if(this.state.grid[playerPosition[0]][playerPosition[1]] === typeClasses.ground){
      this.setState({playerPosition: playerPosition});
    }
  }

  render() {
    return(
      <div className="container">
        <Grid 
          grid={this.state.grid}
          playerPosition={this.state.playerPosition}
        />
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
      for (var column = 0; column < currentGrid[row].length; column++) {
        let isPlayerPosition = row ===  this.props.playerPosition[0] && column === this.props.playerPosition[1];
        let classes =  isPlayerPosition ? typeClasses.player : currentGrid[row][column];
        divRow.push(<Tile key={column+row} type={classes}/>)
      }
      divRows.push(<div key={row} className="row">{divRow}</div>);
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
  constructor(props) {
    super(props)
  }

  render(){
    return(
      <div className={"tile " + this.props.type}></div>
    );
  }
}

export default RogueLike;
