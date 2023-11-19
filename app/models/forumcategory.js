'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ForumCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ForumCategory.hasMany(models.Forum, {
        foreignKey: 'forum_category_id',
      })
    }
  }
  ForumCategory.init(
    {
      name: DataTypes.STRING,
      img_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ForumCategory',
      tableName: 'forum_categories',
    }
  )
  return ForumCategory
}
