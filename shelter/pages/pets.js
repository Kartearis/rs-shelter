
import Pagination from "../modules/pagination.js";

window.addEventListener("DOMContentLoaded", () => {
    let pageContainer = document.querySelector("[data-pagination]");
    const pagination = new Pagination(pageContainer);
});