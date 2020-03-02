"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class ProductosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('mirar' + req.params);
            const productos = yield database_1.default.query('SELECT p.id AS id, p.nombre AS nombre,p.precio AS precio, p.cantidad as cantidad, p.tipo AS tipo, c.nombre as nombreCategoria FROM productos p INNER JOIN categoria  c WHERE p.tipo=c.id');
            res.json(productos);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const producto = yield database_1.default.query('Select * From productos where id=' + req.params.id);
            console.log(producto);
            debugger;
            if (producto.length == 0) {
                res.json({ text: 'no se ecunetran productos con ese id' });
            }
            else {
                res.json(producto);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO productos set ?', [req.body]);
            console.log('el producto gusradado es: ' + req.body.nombre);
            res.json({ message: 'Se guardó el producto correctamente' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM productos where id= ?', [id]);
            res.json({ message: 'Se eliminó' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE productos set ? where id = ?', [req.body, id]);
            res.json({ text: 'El producto fue actualizado :)' + req.params.id });
        });
    }
}
const productosController = new ProductosController();
exports.default = productosController;
