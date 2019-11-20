import { Sequelize, Model } from 'sequelize'
import { sequelize } from '../config/sequelize'
import { User } from './user'

export class Membership extends Model {}

Membership.init({
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
