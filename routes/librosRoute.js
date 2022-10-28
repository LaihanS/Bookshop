const express = require("express")

const router = express.Router();

const bookcontroller = require("../controllers/LibroController");

router.get("/", bookcontroller.GetBookHome);
router.get("/mantenimiento-books", bookcontroller.GetBookList);
router.get("/create-book", bookcontroller.GetAddBook);
router.post("/add-book", bookcontroller.PostAddBook);
router.get("/edit-book/:bookID", bookcontroller.GetEditBook);
router.post("/edit-book", bookcontroller.PostEditBook);
router.post("/delete-book", bookcontroller.PostDeleteBook);
router.get("/get-book/:libID", bookcontroller.GetBookDetails);
router.get("/bookSearch", bookcontroller.GetBookSearch);
router.get("/seleccionar-cate", bookcontroller.GetBookFilter);
module.exports = router;