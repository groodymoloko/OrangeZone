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
        }
    });
    return character;
};