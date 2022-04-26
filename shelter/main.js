import Carousel from "./modules/carousel.js";
import Popup from "./modules/popup.js";
import Sidebar from "./modules/sidebar.js";

console.log(`
Если есть мысли, как убрать мерцание при пролистывании слайдера назад, с радостью прочитаю их в комментарии к работе.
`);

window.addEventListener("DOMContentLoaded", () => {
   let carouselContainer = document.querySelector("[data-carousel]");
   const carousel = new Carousel(carouselContainer);
   carousel.addNewSlideCallback(() => document.querySelectorAll(".card").forEach(x => new Popup(x)));
   document.querySelectorAll(".card").forEach(x => new Popup(x));
   const sidebar = new Sidebar(document.querySelector(".navigation .nav-list"),
       document.querySelector(".navigation .menu-button"), document.querySelector(".navigation .logo-link"));
});