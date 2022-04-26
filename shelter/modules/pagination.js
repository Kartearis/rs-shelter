
import pets from "../assets/data/pets.js";

export default class Pagination {
    cards = [];
    element = null;
    currentPage = 1;
    cardAmount = 8;
    newPageCallback = null;

    constructor(element) {
        this.element = element;
        this.cards = this.generateCards();
        this.calculateCardAmount();
        this.bindEvents();
        this.fillPage(1);
    }

    addCallbackOnNewPage(callback) {
        this.newPageCallback = callback;
    }

    fillPage(page) {
        let slice = this.cards.slice((this.currentPage - 1) * this.cardAmount, (this.currentPage - 1) * this.cardAmount + this.cardAmount);
        let container = this.element.querySelector('.card-container');
        container.innerHTML = "";
        for (let card of slice) {
            let cardLayout = `
                <div class="card">
                    <img src="../${card.img}" alt="${card.name} the ${card.type}">
                    <h5>${card.name}</h5>
                    <button class="button">Learn more</button>
                </div>
            `;
            container.insertAdjacentHTML("beforeend", cardLayout);
        }
        if (this.newPageCallback)
            this.newPageCallback();
    }

    bindEvents() {
        window.addEventListener('resize', () => this.calculateCardAmount());
        this.element.querySelector("[data-pagination-next]").addEventListener('click', () => this.next());
        this.element.querySelector("[data-pagination-prev]").addEventListener('click', () => this.prev());
        this.element.querySelector("[data-pagination-start]").addEventListener('click', () => this.start());
        this.element.querySelector("[data-pagination-end]").addEventListener('click', () => this.end());
    }

    next() {
        if ((this.currentPage) * this.cardAmount >= this.cards.length)
            return;
        this.currentPage++;
        this.fillPage(this.currentPage);
        this.updateControls(this.currentPage);
    }

    prev() {
        if (this.currentPage === 1)
            return;
        this.currentPage--;
        this.fillPage(this.currentPage);
        this.updateControls(this.currentPage);
    }

    start() {
        if (this.currentPage === 1)
            return;
        this.currentPage = 1;
        this.fillPage(this.currentPage);
        this.updateControls(this.currentPage);
    }

    end() {
        if ((this.currentPage) * this.cardAmount >= this.cards.length)
            return;
        this.currentPage = Math.floor(this.cards.length / this.cardAmount);
        this.fillPage(this.currentPage);
        this.updateControls(this.currentPage);
    }

    updateControls(page) {
        this.element.querySelector("[data-pagination-page]").innerText = page;
        if ((this.currentPage) * this.cardAmount >= this.cards.length) {
            this.element.querySelector("[data-pagination-next]").disabled = true;
            this.element.querySelector("[data-pagination-end]").disabled = true;
            this.element.querySelector("[data-pagination-prev]").disabled = false;
            this.element.querySelector("[data-pagination-start]").disabled = false;
        }
        else if (this.currentPage === 1) {
            this.element.querySelector("[data-pagination-prev]").disabled = true;
            this.element.querySelector("[data-pagination-start]").disabled = true;
            this.element.querySelector("[data-pagination-next]").disabled = false;
            this.element.querySelector("[data-pagination-end]").disabled = false;
        }
        else {
            this.element.querySelector("[data-pagination-prev]").disabled = false;
            this.element.querySelector("[data-pagination-start]").disabled = false;
            this.element.querySelector("[data-pagination-next]").disabled = false;
            this.element.querySelector("[data-pagination-end]").disabled = false;
        }
    }

    generateCards() {
        let cards = [];
        for(let i = 0; i < 6; i++)
            cards.push(...this.#shuffle(pets));
        return cards;
    }

    /**
     * Calculates amount of cards to display
     *
     * @returns {number} amount of cards
     */
    calculateCardAmount(){
        if (window.matchMedia("(min-width: 1280px)").matches)
            return this.cardAmount = 8;
        if (window.matchMedia("(min-width: 768px) and (max-width: 1279px)").matches)
            return this.cardAmount = 6;
        if (window.matchMedia("(max-width: 767px)").matches)
            return this.cardAmount = 3;
    }

    #shuffle(arr) {
        let arrCopy = [...arr];
        let arrShuffled = [];
        while(arrCopy.length > 0)
        {
            let index = this.#randomInt(arrCopy.length);
            arrShuffled.push(arrCopy[index]);
            arrCopy.splice(index, 1);
        }
        return arrShuffled;
    }

    /**
     * Helper method to get random int [0;n)
     * @param n maximum (exclusive)
     */
    #randomInt(n) {
        return Math.floor(Math.random() * n);
    }
}