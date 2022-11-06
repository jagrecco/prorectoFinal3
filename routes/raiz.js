import { Router } from "express";

const raiz = Router()

raiz.get("/", async (req, res) => {

    const usuario=req.session.user
    res.status(200).render('index', {usuario})

});

export default raiz;