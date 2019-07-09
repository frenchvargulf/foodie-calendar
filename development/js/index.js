document.addEventListener("DOMContentLoaded", function() {
  
    // Add toggle mobile menu
    const menu = document.querySelector(".page-nav__list");
    console.log(menu);
  
    const menuMobile = menu.cloneNode(true);
    document.body.appendChild(menuMobile);
    menuMobile.classList.remove('page-nav__list');
    menuMobile.classList.add('page-nav__list--mobile');
  
    const burger = document.querySelector('.page-nav__toggle');
    burger.addEventListener('click', function(e){
        e.preventDefault();
  
        document.body.classList.toggle('nav-show');
    });
  
  
// carousel
var prev = document.querySelector(".slider-prev");
var next = document.querySelector(".slider-next");
var elements = document.querySelectorAll(".slider-slide");
var activeImg = 0;


next.addEventListener("click", function() {

  elements[activeImg].classList.remove("slider-slide__active");

  if (activeImg === elements.length - 1) {

    activeImg = 0;

  } else {

    activeImg++;

  }

  elements[activeImg].classList.add("slider-slide__active");

});

prev.addEventListener("click", function() {

  elements[activeImg].classList.remove("slider-slide__active");

  if (activeImg === 0) {

    activeImg = elements.length - 1;

  } else {

    activeImg--;

  }

  elements[activeImg].classList.add("slider-slide__active");

});  
  
});






