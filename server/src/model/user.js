const sequelize = require("../config/db").sequelize
const Sequelize = require("../config/db").Sequelize
const crypto  = require("crypto")

var user = sequelize.define('user',{
    id: {
        type: Sequelize.NUMBER,
        primaryKey: true
    },
    accountNumber: {
        type: Sequelize.STRING(11)
    },
    password: {
        type:Sequelize.STRING(32),
        allowNull: false,
        set(variables){
            let md5 = crypto.createHash("md5");
            const PSW = md5.update(variables).digest('hex');
            this.setDataValue('password', PSW);
        }
    },
  }, {
    timestamps: false,
    tableName: 'user'
});



module.exports.User = user;