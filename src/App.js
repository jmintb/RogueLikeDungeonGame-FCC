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
  health: 80,
  damage: 30,
  level: 1,
  weapon: 'none',
  xp: 0
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

const levelUpXp = {
  1: 20,
  2: 60,
  3: 100
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

function getEnemies(map) {
  var enemies = {};

  for(var row = 0; row < map.length; row++) {
    for (var column = 0; column < map[row].length; column++) {
      if(map[row][column] === 'enemy') {
        enemies[row+','+column] = {
          health: enemyStats.health,
          damage: enemyStats.damage
        }
      }
    }
  }

  return enemies;
}

class RogueLike extends Component {
  constructor(props) {
    super(props)
    this.handleInput = this.handleInput.bind(this);
    this.updatePlayerPosition = this.updatePlayerPosition.bind(this);
    this.removeEnemy = this.removeEnemy.bind(this);
    this.getLevelUpXp = this.getLevelUpXp.bind(this);
    document.onkeydown = this.handleInput;
    var map = convertMapToClasses(levelOneMap);
    this.state = {
    grid: map, 
    playerPosition: playerStartPosition, 
    inputBlocked: false, 
    enemies: getEnemies(map),
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
      this.exchangeAttacks(playerPosition);
    }
  }

  exchangeAttacks(enemyPosition) {
    var enemies = this.state.enemies;
    var enemy = enemies[enemyPosition[0]+','+enemyPosition[1]];
    var playerStats = this.state.playerStats;

    enemy.health -= playerStats.damage;
    playerStats.health -= enemy.health > 0 ? enemy.damage : 0;
    console.log('exchange attacks: ' + enemy.health);
    this.setState({enemies: enemies, playerStats: playerStats})   
  }

  removeEnemy(row, column) {
    let grid = this.state.grid.slice();
    grid[row][column] = typeClasses.ground;
    this.setState({grid: grid});
  }

  restartGame() {
    console.log('restart game');
  }

  getLevelUpXp() {
    return levelUpXp[this.state.playerStats.level];
  }

  render() {
    return(
      <div className="container">
        <div className="ui-container">
          <div className="stat-indicator">Health: {this.state.playerStats.health}</div>
          <div className="stat-indicator">Damage: {this.state.playerStats.damage}</div>
          <div className="stat-indicator">Weapon: {this.state.playerStats.weapon}</div>
          <div className="stat-indicator">Remaining XP: {this.getLevelUpXp() - this.state.playerStats.xp}</div>
        </div>
        <Grid 
          grid={this.state.grid}
          playerPosition={this.state.playerPosition}
          playerStats={this.state.playerStats}
          enemies={this.state.enemies}
          restartGame={this.restartGame}
          removeEnemy={this.removeEnemy}
        />
      </div>
    );
  }
}

class Grid extends Component {
  constructor(props) {
    super(props);
    this.createGrid = this.createGrid.bind(this);
    this.generatePlayer = this.generatePlayer.bind(this);
    this.generateEnemy = this.generateEnemy.bind(this);
    this.generateTile = this.generateTile.bind(this);
  }

  createGrid() {
    var currentGrid = this.props.grid;
    var divRows = [];

    for (var row = 0; row < currentGrid.length; row++) {
      let divRow = [];
      for (var column = 0; column < currentGrid[row].length; column++) {
        let isPlayerPosition = row ===  this.props.playerPosition[0] && column === this.props.playerPosition[1];
        let classes =  isPlayerPosition ? typeClasses.player : (currentGrid[row][column]);
        let component;
        if(isPlayerPosition) {
          component = this.generatePlayer(row+column, classes);
        } else if((currentGrid[row][column]) === 'enemy') {
          component = this.generateEnemy(row, column, classes);
        } else{
          component = this.generateTile(row+column, classes);
        }
        
        divRow.push(component);
      }
      divRows.push(<div key={row} className="row">{divRow}</div>);
    }

    return divRows;
  }

  generatePlayer(key, classes) {
    return <Player 
            key={key} 
            type={classes} 
            health={this.props.playerStats.health}
            restartGame={this.props.restartGame}
          /> 
  }

  generateEnemy(row, column, classes) {
    return <Enemy
            key={row+column} 
            type={classes}
            position={{row: row, column: column}}
            health={this.props.enemies[row+','+column].health}
            removeEnemy={this.props.removeEnemy}
          />
  }

  generateTile(key, classes) {
    return <Tile 
            key={key} 
            type={classes}
          />
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

class Player extends Tile {
 constructor(props) {
    super(props);
    this.checkForDeath = this.checkForDeath.bind(this);
  }

  componentDidUpdate(prevPops, prevState) {
    this.checkForDeath();
  }

  checkForDeath() {
    if(this.props.health <= 0) {
      this.props.restartGame();
    }
  }
}

class Enemy extends Tile {
   constructor(props) {
    super(props);
    this.checkForDeath = this.checkForDeath.bind(this);
  }

  componentDidUpdate(prevPops, prevState) {
    this.checkForDeath();
  }

  checkForDeath() {
    if(this.props.health <= 0){
      this.props.removeEnemy(this.props.position.row, this.props.position.column);
    }
  }
}

export default RogueLike;
