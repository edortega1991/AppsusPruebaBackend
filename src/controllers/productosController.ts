import {Request, Response, request} from 'express';
import pool from '../database';

class ProductosController{

    public async list (req:Request, res:Response){
        console.log('mirar'+req.params);
        const productos = await pool.query('SELECT p.id AS id, p.nombre AS nombre,p.precio AS precio, p.cantidad as cantidad, p.tipo AS tipo, c.nombre as nombreCategoria FROM productos p INNER JOIN categoria  c WHERE p.tipo=c.id');
        res.json(productos);
    } 

    public async getOne(req:Request, res:Response){
        const producto = await pool.query('Select * From productos where id='+req.params.id);
        console.log(producto);       
        debugger;
        if(producto.length  == 0){
            
            res.json({text:'no se ecunetran productos con ese id'});
            
        }else{
            res.json(producto);
        }
          
    }

    public async create (req:Request,res:Response): Promise<void>{
        await pool.query('INSERT INTO productos set ?',[req.body]);
        console.log('el producto gusradado es: ' +req.body.nombre);
        res.json({message:'Se guardó el producto correctamente'});

    }

    public async delete(req:Request,res:Response):Promise<void>{
        const { id } =req.params;
        await pool.query('DELETE FROM productos where id= ?', [id]);
        res.json({message: 'Se eliminó'});
    }
    public async update(req:Request,res:Response):Promise<void>{
        const {id} = req.params;
        await pool.query('UPDATE productos set ? where id = ?',[req.body, id]);
        res.json({text:'El producto fue actualizado :)'+req.params.id});
    }
}

 const productosController = new ProductosController();
 export default productosController;