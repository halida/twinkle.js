import { sequelize } from '../../config/sequelize'

beforeAll(function () {
  this.transactional = async function transactional (callback) {
    try {
      await sequelize.transaction(async (t) => {
        await callback()
        await t.rollback()
      })
    } catch (e) {
      if (!e.message.includes('rollback')) throw e
    }
  }
})
