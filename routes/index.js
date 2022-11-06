import { Router } from "express";
const router = Router();

import log from '../utils/log.js'
import products from "./productos.js";
import cart from "./carrito.js";
import login from "./login.js";
import logout from "./logout.js";
import register from "./register.js";
import raiz from "./raiz.js"

router.use((req,res, next)=>{
    log(req.method, req.originalUrl, 200)
    next()
})

router.use("/", raiz);
router.use("/login", login);
router.use("/register", register)

router.use((req,res, next)=>{
    if (!req.session.user) {return res.redirect('/')}
    next()
})

router.use("/logout", logout);
router.use("/api/productos", products);
router.use("/api/carrito", cart);

router.use('*', (req,res,next)=>{
    log(req.method,req.originalUrl, 404)
    const html=`<div style='border: 1px solid black;padding: 50px; text-align:center'><h3 style="color:orangered ;">404 - Page not found!</h3> <a style="text-decoration: none; color:darkblue; font-weight: bolder; " href='http://localhost:3000/'>Ir a inicio</a></div>`
    res.status(404).send(html);
    next()
})

export default router