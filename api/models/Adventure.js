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
      languages: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      group_size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.BIGINT,
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
        defaultValue: null,
      },
      recommended: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      cover_photo: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      cover_photo_id: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
    },
    {tableName: 'adventure'}
  );
  Adventure.associate = function (models) {
    // associations can be defined here
    Adventure.belongsTo(models.users, {
      foreignKey: {
        fieldName: 'fk_user_uid',
        allowNull: false,
      },
      constraints: false,
    });

    Adventure.hasMany(models.review, {
      foreignKey: {
        fieldName: 'fk_adventure_uid',
        allowNull: false,
      },
      onDelete: 'CASCADE',
      hooks: true,
    });
    Adventure.hasMany(models.favorites, {
      foreignKey: {
        fieldName: 'fk_adventure_uid',
        allowNull: false,
      },
      onDelete: 'CASCADE',
      hooks: true,
    });
  };
  return Adventure;
};
