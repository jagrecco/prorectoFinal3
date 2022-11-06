/* import express from "express"; */
import { Router } from "express";

import { productosDao } from "../daos/index.js"

/* const test = new productosDao() */

const products = Router()


/* import { getAll, getById, save, deleteById, changeById } from "../controllers/productsController.js"; */
/* import { isLogin } from "../controllers/adminController.js"; */


products.get("/", async (req, res) => {
  
  const productos = await productosDao.listarTodos();
  const usuario=req.session.user
  
  res.status(200).render('productos', {productos, usuario});
  /* res.status(200).json(productos); */
});

products.get("/:id", async (req, res) => {  
  const { id } = req.params    
  const productos = await productosDao.listarUno(id);
  res.status(201).json(productos)
});

products.post("/", async (req, res) => { 
  
  const {nombre, descripcion, codigo, foto, precio, stock, timestamp} = req.body
  const productos = await productosDao.guardarUno({nombre, descripcion, codigo, foto, precio, stock, timestamp})  
  res.status(201).json(productos)

});

products.delete("/:id", async (req, res) => { 

  const { id } = req.params  
  const data = await productosDao.borrarUno(id)
  res.json(data) 

});

products.put("/:id", async (req, res) => {

  const id = parseInt(req.params.id)
  const {nombre, descripcion, codigo, foto, precio, stock, timestamp} = req.body
  const data = await productosDao.editaUno(id, {nombre, descripcion, codigo, foto, precio, stock, timestamp})  
  res.json(data) 

});

export default products;