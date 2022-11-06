import { Router } from "express";
import passport from "passport";

const login = Router()

login.get("/", (req, res) => {
  
    /* const productos = await productosDao.listarTodos(); */
    res.status(200).render('signin')

});

login.post("/", passport.authenticate('local', { failureRedirect: "errorLogin.ejs"}), (req, res) => {
  
  const { email } = req.body;
  
  req.session.user = email;
  res.redirect('api/productos')
  
});

export default login;