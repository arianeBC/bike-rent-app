class Slider {
   constructor() {
      const slider = document.querySelector(".slider");
      this.slides = document.querySelectorAll(".slide");
      const next = document.querySelector("#next");
      const prev = document.querySelector("#prev");
      this.auto = true;
      this.intervalTime = 5000;
      this.slideInterval;

      // Button events
      next.addEventListener("click", e => {
         this.nextSlide();
         clearInterval(this.slideInterval);
         this.slideInterval = setInterval(this.nextSlide.bind(this), this.intervalTime);
      });

      prev.addEventListener("click", e => {
         this.prevSlide();
         clearInterval(this.slideInterval);
         this.slideInterval = setInterval(this.nextSlide.bind(this), this.intervalTime);
      });

      document.addEventListener("keydown", e => {
         if(e.keyCode === 37){
            this.prevSlide();
         }
         else if(e.keyCode === 39){
            this.nextSlide();
         }
         });

      slider.addEventListener("mouseover",  e => {
         this.mouseOver();
      });

      slider.addEventListener("mouseout",  e => {
         this.mouseOut();
      });

      slider.addEventListener("touchstart",  e => {
         this.touchStart();
      });

      slider.addEventListener("touchend",  e => {
         this.touchEnd();
      });

      if(this.auto) {
         this.slideInterval = setInterval(this.nextSlide.bind(this), this.intervalTime);
      }
   };

   nextSlide() {
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
         this.slides[0].classList.add("current");
      }
   };

   prevSlide() {
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
         this.slides[slides.length - 1].classList.add("current");
      }
   };

   mouseOver() {
      clearInterval(this.slideInterval);
   };
   
   mouseOut() {
      clearInterval(this.slideInterval);
      this.slideInterval = setInterval(this.nextSlide.bind(this), this.intervalTime);
   };

   touchStart() {
      clearInterval(this.slideInterval);
   };
   
   touchEnd() {
      clearInterval(this.slideInterval);
      this.slideInterval = setInterval(this.nextSlide.bind(this), this.intervalTime);
   };

};