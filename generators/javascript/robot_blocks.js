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

goog.provide('Blockly.JavaScript.Robot');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['draw_move_forward_100'] = function(block) {
  // Generate JavaScript for moving forward 100 pixels.
  return 'Robot.moveForward(100, \'' + block.id + '\');\n';
};

Blockly.JavaScript['draw_turn_right_90'] = function(block) {
  // Generate JavaScript for turning right 90 degrees.
  return 'Robot.turnRight(90, \'' + block.id + '\');\n';
};

Blockly.JavaScript['draw_move'] = function(block) {
  // Generate JavaScript for moving forward or backwards.
  var value = Blockly.JavaScript.valueToCode(block, 'PIXELS',
      Blockly.JavaScript.ORDER_NONE) || '0';
  return 'Robot.' + block.getFieldValue('DIR') +
      '(' + value + ', \'' + block.id + '\');\n';
};

Blockly.JavaScript['draw_turn'] = function(block) {
  // Generate JavaScript for turning left or right.
  var value = Number(block.getFieldValue('DEGREES'));
  return 'Robot.' + block.getFieldValue('DIR') +
      '(' + value + ', \'' + block.id + '\');\n';
};

Blockly.JavaScript['draw_width'] = function(block) {
  // Generate JavaScript for setting the width.
  var width = Blockly.JavaScript.valueToCode(block, 'WIDTH',
      Blockly.JavaScript.ORDER_NONE) || '1';
  return 'Robot.penWidth(' + width + ', \'' + block.id + '\');\n';
};

Blockly.JavaScript['draw_pen'] = function(block) {
  // Generate JavaScript for pen up/down.
  return 'Robot.' + block.getFieldValue('PEN') + '(\'' + block.id + '\');\n';
};

Blockly.JavaScript['draw_colour'] = function(block) {
  // Generate JavaScript for setting the colour.
  var colour = Blockly.JavaScript.valueToCode(block, 'COLOUR',
      Blockly.JavaScript.ORDER_NONE) || '\'#000000\'';
  return 'Robot.penColour(' + colour + ', \'' +
      block.id + '\');\n';
};

Blockly.JavaScript['robot_visibility'] = function(block) {
  // Generate JavaScript for changing Robot visibility.
  return 'Robot.' + block.getFieldValue('VISIBILITY') +
      '(\'' + block.id + '\');\n';
};

Blockly.JavaScript['toggle_led'] = function(block) {
  // Generate JavaScript for turning on the Robot's LED light.
  return 'Robot.' + block.getFieldValue('LED') +
      '(\'' + block.id + '\');;\n';
};

Blockly.JavaScript['change_GPIO'] = function(block) {
  // Generate JavaScript for changing the GPIO.
  return 'Robot.changeGPIO(' + block.getFieldValue('VALUE') + ', \'' +
      block.id + '\');\n';
};

Blockly.JavaScript['read_GPIO'] = function(block) {
  // Generate JavaScript for changing the GPIO.
  return 'Robot.readGPIO(\'' +  block.id + '\');\n';
};

Blockly.JavaScript['change_motor'] = function(block) {
  // Generate JavaScript for moving the motor.
  return 'Robot.changeMotor(' + block.getFieldValue('NUM_MOTOR') + ', ' +
      block.getFieldValue('DEGREES') + ', \'' +
      block.id + '\');\n';
};
