describe('Account', () => {
  transactional()

  let user,
    account

  beforeEach(async function () {
    user = await Factory.build('member').save({ transaction: this.transaction })
    account = Factory.build('account', {}, { owner: user })
  })

  it('does not fail when all attributes are valid', async function () {
    await expect(account.save({ transaction: this.transaction }))
      .to.eventually
      .to.include({ isNewRecord: false })
  })

  it('has owner', async function () {
    await account.save({ transaction: this.transaction })
    const users = await account.getUsers({ transaction: this.transaction })
    expect(users[0].id).to.equal(user.id)
  })
})
