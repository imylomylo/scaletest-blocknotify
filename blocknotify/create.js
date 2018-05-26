'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  // if ( typeof data.active !== 'boolean' ) {
  //   console.error('Validation Failed');
  //   callback(new Error('Couldn\'t create the Block.'));
  //   return;
  // }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      	hash: data.hash,
        txcount: data.tx.length,
        size: data.size,
        height: data.height,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // write the todo to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(new Error('Couldn\'t create the Block.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
    },
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
