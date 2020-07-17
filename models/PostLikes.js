'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostLikes = sequelize.define(
    'post_likes',
    {
      post_like_uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_uid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {tableName: 'post_likes'}
  );
  PostLikes.associate = function (models) {
    // associations can be defined here
    PostLikes.belongsTo(models.post, {
      foreignKey: {
        fieldName: 'fk_post_uid',
        allowNull: false,
      },
      constraints: false, //disables constraint for cascade deletes
    });
  };
  return PostLikes;
};
