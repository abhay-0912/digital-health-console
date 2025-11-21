const serverless = require('serverless-http');
const { app, init } = require('../../backend/app');

module.exports.handler = async (event, context) => {
  await init();
  const handler = serverless(app);
  return handler(event, context);
};
