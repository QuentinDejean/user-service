const httpResponse = require('../../libs/httpResponse/mock')
const datasource = require('../../datasources/mock')
const userList = require('./mock')
const getUserList = require('./list')

describe('GIVEN the list handler', () => {
  describe('WHEN the method is fired', () => {
    it('SHOULD run all expected methods and return a successful payload', async () => {
      const userDatasource = datasource(jest.fn().mockResolvedValue(userList))
      const list = getUserList(userDatasource, httpResponse)

      await list()

      expect(userDatasource.list).toHaveBeenCalled()
      expect(httpResponse.success).toHaveBeenCalledWith({ data: userList })
    })
  })
})
