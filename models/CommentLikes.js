'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommentLikes = sequelize.define(
    'comment_likes',
    {
      comment_like_uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_uid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {tableName: 'comment_likes'}
  );
  CommentLikes.associate = function (models) {
    // associations can be defined here
    CommentLikes.belongsTo(models.comment, {
      foreignKey: {
        fieldName: 'fk_comment_uid',
        allowNull: false,
      },
      constraints: false,
    });
  };
  return CommentLikes;
};
