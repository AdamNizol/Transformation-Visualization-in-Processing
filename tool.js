let objectsList = [];
let displayTimeout = false;
let order = ["trans", "rotation", "scale"];

function setup() {
  createCanvas(window.innerWidth,window.innerHeight);
  //frameRate(60);
  window.addEventListener('resize', function(){ resizeCanvas(window.innerWidth,window.innerHeight)} );
  document.getElementById("transXSlide").oninput = function(){
    document.getElementById("transX").value = document.getElementById("transXSlide").value;
    updateScreen();
  };
  document.getElementById("transYSlide").oninput = function(){
    document.getElementById("transY").value = document.getElementById("transYSlide").value;
    updateScreen();
  };
  document.getElementById("scaleSlide").oninput = function(){
    document.getElementById("scale").value = document.getElementById("scaleSlide").value
    updateScreen();
  };
  document.getElementById("rotationSlide").oninput = function(){
    document.getElementById("rotation").value = document.getElementById("rotationSlide").value
    updateScreen();
  };


  document.getElementById("transX").oninput = function(){
    document.getElementById("transXSlide").value = document.getElementById("transX").value;
    updateScreen();
  };
  document.getElementById("transY").oninput = function(){
    document.getElementById("transYSlide").value = document.getElementById("transY").value;
    updateScreen();
  };
  document.getElementById("scale").oninput = function(){
    document.getElementById("scaleSlide").value = document.getElementById("scale").value;
    updateScreen();
  };
  document.getElementById("rotation").oninput = function(){
    document.getElementById("rotationSlide").value = document.getElementById("rotation").value;
    updateScreen();
  };


  document.getElementById("transXReset").onclick = function(){
    document.getElementById("transXSlide").value = 0;
    document.getElementById("transX").value = 0;
    updateScreen();
  };
  document.getElementById("transYReset").onclick = function(){
    document.getElementById("transYSlide").value = 0;
    document.getElementById("transY").value = 0;
    updateScreen();
  };
  document.getElementById("scaleReset").onclick = function(){
    document.getElementById("scaleSlide").value = 1;
    document.getElementById("scale").value = 1;
    updateScreen();
  };
  document.getElementById("rotationReset").onclick = function(){
    document.getElementById("rotationSlide").value = 0;
    document.getElementById("rotation").value = 0;
    updateScreen();
  };

  document.getElementById("transUp").onclick = function(){
    shiftTransformation("trans", "up");
    updateScreen();
  };
  document.getElementById("transDown").onclick = function(){
    shiftTransformation("trans", "down");
    updateScreen();
  };
  document.getElementById("scaleUp").onclick = function(){
    shiftTransformation("scale", "up");
    updateScreen();
  };
  document.getElementById("scaleDown").onclick = function(){
    shiftTransformation("scale", "down");
    updateScreen();
  };
  document.getElementById("rotationUp").onclick = function(){
    shiftTransformation("rotation", "up");
    updateScreen();
  };
  document.getElementById("rotationDown").onclick = function(){
    shiftTransformation("rotation", "down");
    updateScreen();
  };



  document.getElementById("resetBtn").onclick = function(){
    document.getElementById("transX").value = 0;
    document.getElementById("transXSlide").value = 0;

    document.getElementById("transY").value = 0;
    document.getElementById("transYSlide").value = 0;

    document.getElementById("scale").value = 1;
    document.getElementById("scaleSlide").value = 1;

    document.getElementById("rotation").value = 0;
    document.getElementById("rotationSlide").value = 0;

    objectsList = [];
    draw();
  }

  document.getElementById("drawBtn").onclick = function(){
    let t = {
      x: document.getElementById("transX").value,
      y: document.getElementById("transY").value,
      scale: document.getElementById("scale").value,
      rotation: document.getElementById("rotation").value
    }
    let tempObj = {
      transf: t,
      tOrder: order
    };

    objectsList.push(tempObj);
    draw();
  }

  noLoop();
}

function shiftTransformation(type, direction){
  if(direction=="up"){
    for(let i=1; i<order.length; i++){
      if(order[i] == type){
        //insert type DOM before i-1's DOM
        document.getElementById(type+"Transformation").parentNode.insertBefore(document.getElementById(type+"Transformation"),document.getElementById(order[i-1]+"Transformation"));
        let temp = order[i];
        order[i] = order[i-1];
        order[i-1] = temp;
        break;
      }
    }
  }else{ //down
    for(let i=0; i<order.length-1; i++){
      if(order[i] == type){
        //insert type DOM before i-1's DOM
        document.getElementById(type+"Transformation").parentNode.insertBefore(document.getElementById(order[i+1]+"Transformation"),document.getElementById(type+"Transformation"));
        let temp = order[i];
        order[i] = order[i+1];
        order[i+1] = temp;
        break;
      }
    }
  }
}

function orderedTranslate(transformations, transformationOrder){
  for(let i=0; i<transformationOrder.length; i++){
    switch(transformationOrder[i]){
      case "trans":
        translate(transformations.x, transformations.y);
        break;
      case "scale":
        scale(transformations.scale);
        break;
      case "rotation":
        rotate(radians(transformations.rotation));
        break;
    }
  }
}

function draw() {
  push();
  background(240, 240, 240);
  translate(width/2, height/2);
  scale(1);
  push();

  //stroke(125);
  drawGrid(1,140);
  //stroke(255,0,0);
  let t = {
    x: document.getElementById("transX").value,
    y: document.getElementById("transY").value,
    scale: document.getElementById("scale").value,
    rotation: document.getElementById("rotation").value
  }
  orderedTranslate(t, order);
  /*translate(document.getElementById("transX").value, document.getElementById("transY").value);
  scale(document.getElementById("scale").value)
  rotate(radians(document.getElementById("rotation").value));*/
  drawGrid(2,color(255,0,0),1);

  pop();
  stroke(0,0,200);
  strokeWeight(6);
  fill(0,0,0,0)
  for(let i=0;i<objectsList.length;i++){
    push();
    orderedTranslate(objectsList[i].transf, objectsList[i].tOrder);
    /*translate(objectsList[i].x,objectsList[i].y);
    scale(objectsList[i].scale);
    rotate(radians(objectsList[i].rotation));*/
    drawShape();
    pop();
  }

  pop();
  //noloop();
}

function updateScreen(){
  if(!displayTimeout){
    draw();
    displayTimeout = true;
    setTimeout(function(){
      displayTimeout = false;
      updateScreen();
    }, 7);
  }
}

function drawShape(){
  ellipse(0, 0, 200, 200);
  line(0, -35, 70.7107, 70.7107);
  line(0, -35, -70.7107, 70.7107);
}

function drawGrid(thickness = 1, col = color(0,0,0),foreground = 0){
  push();
  let size = 7000;
  translate(-size/2,-size/2)
	for (var x = 0; x < size; x += 100) {
		for (var y = 0; y < size; y += 100) {
			//stroke(0);
      stroke(col);
      if(x == (size/2) && y == (size/2)){
        strokeWeight(thickness+4);
      }else{
        strokeWeight(thickness);
      }
			line(x, 0, x, size);
			line(0, y, size, y);
		}
	}
  if(foreground){
    stroke(color(0,0,0));
    strokeWeight(thickness+4);
    line(size/2, 0, size/2, size);
    line(0, size/2, size, size/2);
  }
  pop();
}
