const httpResponse = require('../../libs/httpResponse/mock')
const datasource = require('../../datasources/mock')
const { factory, id: userId } = require('../../handlers/create/factory/mock')
const user = require('./mock')
const createUser = require('./create')
const logger = require('../../libs/logger/mock')

describe('GIVEN the create handler', () => {
  const event = {
    body: JSON.stringify(user),
  }

  describe('WHEN the method is fired', () => {
    it('SHOULD run all expected methods and return a successful payload', async () => {
      const userDatasource = datasource(jest.fn().mockResolvedValue())
      const create = createUser(userDatasource, factory, httpResponse, logger)

      const createdUser = {
        ...user,
        id: userId,
      }

      await create(event)

      expect(factory).toHaveBeenCalledWith(user)
      expect(userDatasource.create).toHaveBeenCalledWith(createdUser)
      expect(httpResponse.success).toHaveBeenCalledWith({
        data: {
          message: 'User created sucessfully',
          userId,
        },
      })
    })

    describe('AND an unexpected error happens', () => {
      it('SHOULD return an error payload', async () => {
        const userDatasource = datasource(
          jest
            .fn()
            .mockRejectedValue({ code: 500, message: 'An error occured' })
        )
        const create = createUser(userDatasource, factory, httpResponse, logger)

        await create(event)
        expect(httpResponse.error).toHaveBeenCalled()
      })
    })
  })
})
