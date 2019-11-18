import { pg } from '../../config/pg'

beforeAll(function () {
  this.transactional = async function transactional (callback) {
    try {
      await pg.transaction(async (t) => {
        await callback()
        await t.rollback()
      })
    } catch (e) {
      if (!e.message.includes('rollback')) throw e
    }
  }
})
