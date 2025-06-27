// import { getPostCaption } from './posts.js'


// AWS S3 Configuration
AWS.config.update({
    region: 'us-east-1', // Your S3 bucket's region
    accessKeyId: 'AKIARZDBICPY42BQ26VD', // Example key, do NOT use in production
    secretAccessKey: 'O/4nS0wHed5Ge7t1ycbBZgZUk6abnJqWGdLKw6tQ', // Example key, do NOT use in production
  });
  
  const s3 = new AWS.S3();  


  let postCount = 0;

const firstname = localStorage.getItem('firstname');
    const username = localStorage.getItem('username');
    const fullname = localStorage.getItem('fullname');
    const email = localStorage.getItem('email');
    const phone = localStorage.getItem('phone');
    const age = localStorage.getItem('age');
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    // const birth = localStorage.getItem('birth');
    // const location = localStorage.getItem('location');
    // console.log(birth);


    const tabButtons = document.querySelectorAll('.tab-button');
    const feed = document.getElementById('feed');
    const postView = document.getElementById('changePostsDisplay');
    let view = 'flex';
    let post = document.getElementById('profilePost');

    



// Set the user profile data into the HTML
document.getElementById('fullname').textContent = fullname;
document.getElementById('username').textContent = username;
// document.getElementById('bio').textContent = user.bio;
// document.getElementById('profile-pic').src = user.profilePic;

// document.getElementById('followers-count').textContent = user.followersCount;
// document.getElementById('following-count').textContent = user.followingCount;


// const postsTab = document.getElementById('postsTab');
// const savedTab = document.getElementById('savedTab');


async function checkLike(id, post_id) {
    const response = await fetch(`http://localhost:3000/api/v1/getLikes/${id}/${post_id}`)
    const data = await response.json();
    const check = data.likeCheck.count;
    return check;
}

// Get all tab buttons

async function getCommentUserId(post_id, index) {
    const response = await fetch(`http://localhost:3000/api/v1/getComments/${post_id}`)
    const data = await response.json();
    const user_id = data.id[index].id;
    return user_id;
}


// Get User info from id

async function fetchUserInfo(id, index) {
// Get the value from the input field
if (!id) {
    return;
}
try {
    // Construct the URL to fetch the post information using the image URL
    const userData = `http://localhost:3000/api/v1/getUserInfo/${id}`;

    // Make the API request
    const response = await fetch(userData);

    // Check if the response is successful
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
    }
    // Parse the JSON response and extract the caption
    const data = await response.json();
    const firstname = data.firstname.firstname;
    const lastname = data.lastname.lastname;
    const username = data.username.username;
    const info = [firstname, lastname, username]
    return info[index];

} catch (error) {
    // Handle any errors that occurred during the fetch
    console.error('Error fetching post info:', error);
    
}
}

async function getCommentText(post_id) {
const response = await fetch(`http://localhost:3000/api/v1/getComments/${post_id}`)
const data = await response.json();
const comments = data.comments;
return comments;
}



