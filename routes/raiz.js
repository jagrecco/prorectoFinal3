import { Router } from "express";

const raiz = Router()

raiz.get("/", async (req, res) => {

    const usuario=req.session.user
    const usrID=""
    res.status(200).render('signin', {usuario, usrID})
    /* res.status(200).render('index', {usuario}) */

});

export default raiz;