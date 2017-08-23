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

// Extensions to Blockly's language and JavaScript generator.

goog.provide('Blockly.Constants.Robot');

goog.require('Blockly.Blocks');


Blockly.Constants.Robot.HUE = 80;

Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // Block for moving forward 100 pixels.
  {
    "type": "draw_move_forward_100",
    "message0": "%{BKY_ROBOT_MOVE_FORWARD_100_TITLE}",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_ROBOT_HUE}",
    "helpUrl": "",
    "tooltip": "%{BKY_ROBOT_MOVE_FORWARD_100_TOOLTIP}"
  },
  // Block for turning right 90 degrees.
  {
    "type": "draw_turn_right_90",
    "message0": "%{BKY_ROBOT_TURN_RIGHT_90_TITLE}",
    "previousStatement": null,
    "nextStatement": null,
    "helpUrl": "",
    "colour": "%{BKY_ROBOT_HUE}",
    "tooltip": "%{BKY_ROBOT_TURN_RIGHT_90_TOOLTIP}"
  },

  // Block for moving forward or backwards.
  {
    "type": "draw_move",
    "message0": "%1 %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DIR",
        "options": [
          [
            "%{BKY_ROBOT_MOVE_FORWARD}",
            "moveForward"
          ],
          [
            "%{BKY_ROBOT_MOVE_BACKWARD}",
            "moveBackward"
          ]
        ]
      },
      {
        "type": "input_value",
        "name": "PIXELS",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "helpUrl": "",
    "colour": "%{BKY_ROBOT_HUE}",
    "extensions": ["robot_move_tooltip"]
  },

  // Block for turning left or right.
  {
    "type": "draw_turn",
    "message0": "%1 %2",
    "args0":[
      {
        "type": "field_dropdown",
        "name": "DIR",
        "options": [
          ["%{BKY_ROBOT_TURN_RIGHT}", 'turnRight'],
          ["%{BKY_ROBOT_TURN_LEFT}", 'turnLeft']
        ]
      },
      {
        "type": "field_angle",
        "name": "DEGREES",
        "angle": "0"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "helpUrl": "",
    "colour": "%{BKY_ROBOT_HUE}",
    "extensions": ["robot_turn_tooltip"]
  },

  //Block for changing the width of the pen
  {
    "type": "draw_width",
    "message0": "%{BKY_ROBOT_SET_WIDTH} %1",
    "args0":[
      {
        "type": "input_value",
        "name": "WIDTH",
        "check": "Number"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "helpUrl": "",
    "colour": "%{BKY_ROBOT_HUE}",
    "tooltip": "%{BKY_ROBOT_WIDTH_TOOLTIP}"
  },

  //Block indicating when to start or stop drawing
  {
    "type": "draw_pen",
    "message0": "%1",
    "args0":[
      {
        "type": "field_dropdown",
        "name": "PEN",
        "options": [
          ["%{BKY_ROBOT_PEN_UP}", 'penUp'],
          ["%{BKY_ROBOT_PEN_DOWN}", 'penDown']
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "helpUrl": "",
    "colour": "%{BKY_ROBOT_HUE}",
    "tooltip": "%{BKY_ROBOT_PEN_TOOLTIP}"
  },

  //Block to change the color of the pen
  {
    "type": "draw_colour",
    "message0": "%{BKY_ROBOT_COLOUR_TITLE} %1",
    "args0":[
      {
        "type": "input_value",
        "name": "COLOUR",
        "check": "Colour"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "helpUrl": "",
    "colour": "%{BKY_ROBOT_HUE}",
    "tooltip": "%{BKY_ROBOT_COLOUR_TOOLTIP}"
  },

  // Block indicating when to show or hide the robot.
  {
    "type": "robot_visibility",
    "message0": "%1",
    "args0":[
      {
        "type": "field_dropdown",
        "name": "VISIBILITY",
        "options": [
          ["%{BKY_ROBOT_VISIBILITY_SHOW}", 'showRobot'],
          ["%{BKY_ROBOT_VISIBILITY_HIDE}", 'hideRobot']
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "helpUrl": "",
    "colour": "%{BKY_ROBOT_HUE}",
    "extensions": ["visibility_tooltip"]
  },

  //Block to toggle the led on the robot
  {
    "type": "toggle_led",
    "message0": "%1",
    "args0":[
      {
        "type": "field_dropdown",
        "name": "LED",
        "options": [
          ["%{BKY_ROBOT_LED_ON}", 'ledOn'],
          ["%{BKY_ROBOT_LED_OFF}", 'ledOff']
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "helpUrl": "",
    "colour": "%{BKY_ROBOT_HUE}",
    "extensions": ["led_tooltip"]
  },

  //Block to change GPIO
  {
    "type": "change_GPIO",
    "message0": "change GPIO to %1",
    "args0":[
      {
        "type": "field_number",
        "name": "VALUE",
        "value": 0,
        "min": 0,
        "max": 255,
        "precision": 1
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "helpUrl": "",
    "colour": "%{BKY_ROBOT_HUE}",
    "tooltip": "Change GPIO."
  },

  //Block to read GPIO
  {
    "type": "read_GPIO",
    "message0": "GPIO: %1",
    "args0":[
      {
        "type": "field_value",
        "name": "VALUE",
        "value": 0
      }
    ],
    "helpUrl": "",
    "colour": "%{BKY_ROBOT_HUE}",
    "tooltip": "Read GPIO."
  },

  //Block to change motor
  {
    "type": "change_motor",
    "message0": "move motor %1 by %2 degrees",
    "args0":[
      {
        "type": "field_number",
        "name": "NUM_MOTOR",
        "value": 1,
        "min": 1,
        "max": 16,
        "precision": 1
      },
      {
        "type": "field_number",
        "name": "DEGREES",
        "value": 0,
        "min": 0,
        "max": 360,
        "precision": 1
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "helpUrl": "",
    "colour": "%{BKY_ROBOT_HUE}",
    "tooltip": "Move the Robot motor."
  }

]); // END JSON EXTRACT (Do not delete this comment.)

// Extension for the robot move block tooltip
Blockly.Constants.Robot.MOVE_TOOLTIP_EXTENSION = function() {
  // Assign 'this' to a variable for use in the tooltip closure below.
  var thisBlock = this;
  this.setTooltip(function() {
    var tooltip = Blockly.Msg.ROBOT_MOVE_TOOLTIP.replace('%1', thisBlock.getFieldValue('DIR').substring(4).toLowerCase());
    tooltip = tooltip.replace('%2', thisBlock.getInputTargetBlock('PIXELS').getFieldValue('NUM'));
    return tooltip;
  });
};
Blockly.Extensions.register('robot_move_tooltip',
  Blockly.Constants.Robot.MOVE_TOOLTIP_EXTENSION);

// Extension for the robot turn block tooltip
Blockly.Constants.Robot.TURN_TOOLTIP_EXTENSION = function() {
  // Assign 'this' to a variable for use in the tooltip closure below.
  var thisBlock = this;
  this.setTooltip(function() {
    var tooltip = Blockly.Msg.ROBOT_TURN_TOOLTIP.replace('%1', thisBlock.getFieldValue('DIR').substring(4).toLowerCase());
    tooltip = tooltip.replace('%2', thisBlock.getFieldValue('DEGREES'));
    return tooltip;
  });
};
Blockly.Extensions.register('robot_turn_tooltip',
  Blockly.Constants.Robot.TURN_TOOLTIP_EXTENSION);

// Extension for the robot visibility block tooltip
Blockly.Constants.Robot.VISIBILITY_TOOLTIPS = {
  'showRobot': '%{BKY_ROBOT_VISIBILITY_TOOLTIP_VISIBLE}',
  'hideRobot': '%{BKY_ROBOT_VISIBILITY_TOOLTIP_INVISIBLE}'
};
Blockly.Extensions.register('visibility_tooltip',
  Blockly.Extensions.buildTooltipForDropdown(
    'VISIBILITY', Blockly.Constants.Robot.VISIBILITY_TOOLTIPS));

// Extension for the robot led block tooltip
Blockly.Constants.Robot.LED_TOOLTIPS = {
  'ledOn': '%{BKY_ROBOT_LED_ON_TOOLTIP}',
  'ledOff': '%{BKY_ROBOT_LED_OFF_TOOLTIP}'
};
Blockly.Extensions.register('led_tooltip',
  Blockly.Extensions.buildTooltipForDropdown(
    'LED', Blockly.Constants.Robot.LED_TOOLTIPS));
