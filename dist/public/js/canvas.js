window.addEventListener("load", createCanvas = () =>{

   const canvas = document.querySelector("#canvas");
   const context = canvas.getContext("2d");
   const clearButton = document.querySelector(".btn-clear");
   //resizing
   canvas.height = 100;
   canvas.width = 210;
   //variables
   let drawing = false;

   const startPosition = (e) => {
      drawing = true;
      draw(e);
   };

   const finishedPosition = () => {
      drawing = false;
      context.beginPath();
   };

   const draw = (e) => {
      if(!drawing) return;
      var rect = canvas.getBoundingClientRect();
      context.lineWidth = 3;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineTo(e.clientX - rect.left, e.clientY- rect.top);
      context.stroke();
      context.beginPath();
      context.moveTo(e.clientX- rect.left, e.clientY- rect.top);
   };

   const erase = () => {
      canvas.width = canvas.width;
   };

   const startTouchPosition = (e) => {
      drawing = true;
      drawTouch(e);
   };

   const drawTouch = (e) => {
      if(!drawing) return;
      var rect = canvas.getBoundingClientRect();
      var touch = e.touches[0];
      context.lineWidth = 3;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineTo(touch.clientX - rect.left, touch.clientY- rect.top);
      context.stroke();
      context.beginPath();
      context.moveTo(touch.clientX- rect.left, touch.clientY- rect.top);
   };

   //EventListeners
   canvas.addEventListener("mousedown", startPosition);
   canvas.addEventListener("mouseup", finishedPosition);
   canvas.addEventListener("mousemove", draw);
   canvas.addEventListener("touchstart", startTouchPosition);
   canvas.addEventListener("touchend", finishedPosition);
   canvas.addEventListener("touchmove", drawTouch);

   //Effacer
   clearButton.addEventListener("click", erase);

});