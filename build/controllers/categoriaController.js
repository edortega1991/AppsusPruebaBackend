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
class CategoriaController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categorias = yield database_1.default.query('Select * From categoria');
            res.json(categorias);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoria = yield database_1.default.query('Select * From categoria where id=' + req.params.id);
            console.log(categoria);
            if (categoria.length == 0) {
                res.json({ text: 'no se ecunetran categorias con ese id' });
            }
            else {
                res.json(categoria);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO categoria set ?', [req.body]);
            console.log('el categoria gusradado es: ' + req.body.nombre);
            res.json({ message: 'Se guardó el categoria correctamente' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM categoria where id= ?', [id]);
            res.json({ message: 'Se eliminó' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE categoria set ? where id = ?', [req.body, id]);
            res.json({ text: 'El categoria fue actualizado :)' + req.params.id });
        });
    }
}
const categoriasController = new CategoriaController();
exports.default = categoriasController;
