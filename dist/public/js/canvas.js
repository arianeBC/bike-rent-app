class Canvas {
   constructor(width, height) {
      this.canvas        = document.querySelector("#canvas");
      this.context       = this.canvas.getContext("2d");
      this.clearButton   = document.querySelector(".btn-clear");
      this.canvas.width  = width;
      this.canvas.height = height;
      this.drawing       = false;
      //EventListeners
      this.canvas.addEventListener("mousedown", this.startPosition.bind(this));
      this.canvas.addEventListener("mouseup", this.finishedPosition.bind(this));
      this.canvas.addEventListener("mousemove", this.draw.bind(this));
      this.canvas.addEventListener("touchstart", this.startTouchPosition.bind(this));
      this.canvas.addEventListener("touchend", this.finishedPosition.bind(this));
      this.canvas.addEventListener("touchmove", this.drawTouch.bind(this));

      //Effacer
      this.clearButton.addEventListener("click", this.erase.bind(this));
   };

   startPosition(e) {
      this.drawing = true;
      this.draw(e);
   };

   finishedPosition() {
      this.drawing = false;
      this.context.beginPath();
   };

   draw(e) {
      if(!this.drawing) return;
      let rect = this.canvas.getBoundingClientRect();
      this.context.lineWidth = 3;
      this.context.lineCap = "round";
      this.context.lineJoin = "round";
      this.context.lineTo(e.clientX - rect.left, e.clientY- rect.top);
      this.context.stroke();
      this.context.beginPath();
      this.context.moveTo(e.clientX- rect.left, e.clientY- rect.top);
   };

   erase() {
      this.canvas.width = this.canvas.width;
   };

   startTouchPosition(e) {
      this.drawing = true;
      this.drawTouch(e);
   };

   drawTouch(e) {
      if(!this.drawing) return;
      let rect = this.canvas.getBoundingClientRect();
      let touch = e.touches[0];
      this.context.lineWidth = 3;
      this.context.lineCap = "round";
      this.context.lineJoin = "round";
      this.context.lineTo(touch.clientX - rect.left, touch.clientY- rect.top);
      this.context.stroke();
      this.context.beginPath();
      this.context.moveTo(touch.clientX- rect.left, touch.clientY- rect.top);
   };

};