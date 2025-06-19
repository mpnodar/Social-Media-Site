// Initialize User Info if logged in

let loggedIn;
const user = localStorage.getItem('user');
const id = localStorage.getItem('id');
const firstname = localStorage.getItem('firstname');
const lastname = localStorage.getItem('lastname');
const username = localStorage.getItem('username');
const fullname = localStorage.getItem('fullname');
const email = localStorage.getItem('email');
const phone = localStorage.getItem('phone');
const age = localStorage.getItem('age');
const token = localStorage.getItem('token');
    // const birth = localStorage.getItem('birth');
    // const location = localStorage.getItem('location');
    // console.log(birth);
profileLinkNav = document.getElementById("profileLinkName");
signInLink = document.getElementById("signInLink");



// Check if logged in
    
    if (token && user) {loggedIn = true;}
    else {loggedIn = false;}
    console.log(loggedIn);


// Display Name if Logged In

window.onload = function() {
    document.getElementById("name").textContent = fullname;
    document.getElementById("username").textContent = `@${username}`;
  

    if (loggedIn === false) {
        profileLinkNav.style.visibility = "hidden";
        signInLink.style.visibility = "visible";
    }

    else {
        profileLinkNav.style.visibility = "visible";
        signInLink.style.visibility = "hidden";
    }
};


// Log Out Function

const logOut = document.getElementById("logOutButton");

logOut.onclick = function () {
    localStorage.clear();
    window.location.href = "http://127.0.0.1:5501/client/public/logIn.html";
}



// Check if Logged In

profileLinkNav = document.getElementById("profileLinkName");
signInLink = document.getElementById("signInLink");

if (loggedIn === false) {
    profileLinkNav.style.visibility = "hidden";
    signInLink.style.visibility = "visible";
}
if (loggedIn === true) {
    profileLinkNav.style.visibility = "visible";
    signInLink.style.visibility = "hidden";
}



document.addEventListener('DOMContentLoaded', function () {
    const uploadBox = document.getElementById('uploadProfilePhoto');
    const profilePhotoInput = document.getElementById('profilePhotoInput');
    const profilePreview = document.getElementById('profilePreview');
    const uploadText = document.getElementById('uploadText');

    // Trigger file input when the upload box is clicked
    uploadBox.addEventListener('click', function () {
        profilePhotoInput.click();
    });

    // Handle image selection and display preview
    profilePhotoInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                profilePreview.src = e.target.result;
                profilePreview.style.display = 'block';  // Show the profile image preview
                uploadText.style.display = 'none';  // Hide the text once image is uploaded
            }

            reader.readAsDataURL(file);
        }
    });
});
