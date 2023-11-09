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
    }
  }
  Forum.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.STRING,
      description: DataTypes.STRING,
      img_url: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Forum',
      tableName: 'forums',
    }
  )
  return Forum
}
