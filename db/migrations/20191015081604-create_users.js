module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.createTable('users', {
        id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
        createdAt: { type: Sequelize.DATE, allowNull: false },
        updatedAt: { type: Sequelize.DATE, allowNull: false },
        email: { type: Sequelize.STRING, allowNull: false },
        login: { type: Sequelize.STRING, allowNull: false },
        githubToken: { type: Sequelize.STRING, allowNull: true }
      }, { transaction })

      await queryInterface.addIndex('users', ['email'], { type: 'UNIQUE', transaction })
      await queryInterface.addIndex('users', ['login'], { type: 'UNIQUE', transaction })
      await queryInterface.addIndex('users', ['githubToken'], { type: 'UNIQUE', transaction })

      await transaction.commit()
    } catch (e) {
      transaction.rollback()
      throw e
    }
  },

  async down (queryInterface) {
    const transaction = await queryInterface.sequelize.transaction()

    try {
      await queryInterface.dropTable('users', { transaction })
      await transaction.commit()
    } catch (e) {
      transaction.rollback()
      throw e
    }
  }
}
