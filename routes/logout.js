import logger from "../loggers/logger.js";
import { Router } from "express";
const logout = Router();

logout.get("/", (req, res) => {
    const usuario=req.session.user
    req.session.destroy((err) => {
      if (!err) {
        logger.info(`${usuario} cerró su sesión`);
        res.redirect('/')
    }
      else {
        logger.error(`Error al cerrar la sesión ${err}`)
        res.redirect('/')
    };
    });
});

export default logout;