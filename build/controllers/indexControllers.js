"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        res.send('Hola como estas');
    }
}
exports.indexController = new IndexController();
