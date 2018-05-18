'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  // delete the todo from the database
  dynamoDb.delete(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t remove the Task.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: {
      "Access-Control-Allow-Origin": "*"
    },
      body: JSON.stringify({}),
    };
    callback(null, response);
  });
};
