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
  weapon: 'stick',
  xp: 0
}

const enemyStats = {
  health: 70,
  damage: 20
}

const weaponTypeDamageMultipliers = {
  sword: 7,
  axe: 3,
  dagger: 1.3,
  mace: 5
}

const bossStats = {
  health: 5000,
  damage: 200
}

const mapStats = {
  enemyCount: 15,
  healthCount: 8,
  weaponCount: 4,
  bossCount: 1
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
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
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

const playerStartPosition = [3, 3];

function gettypeClasses(typeNumber) {
  var classes = ''; 
  if(typeNumber === typeNumbers.ground) {
    classes = typeClasses.ground;
  } else if(typeNumber === typeNumbers.wall) {
    classes = typeClasses.wall;
  }
  return classes;
}

function getRandomClass() {
  var random = Math.random();
  var classes;
  if(random > 0.5) {
    classes = typeClasses.enemy;
  } else if(random > 0.25) {
    classes = typeClasses.health;
  } else{
    classes = typeClasses.weapon;
  }

  return classes;
}

function convertMapToClasses(map) {
  var convertedMap = [];
  for (var row = 0; row < map.length; row++) {
    var convertedMapRow = [];
    for (var column = 0; column < map[row].length; column++) {
      convertedMapRow[column] = gettypeClasses(map[row][column]);
    }
    convertedMap.push(convertedMapRow);
  }

  return convertedMap;
}

function poplateMap(map) {
  addToMap(map, mapStats.enemyCount, typeClasses.enemy);
  addToMap(map, mapStats.healthCount, typeClasses.health);
  addToMap(map, mapStats.weaponCount, typeClasses.weapon);
  addToMap(map, mapStats.bossCount, typeClasses.boss);
}

function addToMap(map, typeCount, classes) {
  for(var count = 0; count < typeCount; count++) {
    var position = randomPosition(map);
    map[position[0]][position[1]] = classes;
  }
}

function randomPosition(map) {
  var row = Math.trunc((Math.random() * map.length));
  var column = Math.trunc((Math.random() * map[0].length));
  var position = [row, column];

  if(map[row][column] !== typeClasses.ground || isBlockingPath(row, column, map)) {
    position = randomPosition(map);
  }

  return position;

}

function isBlockingPath(row, column, map) {
    var verticalResult = false;
    var horizontalResult = false;

    //Checks tiles on the top and bottom of position.
    for(var testRow = row - 1; testRow <= row + 1; testRow++) {
      if(0 <= testRow && testRow < map.length && testRow !== row) {
        verticalResult =  map[testRow][column] === typeClasses.ground;
      }

      if(verticalResult){
        break;
      }
    }

    //Checks tiles on the left and right of position.
    for(var testColumn = row - 1; testColumn <= column + 1; testColumn++) {
      if(0 <= testColumn && testColumn < map.length && testColumn !== column) {
        horizontalResult =  map[row][testColumn] === typeClasses.ground;
      }

      if(horizontalResult){
        break;
      }
    }

    return verticalResult && horizontalResult;
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
    this.startInputTimeout = this.startInputTimeout.bind(this);
    this.calculateDamage = this.calculateDamage.bind(this);
    this.calculateRemainingXp = this.calculateRemainingXp.bind(this);
    this.updatePlayerPosition = this.updatePlayerPosition.bind(this);
    this.removeEnemy = this.removeEnemy.bind(this);
    this.getLevelUpXp = this.getLevelUpXp.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.winGame = this.winGame.bind(this);

    document.onkeydown = this.handleInput;

    var map = convertMapToClasses(levelOneMap);
    poplateMap(map);
    this.state = {
    grid: map, 
    playerPosition: playerStartPosition, 
    inputBlocked: false, 
    enemies: getEnemies(map),
    bossHealth: bossStats.health,
    hasWon: false,
    playerStats: {
      health: playerBaseStats.health,
      damage: playerBaseStats.damage,
      level: playerBaseStats.level,
      weapon: playerBaseStats.weapon,
      xp: 0
    }
  };
  }

  handleInput(event) {
    if(this.isArrowKey(event.keyCode) && !this.state.inputBlocked) {
      this.updatePlayerPosition(event.keyCode);
      this.startInputTimeout();
    }
  }

  isArrowKey(keyCode) {
    return 37 <= keyCode <= 40
  }

  startInputTimeout() {
    this.setState({inputBlocked: true});
      setTimeout(() => {
        this.setState({inputBlocked: false});
      }, 10);
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

    var newPositionClass = this.state.grid[playerPosition[0]][playerPosition[1]];

    if(newPositionClass === typeClasses.ground) {
      this.setState({playerPosition: playerPosition});
    } else if(newPositionClass === typeClasses.enemy) {
      this.exchangeAttacks(playerPosition);
    } else if(newPositionClass === typeClasses.boss) {
      this.exchangeAttacksWithBoss();
    } else if(newPositionClass === typeClasses.weapon) {
      this.consumeWeapon(playerPosition);
    } else if(newPositionClass === typeClasses.health) {
      this.consumeHealth(playerPosition);
    }
  }

  exchangeAttacks(enemyPosition) {
    var enemies = this.state.enemies;
    var enemy = enemies[enemyPosition[0]+','+enemyPosition[1]];
    var playerStats = this.state.playerStats;
    var calculatedPlayerDamage = this.calculateDamage();
    var actualPlayerDamage = this.randomNumber(calculatedPlayerDamage * 0.75, calculatedPlayerDamage);
    var calculatedEnemyDamage = enemy.damage * Math.pow(playerStats.level, 1.3);
    var actualEnemyDamage = this.randomNumber(calculatedEnemyDamage * 0.75, calculatedEnemyDamage);

    enemy.health -= actualPlayerDamage;
    playerStats.health -= enemy.health > 0 ? actualEnemyDamage : 0;

    this.setState({enemies: enemies, playerStats: playerStats})   
  }

  randomNumber(min, max) {
    return Math.trunc(Math.random() * (max - min) + min);
  }

  exchangeAttacksWithBoss() {
    var bossHealth = this.state.bossHealth;
    var playerStats = this.state.playerStats;
    var calculatedPlayerDamage = this.calculateDamage();
    var actualPlayerDamage = this.randomNumber(calculatedPlayerDamage * 0.75, calculatedPlayerDamage);
    var actualBossDamage = this.randomNumber(bossStats.damage * 0.75, bossStats.damage);

    bossHealth -= actualPlayerDamage;
    playerStats.health -= actualBossDamage;

    this.setState({bossHealth: bossHealth, playerStats: playerStats});
  }

  consumeWeapon(position) {
    var playerStats = this.state.playerStats;
    var grid = this.state.grid.slice();

    grid[position[0]][position[1]] = typeClasses.ground;

    if(playerStats.level === 1) {
      playerStats.weapon = 'dagger';
    } else if(playerStats.level === 2) {
      playerStats.weapon = 'axe';
    } else if(playerStats.level === 3) {
      playerStats.weapon = 'mace';
    } else if(playerStats.level === 4) {
      playerStats.weapon = 'sword'
    }

    this.setState({grid: grid, playerStats: playerStats});
  }

  consumeHealth(position) {
    var playerStats = this.state.playerStats;
    var grid = this.state.grid.slice();

    playerStats.health += playerBaseStats.health * playerStats.level / 2;

    grid[position[0]][position[1]] = typeClasses.ground;

    this.setState({grid: grid, playerStats: playerStats});
  }

  removeEnemy(row, column) {
    let grid = this.state.grid.slice();
    grid[row][column] = typeClasses.ground;
    var playerStats = this.state.playerStats;
    playerStats.xp += 10*(playerStats.level * playerStats.level);
    if(playerStats.xp >= levelUpXp[playerStats.level]) {
      playerStats.level = playerStats.level < 4 ? playerStats.level + 1 : playerStats.level;
      playerStats.damage = playerStats.damage*playerStats.level;
      playerStats.health += 100;
    }
    this.setState({grid: grid, playerStats: playerStats});
  }

  winGame() {
    this.setState({hasWon: true});
  }

  restartGame() {
    var map = convertMapToClasses(levelOneMap);
    poplateMap(map);
    this.setState({
      grid: map, 
      playerPosition: playerStartPosition, 
      inputBlocked: false, 
      enemies: getEnemies(map),
      bossHealth: bossStats.bossHealth,
      win: false,
      playerStats: {
        health: playerBaseStats.health,
        damage: playerBaseStats.damage,
        level: playerBaseStats.level,
        weapon: playerBaseStats.weapon,
        xp: 0
      }
    });
  }

  getLevelUpXp() {
    return levelUpXp[this.state.playerStats.level];
  }

  calculateDamage() {
    var damage;

    if(this.state.playerStats.weapon === 'stick') {
      damage = this.state.playerStats.damage;
    } else {
      damage = this.state.playerStats.damage * weaponTypeDamageMultipliers[this.state.playerStats.weapon];
    }

    return damage;
  }

  calculateRemainingXp() {
    var remainingXp = 0;

    if(this.state.playerStats.level < 4) {
      remainingXp = levelUpXp[this.state.playerStats.level] - this.state.playerStats.xp;
    }

    return remainingXp;
  }

  getMainUi() {
    var ui;

    if(this.state.hasWon) {
      ui =<div className="victory-text"> Congrats you have won. </div>
    } else {
      ui = <Grid 
            grid={this.state.grid}
            playerPosition={this.state.playerPosition}
            playerStats={this.state.playerStats}
            bossHealth={this.state.bossHealth}
            enemies={this.state.enemies}
            restartGame={this.restartGame}
            removeEnemy={this.removeEnemy}
            winGame={this.winGame}
          />
    }

    return ui;
  }

  render() {
    return(
      <div className="container">
        <div className="ui-container">
          <div className="stat-indicator">Health: {this.state.playerStats.health}</div>
          <div className="stat-indicator">Damage: {this.calculateDamage()}</div>
          <div className="stat-indicator">Weapon: {this.state.playerStats.weapon}</div>
          <div className="stat-indicator">Level: {this.state.playerStats.level}</div>
          <div className="stat-indicator">Remaining XP: {this.calculateRemainingXp()}</div>
        </div>
        {this.getMainUi()}
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
    
    for (var row = -3; row < 4; row++) {
      let divRow = [];
      for (var column = -3; column < 4; column++) {
        let isPlayerPosition = row ===  0 && column === 0;
        let actualRow = this.props.playerPosition[0] + row;
        let actualColumn = this.props.playerPosition[1] + column;
        if(0 <= actualRow && actualRow < currentGrid.length && 0 <= actualColumn && actualColumn < currentGrid[0].length){
          let classes =  isPlayerPosition ? typeClasses.player : (currentGrid[actualRow][actualColumn]);
          let component;
          if(isPlayerPosition) {
            component = this.generatePlayer(row+','+column, classes);
          } else if((currentGrid[actualRow][actualColumn]) === 'enemy') {
            component = this.generateEnemy(actualRow, actualColumn, classes);
          } else if((currentGrid[actualRow][actualColumn]) === 'boss'){
            component = this.generateBoss(actualRow, actualColumn, classes);
          } else {
            component = this.generateTile(row+','+column, classes);
          }
          
          divRow.push(component);
        }
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
            key={row+','+column} 
            type={classes}
            position={{row: row, column: column}}
            health={this.props.enemies[row+','+column].health}
            removeEnemy={this.props.removeEnemy}
          />
  }

  generateBoss(row, column, classes) {
    return <Boss
            key={row+','+column} 
            type={classes}
            position={{row: row, column: column}}
            health={this.props.bossHealth}
            winGame={this.props.winGame}
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
    if(this.props.health <= 0 ) {
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

class Boss extends Tile {
   constructor(props) {
    super(props);
    this.checkForDeath = this.checkForDeath.bind(this);
  }

  componentDidUpdate(prevPops, prevState) {
    this.checkForDeath();
  }

  checkForDeath() {
    console.log('check for death');
    if(this.props.health <= 0){
      this.props.winGame(this.props.position.row, this.props.position.column);
    }
  }
}

export default RogueLike;
