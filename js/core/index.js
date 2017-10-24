// Copyright 2014-present runtime.js project authors
// Copyright 2017-present jsos project authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const { allocator } = require('./resources');
require('./polyfill');

const random = require('./random');
const block = require('./block');
const keyboard = require('./keyboard');
const ps2 = require('./ps2');
const pci = require('./pci');
const net = require('./net');
const stdio = require('./stdio');
const speaker = require('../driver/ibmpc/pcspeaker');
const Storage = require('./storage');
// const fs = require('./fs');

class Runtime {
  constructor() {
    Object.assign(this, {
      random,
      block,
      keyboard,
      pci,
      ps2,
      allocator,
      net,
      stdio,
      speaker,
      storage: new Storage,
      //fs,
      machine: {
        reboot: __SYSCALL.reboot,
        shutdown: () => __SYSCALL.acpiEnterSleepState(5),
        suspend: () => __SYSCALL.acpiEnterSleepState(3),
      },
    });
  }
}

global.runtime = global.$$ = module.exports = new Runtime();
