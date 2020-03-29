const datasource = require('../../datasources/user')
const factory = require('./factory')

const create = (userDataSource, userFactory) => async (
  event,
  context,
  callback
) => {
  const payload = JSON.parse(event.body)

  let response

  try {
    const user = await userFactory(payload)
    await userDataSource.create(user)

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'User created sucessfully',
        userId: user.id,
      }),
    }
  } catch (e) {
    response = {
      statusCode: 500,
      body: JSON.stringify({
        statusCode: 500,
        message: 'An error occured while creating the user',
      }),
    }
  } finally {
  }
  callback(null, response)
}

module.exports.handler = create(datasource, factory)
