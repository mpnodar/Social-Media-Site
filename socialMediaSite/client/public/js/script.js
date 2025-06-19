



// Handle Resizing

let leftBar = document.querySelector('.left-bar');
let rightBar = document.querySelector('.right-bar');
let main = document.getElementById("main");
let home = document.getElementById("homeHeader");
let navIcon = document.getElementById("openNav");
let navIcon2 = document.getElementById("openNav2");
const message = document.getElementById("messageBox");

let isLeftBarVisible = false;
let isRightBarVisible = false;

if (window.innerWidth < 1000) {
    leftBar.style.left = '-100vw';
    rightBar.style.left = '100vw';
    rightBar.style.width = '55vw'
    main.style.width = '100vw';
    main.style.marginLeft = '0';
    home.style.marginLeft = '100px';
    navIcon.style.display = "block";
    navIcon2.style.display = "block";
    message.style.width = '70vw';
    message.style.left = '15vw';
    
    // home.style.visibility = "hidden";
}
window.addEventListener('resize', function() {
    if (window.innerWidth < 1000) {
        message.style.width = '70vw';
        message.style.left = '15vw';
        isLeftBarVisible = false;
        isRightBarVisible = false;
        leftBar.style.left = '-100vw';
        rightBar.style.width = "55vw"; // Set the desired width
        rightBar.style.left = '100vw';
        main.style.width = '100vw';
        main.style.marginLeft = '0';
        home.style.marginLeft = '100px';
        navIcon2.style.display = "block";
        navIcon2.style.right = '7px';
        navIcon.style.display = "block";
        navIcon.style.left = '7px';
    }
    if (window.innerWidth >= 1000) {
        message.style.width = '52vw';
        message.style.left = '23vw';
        leftBar.style.visibility = 'visible';
        leftBar.style.width = '20vw';
        leftBar.style.left = '0px';
        rightBar.style.visibility = 'visible';
        rightBar.style.width = '27vw';
        rightBar.style.left = '71.5vw';
        main.style.width = '51.75vw';
        main.style.marginLeft = '20vw';
        home.style.marginLeft = '20px';
        navIcon2.style.display = 'none';
        navIcon.style.display = 'none';

    }
});

let scrollTimeout;

window.addEventListener('scroll', function() {
    navIcon.style.opacity = '0.5';
    navIcon2.style.opacity = '0.5';

    
    clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(function() {
        navIcon.style.opacity = '1';
        navIcon2.style.opacity = '1';
    }, 300);
});



function showLeftBar() {
    leftBar.style.width = "40vw"; // Set the desired width
    leftBar.style.left = "0px";
    navIcon.style.left = '41.5vw';
}

function hideLeftBar() {
    leftBar.style.left = "-100vw";
    navIcon.style.left = '7px';
}

function showRightBar() {
    rightBar.style.left = '44vw';
    rightBar.style.width = "55vw"; // Set the desired width
    navIcon2.style.right = '53vw';
}

function hideRightBar() {
    rightBar.style.left = "100vw";
    navIcon2.style.right = '7px';
}


// Open Navigation Bar
navIcon.onclick = function toggleLeftBar () {
    isLeftBarVisible = !isLeftBarVisible; // Toggle the state
    isRightBarVisible = false;
    if (isLeftBarVisible) {
        hideRightBar();
        showLeftBar();
        }
    if (!isLeftBarVisible) {
        hideLeftBar();
    }
};

// Toggle Right Bar

navIcon2.onclick = function () {
    isLeftBarVisible = false;
    isRightBarVisible = !isRightBarVisible; // Toggle the state
    if (isRightBarVisible) {
        hideLeftBar();
        showRightBar();
    }
    if (!isRightBarVisible) {
        hideRightBar();
    }
};







