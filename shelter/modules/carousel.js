import pets from "../assets/data/pets.js";


export default class Carousel {
    element = null;
    current = [];

    cardAmount = 3;
    newSlideCallBack = null;


    /**
     * Initializes a carousel on given element (it must have buttons with data-carousel-left|data-carousel-right and next and div.card-container).
     *
     * @param element reference to carousel element
     */
    constructor(element) {
        this.element = element;
        this.calculateCardAmount();
        this.refill();
        this.bindEvents();
    }

    addNewSlideCallback(callback) {
        console.log(callback);
        this.newSlideCallback = callback;
        console.log(this.newSlideCallback);
    }

    /**
     * Binds all required events
     */
    bindEvents() {
        window.addEventListener('resize', () => this.calculateCardAmount());
        this.element.querySelector("[data-carousel-left]").addEventListener("click", () => this.refill("left"));
        this.element.querySelector("[data-carousel-right]").addEventListener("click", () => this.refill("right"));
    }

    /**
     * Calculates amount of cards to display
     *
     * @returns {number} amount of cards
     */
    calculateCardAmount(){
        if (window.matchMedia("(min-width: 1280px)").matches)
            return this.cardAmount = 3;
        if (window.matchMedia("(min-width: 768px) and (max-width: 1279px)").matches)
            return this.cardAmount = 2;
        if (window.matchMedia("(max-width: 767px)").matches)
            return this.cardAmount = 1;
    }

    /**
     * Refills carousel with cards based on current card amount and previous values
     */
    async refill(direction) {
        let insertLocation = "beforeend";
        let movementDirection = -1;
        if (direction === "left")
        {
            insertLocation = "afterbegin";
            movementDirection = 1;
        }
        this.current = this.generatePets(this.cardAmount, this.current);
        let container = this.element.querySelector('.card-container');
        let oldCards = Array.from(container.querySelectorAll(".card"));
        // Increase semaphore for each click
        oldCards.forEach(x => x.dataset.semaphore = x.dataset.semaphore === undefined ? 0 : parseInt(x.dataset.semaphore) + 1);
        for (let pet of this.current) {
            let cardLayout = `
                <div class="card">
                    <img src="${pet.img}" alt="${pet.name} the ${pet.type}">
                    <h5>${pet.name}</h5>
                    <button class="button">Learn more</button>
                </div>
            `;
            container.insertAdjacentHTML(insertLocation, cardLayout);
        }
        // let newCards = Array.from(container.querySelectorAll(".card")).filter(x => !oldCards.includes(x));
        // gap is received from current css
        let gap = parseInt(window.getComputedStyle(container).gap);
        let moveAmount = movementDirection * (270 * oldCards.length + gap * oldCards.length);
        let keyframes = [
            { transform: `translateX(${moveAmount}px)` }
        ];
        if (direction === 'left')
            keyframes = [
                { transform: `translateX(-${moveAmount}px)` },
                { transform: `translateX(0)` },
            ];
        let duration = {
            duration: 1000
        };
        container.querySelectorAll(".card").forEach(x => x.animate(keyframes, duration));
        // Elements will be removed only on final removal
        oldCards.forEach(x => this.#setupActionOnAnimationFinish(x, el => this.#removeBasedOnSemaphore(el)));
        if (this.newSlideCallback) {
            this.newSlideCallback();
        }

    }

    /**
     * Removes element if its semaphore attribute is 0, else decreases it
     * @param element Reference to element
     */
    #removeBasedOnSemaphore(element) {
        if (element.dataset.semaphore && element.dataset.semaphore > 0)
            element.dataset.semaphore--;
        else element.remove();
    }

    #setupActionOnAnimationFinish(element, action) {
        Promise.all(
            element.getAnimations().map(
                function(animation) {
                    return animation.finished
                }
            )
        ).then(() => action(element));
    }

    #waitForElements(selector, amount) {
        return new Promise(resolve => {
            if (this.element.querySelectorAll(selector).length === amount) {
                return resolve(true);
            }

            const observer = new MutationObserver(mutations => {
                if (this.element.querySelectorAll(selector).length === amount) {
                    observer.disconnect();
                    return resolve(true);
                }
            });

            observer.observe(this.element, {
                childList: true,
                subtree: true
            });
        });
    }

    /**
     * Generates required amount of pet objects to fill page or carousel
     * @param amount required amount
     * @param previous previous set of pets
     */
    generatePets(amount, previous) {
        let availablePets = pets.filter(x => !previous.includes(x));
        let selected = [];
        for(let i = 0; i < amount; i++) {
            let index = this.#randomInt(availablePets.length);
            selected.push(availablePets[index]);
            availablePets.splice(index, 1);
        }
        return selected;
    }

    /**
     * Helper method to get random int [0;n)
     * @param n maximum (exclusive)
     */
    #randomInt(n) {
        return Math.floor(Math.random() * n);
    }
};