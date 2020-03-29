const { user: userDatasource } = require('./user')
// eslint-disable-next-line
const AWSMock = require('aws-sdk-mock')

describe('GIVEN the user datasource', () => {
  const putItem = jest.fn().mockResolvedValue()

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

  const datasource = userDatasource(environment)

  describe('WHEN the create method is executed', () => {
    beforeAll(() => {
      AWSMock.mock('DynamoDB.DocumentClient', 'put', putItem)
    })

    afterAll(() => {
      AWSMock.restore('DynamoDB', 'put')
    })

    it('SHOULD call dynamoDB with the right argument', async () => {
      await datasource.create(user)

      expect(putItem).toHaveBeenCalled()
    })

    describe('AND the method unexpectedly fails', () => {
      it('SHOULD throw an error', async () => {
        const datasource = userDatasource(environment)

        try {
          await datasource.create(user)
        } catch (e) {
          expect(e.code).toEqual(500)
        }
      })
    })
  })
})
