const sequelize = require("../config/db").sequelize
const Sequelize = require("../config/db").Sequelize
const crypto  = require("crypto")

var user = sequelize.define('user2',{
    id: {
        type: Sequelize.NUMBER,
        primaryKey: true
    },
    username: {
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
    tableName: 'user2'
});



module.exports.User2 = user;