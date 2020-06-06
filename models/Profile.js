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
      date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      languages: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {tableName: 'profile'}
  );
  Profile.associate = function (models) {
    // associations can be defined here
    // Profile.belongsTo(models.users, {
    //   foreignKey: {
    //     fieldName: 'fk_user_uid',
    //     allowNull: false,
    //     constraints: false,
    //   },
    // });
  };
  return Profile;
};
