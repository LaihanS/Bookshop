const express = require("express")

const router = express.Router();

const autorcontroller = require("../controllers/autorController");


router.get("/mantenimiento-autor", autorcontroller.GetAutorList);
router.get("/create-autor", autorcontroller.GetAddAutor);
router.post("/add-autor", autorcontroller.PostAddAutor);
router.get("/editar-autor/:autorID", autorcontroller.GeteditAutor);
router.post("/editar-autor", autorcontroller.PostEditAutor);
router.post("/delete-autor", autorcontroller.PostDeleteAutor);

module.exports = router;