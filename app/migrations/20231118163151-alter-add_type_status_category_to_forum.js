'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('forums', 'forum_category_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'forum_categories',
        key: 'id',
      },
      onDelete: 'CASCADE',
    })
    await queryInterface.addColumn('forums', 'forum_type_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'forum_types',
        key: 'id',
      },
      onDelete: 'CASCADE',
    })
    await queryInterface.addColumn('forums', 'forum_status_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'forum_statuses',
        key: 'id',
      },
      onDelete: 'CASCADE',
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('forums', 'forum_category_id')
    await queryInterface.removeColumn('forums', 'forum_type_id')
    await queryInterface.removeColumn('forums', 'forum_status_id')
  },
}
