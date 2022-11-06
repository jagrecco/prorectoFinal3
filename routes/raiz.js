import { Router } from "express";

const raiz = Router()


/* import { getAll, getById, save, deleteById, changeById } from "../controllers/productsController.js"; */
/* import { isLogin } from "../controllers/adminController.js"; */


raiz.get("/", async (req, res) => {
    res.status(200).render("index")
});

export default raiz;