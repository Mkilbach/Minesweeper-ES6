import Timer from './components/Timer'
import Board from './components/Board'
import BombCounter from './components/BombCounter'

import '../scss/main.scss';

const bombCount = 10;
const boardSizeX = 8;
const boardSizeY = 8;

const handleWin = () => {
    console.log('you won!');
    timer.stop();
}
const handleLose = () => {
    console.log('you lose!');
    timer.stop();
}
const handleFlagToggle = qty => {
    bombCounter.changeFlagCount(qty);
}

const timer = new Timer('#timer', 0);
new Board('#board', boardSizeX, boardSizeY, bombCount, handleWin, handleLose, handleFlagToggle);
const bombCounter = new BombCounter('#bombCounter', bombCount);
