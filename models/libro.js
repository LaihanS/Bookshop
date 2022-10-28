const Sequelize = require("sequelize");

const sequelize = require("./conexion");

const libros = sequelize.define("libro",{

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    publicacion: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    imagen: {
        type: Sequelize.STRING,
        allowNull: true,
    },

});

module.exports = libros;