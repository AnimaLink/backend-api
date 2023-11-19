'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Chat.belongsTo(models.GroupChat, {
        foreignKey: 'group_chat_id',
        targetKey: 'id',
      })
      Chat.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id',
      })
    }
  }
  Chat.init(
    {
      message: DataTypes.TEXT,
      group_chat_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Chat',
      tableName: 'chats',
    }
  )
  return Chat
}
