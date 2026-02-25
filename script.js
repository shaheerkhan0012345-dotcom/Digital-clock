class DigitalClock {

    constructor() {
        this.timeElement = document.getElementById("time");
        this.dateElement = document.getElementById("date");
        this.toggleButton = document.getElementById("formatToggle");

        this.is24Hour = true;

        this.toggleButton.addEventListener("click", () => {
            this.is24Hour = !this.is24Hour;
            this.toggleButton.textContent = this.is24Hour 
                ? "Switch to 12h" 
                : "Switch to 24h";
        });

        this.start();
    }

    start() {
        this.update();
        setInterval(() => this.update(), 1000);
    }

    update() {
        const now = new Date();

        this.updateTime(now);
        this.updateDate(now);
    }

    updateTime(now) {
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        let period = "";

        if (!this.is24Hour) {
            period = hours >= 12 ? " PM" : " AM";
            hours = hours % 12 || 12;
        }

        hours = this.pad(hours);
        minutes = this.pad(minutes);
        seconds = this.pad(seconds);

        this.timeElement.textContent = 
            `${hours}:${minutes}:${seconds}${period}`;
    }

    updateDate(now) {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        };

        this.dateElement.textContent =
            now.toLocaleDateString(undefined, options);
    }

    pad(value) {
        return value.toString().padStart(2, "0");
    }

}

new DigitalClock();