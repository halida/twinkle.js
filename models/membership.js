import { Sequelize, Model } from 'sequelize'
import { sequelize } from '../lib/sequelize'
import { User } from './user'
import { Account } from './account'

export class Membership extends Model {}

Membership.init({
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },

  // owner - can manage an account
  // admin - can invite a user, add/delete apps
  // user - can edit apps
  // viewer - can view apps
  role: {
    type: Sequelize.ENUM('owner', 'admin', 'user', 'viewer'),
    allowNull: true,
    validate: {
      isIn: [['owner', 'admin', 'user', 'viewer']]
    }
  },

  userId: {
    type: Sequelize.BIGINT
  },

  accountId: {
    type: Sequelize.BIGINT
  }
}, { sequelize, underscored: true })

Membership.belongsTo(User)
Membership.belongsTo(Account)
Account.hasMany(Membership)
Account.belongsToMany(User, { through: Membership })
User.hasMany(Membership)
User.belongsToMany(Account, { through: Membership })
