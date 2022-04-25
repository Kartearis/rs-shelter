import pets from "../assets/data/pets.js";

export default class Popup {
    element = null;
    modal = null;
    pathPrefix = "";

    constructor(element, pathPrefix = "") {
        if (!element.dataset.popup) {
            this.element = element;
            this.pathPrefix = pathPrefix;
            this.bindEvents();
        }
    }

    bindEvents() {
        this.element.addEventListener('click', () => this.popup());
    }

    popup() {
        let name = this.element.querySelector("h5").innerText;
        let pet = pets.find(x => x.name === name);
        let modalLayout = `
            <div class="overlay">
                <div class="modal">
                    <img class="img-block" src="${this.pathPrefix}${pet.img}">
                    <div class="info-block">
                        <div class="headers">
                            <h3>${pet.name}</h3>
                            <h4>${pet.type} - ${pet.breed}</h4>
                        </div>
                        <p>${pet.description}</p>
                        <ul>
                            <li><b>Age:</b>${pet.age}</li>
                            <li><b>Innoculations:</b>${pet.inoculations.join(", ")}</li>
                            <li><b>Diseases:</b> ${pet.diseases.join(", ")}</li>
                            <li><b>Parasites:</b> ${pet.parasites.join(", ")}</li>
                        </ul>
                    </div>
                    <button class="button circle modal-button">X</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML("afterbegin", modalLayout);
        document.body.classList.add("noscroll");
        this.modal = document.body.querySelector(".overlay");
        this.modal.querySelector(".modal-button").addEventListener('click', () => this.close());
        this.modal.querySelector(".modal").addEventListener("click", (event) => event.stopPropagation());
        this.modal.addEventListener('click', () => this.close());
    }

    close() {
        this.modal.remove();
        document.body.classList.remove("noscroll");
    }

}