tabButtons.forEach(button => {
    button.addEventListener('click', () => {

        tabButtons.forEach(tab => {
            tab.classList.remove('active');
        });

        button.classList.add('active')

        if (feed.style.display = 'grid') {
            feed.style.display = 'none';
        }
        else if (feed.style.display = 'none') {
            feed.style.display = 'grid';
        }

        const selectedTab = button.dataset.tab;
        console.log('Selected Tab:', selectedTab);
    });
});
async function fetchPostInfo(imageUrl) {
    // Get the value from the input field
    if (!imageUrl) {
        alert('Please enter an image URL!');
        return;
    }

    try {
        // Construct the URL to fetch the post information using the image URL
        const url = `http://localhost:3000/api/v1/getPostUserInfo/${encodeURIComponent(imageUrl)}`;

        // Make the API request
        const response = await fetch(url);
        
        // Check if the response is successful
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Something went wrong');
        }

        // Parse the JSON response and extract the caption
        const data = await response.json();


        const firstname = data.firstname.firstname;
        const lastname = data.lastname.lastname;
        const username = data.username.username;
        const date = data.date.created_at;

        const info = {firstname, lastname, username, date}

        return info;


    } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error('Error fetching post info:', error);
        
    }
}
async function getPostCaption(imageUrl) {
    try {
        // Construct the URL with the imageUrl parameter
        const response = await fetch(`http://localhost:3000/api/v1/getCaption/${encodeURIComponent(imageUrl)}`);
        if (!response.ok) {
            console.error('Error fetching caption');
            return;
        }

        const data = await response.json();
        
        const caption = data.caption;


        return caption;
    } catch (error) {
        console.error('Error:', error);
    }
}
async function setPostName(imageUrl) {
    let data = await fetchPostInfo(imageUrl);
    firstname_ = data.firstname;
    lastname_ = data.lastname;
    const fullname = firstname_ + " " + lastname_;
    return(fullname);
}
async function setPostUsername(imageUrl) {
    let data = await fetchPostInfo(imageUrl);
    const username = data.username;
    return(username);
}
async function setPostDate(imageUrl) {
    let data = await fetchPostInfo(imageUrl);
    let date = new Date(data.date);
    let diff;
    localDate = date.toLocaleDateString();
    localHour = date.toLocaleTimeString();
    // log('Post Time: ', '\n', localHour, '\n', localDate)

    // Reformat Date Display
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds()
    // log('Post: ', hour, minute, month, day, year);

    // Get current time and date
    let currentDate = new Date();
    let currentHour = currentDate.getHours();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth() + 1;
    let currentMinute = currentDate.getMinutes();
    let currentYear = currentDate.getFullYear();
    let currentSecond = currentDate.getSeconds();
    
    // log('Current: ', currentHour, currentMinute, currentMonth, currentDay)


    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    let monthName = monthNames[month - 1];
    let currentMonthName = monthNames[currentMonth - 1];
    let formattedDate = monthName + " " + day + ", " + year + ", " + hour + ":" + minute;
    let formattedCurrentDate = currentMonthName + " " + currentDay + ", " + currentYear + ", " + currentHour + ":" + currentMinute;
    
    // Calculate Time Gap

    let diffUnit;

    if (currentYear != year) {
        diff = currentYear - year;
        if (diff > 1) {
            diffUnit = ' years ago'
        }
        else {
            diffUnit = ' year ago'
        }
    }
    else {
        if (currentMonth != month) {
            diff = currentMonth - month;
            if (diff > 1) {
                diffUnit = ' months ago'
            }
            else {
                diffUnit = ' month ago'
            }
        }
        else {
            if (currentDay != day) {
                diff = currentDay - day;
                if (diff > 1) {
                    diffUnit = ' days ago'
                }
                else {
                    diffUnit = ' day ago'
                }
            }
            else {
                if (currentHour != hour) {
                    diff = currentHour - hour;
                    if (diff > 1) {
                        diffUnit = ' hours ago'
                    }
                    else {
                        diffUnit = ' hour ago'
                    }
                }
                else {
                    if (currentMinute != minute) {
                        diff = currentMinute - minute;
                        if (diff > 1) {
                            diffUnit = ' minutes ago'
                        }
                        else {
                            diffUnit = ' minute ago'
                        }
                    }
                    else {
                        diff = currentSecond - second;
                        if (diff > 1) {
                            diffUnit = ' seconds ago'
                        }
                        else {
                            diffUnit = ' second ago'
                        }
                    }
                }
            }
        }
    }

    // log(diff, diffUnit)
    return(diff + diffUnit);
}


