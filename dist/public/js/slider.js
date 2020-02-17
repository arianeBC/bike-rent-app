<<<<<<< HEAD
class Slider{constructor(){const slider=document.querySelector(".slider");this.slides=document.querySelectorAll(".slide");const next=document.querySelector("#next");const prev=document.querySelector("#prev");this.auto=true;this.intervalTime=5000;this.slideInterval;next.addEventListener("click",e=>{this.nextSlide();this.startInterval();});prev.addEventListener("click",e=>{this.prevSlide();this.startInterval();});document.addEventListener("keydown",e=>{if(e.keyCode===37){this.prevSlide();} else if(e.keyCode===39){this.nextSlide();}});slider.addEventListener("mouseover",e=>{this.mouseOver();});slider.addEventListener("mouseout",e=>{this.mouseOut();});slider.addEventListener("touchstart",e=>{this.touchStart();});slider.addEventListener("touchend",e=>{this.touchEnd();});if(this.auto){this.startInterval();}};startInterval(){clearInterval(this.slideInterval);this.slideInterval=setInterval(this.nextSlide.bind(this),this.intervalTime);} nextSlide(){const current=document.querySelector(".current");current.classList.remove("current");if(current.nextElementSibling){current.nextElementSibling.classList.add("current");}else{this.slides[0].classList.add("current");}};prevSlide(){const current=document.querySelector(".current");current.classList.remove("current");if(current.previousElementSibling){current.previousElementSibling.classList.add("current");}else{this.slides[this.slides.length-1].classList.add("current");}};mouseOver(){clearInterval(this.slideInterval);};mouseOut(){this.startInterval();};touchStart(){clearInterval(this.slideInterval);};touchEnd(){this.startInterval();};};
=======
class Slider {
   constructor() {
      const slider = document.querySelector(".slider");
      this.slides  = document.querySelectorAll(".slide");
      const next   = document.querySelector("#next");
      const prev   = document.querySelector("#prev");
      const pause  = document.querySelector("#pause");
      this.auto    = true;
      this.intervalTime = 5000;
      this.slideInterval;

      // Button events
      next.addEventListener("click", e => {
         this.nextSlide();
         this.startInterval();
      });

      prev.addEventListener("click", e => {
         this.prevSlide();
         this.startInterval();
      });

      document.addEventListener("keydown", e => {
         if(e.keyCode === 37){
            this.prevSlide();
         }
         else if(e.keyCode === 39){
            this.nextSlide();
         }
         });

      slider.addEventListener("touchstart",  e => {
         this.touchStart();
      });

      slider.addEventListener("touchend",  e => {
         this.touchEnd();
      });

      if(this.auto) {
         this.startSlider();
      };

      pause.onclick = () => {
         if(this.auto){ this.pauseSlider(); }
         else{ this.startSlider(); }
      };

   };

   //set interval
   startInterval() {
      clearInterval(this.slideInterval);
      this.slideInterval = setInterval(this.nextSlide.bind(this), this.intervalTime);
   }

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
         this.slides[this.slides.length - 1].classList.add("current");
      }
   };

   pauseSlider() {
      pause.innerHTML = '<i class="fas fa-play"></i>'
      this.auto = false;
      clearInterval(this.slideInterval);
   };
   
   startSlider() {
      pause.innerHTML = '<i class="fas fa-pause">'
      this.auto = true;
      this.startInterval();
   };

   touchStart() {
      clearInterval(this.slideInterval);
   };
   
   touchEnd() {
      this.startInterval();
   };

};
>>>>>>> beautify
