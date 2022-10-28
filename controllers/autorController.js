const autor = require("../models/autor");
const libro = require("../models/libro");

exports.GetAutorList = (req, res, next) => {
    autor.findAll({include: [{ model: libro}]}).then((result) => {

      const autores = result.map((result) => result.dataValues);

      //console.log("nombre",autores);

      res.render("AutorView/MantenimientoAutor", {
        pagetitle: "Mantenimiento Autores",
        autoractive: true,
        autores: autores,
        hasautores: autores.length > 0,
      });
   
    });

};

exports.GetAddAutor = (req, res, next) => {
    res.render("AutorView/autor-agregar", {
        pagetitle: "Agregar autor",
        editmode: false,
      });
}


exports.PostAddAutor = (req, res, next) => {
    const name = req.body.NombreAutor;
    const email = req.body.mail;
  
    autor
      .create({
        name: name,
        email: email,
      })
      .then((result) => {
         res.redirect("/mantenimiento-autor");
      })
      .catch((err) => {
        console.log("problema", err);
      });
  };



exports.GeteditAutor = (req, res, next) => {
    const idDato = req.params.autorID;
    autor.findOne({where: {id: idDato}}).then((result) => {

      const autorr = result.dataValues;

    res.render("AutorView/autor-agregar", {
        pagetitle: "Editar autor",
        editmode: true,
        autor: autorr,
      });
      })
      .catch((err) => {
        console.log("problema", err);
      });

}

exports.PostEditAutor = (req, res, next) => {
    const idcompare = req.body.autorID;
    const name = req.body.NombreAutor;
    const email = req.body.mail;

    console.log("Datocoñaso",idcompare)
    autor.update(
        {name: name, email: email},
        {where: {id: idcompare}}
        ).then((result) => {

      return res.redirect("/mantenimiento-autor");
    
      })
      .catch((err) => {
        console.log("problema", err);
      });

}


exports.PostDeleteAutor= (req, res, next) => {
    const deteteid = req.body.deleteAutor;

    autor.destroy({where: {id: deteteid}}).
    then((result) => {
        return res.redirect("/mantenimiento-autor");
      })
      .catch((err) => {
        console.log("problema", err);
      });

}