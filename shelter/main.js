import Carousel from "./modules/carousel.js";

console.log(`
Если есть мысли, как убрать мерцание при пролистывании слайдера назад, с радостью прочитаю их в комментарии к работе.
`);

window.addEventListener("DOMContentLoaded", () => {
   let carouselContainer = document.querySelector("[data-carousel]");
   const carousel = new Carousel(carouselContainer);
});