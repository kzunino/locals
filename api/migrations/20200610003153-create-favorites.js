'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('favorites', {
      favorite_uid: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('favorites');
  },
};
