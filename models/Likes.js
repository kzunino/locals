'use strict';
module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define(
    'likes',
    {
      like_uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_uid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {tableName: 'likes'}
  );
  Likes.associate = function (models) {
    // associations can be defined here
    Likes.belongsTo(models.post, {
      foreignKey: {
        fieldName: 'fk_post_uid',
        allowNull: false,
        constraints: false,
      },
    });
  };
  return Likes;
};
