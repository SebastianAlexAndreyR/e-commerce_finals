


// Function to retrieve users from localStorage
function getUsers() {
  let users = JSON.parse(localStorage.getItem('users'));
  return users ? users : [];
}

// Function to save users to localStorage
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

// Function to display users in the table
function displayUsers(users) {
  let userTableBody = document.getElementById('userTableBody');
  userTableBody.innerHTML = '';
  users.forEach(function(user) {
    let row = `<tr>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.contactNumber}</td>
                <td>${user.location}</td>
                <td>
                  <button type="button" class="btn btn-primary" onclick="openEditUserModal(${user.id})">Edit</button>
                  <button type="button" class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
                </td>
              </tr>`;
    userTableBody.innerHTML += row;
  });
}

// Function to search users by email
function searchUsers() {
  let keyword = document.getElementById('searchInput').value.toLowerCase();
  let users = getUsers();
  let filteredUsers = users.filter(function(user) {
    return user.email.toLowerCase().includes(keyword);
  });
  displayUsers(filteredUsers);
}

// Function to open create user modal
// function openCreateUserModal() {
//   $('#userModal').modal('show');
//   document.getElementById('userForm').reset();
//   document.getElementById('saveUserBtn').setAttribute('onclick', 'createUser()');
// }

// Function to create a new user
function createUser() {
  let username = document.getElementById('username').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let confirmPassword = document.getElementById('confirmPassword').value;
  let contactNumber = document.getElementById('contactNumber').value;
  let location = document.getElementById('location').value;
  
  if (password !== confirmPassword) {
    alert("Passwords don't match");
    return;
  }

  let newUser = {
    id: Date.now(),
    username: username,
    email: email,
    password: password,
    contactNumber: contactNumber,
    location: location
  };

  let users = getUsers();
  users.push(newUser);
  saveUsers(users);

  $('#userModal').modal('hide');
  displayUsers(users);
}

// Function to open edit user modal
function openEditUserModal(userId) {
  let users = getUsers();
  let user = users.find(u => u.id === userId);
  if (!user) {
    alert('User not found');
    return;
  }

  $('#userModal').modal('show');
  document.getElementById('username').value = user.username;
  document.getElementById('email').value = user.email;
  document.getElementById('contactNumber').value = user.contactNumber;
  document.getElementById('location').value = user.location;
  document.getElementById('saveUserBtn').setAttribute('onclick', `editUser(${userId})`);
}

// Function to edit a user
function editUser(userId) {
  let users = getUsers();
  let userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    alert('User not found');
    return;
  }

  let username = document.getElementById('username').value;
  let email = document.getElementById('email').value;
  let contactNumber = document.getElementById('contactNumber').value;
  let location = document.getElementById('location').value;

  users[userIndex].username = username;
  users[userIndex].email = email;
  users[userIndex].contactNumber = contactNumber;
  users[userIndex].location = location;

  saveUsers(users);

  $('#userModal').modal('hide');
  displayUsers(users);
}

// Function to delete user
function deleteUser(userId) {
  let users = getUsers();
  let userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    alert('User not found');
    return;
  }

  users.splice(userIndex, 1);
  saveUsers(users);
  displayUsers(users);
}

// Initialize the page
function init() {
  let users = getUsers();
  displayUsers(users);
}

// Call init function when the page loads
window.onload = init;

function userModal(email, password) {
    // Check if the user already exists
    if (localStorage.getItem(email)) {
        return false; // User already exists
    } else {
        // Create a new user object
        const newUser = { username: username ,email: email, password: password, contactNumber: contactNumber, location: location};
        // Store the user object in localStorage
        localStorage.setItem(email, JSON.stringify(newUser));
        return true; // Registration successful
    }
}