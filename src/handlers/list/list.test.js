const httpResponse = require('../../libs/httpResponse/mock')
const datasource = require('../../datasources/mock')
const userList = require('./mock')
const getUserList = require('./list')
const logger = require('../../libs/logger/mock')

describe('GIVEN the list handler', () => {
  describe('WHEN the method is fired', () => {
    it('SHOULD run all expected methods and return a successful payload', async () => {
      const userDatasource = datasource(jest.fn().mockResolvedValue(userList))
      const list = getUserList(userDatasource, httpResponse, logger)

      await list()

      expect(userDatasource.list).toHaveBeenCalled()
      expect(httpResponse.success).toHaveBeenCalledWith({ data: userList })
    })

    describe('AND an unexpected error occurs', () => {
      it('SHOULD return an error', async () => {
        const userDatasource = datasource(
          jest.fn().mockRejectedValue('An error occured')
        )
        const list = getUserList(userDatasource, httpResponse, logger)

        await list()

        expect(userDatasource.list).toHaveBeenCalled()
        expect(httpResponse.error).toHaveBeenCalled()
      })
    })
  })
})
