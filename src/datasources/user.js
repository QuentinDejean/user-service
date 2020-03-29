const env = require('../libs/environment')

const AWS = require('aws-sdk')
AWS.config.setPromisesDependency(require('bluebird'))

const dynamoDb = new AWS.DynamoDB.DocumentClient()

const user = (environment, dynamo) => ({
  create: async (data) => {
    try {
      console.log(`Saving user ${data.firstName} ${data.lastName}`)
      const userInfo = {
        TableName: environment.userTable,
        Item: data,
      }

      await dynamo.put(userInfo)
    } catch (err) {
      console.log(
        `An error occured while saving user ${data.firstName}  ${data.lastName}`,
        err
      )

      const error = new Error('An error occured')
      error.code = 500
      error.message = 'An unknown error occured'

      throw error
    }
  },
})

module.exports = {
  user,
  default: user(env, dynamoDb),
}
