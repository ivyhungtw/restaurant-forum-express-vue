'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'Restaurants',
      'Restaurants_CategoryId_foreign_idx'
    )
  },

  down: async (queryInterface, Sequelize) => {
    const options = {
      type: 'foreign key',
      name: 'Restaurants_CategoryId_foreign_idx',
      fields: ['CategoryId'],
      references: {
        table: 'Categories',
        field: 'id'
      }
    }
    await queryInterface.addConstraint('Restaurants', options)
  }
}
