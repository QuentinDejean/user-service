const { default: datasource } = require('../../datasources/user')
const httpResponse = require('../../libs/httpResponse/httpResponse')

const list = (userDataSource, response) => async () => {
  try {
    const users = await userDataSource.list()

    return response.success({ data: users })
  } catch (error) {
    return response.error(error.code, error.message)
  }
}

module.exports = list
module.exports.handler = list(datasource, httpResponse)
