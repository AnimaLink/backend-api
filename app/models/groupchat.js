'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class GroupChat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      GroupChat.belongsTo(models.User, {
        foreignKey: 'creator_id',
        targetKey: 'id',
      })
      GroupChat.belongsTo(models.Forum, {
        foreignKey: 'forum_id',
        targetKey: 'id',
      })
      GroupChat.hasMany(models.Chat, {
        foreignKey: 'group_chat_id',
      })
    }
  }
  GroupChat.init(
    {
      name: DataTypes.STRING,
      forum_id: DataTypes.INTEGER,
      creator_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'GroupChat',
      tableName: 'group_chats',
    }
  )
  return GroupChat
}
