
import Pagination from "../modules/pagination.js";
import Popup from "../modules/popup.js";

window.addEventListener("DOMContentLoaded", () => {
    let pageContainer = document.querySelector("[data-pagination]");
    const pagination = new Pagination(pageContainer);
    pagination.addCallbackOnNewPage(() => document.querySelectorAll(".card").forEach(x => new Popup(x, "../")));
    document.querySelectorAll(".card").forEach(x => new Popup(x, "../"));
});