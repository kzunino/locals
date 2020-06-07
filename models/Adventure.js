'use strict';
module.exports = (sequelize, DataTypes) => {
  const Adventure = sequelize.define(
    'adventure',
    {
      adventure_uid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zip_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      included: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      recommended: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {tableName: 'adventure'}
  );
  Adventure.associate = function (models) {
    // associations can be defined here
  };
  return Adventure;
};
