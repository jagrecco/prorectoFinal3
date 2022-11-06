import { Router } from "express";
import passport from "passport";

const login = Router()

login.get("/", (req, res) => {
  
  res.status(200).render('signin')

});

login.post("/", passport.authenticate('local', { failureRedirect: "/errorlogin"}), (req, res) => { //errorLogin.ejs
  
  const { email } = req.body;
  
  req.session.user = email;
  res.redirect('api/productos/Todos')
  
});

export default login;