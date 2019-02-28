module.exports = function(sequelize, DataTypes) {
    let Account = sequelize.define("Post", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 10]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len: [5, 20]
        }
      }
    });
  
    return Account;
  };
  