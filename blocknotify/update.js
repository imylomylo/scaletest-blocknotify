'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation
  if (typeof data.active !== 'boolean') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t update the Block.'));
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
    // ExpressionAttributeNames: {
    //   '#name': 'name',
    // },
    ExpressionAttributeValues: {
      ':blockhash': data.blockhash,
      ':txcount': data.txcount,
      ':active': data.active,
      ':updatedAt': timestamp
    },
    UpdateExpression: 'SET  blockhash = :blockhash, txcount = :txcount, active = :active, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  // update the todo in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t update the Block.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: {
      "Access-Control-Allow-Origin": "*"
    },
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
