export default class Timer {
    constructor(selector, initialValue) {
        this.element = document.querySelectorAll(selector);
        this.initialValue = initialValue;
        this.init = this.init.bind(this);
        this.init();
    }

    init() {
        this.element[0].innerHTML = this.initialValue;
    }
}