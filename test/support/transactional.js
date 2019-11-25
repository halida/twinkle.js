import { sequelize } from '../../lib/sequelize'

export function transactional () {
  beforeEach(async function () {
    this.transaction = await sequelize.transaction()
  })

  afterEach(async function () {
    await this.transaction.rollback()
  })
}
