
document.addEventListener('DOMContentLoaded', function() {

const createUserForm = document.getElementById('createUserForm');
const postUserButton = document.getElementById('postUserButton');

createUserForm.addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent form's default behavior (page reload)
    const userData = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value,
        // age: document.getElementById('age').value,
        // location: document.getElementById('location').value,
        date_of_birth: document.getElementById('date_of_birth').value,
    };
    
    console.log("User Data Being Sent:", userData);



    // Send the data to the backend API
    fetch('http://localhost:3000/api/v1/createUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),  // Send data in the request body
    })
    .then(response => response.json())
    .then(data => {
        console.log('User Created:', data);
        alert('Account Created Successfully!');
        window.location.href = 'http://127.0.0.1:5501/client/public/logIn.html';
    })
    
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while creating the account.');
    });

});

});



document.addEventListener('DOMContentLoaded', function() {

const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('loginButton');

loginForm.addEventListener('submit', function (e) {

    e.preventDefault();

    const loginData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };


    fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login successful') {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            const user = data.user;
            localStorage.setItem('id', user.id);
            console.log(localStorage.getItem('id'));
            localStorage.setItem('firstname', user.firstname);
            localStorage.setItem('lastname', user.lastname);
            localStorage.setItem('username', user.username);
            localStorage.setItem('phone', user.phone);
            // localStorage.setItem('age', user.age);
            // localStorage.setItem('birth', user.date_of_birth);
            // localStorage.setItem('location', user.location);
            localStorage.setItem('email', user.email);
            localStorage.setItem('fullname', user.firstname + " " + user.lastname);
            window.location.href = 'http://127.0.0.1:5501/client/public/index.html';
            // console.log('Login Successful:', data.user);
            alert('Login Successful!');
        } else {
            alert('Invalid credentials');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while logging in.');
    });
});
});




