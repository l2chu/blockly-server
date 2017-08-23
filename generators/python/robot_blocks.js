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

goog.provide('Blockly.Python.Robot');

goog.require('Blockly.Python');

Blockly.Python['draw_move_forward_100'] = function(block) {
  // Generate Python for moving forward 100 pixels.
  return 'Robot.moveForward(100, \'' + block.id + '\')\n';
};

Blockly.Python['draw_turn_right_90'] = function(block) {
  // Generate Python for turning right 90 degrees.
  return 'Robot.turnRight(90, \'' + block.id + '\')\n';
};

Blockly.Python['draw_move'] = function(block) {
  // Generate Python for moving forward or backwards.
  var value = Blockly.Python.valueToCode(block, 'PIXELS',
      Blockly.Python.ORDER_NONE) || '0';
  return 'Robot.' + block.getFieldValue('DIR') +
      '(' + value + ', \'' + block.id + '\')\n';
};

Blockly.Python['draw_turn'] = function(block) {
  // Generate Python for turning left or right.
  var value = Number(block.getFieldValue('DEGREES'));
  return 'Robot.' + block.getFieldValue('DIR') +
      '(' + value + ', \'' + block.id + '\')\n';
};

Blockly.Python['draw_width'] = function(block) {
  // Generate Python for setting the width.
  var width = Blockly.Python.valueToCode(block, 'WIDTH',
      Blockly.Python.ORDER_NONE) || '1';
  return 'Robot.penWidth(' + width + ', \'' + block.id + '\')\n';
};

Blockly.Python['draw_pen'] = function(block) {
  // Generate Python for pen up/down.
  return 'Robot.' + block.getFieldValue('PEN') + '(\'' + block.id + '\')\n';
};

Blockly.Python['draw_colour'] = function(block) {
  // Generate Python for setting the colour.
  var colour = Blockly.Python.valueToCode(block, 'COLOUR',
      Blockly.Python.ORDER_NONE) || '\'#000000\'';
  return 'Robot.penColour(' + colour + ', \'' +
      block.id + '\')\n';
};

Blockly.Python['robot_visibility'] = function(block) {
  // Generate Python for changing Robot visibility.
  return 'Robot.' + block.getFieldValue('VISIBILITY') +
      '(\'' + block.id + '\')\n';
};

Blockly.JavaScript['toggle_led'] = function(block) {
  // Generate JavaScript for changing Robot visibility.
  return 'Robot.' + block.getFieldValue('LED') +
      '(\'' + block.id + '\')\n';
};
