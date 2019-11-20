import { Sequelize, Model } from 'sequelize'
import { sequelize } from '../config/sequelize'
import { User } from './user'
import { Membership } from './membership'

export class Account extends Model {}

Account.init({
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 64]
    }
  }
}, { sequelize, underscored: true })

Membership.belongsTo(Account)
Account.hasMany(Membership)
Account.belongsToMany(User, { through: Membership })
User.belongsToMany(Account, { through: Membership })
