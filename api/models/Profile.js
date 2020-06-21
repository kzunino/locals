'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    'profile',
    {
      profile_uid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      cover_photo: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        defaultValue: null,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      languages: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      phone_number: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: null,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
    },
    {tableName: 'profile'}
  );
  Profile.associate = function (models) {
    // associations can be defined here
    Profile.belongsTo(models.users, {
      foreignKey: {
        fieldName: 'fk_user_uid',
        allowNull: false,
      },
      constraints: false,
    });
  };
  return Profile;
};
