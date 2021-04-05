'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Restaurants', 'CategoryId', {
      type: Sequelize.INTEGER,
      allowNull: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Restaurants', 'CategoryId', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
  }
}
