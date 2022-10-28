const express = require("express")

const router = express.Router();

const editorialcontroller = require("../controllers/EditorialController");


router.get("/mantenimiento-editorial", editorialcontroller.GetEditorialList);
router.get("/create-editorial", editorialcontroller.GetAddEditorial);
router.post("/add-editorial", editorialcontroller.PostAddEditorial);
router.get("/editar-editorial/:editorialID", editorialcontroller.GeteditEditorial);
router.post("/editar-editorial", editorialcontroller.PostEditEditorial);
router.post("/delete-editorial", editorialcontroller.PostDeleteEditorial);

module.exports = router;