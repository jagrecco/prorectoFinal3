import logger from "../loggers/logger.js";
import { Router } from "express";
const register = Router();

import User from "../models/user.js";


register.get('/', (req, res)=>{
  
  res.render("register");

})

register.post('/', (req, res)=>{
  
  const { email, password, nombre, direccion, edad, telefono, foto } = req.body;
  
  User.findOne({ "email" : req.body.email }, async (err, user) => {
    if (err) {
        logger.error(`Error de registro: ${err}`)
        res.render('errorRegistro');
    };
    if (user) {
        logger.error(`Intengo de registrar usuario existente: ${user}`)
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