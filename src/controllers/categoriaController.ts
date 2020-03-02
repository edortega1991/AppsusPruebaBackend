import {Request, Response, request} from 'express';
import pool from '../database';

class CategoriaController{

    public async list (req:Request, res:Response){
        const categorias = await pool.query('Select * From categoria');
        res.json(categorias);
    } 

    public async getOne(req:Request, res:Response){
        const categoria = await pool.query('Select * From categoria where id='+req.params.id);
        console.log(categoria);       
        
        if(categoria.length  == 0){
            
            res.json({text:'no se ecunetran categorias con ese id'});
            
        }else{
            res.json(categoria);
        }
          
    }

    public async create (req:Request,res:Response): Promise<void>{
        await pool.query('INSERT INTO categoria set ?',[req.body]);
        console.log('el categoria gusradado es: ' +req.body.nombre);
        res.json({message:'Se guardó el categoria correctamente'});

    }

    public async delete(req:Request,res:Response):Promise<void>{
        const { id } =req.params;
        await pool.query('DELETE FROM categoria where id= ?', [id]);
        res.json({message: 'Se eliminó'});
    }
    public async update(req:Request,res:Response):Promise<void>{
        const {id} = req.params;
        await pool.query('UPDATE categoria set ? where id = ?',[req.body, id]);
        res.json({text:'El categoria fue actualizado :)'+req.params.id});
    }
}

 const categoriasController = new CategoriaController();
 export default categoriasController;