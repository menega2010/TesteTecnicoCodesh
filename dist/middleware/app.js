"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;
var _cors = _interopRequireDefault(require("cors"));
var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class App {
  port = 5000;
  constructor() {
    this.express = (0, _express.default)();
    this.listen();
    this.middlewares();
  }
  getApp() {
    return this.express;
  }
  middlewares() {
    this.express.use(_express.default.json());
    this.express.use((0, _cors.default)());
  }
  listen() {
    this.express.listen(this.port, () => {
      console.log("Server rodando na porta", this.port);
    });
  }
}
exports.App = App;