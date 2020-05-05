'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Vocabularies', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            lang1: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            lang2: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            listId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                allowNull: false,
                reference: {
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
        return queryInterface.dropTable('Vocabularies');
    },
};
