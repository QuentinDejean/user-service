const { default: datasource } = require('../../datasources/user')
const httpResponse = require('../../libs/httpResponse/httpResponse')
const logger = require('../../libs/logger/logger')

const list = (userDataSource, response, logger) => async () => {
  try {
    const users = await userDataSource.list()

    logger.log('Successfully fetched user list')
    return response.success({ data: users })
  } catch (error) {
    logger.error('An error occured while creating user', error)
    return response.error(error.code, error.message)
  }
}

module.exports = list
module.exports.handler = list(datasource, httpResponse, logger)
