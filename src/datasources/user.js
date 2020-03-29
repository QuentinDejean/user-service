const AWS = require('aws-sdk')
const env = require('../libs/environment')

const error = new Error('An error occured')
error.code = 500
error.message = 'An unknown error occured'

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

        await dynamoDb.put(userInfo).promise()
      } catch (err) {
        console.log(
          `An error occured while saving user ${data.firstName} ${data.lastName}`,
          err
        )

        throw error
      }
    },
    list: async () => {
      const dynamoDb = new AWS.DynamoDB.DocumentClient({
        convertEmptyValues: true,
      })

      try {
        console.log('Fetching user list')
        const params = {
          TableName: environment.userTable,
          ProjectionExpression: 'id, firstName, lastName, email, username',
        }

        return dynamoDb
          .scan(params)
          .promise()
          .then((items) => items.Items)
      } catch (err) {
        console.log('An error occured while retrieving the user list', err)

        throw error
      }
    },
  }
}

module.exports = {
  user,
  default: user(env),
}
