'use strict';
module.exports = (sequelize, DataTypes) => {
    var List = sequelize.define(
        'List',
        {
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            listType: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {}
    );
    List.associate = function (models) {
        List.hasMany(models.Item, {
            foreignKey: 'listId',
            as: 'items',
        });
        List.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });
        List.hasMany(models.Collab, {
            foreignKey: 'listId',
            as: 'collabs',
        });
    };
    return List;
};
