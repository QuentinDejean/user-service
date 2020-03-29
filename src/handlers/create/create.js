const { default: datasource } = require('../../datasources/user')
const { default: factory } = require('./factory/factory')
const httpResponse = require('../../libs/httpResponse/httpResponse')
const logger = require('../../libs/logger/logger')

const create = (userDataSource, userFactory, response, logger) => async (
  event
) => {
  const payload = JSON.parse(event.body)

  try {
    const user = await userFactory(payload)
    await userDataSource.create(user)

    logger.log(`Successfully created user, ${user.id}`)

    return response.success({
      message: 'User created sucessfully',
      userId: user.id,
    })
  } catch (error) {
    logger.error('An error occured while creating user', error)
    return response.error(error.code, error.message)
  }
}

module.exports = create
module.exports.handler = create(datasource, factory, httpResponse, logger)
