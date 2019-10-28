const sequelize = require("../config/db").sequelize

const Sequelize = require("../config/db").Sequelize

var location = sequelize.define('location',{
    id: {
        type: Sequelize.NUMBER,
        primaryKey: true
    },
    address: {
        type: Sequelize.STRING(30)
    },
    lnglat: {
        type:Sequelize.STRING(30)
    },
    desc: {
        type: Sequelize.STRING(200)
    },
    type: {
        type: Sequelize.STRING(18)
    },
    desc_img: {
        type: Sequelize.STRING(100)
    }
  }, {
    timestamps: false,
    tableName: 'location'
});



module.exports.Location = location;