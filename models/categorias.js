const Sequelize = require("sequelize");

const sequelize = require("./conexion");

const categorias = sequelize.define("categoria",{

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


});

module.exports = categorias;