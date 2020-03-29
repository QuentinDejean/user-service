const AWS = require('aws-sdk')
const env = require('../libs/environment')
const logger = require('../libs/logger/logger')

const error = new Error('An error occured')
error.code = 500
error.message = 'An unknown error occured'

const user = (environment, logger) => {
  return {
    create: async (data) => {
      const dynamoDb = new AWS.DynamoDB.DocumentClient({
        convertEmptyValues: true,
      })

      try {
        logger.log(`Saving user ${data.firstName} ${data.lastName}`)
        const userInfo = {
          TableName: environment.userTable,
          Item: data,
        }

        await dynamoDb.put(userInfo).promise()
      } catch (err) {
        logger.log(
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
        logger.log('Fetching user list')
        const params = {
          TableName: environment.userTable,
          ProjectionExpression: 'id, firstName, lastName, email, username',
        }

        return dynamoDb
          .scan(params)
          .promise()
          .then((items) => items.Items)
      } catch (err) {
        logger.log('An error occured while retrieving the user list', err)

        throw error
      }
    },
  }
}

module.exports = {
  user,
  default: user(env, logger),
}
