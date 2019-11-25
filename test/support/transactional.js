import { sequelize } from '../../lib/sequelize'

global.transactional = async function (callback) {
  try {
    await sequelize.transaction(async (t) => {
      await callback()
      await t.rollback()
    })
  } catch (e) {
    if (!e.message.includes('rollback')) throw e
  }
}
