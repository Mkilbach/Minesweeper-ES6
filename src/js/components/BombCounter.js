export default class BombCounter {
    constructor(selector, bombCount) {
        this.element = document.querySelector(selector);
        this.bombCount = bombCount;
        this.flagCount = 0;

        this.setValue();
    }

    setValue = () => {
        this.element.innerHTML = this.bombCount - this.flagCount;
    }

    changeFlagCount = newValue => {
        this.flagCount = newValue;
        this.setValue();
    }
}