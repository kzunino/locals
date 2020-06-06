'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'post',
    {
      post_uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      text: {
        type: DataTypes.STRING,
        notNull: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      likeCounts: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
    },
    {tableName: 'post'}
  );
  Post.associate = function (models) {
    // associations can be defined here
    Post.belongsTo(models.users, {
      foreignKey: {
        fieldName: 'fk_user_uid',
        allowNull: false,
        constraints: false, //disables constraint for cascade deletes
      },
    });
    Post.hasMany(models.post_likes, {
      foreignKey: 'fk_post_uid',
      allowNull: false,
      onDelete: 'CASCADE',
      hooks: true,
    });
    Post.hasMany(models.comment, {
      foreignKey: 'fk_post_uid',
      allowNull: false,
      onDelete: 'CASCADE',
      hooks: true,
    });
  };
  return Post;
};
