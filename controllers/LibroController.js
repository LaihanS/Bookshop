
const {Op, where} = require("sequelize")
const libro = require("../models/libro");
const categoria = require("../models/categorias");
const autor = require("../models/autor");
const editorial = require("../models/editorial");
const libros = require("../models/libro");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 587,
  auth: {
    user: "anlaih156@gmail.com",
    pass: "wljzbtdnxjwocggl",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.GetBookHome = (req, res, next) => {

  categoria.findAll().then((cat) => {

    libro.findAll({include: [{ model: categoria}, {model: autor}, {model: editorial }]}).then((result) => {

      const libros = result.map((result) => result.dataValues);
      const categoria = cat.map((cat) => cat.dataValues);

      res.render("LibrosViews/bookhome", {
        pagetitle: "Home",
        bookactive: true,
        libro: libros,
        categoria: categoria,
        haslibros: libros.length > 0,
      });
   
    });

  })
    

};

exports.GetBookFilter = (req, res, next) => {
  categoria.findAll().then((cat) => {
  const filter = req.query.seleccion;
   libros.findAll({include: [{ model: categoria}, {model: autor}, {model: editorial}],  where: {categoriumId: filter}}).then((result) => {
     const cates =  cat.map((cat) => cat.dataValues);
     const libs =  result.map((result) => result.dataValues);
     res.render("LibrosViews/bookhome", {
      pagetitle: "Home",
      bookactive: false,
      libro: libs,
      haslibros: libs.length > 0,
      categoria: cates,
     });
   });
  });
 };

 exports.GetBookSearch = (req, res, next) => {
  const busc = req.query.search;
  categoria.findAll().then((cat) => {
   libros.findAll({include: [{ model: categoria}, {model: autor}, {model: editorial}], where: { name: {[Op.like]: `%${busc}%`}}}).then((result) => {
     const libs =  result.map((result) => result.dataValues);
     const cates =  cat.map((cat) => cat.dataValues);
     res.render("LibrosViews/bookhome", {
      pagetitle: "Home",
      bookactive: false,
      libro: libs,
      haslibros: libs.length > 0,
      categoria: cates,
     });
   });
  });
 };

exports.GetBookDetails =(req, res, next) => {
  const idlibro = req.params.libID;
  const dat = req.query.dat;

  if (!dat) {
    return res.redirect("/")
  }

  libro.findOne({where: { id: idlibro }, include: [{ model: categoria}, {model: autor}, {model: editorial }] }).then((result) => {
 
    const lib = result.dataValues;

    if (!lib) {
      return res.redirect("/");
    }

    res.render("LibrosViews/librodetails", {
      pagetitle: "Detalles libro",
      libro: lib,
    });

  }).catch((err) => {
    console.log("error", err);
  }); 

}

exports.GetBookList = (req, res, next) => {
    libro.findAll({include: [{ model: categoria}, {model: autor}, {model: editorial }]}).then((result) => {

      const libros = result.map((result) => result.dataValues);

      res.render("LibrosViews/Mantenimientobooks", {
        pagetitle: "Mantenimiento Books",
        bookactive: true,
        libro: libros,
        haslibros: libros.length > 0,
      });
   
    });

};

exports.GetAddBook = (req, res, next) => {

  editorial.findAll().then((result)  => {
    categoria
    .findAll()
    .then((result1) => {
      autor
        .findAll()
        .then((result2) => {
          const editorial = result.map((result) => result.dataValues);
          const categoria = result1.map((result1) => result1.dataValues);
          const autor = result2.map((result2) => result2.dataValues);

          res.render("LibrosViews/libros-agregar", {
            pagetitle: "Agregar libros",
            editmode: false,
            editorial: editorial,
            categoria: categoria,
            autor: autor,
            //hasautor: autor.length > 0,
            //hascategoria: categoria.length > 0,
            //haseditorial: editorial.length > 0,
            hasunodelotre: autor.length > 0 && editorial.length > 0 && categoria.length > 0,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
  });
}

exports.PostAddBook = (req, res, next) => {

    const name = req.body.nombrebook;
    const foto = req.file;
    const description = req.body.descripcion;
    const categoria = req.body.categoria;
    const autore = req.body.autores;
    const editorial = req.body.editorial;
    const añoz = req.body.nigga;

    
    autor.findOne({where: { id: autore } }).then((result) => {
      const dat = result.dataValues;
      console.log ("Nigga es",dat)


    libro
      .create({
        name: name,
        imagen: "/" + foto.path,
        description: description,
        autorId: autore,
        editorialId: editorial,
        categoriumId: categoria,
        publicacion: añoz,
      })
      .then((result) => {
         res.redirect("/mantenimiento-books");
         return transporter.sendMail(
          {
            from: "Banco popular",
            to: dat.email,
            subject: `Buenas, ${dat.name}`,
            html: `Se le ha publicado el libro ${name}`,
          },
          (err) => {
            console.log(err);
          }
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .catch((err) => {
        console.log(err);
      })
    })
  };

  exports.GetEditBook = (req, res, next) => {
    const edit = req.query.edit;
    const idlibro = req.params.bookID;
    
    if (!edit) {
    return res.redirect("/mantenimiento-books");
    }

    libro.findOne({ where: { id: idlibro } }).then((result) => {

      const libro = result.dataValues;
      if (!libro) {
        return res.redirect("/");
      }

      editorial.findAll().then((result)  => {
        categoria
        .findAll()
        .then((result1) => {
          autor
            .findAll()
            .then((result2) => {
              const editorial = result.map((result) => result.dataValues);
              const categoria = result1.map((result1) => result1.dataValues);
              const autor = result2.map((result2) => result2.dataValues);
    
              res.render("LibrosViews/libros-agregar", {
                pagetitle: "Agregar libros",
                editmode: true,
                editorial: editorial,
                categoria: categoria,
                libro: libro,
                autor: autor,
                hasunodelotre: autor.length > 0 && editorial.length > 0 && categoria.length > 0,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
      });

     
    }).catch((err) => {
        console.log("error", err);
      }); 
}

exports.PostEditBook = (req, res, next) => {
  const name = req.body.nombrebook;
  const foto = req.file;
  const description = req.body.descripcion;
  const idbook = req.body.book;
  const categoria = req.body.categoria;
  const autor = req.body.autores;
  const editorial = req.body.editorial;
  const años = req.body.nigga;

  libro.findOne({ where: { id: idbook } })
    .then((result) => {
      const lib = result.dataValues;

      if (!lib) {
        return res.redirect("/");
      }
  const imagePath = foto ? "/" + foto.path : lib.imagen;

  libro
    .update(
      { name: name, description: description, imagen: imagePath, autorId: autor, editorialId: editorial, categoriumId: categoria, publicacion: años },
      { where: { id: idbook } }
    )

    .then((result) => {
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
   })
};


exports.PostDeleteBook = (req, res, next) => {
    const id = req.body.deleteBook;
  
    libro
      .destroy({ where: { id: id } })
      .then((result) => {
        return res.redirect("/mantenimiento-books");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  