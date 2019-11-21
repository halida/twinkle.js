import { User } from '../models/user'
import { BaseLoader } from './base_loader'

export class UsersLoader extends BaseLoader {
  constructor () {
    const batchLoader = async ids => {
      const users = await User.findAll({ where: { id: ids } })

      return ids.flatMap(id => users.filter(user => user.id === id))
    }

    super(batchLoader)
  }
}
