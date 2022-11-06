import express from "express";
import { Router } from "express";

import { carritosDao } from "../daos/index.js"

const carts = Router();

carts.post("/", async (req, res) => {
  const data = await carritosDao.guardarUno({ productos: [] })
  res.status(201).json(data)   
});

carts.get("/", async (req, res) =>{
  const datos = await carritosDao.listarTodos()
  res.status(201).json(datos)
})

carts.delete("/:id", async (req, res) => {   
  const id = req.params.id
  const data = await carritosDao.borrarUno(id)  
  res.json(data) 
});

carts.get("/:id/productos", async (req, res) => {  
  const { id } = req.params
  const data = await carritosDao.listarUno(id)
  res.status(201).json(data) // .json(data.productos)
});


carts.post("/:id/productos/", (req, res) => {
  
  const idCarrito = req.params.id
  const {id ,nombre, descripcion, codigo, foto, precio, stock, timestamp} = req.body
  carritosDao.agregarProducto(idCarrito, {id ,nombre, descripcion, codigo, foto, precio, stock, timestamp})
  .then(data => {
    res.status(201).json(data)
  })

});


carts.delete("/:id/productos/:idProducto", async (req, res) => { 
  const idCarrito = req.params.id   
  const idProducto = req.params.idProducto   
  
  const data = await carritosDao.eliminarProducto(idCarrito, idProducto)
  res.json(data)   
});

export default carts;
