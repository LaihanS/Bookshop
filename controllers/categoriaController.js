const categoria = require("../models/categorias");
const libro = require("../models/libro");

exports.GetCategList = (req, res, next) => {
    categoria.findAll({include: [{ model: libro}]}).then((result) => {

      const category = result.map((result) => result.dataValues);

      console.log("nombre",category);

      res.render("CategoryView/MantenimientoCategoria", {
        pagetitle: "Mantenimiento Categorias",
        cateactive: true,
        categoria: category,
        hascategoria: category.length > 0,
      });
   
    });

};

exports.GetAddCategory = (req, res, next) => {
    res.render("CategoryView/categoria-agregar", {
        pagetitle: "Agregar categoria",
        editmode: false,
      });
}


exports.PostAddCategory = (req, res, next) => {
    const name = req.body.nombrecategory;
    const description = req.body.descripcion;
  
    categoria
      .create({
        name: name,
        description: description,
      })
      .then((result) => {
        return res.redirect("/mantenimiento-categoria");
      })
      .catch((err) => {
        console.log("problema", err);
      });
  };



exports.GeteditCategory = (req, res, next) => {
    const idDato = req.params.cateId;
    categoria.findOne({where: {id: idDato}}).then((result) => {

      const autor = result.dataValues;

    res.render("CategoryView/categoria-agregar", {
        pagetitle: "Agregar categoria",
        editmode: true,
        categoria: autor,
      });
      })
      .catch((err) => {
        console.log("problema", err);
      });

}

exports.PosteditCategory = (req, res, next) => {
    const idcompare = req.body.categoryID;
    const name = req.body.nombrecategory;
    const description = req.body.descripcion;

    console.log("Datocoñaso",idcompare)
    categoria.update(
        {name: name, description: description},
        {where: {id: idcompare}}
        ).then((result) => {

      return res.redirect("/mantenimiento-categoria");
    
      })
      .catch((err) => {
        console.log("problema", err);
      });

}


exports.PostDeleteCategory= (req, res, next) => {
    const deteteid = req.body.deleteCategoria;

    categoria.destroy({where: {id: deteteid}}).
    then((result) => {
        return res.redirect("/mantenimiento-categoria");
      })
      .catch((err) => {
        console.log("problema", err);
      });

}