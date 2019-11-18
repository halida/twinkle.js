export async function up (queryInterface, Sequelize) {
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

    await queryInterface.addIndex('users', { name: 'users_email', unique: true, fields: [Sequelize.fn('lower', Sequelize.col('email'))], transaction })
    await queryInterface.addIndex('users', { name: 'users_login', unique: true, fields: [Sequelize.fn('lower', Sequelize.col('login'))], transaction })
    await queryInterface.addIndex('users', ['githubToken'], { unique: true, transaction })

    await transaction.commit()
  } catch (e) {
    await transaction.rollback()
    throw e
  }
}

export async function down (queryInterface) {
  const transaction = await queryInterface.sequelize.transaction()

  try {
    await queryInterface.dropTable('users', { transaction })
    await transaction.commit()
  } catch (e) {
    await transaction.rollback()
    throw e
  }
}
