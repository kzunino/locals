'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'review',
    {
      review_uid: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      review: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      host_adventure_uid: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {tableName: 'review'}
  );
  Review.associate = function (models) {
    // associations can be defined here
    Review.belongsTo(models.users, {
      foreignKey: {
        fieldName: 'fk_user_uid',
        allowNull: false,
      },
      constraints: false,
    });

    Review.belongsTo(models.adventure, {
      foreignKey: {
        fieldName: 'fk_adventure_uid',
        allowNull: false,
      },
      constraints: false,
    });
  };
  return Review;
};
