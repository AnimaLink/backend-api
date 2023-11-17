'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Forum, {
        foreignKey: 'forum_id',
        targetKey: 'id',
      })
      Comment.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id',
      })
    }
  }
  Comment.init(
    {
      comment: DataTypes.STRING,
      forum_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Comment',
      tableName: 'comments',
    }
  )
  return Comment
}
