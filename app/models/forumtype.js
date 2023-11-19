'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ForumType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ForumType.hasMany(models.Forum, {
        foreignKey: 'forum_type_id',
      })
    }
  }
  ForumType.init(
    {
      name: DataTypes.STRING,
      img_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ForumType',
      tableName: 'forum_types',
    }
  )
  return ForumType
}
