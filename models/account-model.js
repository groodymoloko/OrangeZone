module.exports = function(sequelize, DataTypes) {
    let Account = sequelize.define("Account", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 20]
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            len: [5, 150]
        }
      },
      profilepic: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lifetimescore: {
        type: DataTypes.INTEGER,
      }
    });
  
    return Account;
  };
  