'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ForumStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ForumStatus.hasMany(models.Forum, {
        foreignKey: 'forum_status_id',
      })
    }
  }
  ForumStatus.init(
    {
      name: DataTypes.STRING,
      img_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ForumStatus',
      tableName: 'forum_statuses',
    }
  )
  return ForumStatus
}
