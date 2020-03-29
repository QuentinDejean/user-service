const passwordHash = require('password-hash')
const uuid = require('uuid')

const createUser = (generateId, hash) => async ({
  email,
  firstName,
  lastName,
  username,
  credentials,
}) => ({
  id: generateId.v4(),
  email,
  firstName,
  lastName,
  username,
  credentials: hash.generate(credentials),
})

module.exports = {
  createUser,
  default: createUser(uuid, passwordHash),
}
