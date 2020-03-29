const httpResponse = require('../../libs/httpResponse/mock')
const datasource = require('../../datasources/mock')
const { factory, id: userId } = require('../../handlers/create/factory/mock')
const user = require('./mock')
const createUser = require('./create')

describe('GIVEN the create handler', () => {
  const event = {
    body: JSON.stringify(user),
  }

  describe('WHEN the method is fired', () => {
    it('SHOULD run all expected methods and return a successful payload', async () => {
      const userDatasource = datasource()
      const create = createUser(userDatasource, factory, httpResponse)

      const createdUser = {
        ...user,
        id: userId,
      }

      await create(event)

      expect(factory).toHaveBeenCalledWith(user)
      expect(userDatasource.create).toHaveBeenCalledWith(createdUser)
      expect(httpResponse.success).toHaveBeenCalledWith({
        message: 'User created sucessfully',
        userId,
      })
    })
  })
})
