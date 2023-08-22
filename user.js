import api from './api';
 
const users = await api.get('/api/users');
const html = users.text();

document.addEventListener('DOMContentLoaded', () => {
    const userTableBody = document.getElementById('userTableBody');
  
    function fetchUsers() {
      axios.get('/api/users')
        .then(response => {
          const users = response.data;
          // Loop through the users and add them to the table
          users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${user.userId}</td>
              <td>${user.firstName}</td>
              <td>${user.lastName}</td>
              <td>${user.Email}</td>
              <td>
                <button onclick="editUser(${user.userId})">View</button>
                <button onclick="editUser(${user.userId})">Edit</button>
                <button onclick="deleteUser(${user.userId})">Delete</button>
              </td>
            `;
            userTableBody.appendChild(row);
          });
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    }
  
    fetchUsers();
    
    // Define editUser and deleteUser functions
    function editUser(userId) {
      // Implement edit functionality
      console.log('Edit user:', userId);
    }
  
    function deleteUser(userId) {
      // Implement delete functionality
      console.log('Delete user:', userId);
    }
  });
