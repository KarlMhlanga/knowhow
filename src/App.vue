<template>
  <div id="app">
    <header>
      <h1>User Management System</h1>
    </header>

    <main>
      <section class="form-section">
        <h2>Add New User</h2>
        <form @submit.prevent="addUser" class="user-form">
          <div class="form-group">
            <label for="userId">User ID</label>
            <input
              type="text"
              id="userId"
              v-model="newUser.id"
              placeholder="Enter user ID"
              required
            />
          </div>
          <div class="form-group">
            <label for="userName">User Name</label>
            <input
              type="text"
              id="userName"
              v-model="newUser.name"
              placeholder="Enter user name"
              required
            />
          </div>
          <button type="submit" class="btn-submit">Add User</button>
        </form>
      </section>

      <section class="user-list-section">
        <h2>Users List</h2>
        <ul class="user-list">
          <li v-for="user in users" :key="user.id" class="user-item">
            <span>{{ user.name }} (ID: {{ user.id }})</span>
            <button @click="deleteUser(user.id)" class="btn-delete">Delete</button>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      newUser: { id: '', name: '' },
      users: []
    };
  },
  methods: {
    async addUser() {
      try {
        if (this.newUser.id && this.newUser.name) {
          await axios.post('http://localhost:3000/users', this.newUser);
          this.newUser = { id: '', name: '' };
          this.fetchUsers();
        }
      } catch (error) {
        console.error('Error adding user:', error);
      }
    },
    async deleteUser(id) {
      try {
        await axios.delete(`http://localhost:3000/users/${id}`);
        this.fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3000/users');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
  },
  created() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
body {
  font-family: 'Tahoma', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f2f5;
}

#app {
  text-align: center;
  color: #333;
  margin: 20px;
}

header {
  margin-bottom: 30px;
}

h1 {
  font-family: 'Tahoma', sans-serif;
  text-transform: uppercase;
  font-size: 2rem;
  margin: 0;
  color: #007bff;
}

.form-section,
.user-list-section {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

h2 {
  font-family: 'Tahoma', sans-serif;
  margin-bottom: 15px;
  color: #555;
}

.user-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

label {
  font-family: 'Tahoma', sans-serif;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"] {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1rem;
}

.btn-submit {
  padding: 10px 15px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #0056b3;
}

.user-list {
  list-style: none;
  padding: 0;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.btn-delete {
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-delete:hover {
  background-color: #c82333;
}
</style>
