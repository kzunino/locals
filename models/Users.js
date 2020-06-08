'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'users',
    {
      user_uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
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
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {tableName: 'users'}
  );
  Users.associate = (models) => {
    // associations can be defined here
    Users.hasMany(models.post, {
      foreignKey: {
        fieldName: 'fk_user_uid',
        allowNull: false,
      },
      onDelete: 'CASCADE',
      hooks: true,
    });

    Users.hasMany(models.comment, {
      foreignKey: {
        fieldName: 'fk_user_uid',
        allowNull: false,
      },
      onDelete: 'CASCADE',
      hooks: true,
    });
    Users.hasOne(models.profile, {
      foreignKey: {
        fieldName: 'fk_user_uid',
        allowNull: false,
      },
      onDelete: 'CASCADE',
      hooks: true,
    });
    Users.hasMany(models.adventure, {
      foreignKey: {
        fieldName: 'fk_user_uid',
        allowNull: false,
      },
      onDelete: 'CASCADE',
      hooks: true,
    });
  };
  return Users;
};
