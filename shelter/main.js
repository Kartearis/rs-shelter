import Carousel from "./modules/carousel.js";
import Popup from "./modules/popup.js";

console.log(`
Если есть мысли, как убрать мерцание при пролистывании слайдера назад, с радостью прочитаю их в комментарии к работе.
Если есть такая возможность, не проверяйте работу до среды, пожалуйста. Я не успел доделать меню.
`);

window.addEventListener("DOMContentLoaded", () => {
   let carouselContainer = document.querySelector("[data-carousel]");
   const carousel = new Carousel(carouselContainer);
   carousel.addNewSlideCallback(() => document.querySelectorAll(".card").forEach(x => new Popup(x)));
   document.querySelectorAll(".card").forEach(x => new Popup(x));
});