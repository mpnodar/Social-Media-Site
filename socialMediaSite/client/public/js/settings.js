// const user = localStorage.getItem('user');
const firstname = localStorage.getItem('firstname');
const lastname = localStorage.getItem('lastname');
const fullname = firstname + " " + lastname;
const username = localStorage.getItem('username');
const email = localStorage.getItem('email');
const phone = localStorage.getItem('phone');
const id = localStorage.getItem('id');

document.getElementById("username-display").textContent = username;
document.getElementById("name-display").textContent = fullname;
document.getElementById('email-display').textContent = email;

// Change username

const usernameInput = document.getElementById('username-input');
const editUsernameButton = document.getElementById('edit-username-button')


editUsernameButton.onclick = function toggleEditUsername() {
    const usernameDisplay = document.getElementById('username-display');
    const editButton = document.getElementById('edit-username-button');

    if (usernameInput.style.display === 'none') {
        usernameDisplay.style.display = 'none';
        usernameInput.style.display = 'block';
        editButton.textContent = 'Save';
    } else {
        const newUsername = usernameInput.value;
        
        if (newUsername === '') {
            alert('Username field cannot be empty');
            return;
        }

        const userId = localStorage.getItem('id');
        updateUsername(userId, newUsername);
        
        // Hide the input and show the updated username
        usernameDisplay.textContent = newUsername;
        usernameInput.style.display = 'none';
        usernameDisplay.style.display = 'block';
        editButton.textContent = 'Edit';
    }
}

async function updateUsername(userId, newUsername) {
    try {
        const response = await fetch('http://localhost:3000/api/v1/changeUsername', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, newUsername }),
        });
        localStorage.setItem('username', usernameInput.value);



        // Check if the response status is OK (200-299)
        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.message || 'An error occurred');
            return;
        }

        const data = await response.json();
        if (!data) {
            throw new Error("Empty response from server");
        }
    } catch (error) {
        console.error('Error updating username:', error);
        alert('An error occurred while updating username');
    }
}


// Change Name

const editNameButton = document.getElementById('edit-name-button');
const firstNameInput = document.getElementById('firstname-input');
const lastNameInput = document.getElementById('lastname-input');


editNameButton.onclick = function toggleEditName() {
    const nameDisplay = document.getElementById('name-display');
    const nameInput = document.getElementById('name-input');
    
    if (nameInput.style.display === 'none') {
        nameDisplay.style.display = 'none';
        nameInput.style.display = 'block';
        editNameButton.textContent = 'Save';
    } else {
        const newFirstName = firstNameInput.value;
        const newLastName = lastNameInput.value;
        
        if (newFirstName === '') {
            alert('Name field cannot be empty');
            return;
        }

        const userId = localStorage.getItem('id');
        const newFullname = firstNameInput.value + " " + lastNameInput.value;
        updateName(userId, newFirstName, newLastName);
        
        // Hide the input and show the updated username
        nameDisplay.textContent = newFullname;
        nameInput.style.display = 'none';
        nameDisplay.style.display = 'block';
        editNameButton.textContent = 'Edit';
    }
}


async function updateName(userId, newFirstname, newLastname) {
    try {
        const response = await fetch('http://localhost:3000/api/v1/changeName', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, newFirstname, newLastname }),
        });
        



        // Check if the response status is OK (200-299)
        if (!response.ok) {
            const errorData = await response.json();
            alert(errorData.message || 'An error occurred');
            return;
        }

        const data = await response.json();
        console.log(data);
        localStorage.setItem('firstname', newFirstname);
        localStorage.setItem('lastname', newLastname);
        const newFullname = newFirstname + " " + newLastname;
        localStorage.setItem('fullname', newFullname)
        if (!data) {
            throw new Error("Empty response from server");
        }
    } catch (error) {
        console.error('Error updating username:', error);
        alert('An error occurred while updating username');
    }
}