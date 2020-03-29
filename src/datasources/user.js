const env = require('../libs/environment')

const AWS = require('aws-sdk')
AWS.config.setPromisesDependency(require('bluebird'))

const dynamoDb = new AWS.DynamoDB.DocumentClient()

const user = (environment) => ({
  create: async (data) => {
    try {
      console.log(`Saving user ${data.firstName} ${data.lastName}`)
      const userInfo = {
        TableName: environment.userTable,
        Item: data,
      }

      await dynamoDb
        .put(userInfo)
        .promise()
        .then(() => data)
    } catch (error) {
      console.log(
        `An error occured while saving user ${data.firstName}  ${data.lastName}`,
        error
      )
      throw Error('An error occured')
    }
  },
})

module.exports = user(env)
