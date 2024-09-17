const MongoUserService = require('./MongoUserService');  // Implement MongoDB service
const PostgresUserService = require('./PostgresUserService');  // Implement PostgreSQL service
const InMemoryUserService = require('./InMemoryUserService');  // Implement in-memory service

function getUserService() {
  const dataSource = process.env.VUE_APP_DATA_SOURCE || 'inMemory';  // Use environment variable or default to 'inMemory'

  switch (dataSource) {
    case 'mongo':
      return new MongoUserService();
    case 'postgres':
      return new PostgresUserService();
    default:
      return new InMemoryUserService();
  }
}

module.exports = getUserService;
