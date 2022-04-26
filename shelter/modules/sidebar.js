

export default class Sidebar {
    element = null;
    button = null;
    logo = null;

    currentState = "closed";

    /**
     * Инициализируется элементом меню, бургером и лого. По-хорошему работа с лого здесь это костыль и такие вещи должны быть просто
     * настроены как обработка события открытия меню (callback).
     * @param element Элемент меню
     * @param button Элемент кнопки
     * @param logo Элемент лого
     */
    constructor(element, button, logo) {
        this.element = element;
        this.button = button;
        this.logo = logo;
        this.bindEvents();
    }

    bindEvents() {
        this.button.addEventListener('click', () => this.toggle());
        this.element.addEventListener('click', (e) => this.processClick(e));
        this.element.querySelectorAll('.nav-item').forEach(x => x.addEventListener('click', () => this.close()));
        this.logo.addEventListener('click', () => this.close());
        window.addEventListener('resize', () => this.onResize());
    }

    /**
     * Handles clicks on ::before element.
     * @param event
     */
    processClick(event) {
        if (event.clientX < document.documentElement.clientWidth - 320)
            this.close();
    }

    onResize() {
        if (!window.matchMedia("(max-width: 767px)").matches)
            this.close();
    }

    open() {
        if (this.currentState === "open") return;
        this.currentState = "open";
        this.button.classList.add("active");
        this.logo.classList.add("side");
        this.element.classList.add("active");
        document.body.classList.add("noscroll");
    }

    close() {
        if (this.currentState === "closed") return;
        this.currentState = "closed";
        this.button.classList.remove("active");
        this.logo.classList.remove("side");
        this.element.classList.remove("active");
        document.body.classList.remove("noscroll");
    }

    toggle() {
        if (this.currentState === "open") this.close();
        else if (this.currentState === "closed") this.open();
    }
}