import { sequelize } from '../../lib/sequelize'

global.transactional = function transactional () {
  beforeEach(async function () {
    this.transaction = await sequelize.transaction()
  })

  afterEach(async function () {
    await this.transaction.rollback()
  })
}
