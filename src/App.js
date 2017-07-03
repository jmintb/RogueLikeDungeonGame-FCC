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
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

const playerStartPosition = [3, 3];

//The map is converted from numbders too classes, since classes are 
//used when generating the different types of map tiles. The conversation is done once
//Instead of having to do the conversion every time the tiles are redrawn/updated.
function convertMapToClasses(map) {
  var convertedMap = [];

  processMatrix(convertedMap, [map.length, map[0].length], 
  (row, column, rowArray) => {
    rowArray[column] = getTypeClasses(map[row][column]);
  }, 
  (rowArray, rowIndex, matrix) => {
    matrix.push(rowArray);
  });
  
  return convertedMap;
}

function processMatrix(matrixArray, matrixDimensions, columnCallback, rowCallBack) {
  for(var row = 0; row < matrixDimensions[0]; row++) {
    let rowArray = [];

    for(var column = 0; column < matrixDimensions[1]; column++) {
      columnCallback(row, column, rowArray);
    }

    rowCallBack(rowArray, row, matrixArray);
  }
}

function getTypeClasses(typeNumber) {
  var classes = '';

  if(typeNumber === typeNumbers.ground) {
    classes = typeClasses.ground;
  } else if(typeNumber === typeNumbers.wall) {
    classes = typeClasses.wall;
  }

  return classes;
}

function populateMap(map) {
  addTypeToMap(map, mapStats.enemyCount, typeClasses.enemy);
  addTypeToMap(map, mapStats.healthCount, typeClasses.health);
  addTypeToMap(map, mapStats.weaponCount, typeClasses.weapon);
  addTypeToMap(map, mapStats.bossCount, typeClasses.boss);
}

