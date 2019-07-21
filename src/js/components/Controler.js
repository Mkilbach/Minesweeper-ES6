export default class Controler {
    constructor(reset) {
        this.element = document.querySelector('#status');
        this.resetGame = reset;

        this.init();
    }

    init = () => {
        this.element.addEventListener('click', () => {
            this.resetStatus();
            this.resetGame();
        });
    }

    winStatus = () => this.element.classList.add('info__status--win');
    loseStatus = () => this.element.classList.add('info__status--lose');
    resetStatus = () => this.element.classList.remove('info__status--win', 'info__status--lose');
}