'use strict';

module.exports.activation= (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      time: `The current time is ${new Date().toTimeString()}.`,
      activation: 13337
    }),
  };

  callback(null, response);
};
