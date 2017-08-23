/**
 * Blockly Demo: Turtle Graphics
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Demonstration of Blockly: Turtle Graphics.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

/**
 * Create a namespace for the application.
 */
var Robot = {};



Robot.HEIGHT = 400;
Robot.WIDTH = 400;

/**
 * PID of animation task currently executing.
 */
Robot.pid = 0;

/**
 * Should the robot be drawn?
 */
Robot.visible = true;

Robot.width = 65;
Robot.height = 65;
Robot.image = new Image();

/**
 * Initialize the robot.  Called on page load.
 */
Robot.init = function() {
  Robot.image.src = '../media/berobot.png'; // Set source path


  Blockly.JavaScript.INFINITE_LOOP_TRAP = '  Blockly.Apps.checkTimeout(%1);\n';

  // Add to reserved word list: API, local variables in execution evironment
  // (execute) and the infinite loop detection function.
  Blockly.JavaScript.addReservedWords('Robot,code');

  window.addEventListener("beforeunload", function(e) {

    if (Blockly.mainWorkspace.getAllBlocks().length > 2) {
      e.returnValue = true;
    }
    return null;
  });

  // Initialize the slider.
  var sliderSvg = document.getElementById('slider');
  Robot.speedSlider = new Slider(10, 35, 130, sliderSvg);

  Robot.ctxDisplay = document.getElementById('display').getContext('2d');
  Robot.ctxScratch = document.getElementById('scratch').getContext('2d');
  Robot.reset();
};

window.addEventListener('load', Robot.init);



/**
 * Reset the robot to the start position, clear the display, and kill any
 * pending tasks.
 */
Robot.reset = function() {
  // Starting location and heading of the robot.
  Robot.x = 200 ;
  Robot.y = 200 ;
  Robot.heading = 0;
  Robot.penDownValue = true;
  Robot.visible = true;


  // Clear the display.
  Robot.ctxScratch.canvas.width = Robot.ctxScratch.canvas.width;
  Robot.ctxScratch.strokeStyle = '#000000';
  Robot.ctxScratch.lineWidth = 1;
  Robot.ctxScratch.lineCap = 'round';
  Robot.display();

  // Kill any task.
  if (Robot.pid) {
    window.clearTimeout(Robot.pid);
  }
  Robot.pid = 0;
};

/**
 * Copy the scratch canvas to the display canvas. Add a robot marker.
 */
Robot.display = function() {
  Robot.ctxDisplay.globalCompositeOperation = 'copy';
  Robot.ctxDisplay.drawImage(Robot.ctxScratch.canvas, 0, 0);
  Robot.ctxDisplay.globalCompositeOperation = 'source-over';


  if (Robot.visible) {

    Robot.image.addEventListener('load', function() {
        Robot.drawRotated(Robot.heading);
    }, false);

  Robot.drawRotated(Robot.heading);



/*
// Draw the robot body.
var radius = Robot.ctxScratch.lineWidth / 2 + 10;
Robot.ctxDisplay.beginPath();
Robot.ctxDisplay.arc(Robot.x, Robot.y, radius, 0, 2 * Math.PI, false);
Robot.ctxDisplay.lineWidth = 3;
Robot.ctxDisplay.strokeStyle = '#339933';
Robot.ctxDisplay.stroke();

// Draw the robot head.
var WIDTH = 0.3;
var HEAD_TIP = 10;
var ARROW_TIP = 4;
var BEND = 6;

    var radians = 2 * Math.PI * Robot.heading / 360;
    var tipX = Robot.x + (radius + HEAD_TIP) * Math.sin(radians);
    var tipY = Robot.y - (radius + HEAD_TIP) * Math.cos(radians);
    radians -= WIDTH;
    var leftX = Robot.x + (radius + ARROW_TIP) * Math.sin(radians);
    var leftY = Robot.y - (radius + ARROW_TIP) * Math.cos(radians);
    radians += WIDTH / 2;
    var leftControlX = Robot.x + (radius + BEND) * Math.sin(radians);
    var leftControlY = Robot.y - (radius + BEND) * Math.cos(radians);
    radians += WIDTH;
    var rightControlX = Robot.x + (radius + BEND) * Math.sin(radians);
    var rightControlY = Robot.y - (radius + BEND) * Math.cos(radians);
    radians += WIDTH / 2;
    var rightX = Robot.x + (radius + ARROW_TIP) * Math.sin(radians);
    var rightY = Robot.y - (radius + ARROW_TIP) * Math.cos(radians);
    Robot.ctxDisplay.beginPath();
    Robot.ctxDisplay.fillStyle = '#339933';
    Robot.ctxDisplay.moveTo(tipX, tipY);
    Robot.ctxDisplay.lineTo(leftX, leftY);
    Robot.ctxDisplay.bezierCurveTo(leftControlX, leftControlY,
        rightControlX, rightControlY, rightX, rightY);
    Robot.ctxDisplay.closePath();
    Robot.ctxDisplay.fill();*/

  }
};

