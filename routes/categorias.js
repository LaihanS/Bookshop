const express = require("express")

const router = express.Router();

const categorycontroller = require("../controllers/categoriaController");


router.get("/mantenimiento-categoria", categorycontroller.GetCategList);
router.get("/create-categoria", categorycontroller.GetAddCategory);
router.post("/add-category", categorycontroller.PostAddCategory);
router.get("/editar-category/:cateId", categorycontroller.GeteditCategory);
router.post("/editar-category", categorycontroller.PosteditCategory);
router.post("/delete-category", categorycontroller.PostDeleteCategory);

module.exports = router;