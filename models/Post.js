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
    },
    {tableName: 'post'}
  );
  Post.associate = function (models) {
    // associations can be defined here
    Post.belongsTo(models.users, {
      foreignKey: {
        fieldName: 'fk_user_uid',
        allowNull: false,
      },
    });
  };
  return Post;
};
