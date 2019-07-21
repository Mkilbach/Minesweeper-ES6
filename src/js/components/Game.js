import Timer from './Timer'
import Board from './Board'
import BombCounter from './BombCounter'
import Controler from './Controler'


export default class Game {
    constructor() {
        document.querySelector('#game-board').addEventListener('contextmenu', e => e.preventDefault());

        this.bombCount = 10;
        this.boardSizeX = 8;
        this.boardSizeY = 8;
        this.timer = new Timer('#timer', 0);
        this.board = new Board('#board', this.boardSizeX, this.boardSizeY, this.bombCount, this.handleWin, this.handleLose, this.handleFlagToggle);
        this.bombCounter = new BombCounter('#bombCounter', this.bombCount);
        this.controler = new Controler(this.restart);
    }

    handleWin = () => {
        console.log('you won!');
        this.controler.winStatus();
        this.timer.stop();
    }

    handleLose = () => {
        console.log('you lose!');
        this.controler.loseStatus();
        this.timer.stop();
    }

    handleFlagToggle = qty => {
        this.bombCounter.changeFlagCount(qty);
    }

    restart = () => {
        this.timer.reset();
        this.board.restart();
    }
}