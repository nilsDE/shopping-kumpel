'use strict';
module.exports = (sequelize, DataTypes) => {
    var Collab = sequelize.define(
        'Collab',
        {
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            listId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {}
    );
    Collab.associate = function (models) {
        Collab.belongsTo(models.List, {
            foreignKey: 'listId',
            onDelete: 'CASCADE',
        });
        Collab.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });
    };
    return Collab;
};