function addTypeToMap(map, typeCount, classes) {
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
    this.isHittingSomething = this.isHittingSomething.bind(this);
    this.startInputTimeout = this.startInputTimeout.bind(this);
    this.calculatePlayerDamage = this.calculatePlayerDamage.bind(this);
    this.calculateRemainingXp = this.calculateRemainingXp.bind(this);
    this.getNewPlayerPosition = this.getNewPlayerPosition.bind(this);
    this.onEnemyKilled = this.onEnemyKilled.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.winGame = this.winGame.bind(this);

    document.onkeydown = this.handleInput;

    var map = convertMapToClasses(levelOneMap);

    populateMap(map);

    this.state = {
      map: map, 
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
      var playerPosition = this.state.playerPosition;

      playerPosition = this.getNewPlayerPosition(event.keyCode);

      if(this.isHittingSomething(playerPosition)) {
        this.preformAction(playerPosition)
      } else {
        console.log('move player');
        this.setState({
          playerPosition: playerPosition
        });
      }

      this.startInputTimeout();
    }
  }

  getNewPlayerPosition(key) {
    var position = this.state.playerPosition.slice();

    if(key === keys.up && position[0] > 0) {
      position[0] --;
    } else if (key === keys.down && position[0] < this.state.map.length-1) {
      position[0] ++;
    } else if (key === keys.left && position[1] > 0) {
      position[1] --;
    } else if (key === keys.right && position[1] < this.state.map[0].length-1) {
      position[1] ++;
    }

    return position;
  }

  isArrowKey(keyCode) {
    return 37 <= keyCode <= 40
  }

  isHittingSomething(position) {
    return this.state.map[position[0]][position[1]] !== typeClasses.ground;
  }

  preformAction(position) {
    switch(this.getClassFromPosition(position)){
      case typeClasses.health:
        this.consumeHealth();
        break;

      case typeClasses.weapon:
        this.consumeWeapon();
        break;

      case typeClasses.enemy:
        this.exchangeAttackWithEnemy();
        break;

      case typeClasses.boss:
        this.exchangeAttacksWithBoss();
        break;
    }
  }

  getClassFromPosition(position) {
    return this.state.map[position[0]][position[1]];
  }

  startInputTimeout() {
    this.setState({
      inputBlocked: true
    });

    setTimeout(() => {
      this.setState({
        inputBlocked: false
      });
    },
    10);
  }

  exchangeAttacksWithEnemy(enemyPosition) {
    var enemy = this.state.enemies[enemyPosition[0]+','+enemyPosition[1]];
    var enemyDamage = this.actualDamage(enemy.damage * Math.pow(this.playerStats.level, 1.3));
    var playerStats = this.state.playerStats;

    enemy.health -= this.actualDamage(this.calculatePlayerDamage());
    playerStats.health -= enemy.health > 0 ? enemyDamage : 0;

    this.setState({enemies: this.state.enemies, playerStats: playerStats})   
  }

  //Some randomness is added to the damage inorder to simulate real battle.
  actualDamage(damage) {
    var damageVariation = 0.75;
    var max = damage;
    var min = damage * damageVariation;

    return Math.trunc(Math.random() * (max - min) + min);
  }

  exchangeAttacksWithBoss() {
    var bossHealth = this.state.bossHealth;
    var playerStats = this.state.playerStats;

    bossHealth -= this.actualDamage(this.calculatePlayerDamage());
    playerStats.health -= this.actualDamage(bossStats.damage);

    this.setState({bossHealth: bossHealth, playerStats: playerStats});
  }

  consumeWeapon(position) {
    var playerStats = this.state.playerStats;
    var map = this.state.map.slice();

    this.removeObjectFromMap(position, map);

    if(playerStats.level === 1) {
      playerStats.weapon = 'dagger';
    } else if(playerStats.level === 2) {
      playerStats.weapon = 'axe';
    } else if(playerStats.level === 3) {
      playerStats.weapon = 'mace';
    } else if(playerStats.level === 4) {
      playerStats.weapon = 'sword'
    }

    this.setState({map: map, playerStats: playerStats});
  }

  consumeHealth(position) {
    var playerStats = this.state.playerStats;
    var map = this.state.map.slice();

    this.removeObjectFromMap(position, map);

    playerStats.health += playerBaseStats.health * playerStats.level / 2;

    this.setState({map: map, playerStats: playerStats});
  }

  removeObjectFromMap(position, map) {
    map[position[0]][position[1]] = typeClasses.ground;
  }

  onEnemyKilled(row, column) {
    let map = this.state.map.slice();
    let playerStats = this.state.playerStats;

    this.removeObjectFromMap([row, column], map);
    this.incrementPlayerXp(playerStats);
   
    this.setState({map: map, playerStats: playerStats});
  }

  incrementPlayerXp(playerStats) {
    playerStats.xp += 10*(playerStats.level * playerStats.level);

    if(this.levelUp(playerStats)) {
      playerStats.level = playerStats.level < 4 ? playerStats.level + 1 : playerStats.level;
      playerStats.damage = playerStats.damage*playerStats.level;
      playerStats.health += 100;
    }
  }

  levelUp(stats) {
    return stats.xp >= levelUpXp[stats.level];
  }

  winGame() {
    this.setState({hasWon: true});
  }

  restartGame() {
    var map = convertMapToClasses(levelOneMap);
    populateMap(map);
    this.setState({
      map: map, 
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

  calculatePlayerDamage() {
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
      ui = <VisibleGrid 
            map={this.state.map}
            playerPosition={this.state.playerPosition}
            playerStats={this.state.playerStats}
            bossHealth={this.state.bossHealth}
            enemies={this.state.enemies}
            restartGame={this.restartGame}
            onEnemyKilled={this.onEnemyKilled}
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
          <div className="stat-indicator">Damage: {this.calculatePlayerDamage()}</div>
          <div className="stat-indicator">Weapon: {this.state.playerStats.weapon}</div>
          <div className="stat-indicator">Level: {this.state.playerStats.level}</div>
          <div className="stat-indicator">Remaining XP: {this.calculateRemainingXp()}</div>
        </div>
        {this.getMainUi()}
      </div>
    );
  }
}

class VisibleGrid extends Component {
  constructor(props) {
    super(props);
    this.createGrid = this.createGrid.bind(this);
    this.generatePlayer = this.generatePlayer.bind(this);
    this.generateEnemy = this.generateEnemy.bind(this);
    this.generateTile = this.generateTile.bind(this);
  }

  createGrid() {
    var visibleGridWidth = 6;
    var map = this.props.map;
    var grid = [];
    processMatrix(map, [map.length, map[0].length], (row, column, rowArray) => {
       let isPlayerPosition = row ===  0 && column === 0;
        let actualRow = this.props.playerPosition[0] + row;
        let actualColumn = this.props.playerPosition[1] + column;
        if(0 <= actualRow && actualRow < map.length && 0 <= actualColumn && actualColumn < map[0].length){
          let classes =  isPlayerPosition ? typeClasses.player : (map[actualRow][actualColumn]);
          let component;
          if(isPlayerPosition) {
            component = this.generatePlayer(row+','+column, classes);
          } else if((map[actualRow][actualColumn]) === 'enemy') {
            component = this.generateEnemy(actualRow, actualColumn, classes);
          } else if((map[actualRow][actualColumn]) === 'boss'){
            component = this.generateBoss(actualRow, actualColumn, classes);
          } else {
            component = this.generateTile(row+','+column, classes);
          }
          console.log('tile: ' + JSON.stringify(component));
          rowArray.push(component);
        }
    }, (rowArray, rowIndex, matrix) => {      
      matrix.push(<div key={rowIndex} className="row">{rowArray}</div>)
    });
    return grid;
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
