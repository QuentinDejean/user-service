const AWS = require('aws-sdk')
const env = require('../libs/environment')

const user = (environment) => {
  return {
    create: async (data) => {
      const dynamoDb = new AWS.DynamoDB.DocumentClient({
        convertEmptyValues: true,
      })

      try {
        console.log(`Saving user ${data.firstName} ${data.lastName}`)
        const userInfo = {
          TableName: environment.userTable,
          Item: data,
        }
        console.log(dynamoDb.put)

        await dynamoDb.put(userInfo).promise()
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
  }
}

module.exports = {
  user,
  default: user(env),
}
