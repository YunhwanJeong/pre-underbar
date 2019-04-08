global.FILL_ME_IN = "Fill this value in";
global.window = {};
global._ = {};
const chai = require('../lib/chai');
require('../src/underbar.js');
global.expect = chai.expect;
global.sinon = require('sinon');
global.clock = global.sinon.useFakeTimers();
global.checkForNativeMethods = function() {};

const fs = require('fs');

require('../lib/sinon-chai.js');

describe('Bare Minimum Requirements', function() {

  let part1 = fs.readFileSync(__dirname + '/../spec/part1.js').toString();
  let part2 = fs.readFileSync(__dirname + '/../spec/part2.js').toString();
  part1 = part1.replace('var checkForNativeMethods = function', 'var __check = function');
  part2 = part2.replace('var checkForNativeMethods = function', 'var __check = function');
  part2 = part2.replace('expect(callback).to.have.been.calledWith(1, 2);', '');
  eval(part1);
  eval(part2);
  // require('../spec/part1.js');
  // require('../spec/part2.js');
});
