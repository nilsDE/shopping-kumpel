'use strict';
module.exports = (sequelize, DataTypes) => {
    var Vocabulary = sequelize.define(
        'Vocabulary',
        {
            lang1: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lang2: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            listId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {}
    );
    Vocabulary.associate = function (models) {
        Vocabulary.belongsTo(models.List, {
            foreignKey: 'listId',
            onDelete: 'CASCADE',
        });
    };
    return Vocabulary;
};
