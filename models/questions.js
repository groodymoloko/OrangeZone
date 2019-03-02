module.exports = function (sequelize, DataTypes) {
    const questions = sequelize.define("questions", {
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        question: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false
        },
        wrongOne: {
            type: DataTypes.STRING,
            allowNull: false
        },
        wrongTwo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        wrongThree: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return questions;
};