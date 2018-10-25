objectsList = [];
displayTimeout = false;
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
    let tempObj = {};
    tempObj.x = document.getElementById("transX").value;
    tempObj.y = document.getElementById("transY").value;
    tempObj.scale = document.getElementById("scale").value;
    tempObj.rotation = document.getElementById("rotation").value;

    objectsList.push(tempObj);
    draw();
  }

  noLoop();
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
  translate(document.getElementById("transX").value, document.getElementById("transY").value);
  scale(document.getElementById("scale").value)
  rotate(radians(document.getElementById("rotation").value));
  drawGrid(2,color(255,0,0),1);

  pop();
  stroke(0,0,200);
  strokeWeight(6);
  fill(0,0,0,0)
  for(let i=0;i<objectsList.length;i++){
    push();
    translate(objectsList[i].x,objectsList[i].y);
    scale(objectsList[i].scale);
    rotate(radians(objectsList[i].rotation));
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
    }, 10);
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
