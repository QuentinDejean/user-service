const { user: userDatasource } = require('./user')

describe('GIVEN the user datasource', () => {
  const dynamoDB = {
    put: jest.fn(),
  }

  const environment = {
    userTable: 'SOME_USER_TABLE',
  }

  const user = {
    id: 'user-id',
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
    username: 'username',
    credentials: 'hashed-credentials',
  }

  describe('WHEN the create method is executed', () => {
    it('SHOULD call dynamoDB with the right argument', async () => {
      const result = {
        TableName: environment.userTable,
        Item: user,
      }

      const datasource = userDatasource(environment, dynamoDB)
      await datasource.create(user)

      expect(dynamoDB.put).toHaveBeenCalledWith(result)
    })

    describe('AND the method unexpectedly fails', () => {
      it('SHOULD throw an error', async () => {
        dynamoDB.put = jest.fn().mockRejectedValue('An error occured')
        const datasource = userDatasource(environment, dynamoDB)

        try {
          await datasource.create(user)
        } catch (e) {
          expect(e.code).toEqual(500)
        }
      })
    })
  })
})
