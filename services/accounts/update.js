export class UpdateAccount {
  constructor (account, params) {
    this.account = account
    this.params = params
  }

  call () {
    return this.account.update(this.params)
  }
}
