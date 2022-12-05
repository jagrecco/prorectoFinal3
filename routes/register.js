import logger from "../loggers/logger.js";
import { Router } from "express";
const register = Router();

import subirImg from "../middleware/multer.js";
import User from "../models/user.js";


register.get('/', (req, res)=>{
  
  res.render("register");

})

register.post('/', subirImg.single('foto'), (req, res)=>{
  
  const { email, password, nombre, direccion, edad, telefono } = req.body;
  
  /* const foto=req.file.filename */
  let foto="profile_img.png"

  //si no subió foto de perfil usa la predeterminada
  if (req.file) {foto=req.file.filename}

  User.findOne({ "email" : req.body.email }, async (err, user) => {
    if (err) {
        logger.error(`Error de registro: ${err}`)
        res.render('errorRegistro');
    };
    if (user) {
        logger.error(`Intento de registrar usuario existente: ${user}`)
        res.render('errorRegistro');
    }
    
    if (!user) {
      const newUser = new User({ email, password, nombre, direccion, edad, telefono, foto });
      const hashedPassword= await newUser.encryptPassword(password);
      newUser.password=hashedPassword;
      
      await newUser.save();
      res.redirect("/login");
    }
  
});
})

export default register;