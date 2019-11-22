export class DeleteAccount {
  constructor (account) {
    this.account = account
  }

  call () {
    return this.account.destroy()
  }
}
