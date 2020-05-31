'use strict';
module.exports = (sequelize, DataTypes) => {
  const Traveler = sequelize.define(
    'traveler',
    {
      traveler_uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please provide a value for "first name"',
          },
        },
        notNull: {
          msg: 'Please provide a value for "first name"',
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please provide a value for "last name"',
          },
        },
        notNull: {
          msg: 'Please provide a value for "last name"',
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please provide a value for "email"',
          },
        },
        notNull: {
          msg: 'Please provide a value for "email"',
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Please provide a value for "password"',
          },
        },
        notNull: {
          msg: 'Please provide a value for "password"',
        },
      },
    },
    {tableName: 'traveler'}
  );
  Traveler.associate = function (models) {
    // associations can be defined here
  };
  return Traveler;
};
