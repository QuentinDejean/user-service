const bcrypt = require('bcrypt')
const uuid = require('uuid')

const createUser = (generateId, encrypt) => async ({
  firstName,
  lastName,
  username,
  credentials,
}) => ({
  id: generateId.v1(),
  firstName,
  lastName,
  username,
  credentials: await encrypt.hash(credentials, await encrypt.genSalt(20)),
})

module.exports = createUser(uuid, bcrypt)
