import React, { Component } from 'react';
import './App.css';

const gridHeight = 30;
const gridWidth = 30;

const visibleSquareHeight = 7;
const visibleSquarewidth = 7;

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
  ground: 0,
  wall: 1
}

const structureType = {
  labyrinth: 0,
  square: 1
}

const keys = {
  up: 38,
  down: 40,
  left: 37,
  right: 39
}

const playerBaseStats = {
  health: 100,
  damage: 30,
  level: 1
}

const enemyStats = {
  health: 70,
  damage: 30
}

const weaponTypeDamageMultiplier = {
  sword: 10,
  axe: 5,
  dagger: 2,
  mace: 7
}

const levelXp = {
  2: 20,
  3: 60,
  4: 100
}

const levelOneMap = [
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]

]

const playerStartPosition = [0, 0];

function getTypeClasses(typeNumber) {
  var classes = ''; 
  if(typeNumber === typeNumbers.ground) {
    classes =  Math.random() < 0.02 ? typeClasses.enemy : typeClasses.ground;
  } else if(typeNumber === typeNumbers.wall) {
    classes = typeClasses.wall;
  }
  return classes;
}

function convertMapToClasses(map) {
  var convertedMap = map.slice();
  for (var row = 0; row < map.length; row++) {
    for (var column = 0; column < map[row].length; column++) {
      convertedMap[row][column] = getTypeClasses(map[row][column]);
    }    
  }
  return convertedMap;
}

class RogueLike extends Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this);
    this.updatePlayerPosition = this.updatePlayerPosition.bind(this);
    document.onkeydown = this.handleInput;
    this.state = {
    grid: convertMapToClasses(levelOneMap), 
    playerPosition: playerStartPosition, 
    inputBlocked: false, 
    enemies: {},
    playerStats: playerBaseStats
    };
  }

  handleInput(event) {
    if(37 <= event.keyCode <= 40 && !this.state.inputBlocked) {
      this.updatePlayerPosition(event.keyCode);

      this.setState({inputBlocked: true});
      setTimeout(() => {
        this.setState({inputBlocked: false});
      }, 10);
    }
  }

  updatePlayerPosition(key) {
    var playerPosition = this.state.playerPosition.slice();

    if(key === keys.up && playerPosition[0] > 0) {
      playerPosition[0] --;
    } else if (key === keys.down && playerPosition[0] < this.state.grid.length-1) {
      playerPosition[0] ++;
    } else if (key === keys.left && playerPosition[1] > 0) {
      playerPosition[1] --;
    } else if (key === keys.right && playerPosition[1] < this.state.grid[0].length-1) {
      playerPosition[1] ++;
    }

    if(this.state.grid[playerPosition[0]][playerPosition[1]] === typeClasses.ground) {
      this.setState({playerPosition: playerPosition});
    } else if(this.state.grid[playerPosition[0]][playerPosition[1]] === typeClasses.enemy) {
      this.attackEnemy(playerPosition);
    }
  }

  attackEnemy(enemyPosition) {
    var enemies = this.state.enemies;
    var playerStats = this.state.playerStats;
    var enemyId = enemyPosition[0]+','+enemyPosition[1];

    if(!(enemyId in enemies)){
      enemies[enemyId] = {
        health: enemyStats.health * (playerStats.level*0.75),
        damage: enemyStats.damage * (playerStats.level*0.6)
      }
      console.log('added enemy ' + JSON.stringify(enemies));
    }

    enemies[enemyId].health -= playerStats.damage;
    playerStats.health -= enemies[enemyId].damage;

    console.log('enemyStats: ' + JSON.stringify(enemies.enemyId));

    if(enemies[enemyId].health <= 0) {
      let grid = this.state.grid.slice();

      delete enemies[enemyId];
      grid[enemyPosition[0]][enemyPosition[1]] = typeClasses.ground;
      this.setState({grid: grid, enemies: enemies, playerStats: playerStats});
    } else {
      this.setState({enemies: enemies, playerStats: playerStats})
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
        let classes =  isPlayerPosition ? typeClasses.player : (currentGrid[row][column]);
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
