const { user: userDatasource } = require('./user')
// eslint-disable-next-line
const AWSMock = require('aws-sdk-mock')

describe('GIVEN the user datasource', () => {
  const environment = {
    userTable: 'SOME_USER_TABLE',
  }

  const datasource = userDatasource(environment)

  describe('WHEN the create method is executed', () => {
    const user = {
      id: 'user-id',
      email: 'email',
      firstName: 'firstName',
      lastName: 'lastName',
      username: 'username',
      credentials: 'hashed-credentials',
    }

    afterEach(() => {
      AWSMock.restore('DynamoDB.DocumentClient', 'put')
    })

    it('SHOULD call dynamoDB with the right argument', async () => {
      const putItem = jest.fn().mockResolvedValue()
      AWSMock.mock('DynamoDB.DocumentClient', 'put', putItem)

      await datasource.create(user)

      expect(putItem).toHaveBeenCalled()
    })

    describe('AND the method unexpectedly fails', () => {
      it('SHOULD throw an error', async () => {
        const putItem = jest.fn().mockRejectedValue()
        AWSMock.mock('DynamoDB.DocumentClient', 'put', putItem)

        const datasource = userDatasource(environment)

        try {
          await datasource.create(user)
        } catch (e) {
          expect(e.code).toEqual(500)
        }
      })
    })
  })

  describe('WHEN the list method is executed', () => {
    afterEach(() => {
      AWSMock.restore('DynamoDB.DocumentClient', 'scan')
    })

    it('SHOULD call dynamoDB with the right argument', async () => {
      const scanItems = jest.fn().mockResolvedValue({ Items: [] })
      AWSMock.mock('DynamoDB.DocumentClient', 'scan', scanItems)
      await datasource.list()

      expect(scanItems).toHaveBeenCalled()
    })

    describe('AND the method unexpectedly fails', () => {
      it('SHOULD throw an error', async () => {
        const scanItems = jest.fn().mockRejectedValue({ code: 500 })
        AWSMock.mock('DynamoDB.DocumentClient', 'scan', scanItems)

        try {
          await datasource.list()
        } catch (e) {
          expect(e.code).toEqual(500)
        }
      })
    })
  })
})
