
import Pagination from "../modules/pagination.js";
import Popup from "../modules/popup.js";
import Sidebar from "../modules/sidebar.js";

window.addEventListener("DOMContentLoaded", () => {
    let pageContainer = document.querySelector("[data-pagination]");
    const pagination = new Pagination(pageContainer);
    pagination.addCallbackOnNewPage(() => document.querySelectorAll(".card").forEach(x => new Popup(x, "../")));
    document.querySelectorAll(".card").forEach(x => new Popup(x, "../"));
    const sidebar = new Sidebar(document.querySelector(".navigation .nav-list"),
        document.querySelector(".navigation .menu-button"), document.querySelector(".navigation .logo-link"));
});