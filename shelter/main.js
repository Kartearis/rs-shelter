import Carousel from "./modules/carousel.js";



window.addEventListener("DOMContentLoaded", () => {
   let carouselContainer = document.querySelector("[data-carousel]");
   const carousel = new Carousel(carouselContainer);
});