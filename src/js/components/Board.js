export default class Board {
    constructor(selector, x, y, bombs) {
        this.element = document.querySelector(selector);
        this.x = x;
        this.y = y;
        this.bombs = bombs;
        this.boardItemsSelector = '[data-board-item]';
        this.bombClass = 'board__item--bomb';
        this.board = [];

        this.createBoard();
        this.placeNumbers(this.generateBombs());
    }

    createBoard = () => {
        let board = ``;
        for (let yi = 0; yi < this.y; yi++) {
            board += `<div class='board__row'>`;
            for (let xi = 0; xi < this.x; xi++) board += `<div class='board__item' data-board-item data-x=${xi} data-y=${yi}></div>`;
            board += `</div>`;
        }
        this.element.insertAdjacentHTML('afterbegin', board);
        this.element.querySelectorAll('.board__row').forEach(row => this.board.push([...row.querySelectorAll('.board__item')]));
    }

    generateBombs = () => {
        const boardItems = [...document.querySelectorAll(this.boardItemsSelector)];
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
            console.log(counter);
            counter && el.classList.add(`board__item--${counter}`);
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
}