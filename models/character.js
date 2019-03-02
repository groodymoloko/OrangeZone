module.exports = function(sequelize, DataTypes) {
    const character = sequelize.define('character', {
        character_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image_link: {
            type: DataTypes.STRING,
            allowNull: false
        },
        character_description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        speed: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 10
            }
        },
        intelligence: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 10
            }
        },
        luck: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 10
            }
        }
    });
    return character;
};