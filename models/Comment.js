'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'comment',
    {
      comment_uid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      text: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      first_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      last_name: {
        allowNull: false,
        type: DataTypes.STRING,
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
    {tableName: 'comment'}
  );
  Comment.associate = function (models) {
    // associations can be defined here
    Comment.belongsTo(models.users, {
      foreignKey: {
        fieldName: 'fk_user_uid',
        allowNull: false,
        constraints: false,
      },
    });
    Comment.belongsTo(models.post, {
      foreignKey: {
        fieldName: 'fk_post_uid',
        allowNull: false,
        constraints: false,
      },
    });
    // Post.hasMany(models.likes, {
    //   foreignKey: 'fk_post_uid',
    //   allowNull: false,
    //   onDelete: 'CASCADE',
    //   hooks: true,
    // });
  };
  return Comment;
};
