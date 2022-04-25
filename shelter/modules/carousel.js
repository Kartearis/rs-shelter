import pets from "../assets/data/pets.js";


export default class Carousel {
    element = null;
    current = [];

    cardAmount = 3;


    /**
     * Initializes a carousel on given element (it must have buttons with ids prev and next and div.card-container).
     *
     * @param element reference to carousel element
     */
    constructor(element) {
        console.log("Initializing carousel");
        this.element = element;
        this.calculateCardAmount();
        this.refill();
        this.bindEvents();
        console.log("Carousel initialized");
    }

    /**
     * Binds all required events
     */
    bindEvents() {
        window.addEventListener('resize', () => this.calculateCardAmount());
        this.element.querySelector("[data-carousel-left]").addEventListener("click", () => this.refill());
        this.element.querySelector("[data-carousel-right]").addEventListener("click", () => this.refill());
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
    refill() {
        this.current = this.generatePets(this.cardAmount, this.current);
        let container = this.element.querySelector('.card-container');
        container.innerHTML = "";
        for (let pet of this.current) {
            let cardLayout = `
                <div class="card">
                    <img src="${pet.img}" alt="${pet.name} the ${pet.type}">
                    <h5>${pet.name}</h5>
                    <button class="button">Learn more</button>
                </div>
            `;
            container.insertAdjacentHTML("beforeend", cardLayout);
        }



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