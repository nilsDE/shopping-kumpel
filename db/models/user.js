'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define(
        'User',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: {
                        msg: 'Must be a valid email!'
                    }
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {}
    );
    User.associate = function(models) {
        User.hasMany(models.List, {
            foreignKey: 'userId',
            as: 'users'
        });
        User.hasMany(models.Collab, {
            foreignKey: 'userId',
            as: 'collabs'
        });
    };
    return User;
};
