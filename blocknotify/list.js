'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: process.env.DYNAMODB_TABLE,
  ScanIndexForward: true,
  Limit: 50
};

module.exports.list = (event, context, callback) => {
  // fetch all venues from the database
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t fetch the Tasks.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: {
      "Access-Control-Allow-Origin": "*"
    },
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};