Robot.drawRotated = function(degrees){
  Robot.ctxDisplay.save();
  Robot.ctxDisplay.translate(Robot.x,Robot.y);
  Robot.ctxDisplay.rotate(degrees*Math.PI/180);
  Robot.ctxDisplay.translate(-(Robot.x),-(Robot.y));
  Robot.ctxDisplay.drawImage(Robot.image,Robot.x-(Robot.width/2),Robot.y-(Robot.height/2));
  Robot.ctxDisplay.restore();
}

/**
 * Click the run button.  Start the program.
 */
Robot.runButtonClick = function() {
  document.getElementById('runButton').style.display = 'none';
  document.getElementById('resetButton').style.display = 'inline';
  document.getElementById('spinner').style.visibility = 'visible';

  Robot.execute();
};

/**
 * Click the reset button.  Reset the Robot.
 */
Robot.resetButtonClick = function() {
  document.getElementById('runButton').style.display = 'inline';
  document.getElementById('resetButton').style.display = 'none';
  document.getElementById('spinner').style.visibility = 'hidden';

  Robot.reset();
};


/**
 * Execute the user's code.  Heaven help us...
 */
Robot.execute = function() {
  Blockly.Apps.log = [];
  Blockly.Apps.ticks = 1000000;

  var code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
  try {
    eval(code);
  } catch (e) {
    // Null is thrown for infinite loop.
    // Otherwise, abnormal termination is a user error.
    if (e !== null) {
      alert(e);
    }
  }

  // Blockly.Apps.log now contains a transcript of all the user's actions.
  // Reset the graphic and animate the transcript.
  Robot.reset();
  Robot.pid = window.setTimeout(Robot.animate, 100);
};

/**
 * Show the user's code in raw JavaScript.
 */
Robot.showCode = function() {
  var code = Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace);
  // Strip out serial numbers.
  code = code.replace(/(,\s*)?'\d+'\)/g, ')');
  alert(code);
};

/**
 * Iterate through the recorded path and animate the robot's actions.
 */
Robot.animate = function() {
  // All tasks should be complete now.  Clean up the PID list.
  Robot.pid = 0;


  var tuple = Blockly.Apps.log.shift();
  if (!tuple) {
    document.getElementById('spinner').style.visibility = 'hidden';
    Blockly.mainWorkspace.highlightBlock(null);
    return;
  }
  Blockly.mainWorkspace.highlightBlock(tuple.pop());

  switch (tuple[0]) {
    case 'FD':  // Forward
      if (Robot.penDownValue) {
        Robot.ctxScratch.beginPath();
        Robot.ctxScratch.moveTo(Robot.x, Robot.y);
      }
      var distance = tuple[1];
      if (distance) {
        Robot.x += distance * Math.sin(2 * Math.PI * Robot.heading / 360);
        Robot.y -= distance * Math.cos(2 * Math.PI * Robot.heading / 360);
        var bump = 0;
      } else {
        // WebKit (unlike Gecko) draws nothing for a zero-length line.
        var bump = 0.1;
      }
      if (Robot.penDownValue) {
        Robot.ctxScratch.lineTo(Robot.x, Robot.y + bump);
        Robot.ctxScratch.stroke();
      }
      break;
    case 'RT':  // Right Turn
      Robot.heading += tuple[1];
      Robot.heading %= 360;
      if (Robot.heading < 0) {
        Robot.heading += 360;
      }
      break;
    case 'PU':  // Pen Up
      Robot.penDownValue = false;
      break;
    case 'PD':  // Pen Down
      Robot.penDownValue = true;
      break;
    case 'PW':  // Pen Width
      Robot.ctxScratch.lineWidth = tuple[1];
      break;
    case 'PC':  // Pen Color
      Robot.ctxScratch.strokeStyle = tuple[1];
      break;
    case 'HT':  // Hide Robot
      Robot.visible = false;
      break;
    case 'ST':  // Show Robot
      Robot.visible = true;
      break;
  }
  Robot.display();

  // Scale the speed non-linearly, to give better precision at the fast end.
  var stepSpeed = 1000 * Math.pow(Robot.speedSlider.getValue(), 2);
  Robot.pid = window.setTimeout(Robot.animate, stepSpeed);
};

// Robot API.

Robot.moveForward = function(distance, id) {
  Blockly.Apps.log.push(['FD', distance, id]);
};

Robot.moveBackward = function(distance, id) {
  Blockly.Apps.log.push(['FD', -distance, id]);
};

Robot.turnRight = function(angle, id) {
  Blockly.Apps.log.push(['RT', angle, id]);
};

Robot.turnLeft = function(angle, id) {
  Blockly.Apps.log.push(['RT', -angle, id]);
};

Robot.penUp = function(id) {
  Blockly.Apps.log.push(['PU', id]);
};

Robot.penDown = function(id) {
  Blockly.Apps.log.push(['PD', id]);
};

Robot.penWidth = function(width, id) {
  Blockly.Apps.log.push(['PW', Math.max(width, 0), id]);
};

Robot.penColour = function(colour, id) {
  Blockly.Apps.log.push(['PC', colour, id]);
};

Robot.hideRobot = function(id) {
  Blockly.Apps.log.push(['HT', id]);
};

Robot.showRobot = function(id) {
  Blockly.Apps.log.push(['ST', id]);
};
