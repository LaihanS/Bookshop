const path = require("path");
const express = require("express");
const expressHbs = require("express-handlebars");

const sequelize = require("./models/conexion");
const libroute = require("./routes/librosRoute")
const catroute = require("./routes/categorias")
const autoroute = require("./routes/autor")
const editorialr = require("./routes/editorial")
const multer = require("multer")

const libro = require("./models/libro");

const autor = require("./models/autor");
const categoria = require("./models/categorias");
const editorial = require("./models/editorial");

const helper = require("./helper/comparation")
const compare2 = require("./helper/compareid")
const compare3 = require("./helper/compareid2")
const compare4 = require("./helper/compareid3")
const { v4: uuidv4 } = require("uuid");

const app = express();

app.engine("hbs", expressHbs ({
    layoutsDir: "views/layouts", 
    defaultLayout: "index",
    extname: "hbs",
     helpers: {
        comparation: helper.compare,
        comparation2: compare2.compare2,
        comparation3: compare3.compare3,
        comparation4: compare4.compare4,
    },
})
);

app.set("view engine", "hbs");
app.set("views", "views");


app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/images",express.static(path.join(__dirname, "images")));

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, `${uuidv4()}-${file.originalname}`);
    },
  });
  
  app.use(multer({ storage: imageStorage }).single("fotobook"));

app.use(libroute);
app.use(catroute);
app.use(autoroute);
app.use(editorialr);

libro.belongsTo(autor,{constraint: true, onDelete: "CASCADE"});
autor.hasMany(libro);

libro.belongsTo(editorial,{constraint: true, onDelete: "CASCADE"});
editorial.hasMany(libro);


libro.belongsTo(categoria,{constraint: true, onDelete: "CASCADE"});
categoria.hasMany(libro);

//sequelize.sync({force: true}).then(function (result)
sequelize.sync().then(function (result) {

}).catch(error => {
    console.log(error);
})

app.listen(5000);