async function getPostId(imageUrl) {
    try {
        // Construct the URL with the imageUrl parameter
        const response = await fetch(`http://localhost:3000/api/v1/getPostId/${encodeURIComponent(imageUrl)}`);
        if (!response.ok) {
            console.error('Error fetching caption');
            return;
        }

        const data = await response.json();
        
        const id = data.post_id;

        return id;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getLikes(post_id) {
    notId = 0;
    const response = await fetch(`http://localhost:3000/api/v1/getLikes/${notId}/${post_id}`)
    const data = await response.json();
    const likes = data.likes.count;
    // log(likes);
    return likes;
}

// Add Like

async function addLike(post_id, user_id, likecount) {

    const data = {
        post_id: post_id,
        id: user_id,
        likecount: likecount
    };

    try {
        // Send a POST request to the backend API
        const response = await fetch('http://localhost:3000/api/v1/addLike', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Parse the response
        const result = await response.json();

        if (response.ok) {
            console.log('Like added/updated:', result);
            // You can update the UI here if necessary, such as updating the like count
            // updateLikeUI(post_id, result.like.likecount);  // Example of updating the UI
        } else {
            console.error('Error processing like:', result.message);
            alert('There was an error processing your like. Please try again later.');
        }
    } catch (error) {
        console.error('Error sending the request:', error);
        alert('Failed to connect to the server. Please try again later.');
    }
}


// Remove Like

async function deleteLike(id, post_id) {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/deleteLike/${id}/${post_id}`, {
            method: 'DELETE',  // HTTP method
            headers: {
                'Content-Type': 'application/json',
                // Add authorization header or other necessary headers here if needed
                // 'Authorization': 'Bearer ' + yourToken
            }
        });

        // Handle the server response
        if (response.ok) {
            const data = await response.json();
            console.log('Like successfully removed:', data);
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData.message);
            alert(errorData.message); // Show error message
        }
    } catch (error) {
        console.error('Request failed', error);
        alert('An error occurred while deleting the like.');
    }
}



// Function to fetch a specific column (like 'image_url', 'title', etc.) for a post
async function displayPosts(userID, column) {
    const response = await fetch(`http://localhost:3000/api/v1/getUserPost/${userID}?column=${column}`);
    const data = await response.json();  // Parse the JSON response
    const post = data.post;

   

    if (data.post) {
        // Loop through each post and display the image
        data.post.forEach(async post => {

            postCount++;
            // const img = document.createElement('img');  // Create an image element
            
            const url = post.image_url;
            const caption_ = await getPostCaption(url);
            const name_ = await setPostName(url);
            const username_ = await setPostUsername(url);
            const date_ = await setPostDate(url);
            const postId = await getPostId(url);
            const likes = await getLikes(postId);

            // img.src = url;
            const postDiv = document.createElement('div');
            postDiv.className = 'post';

    postDiv.innerHTML = `
    <div class="postBody" id = "profilePostBody" style = "background-color: #d7d7d7;border-radius: 10px;">

        <div class="profile-link-post">
                <img src="assets/Blank Profile Photo.png" alt="" class="profilePhoto">
                    <div class="profile-link-name" style="margin-bottom: 8px;">
                        <p style="margin-bottom: 0px;">${name_}</p>
                        <p2 style="color: #444444; margin-top: 0px;">@${username_}</p2>
                        <p class="post-date" style="color: #888888; font-size: 12px;margin-top:5px">${date_}</p>
                    </div>
            </div>

    <p id="caption">${caption_}</p>
            <img class="postPhoto" src="${url}" alt="">
            <div class="post-action-bar">
                <ul class="post-action-list">
                    <li class="post-action-item likeButton">
                        <i class="fa-regular fa-thumbs-up likeIcon" class="likeButton"></i>
                        <span class="likeCounter" class = "likeCounter">${likes}</span>
                    </li>
                    <li class="post-action-item commentIcon" id="commentIcon">
                        <i class="fa-regular fa-comment"></i>
                        <span class="commentCounter">0</span>
                    </li>
                    <li class="post-action-item messageIcon">
                        <i class="fa-regular fa-message"></i>
                    </li>
                </ul>
            </div>
        </div>
         <!-- Comment Section -->
            

            <!-- Comment Section -->
            <div class="commentSection" style="display: none;">
                <div id="commentSectionHeader">Comments</div>
                <div class="comment-input" id="commentBox">
                    <textarea id="commentInput" placeholder="Add a comment..."></textarea>
                    <button id="commentButton" class="commentButton">Post</button>
                </div>
                <div class="comments"></div>
            </div>
    </div>

`



// Comment Section

    // Open Comment Section

    postDiv.querySelector('.commentIcon').addEventListener('click', function () {
        const commentSection = postDiv.querySelector('.commentSection');
        commentSection.style.display = commentSection.style.display === "block" ? "none" : "block";
    });




    async function showComments() {
        const comments = await getCommentText(postId);  // Get all comments for the post
        
        for (let i = 0; i < comments.length; i++) {
            
            const comment = comments[i];
            const posterId = await getCommentUserId(postId, i);
            const firstname = await fetchUserInfo(posterId, 0);
            const lastname = await fetchUserInfo(posterId, 1);
            const username = await fetchUserInfo(posterId, 2);
            const fullname = firstname + " " + lastname;
            const commentText = comment.comment_text;
            const commentSection = postDiv.querySelector('.comments');
            const commentCounter = postDiv.querySelector('.commentCounter');
    
            if (commentText !== '') {
                const newComment = document.createElement('div');
                newComment.classList.add('comment');
    
                newComment.innerHTML = `
                    <div class="comment-header">
                        <img class="profile-pic" src="assets/Blank Profile Photo.png" alt="Profile Picture">
                        <div class="comment-info">
                            <span class="comment-author">${fullname}</span>
                            <span style = "color: grey;">@${username}</span>
                        </div>
                    </div>
                    <div class="comment-body" style = "border-bottom: solid lightgrey 1px;margin-right: 40px;padding-bottom: 0px;">
                        <p style="margin-left: 50px;">${commentText}</p>
                    </div>
                `;
    
                // Append the new comment to the comment section
                commentSection.appendChild(newComment);
    
                // Update the comment counter
                let currentCount = parseInt(commentCounter.textContent);
                commentCounter.textContent = currentCount + 1;
            }
        }
    }

    showComments();
    
           
// Add Like Functionality

    // Make button red if already liked

    let isLiked = await checkLike(id, postId);
    const likeIcon = postDiv.querySelector('.likeIcon');
    if (isLiked > 0) {
        likeIcon.classList.add("fa-solid");
        likeIcon.classList.remove("fa-regular");
        likeIcon.style.color = '#DA0037';
    }

     // Like and Unlike Functionality

     postDiv.querySelector('.likeButton').addEventListener('click', async function () {
        
        const likeButton = postDiv.querySelector('.likeButton');
        const likeCounter = postDiv.querySelector('.likeCounter');
        let currentLikes = await getLikes(postId);
        let isLiked = await checkLike(id, postId);
        likeIcon.classList.remove('fa-bounce');
        void likeIcon.offsetWidth;  // Force a reflow to restart the animation


        likeIcon.classList.add('fa-bounce');
        // Toggle like/unlike
        if (isLiked > 0) {
            likeIcon.classList.add("fa-regular");
            likeIcon.classList.remove("fa-solid");
            await deleteLike(id, postId)
            likeCounter.textContent = await getLikes(postId);
            likeButton.classList.remove('liked');
            likeIcon.style.color = '';
        } else {
            // Not liked yet, so like it
            await addLike(postId, id, 1);  // Increase the like count            
            currentLikes = await getLikes(postId);
            likeIcon.classList.add("fa-solid");
            likeIcon.classList.remove("fa-regular");
            likeCounter.textContent = currentLikes;
            likeButton.classList.add('liked');
            likeIcon.style.color = '#DA0037';
        }
    });

            document.getElementById('feed').appendChild(postDiv);
            document.getElementById('posts-count').textContent = postCount;
        });


        return data.post;  // Return the posts data if needed
    } else {
        console.log('No post found or invalid column.');
        return null;
    }

    
    // Add Comment

        comments = await getCommentText(postId);
        const firstname = await fetchUserInfo(userId, 0);
        const lastname = await fetchUserInfo(userId, 1);
        const username = await fetchUserInfo(userId, 2);
        const fullname = firstname + " " + lastname;
        // const username = await fetchUserInfo(id, 2);
        const commentButton = postDiv.querySelector('#commentButton');
        const commentInput = postDiv.querySelector('#commentInput');
        const commentSection = postDiv.querySelector('.comments');
        const commentCounter = postDiv.querySelector('.commentCounter');
    
        commentButton.addEventListener('click', function() {
            const commentText = commentInput.value.trim();
            createComment(imageUrl, commentText);
    
            if (commentText !== '') {
                // Create a new comment element
                const newComment = document.createElement('div');
                newComment.classList.add('comment');
    
                newComment.innerHTML = `
                    <div class="comment-header">
                        <img class="profile-pic" src="assets/Blank Profile Photo.png" alt="Profile Picture">
                        <div class="comment-info">
                            <span class="comment-author">${fullname}</span>
                            <span style = "color: grey;">@${username}</span>
                        </div>
                    </div>
                    <div class="comment-body" style = "border-bottom: solid lightgrey 1px;margin-right: 40px;padding-bottom: 0px;">
                        <p style="margin-left: 50px;">${commentText}</p>
                    </div>                
                `;
    
                // Append the new comment to the comment section
                commentSection.appendChild(newComment);
    
                // Update the comment counter
                let currentCount = parseInt(commentCounter.textContent);
                commentCounter.textContent = currentCount + 1;
    
                // Clear the input field after posting the comment
                commentInput.value = '';
            }
        });

   
    

}

const profPost = document.getElementById('profilePostBody');
const feedDisplay = document.getElementById('feed');

document.addEventListener('DOMContentLoaded', function() {
    const feedDisplay = document.getElementById('feed');

    // Function to apply grid styles based on screen width
    function applyGridStyles() {
        // Check if the screen width is less than 600px
        if (window.innerWidth > 1100) {
            feedDisplay.style.paddingTop = '50px';
            feedDisplay.style.display = 'grid';
            feedDisplay.style.gridTemplateColumns = 'repeat(2, 1fr)'; // 2 equal columns
            feedDisplay.style.gap = '5px'; // Corrected gap to '5px'
        } else {
            // Reset styles for larger screens (optional)
            feedDisplay.style.paddingTop = '';
            feedDisplay.style.display = '';
            feedDisplay.style.gridTemplateColumns = '';
            feedDisplay.style.gap = '';
        }
    }

    // Apply the styles on page load
    applyGridStyles();

    // Apply the styles when the window is resized
    window.addEventListener('resize', function() {
        applyGridStyles();
    });
});





// Example usage to fetch 'image_url' for user with ID 48
displayPosts(id, 'image_url');



