import Timer from './components/Timer'
import Board from './components/Board'

import '../scss/main.scss';

new Timer('#timer', 10);
new Board('#board', 8, 8, 10);