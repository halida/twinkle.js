export async function up (queryInterface, Sequelize) {
  await queryInterface.sequelize.transaction(async function (transaction) {
    await queryInterface.createTable('memberships', {
      id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
      user_id: { type: Sequelize.BIGINT, allowNull: false },
      account_id: { type: Sequelize.BIGINT, allowNull: false }
    }, { transaction })

    await queryInterface.addIndex('memberships', ['user_id', 'account_id'], { unique: true, transaction })
    await queryInterface.addIndex('memberships', ['account_id'], { transaction })

    await queryInterface.addConstraint('memberships', ['user_id'], {
      type: 'foreign key',
      references: { table: 'users', field: 'id' },
      onDelete: 'cascade',
      onUpdate: 'restrict',
      transaction
    })

    await queryInterface.addConstraint('memberships', ['account_id'], {
      type: 'foreign key',
      references: { table: 'accounts', field: 'id' },
      onDelete: 'cascade',
      onUpdate: 'restrict',
      transaction
    })
  })
}

export async function down (queryInterface) {
  await queryInterface.sequelize.transaction(async function (transaction) {
    await queryInterface.dropTable('memberships', { transaction })
  })
}
