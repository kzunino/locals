'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorites = sequelize.define(
    'favorites',
    {
      favorite_uid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {tableName: 'favorites'}
  );
  Favorites.associate = function (models) {
    // associations can be defined here
    Favorites.belongsTo(models.users, {
      foreignKey: {
        fieldName: 'fk_user_uid',
        allowNull: false,
      },
      constraints: false,
    });
    Favorites.belongsTo(models.adventure, {
      foreignKey: {
        fieldName: 'fk_adventure_uid',
        allowNull: false,
      },
      constraints: false, //disables constraint for cascade deletes
    });
  };
  return Favorites;
};
