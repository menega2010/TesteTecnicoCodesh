"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Time = void 0;
var _uuid = require("uuid");
class Time {
  constructor() {
    if (!this.id) {
      this.id = (0, _uuid.v4)();
    }
  }
}
exports.Time = Time;