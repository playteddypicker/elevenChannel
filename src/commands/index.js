"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const echo_1 = require("./echo");
const ERmatchhistory_1 = require("./ERmatchhistory");
const ERuserInfo_1 = require("./ERuserInfo");
const availableCommands = [echo_1.echo, ERmatchhistory_1.ERmatchHistory, ERuserInfo_1.ERuserInfo];
exports.default = availableCommands;
