export default class Timer {
    constructor(selector, initialValue = 0) {
        this.element = document.querySelector(selector);
        this.value = initialValue;
        this.init();
    }

    init = () => {
        this.element.innerHTML = this.value;
        this.setCountdown(1000);
    }

    setCountdown = interval => {
        const countdown = setInterval(() => {
            this.element.innerHTML = ++this.value;
            if(this.value >= 999)  clearInterval(countdown);
        }, interval);
    }
}