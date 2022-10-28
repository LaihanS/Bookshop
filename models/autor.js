const Sequelize = require("sequelize");

const sequelize = require("./conexion");

const autores = sequelize.define("autor",{

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
    
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },


});

module.exports = autores;