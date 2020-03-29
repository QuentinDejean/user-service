# User Service

This application is a basic service that creates and list users. Please read below to get started

## Requirements

### NVM

Install [NVM](https://github.com/creationix/nvm) and run the below command at the root of the repository:

```javascript
  nvm use
```

### Serverless

Install the Serverless CLI:

```javascript
  npm install serverless -g
```

### Install dependencies

Once Node and serverless CLI set up, you can install the repository dependencies:

```javascript
  npm install
```

## Run the application

### Local Setup

The application uses `serverless offline` in order to bootstrap the stack locally:

In order to run the database locally, run the following command to install the associated plugin:

```javascript
  serverless dynamodb install
```

You can then execute the followign command in order to run the application locally:

```javascript
  serverless offline start
```

If you are having trouble to get it working locally, ensure that your [JRE](https://www.java.com/en/download/) is up-to-date.

### AWS Setup

In order to deploy the application to AWS, follow the [instructions](https://serverless.com/framework/docs/providers/aws/guide/credentials/#create-an-iam-user-and-access-key).

You can then run the following command:

```javascript
  serverless deploy
```
