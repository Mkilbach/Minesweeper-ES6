export default class Board {
    constructor(selector, x, y, bombs, handleWin, handleLose, handleFlagToggle) {
        this.element = document.querySelector(selector);
        this.x = x;
        this.y = y;
        this.bombs = bombs;
        this.boardItemsSelector = '[data-board-item]';
        this.bombClass = 'board__item--bomb';
        this.board = [];
        this.handleWin = handleWin;
        this.handleLose = handleLose;
        this.handleFlagToggle = handleFlagToggle;
        this.flagCount = 0;

        this.createBoard();
        this.getBoardItems();
        this.placeNumbers(this.generateBombs());
        this.addClickHandleToItems();
    }

    createBoard = () => {
        let board = ``;
        for (let yi = 0; yi < this.y; yi++) {
            board += `<div class='board__row'>`;
            for (let xi = 0; xi < this.x; xi++) board += `<div class='board__item covered' data-board-item data-x=${xi} data-y=${yi}></div>`;
            board += `</div>`;
        }
        this.element.insertAdjacentHTML('afterbegin', board);
        this.element.querySelectorAll('.board__row').forEach(row => this.board.push([...row.querySelectorAll('.board__item')]));
    }

    getBoardItems = () => this.boardItems = [...document.querySelectorAll(this.boardItemsSelector)];

    generateBombs = () => {
        const boardItems = [...this.boardItems];
        for (let i = 0; i < this.bombs; i++) {
            const randomIndex = Math.floor(Math.random() * (boardItems.length));
            boardItems.splice(randomIndex, 1)[0].classList.add(this.bombClass);
        }
        return boardItems;
    }

    placeNumbers = board => {
        board.forEach(el => {
            let counter = 0;
            const adjacent = this.findAdjacentElements(el.dataset.x, el.dataset.y);
            adjacent.forEach(el => el.classList.contains('board__item--bomb') && counter++);
            el.classList.add(counter ? `board__item--${counter}` : 'board__item--empty');
        })
    }

    findAdjacentElements = (x, y) => {
        x = parseInt(x);
        y = parseInt(y);
        let adjacents = [];
        if (y - 1 >= 0 && x - 1 >= 0) adjacents.push(this.board[y - 1][x - 1]);
        if (y - 1 >= 0) adjacents.push(this.board[y - 1][x]);
        if (y - 1 >= 0 && x + 1 < this.x) adjacents.push(this.board[y - 1][x + 1]);
        if (x - 1 >= 0) adjacents.push(this.board[y][x - 1]);
        if (x + 1 < this.x) adjacents.push(this.board[y][x + 1]);
        if (y + 1 < this.y && x - 1 >= 0) adjacents.push(this.board[y + 1][x - 1]);
        if (y + 1 < this.y) adjacents.push(this.board[y + 1][x]);
        if (y + 1 < this.y && x + 1 < this.x) adjacents.push(this.board[y + 1][x + 1]);
        return adjacents;
    }

    addClickHandleToItems = () => {
        this.element.addEventListener('contextmenu', e => {
            e.preventDefault();
            const target = e.target;
            if (target.classList.contains('covered')) {
                this.handleFlagToggle(target.classList.contains('flag') ? --this.flagCount : ++this.flagCount);
                target.classList.toggle('flag');
            }
        });
        this.element.addEventListener('click', this.handleItemClick);
    }

    handleItemClick = e => {
        e.preventDefault();
        const target = e.target;
        // skipped if has any of these classes
        if (['flag'].some(className => target.classList.contains(className))) return false;
        // skipped if doesn't have any of these classes
        if (!['covered'].some(className => target.classList.contains(className))) return false;
        this.uncover(target);
        this.checkWinConditions();
    }

    uncover = target => {
        target.classList.remove('covered');
        if (target.classList.contains('board__item--bomb')) {
            this.gameLose();
        } else if (target.classList.contains('board__item--empty')) {
            this.findAdjacentElements(target.dataset.x, target.dataset.y).forEach(el => {
                if (el.classList.contains('covered') && el.classList.contains('board__item--empty')) this.uncover(el);
                el.classList.contains('flag') && this.handleFlagToggle(--this.flagCount);
                el.classList.remove('covered', 'flag');
            });
        }
    }

    uncoverAll = () => {
        this.board.forEach(row => row.forEach(el => {
            if (el.classList.contains('flag')) {
                if (!el.classList.contains('board__item--bomb')) {
                    el.classList.add('flag--wrong');
                }
            } else {
                el.classList.remove('covered', 'flag');
            }
        }));
    }

    checkWinConditions = () => {
        let win = true;
        this.board.forEach(row => row.forEach(el => { if (((!el.classList.contains('board__item--bomb')) && el.classList.contains('covered')) || (el.classList.contains('board__item--bomb')) && !el.classList.contains('covered')) win = false }));
        if (win) {
            this.handleWin();
        }
    }

    gameLose = () => {
        this.uncoverAll();
        this.handleLose();
    }
}