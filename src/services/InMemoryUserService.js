class InMemoryUserService {
    constructor() {
      this.users = [];
    }
  
    async getUsers() {
      return this.users;
    }
  
    async createUser(name) {
      const id = this.users.length + 1;
      this.users.push({ id, name });
    }
  
    async deleteUser(id) {
      this.users = this.users.filter(user => user.id !== id);
    }
  }
  
  module.exports = InMemoryUserService;
  