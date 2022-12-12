import logger from "../loggers/logger.js";
import bcrypt from "bcrypt";
import { Router } from "express";
import Usuario from "../models/user.js";
import path from 'path';
import subirImg from "../middleware/multer.js";


const profile = Router();


profile.get('/', async (req, res)=>{

  const usuario=req.session.user
  const user = await Usuario.findOne({ email: req.session.user });

  const tmpFoto=user.foto;
  const usrID=process.env.USERID
  
  user.foto=path.join('profile-img',tmpFoto)
  
  res.status(200).render('profile', {user, usuario, usrID})

})

profile.post('/', subirImg.single('foto'), async (req, res)=>{
  
  const { email, password, nombre, direccion, edad, telefono} = req.body;

  let foto=req.body.foto
  
  if(req.file) foto=req.file.filename
  
  try {

    await Usuario.updateOne({ "email" : req.session.user }, {$set:{email:email, nombre:nombre, direccion:direccion, edad:edad,telefono:telefono,foto:foto}})

  } catch (error) {

    logger.error(`Error modificando usuario: ${error}`)

  }

  res.redirect("/api/productos/Todos");

  
})

export default profile;