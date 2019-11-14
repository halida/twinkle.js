export class UpdateUser {
  constructor (user, params) {
    this.user = user
    this.params = params
  }

  async call () {
    await this.user.update(this.params)
  }
}
