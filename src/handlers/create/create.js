const { default: datasource } = require('../../datasources/user')
const { default: factory } = require('./factory/factory')
const httpResponse = require('../../libs/httpResponse/httpResponse')

const create = (userDataSource, userFactory, response) => async (event) => {
  const payload = JSON.parse(event.body)

  try {
    const user = await userFactory(payload)
    await userDataSource.create(user)

    return response.success({
      message: 'User created sucessfully',
      userId: user.id,
    })
  } catch (error) {
    return response.error(error.code, error.message)
  }
}

module.exports = create
module.exports.handler = create(datasource, factory, httpResponse)
