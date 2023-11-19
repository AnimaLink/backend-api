'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Forum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Forum.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id',
      })
      Forum.belongsTo(models.ForumType, {
        foreignKey: 'forum_type_id',
        targetKey: 'id',
      })
      Forum.belongsTo(models.ForumStatus, {
        foreignKey: 'forum_status_id',
        targetKey: 'id',
      })
      Forum.belongsTo(models.ForumCategory, {
        foreignKey: 'forum_category_id',
        targetKey: 'id',
      })
      Forum.hasMany(models.Comment, {
        foreignKey: 'forum_id',
      })
    }
  }
  Forum.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      description: DataTypes.STRING,
      img_url: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      forum_type_id: DataTypes.INTEGER,
      forum_status_id: DataTypes.INTEGER,
      forum_category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Forum',
      tableName: 'forums',
    }
  )
  return Forum
}
