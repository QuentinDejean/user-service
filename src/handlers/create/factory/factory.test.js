const { createUser } = require('./factory')

describe('GIVEN the user factory', () => {
  const userid = 'user-id'
  const uuid = {
    v1: jest.fn().mockReturnValue(userid),
  }

  const hash = 'hash'
  const passwordHash = {
    generate: jest.fn().mockReturnValue(hash),
  }
  const factory = createUser(uuid, passwordHash)

  const user = {
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
    username: 'username',
    credentials: 'credentials',
  }

  describe('WHEN the method is executed', () => {
    let createdUser

    beforeEach(async () => {
      createdUser = await factory(user)
    })

    it('SHOULD call uuid', () => {
      expect(uuid.v1).toHaveBeenCalled()
    })

    it('SHOULD call passwordHash with the right argument', () => {
      expect(passwordHash.generate).toHaveBeenCalledWith(user.credentials)
    })

    it('SHOULD return the right payload', () => {
      const { email, firstName, lastName, username } = user
      expect(createdUser).toEqual({
        id: userid,
        email,
        firstName,
        lastName,
        username,
        credentials: hash,
      })
    })
  })
})
