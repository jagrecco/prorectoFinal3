import logger from "../loggers/logger.js";
import { Router } from "express";
import Usuario from "../models/user.js";

const profile = Router();


profile.get('/', async (req, res)=>{

    const user = await Usuario.findOne({ email: req.session.user });

    res.status(200).render('profile', {user})
})

profile.post('/', async (req, res)=>{
  
  const { email, password, nombre, direccion, edad, telefono, foto } = req.body;
  
  try {

    await Usuario.updateOne({ "email" : req.session.user }, {$set:{email:email, nombre:nombre, direccion:direccion, edad:edad,telefono:telefono,foto:foto}})

  } catch (error) {

    logger.error(`Error modificando usuario: ${error}`)

  }

  res.redirect("/login");

  /* Usuario.findOne({ "email" : req.body.email }, async (err, user) => {
    if (err) {
        logger.error(`Error de registro: ${err}`)
        res.render('errorRegistro');
    };
    if (user) {
        logger.error(`Intengo de registrar usuario existente: ${user}`)
        res.render('errorRegistro');
    }
    
    if (!user) {
      const newUser = new Usuario({ email, password, nombre, direccion, edad, telefono, foto });
      const hashedPassword= await newUser.encryptPassword(password);
      newUser.password=hashedPassword;
      
      await newUser.save();
      res.redirect("/login");
    }
  
}); */
})

export default profile;