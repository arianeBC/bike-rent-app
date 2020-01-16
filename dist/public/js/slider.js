window.addEventListener("load", createSlider = () =>{

   const slider = document.querySelector(".slider");
   const slides = document.querySelectorAll(".slide");
   const next = document.querySelector("#next");
   const prev = document.querySelector("#prev");
   const auto = true;
   const intervalTime = 5000;
   let slideInterval;

   const nextSlide = () => {
      // Get current class
      const current = document.querySelector(".current");
      // Remove current class
      current.classList.remove("current");
      // Check for next slide
      if (current.nextElementSibling) {
         // Add current to next sibling"
         current.nextElementSibling.classList.add("current");
      } else {
         // Add current to start
         slides[0].classList.add("current");
      }
   };

   const prevSlide = () => {
      // Get current class
      const current = document.querySelector(".current");
      // Remove current class
      current.classList.remove("current");
      // Check for next slide
      if (current.previousElementSibling) {
         // Add current to prev sibling"
         current.previousElementSibling.classList.add("current");
      } else {
         // Add current to last
         slides[slides.length - 1].classList.add("current");
      }
   };

   const mouseOver = () => {
      clearInterval(slideInterval);
   };
   
   const mouseOut = () => {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, intervalTime);
   };

   const touchStart = () => {
      clearInterval(slideInterval);
   };
   
   const touchEnd = () => {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, intervalTime);
   };

   // Button events
   next.addEventListener("click", e => {
      nextSlide();
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, intervalTime);
   });

   prev.addEventListener("click", e => {
      prevSlide();
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, intervalTime);
   });

   document.addEventListener("keydown", function(e){
      if(e.keyCode === 37){
         prevSlide();
      }
      else if(e.keyCode === 39){
         nextSlide();
      }
      });

   slider.addEventListener("mouseover",  e => {
      mouseOver();
   });

   slider.addEventListener("mouseout",  e => {
      mouseOut();
   });

   slider.addEventListener("touchstart",  e => {
      touchStart();
   });

   slider.addEventListener("touchend",  e => {
      touchEnd();
   });

   if(auto) {
      slideInterval = setInterval(nextSlide, intervalTime);
   }

});