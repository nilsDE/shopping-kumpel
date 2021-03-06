'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Items', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            description: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            completed: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            lastModified: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            listId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                allowNull: false,
                references: {
                    model: 'Lists',
                    key: 'id',
                    as: 'listId',
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Items');
    },
};
