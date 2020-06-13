'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('adventures', {
      adventure_uid: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      languages: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      group_size: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      cost: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      phone_number: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      zip_code: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      start: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      included: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      recommended: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      picture: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
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
    return queryInterface.dropTable('adventures');
  },
};
