const e = require("express");
const editoriales = require("../models/editorial");
const libros = require("../models/libro");

exports.GetEditorialList = (req, res, next) => {
  editoriales.findAll({include: [{ model: libros}]}).then((result) => {

    const editorial = result.map((result) => result.dataValues);
    const lib =  result.map((result) => result.dataValues);

    res.render("EditorialView/MantenimientoEditorial", {
      pagetitle: "Mantenimiento Editoriales",
      editorialactive: true,
      editorial: editorial,
      haseditorial: editorial.length > 0,
      libros: lib,
    });
  });
};

exports.GetAddEditorial = (req, res, next) => {
    res.render("EditorialView/editorial-agregar", {
        pagetitle: "Agregar editorial",
        editmode: false,
      });
}


exports.PostAddEditorial = (req, res, next) => {
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const pais = req.body.pais;
  
    editoriales
      .create({
        name: nombre,
        telefono: telefono,
        pais: pais,
      })
      .then((result) => {
        return res.redirect("/mantenimiento-editorial");
      })
      .catch((err) => {
        console.log("problema", err);
      });
  };



exports.GeteditEditorial = (req, res, next) => {
    const idDato = req.params.editorialID;
    editoriales.findOne({where: {id: idDato}}).then((result) => {

      const edit = result.dataValues;

    res.render("EditorialView/editorial-agregar", {
        pagetitle: "Editar editorial",
        editmode: true,
        editorial: edit,
      });
      })
      .catch((err) => {
        console.log("problema", err);
      });

}

exports.PostEditEditorial = (req, res, next) => {
    const idcompare = req.body.editorialid;
    const name = req.body.nombre;
    const numero = req.body.telefono;
    const pais = req.body.pais;

    console.log("Datocoñaso",idcompare)
    editoriales.update(
        {name: name, pais: pais, telefono: numero, pais: pais},
        {where: {id: idcompare}}
        ).then((result) => {

      return res.redirect("/mantenimiento-editorial");
    
      })
      .catch((err) => {
        console.log("problema", err);
      });

}


exports.PostDeleteEditorial= (req, res, next) => {
    const deteteid = req.body.deleteEditorial;

    editoriales.destroy({where: {id: deteteid}}).
    then((result) => {
        return res.redirect("/mantenimiento-editorial");
      })
      .catch((err) => {
        console.log("problema", err);
      });

}