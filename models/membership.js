import { Sequelize, Model } from 'sequelize'
import { sequelize } from '../config/sequelize'
import { User } from './user'
import { Account } from './account'

export class Membership extends Model {}

Membership.init({
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },

  userId: {
    type: Sequelize.BIGINT,
    allowNull: false
  },

  accountId: {
    type: Sequelize.BIGINT,
    allowNull: false
  }
}, { sequelize, underscored: true })

Membership.belongsTo(User)
Membership.belongsTo(Account)
Account.hasMany(Membership)
Account.belongsToMany(User, { through: Membership })
User.belongsToMany(Account, { through: Membership })
