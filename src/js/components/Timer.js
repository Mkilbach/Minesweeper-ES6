export default class Timer {
    constructor(selector, initialValue = 0) {
        this.element = document.querySelector(selector);
        this.initialValue = initialValue;
        this.value = initialValue;
        this.countdown;

        this.init();
    }

    init = () => {
        this.element.innerHTML = this.threeDigitValue();
        this.setCountdown(1000);
    }

    threeDigitValue = () => {
        return this.value < 10 ? '00' + this.value : (this.value < 100 ? '0' + this.value : this.value);
    }

    setCountdown = interval => {
        if (this.value >= 999) return false;
        this.countdown = setInterval(() => {
            this.value++;
            this.element.innerHTML = this.threeDigitValue();
            if (this.value >= 999) clearInterval(this.countdown);
        }, interval);
    }

    stop = () => {
        clearInterval(this.countdown)
    }

    reset = () => {
        this.value = this.initialValue;
        this.stop();
        this.init();
    }
}