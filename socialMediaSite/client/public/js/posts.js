const userId = localStorage.getItem('id');

const log = console.log;
let url;
const preview = document.getElementById("photoPreview");
const submitBox = document.getElementById("submitBox");

// AWS S3 Configuration
AWS.config.update({
  region: 'us-east-1', // Your S3 bucket's region
  accessKeyId: 'AKIARZDBICPY42BQ26VD', // Example key, do NOT use in production
  secretAccessKey: 'O/4nS0wHed5Ge7t1ycbBZgZUk6abnJqWGdLKw6tQ', // Example key, do NOT use in production
});

const s3 = new AWS.S3();


// Get Data from Post

async function getPostData() {
    const response = await fetch('http://localhost:3000/api/v1/getPost')
    const data = await response.json();
    const post = data.post;
    const id = data.id;
    return post;
}


// Get Likes from PostID

async function getLikes(post_id) {
    notId = 0;
    const response = await fetch(`http://localhost:3000/api/v1/getLikes/${notId}/${post_id}`)
    const data = await response.json();
    const likes = data.likes.count;
    // log(likes);
    return likes;
}

// Check if user has liked a post

async function checkLike(id, post_id) {
    const response = await fetch(`http://localhost:3000/api/v1/getLikes/${id}/${post_id}`)
    const data = await response.json();
    const check = data.likeCheck.count;
    return check;
}

async function getUserPost() {
    const response = await fetch('http://localhost:3000/api/v1/getUserPost')
    const data = await response.json();
    const post = data.post;
    return post;
}

// Function to fetch the caption for a specific image URL
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


// Get Post ID from URL


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



// Create Comment

async function createComment(imageUrl, comment_text) {

    const id = localStorage.getItem('id');
    const post_id = await getPostId(imageUrl);
    const commentData = {id, post_id, comment_text}


fetch('http://localhost:3000/api/v1/createComment', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentData),  // Send data in the request body
})
.then(response => response.json())
.then(data => {
    console.log('Comment Created:', data);
})
.catch(error => {
    console.error('Error:', error);
    alert('An error occurred while creating the account.');
});
}



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

        const id = data.user_id.id;
        const firstname = data.firstname.firstname;
        const lastname = data.lastname.lastname;
        const username = data.username.username;
        const date = data.date.created_at;

        const info = {id, firstname, lastname, username, date}

        return info;


    } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error('Error fetching post info:', error);
        
    }
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





// Set the post's display data to the user's info

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

async function setPostUserID(imageUrl) {
    let data = await fetchPostInfo(imageUrl);
    const user_id = data.id;
    return (user_id); 
}

async function setPostDate(imageUrl) {
    let data = await fetchPostInfo(imageUrl);
    let date = new Date(data.date);
    let diff;
    localDate = date.toLocaleDateString();
    localHour = date.toLocaleTimeString();

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


async function getCommentText(post_id) {
        const response = await fetch(`http://localhost:3000/api/v1/getComments/${post_id}`)
        const data = await response.json();
        const comments = data.comments;
        return comments;
}



async function getCommentUserId(post_id, index) {
    const response = await fetch(`http://localhost:3000/api/v1/getComments/${post_id}`)
    const data = await response.json();
    const user_id = data.id[index].id;
    return user_id;
}




function showImages() {

async function listImagesFromS3() {
    const params = {
        Bucket: 'aws-test-nodar' // Your S3 bucket name
    };
  
    try {
        const data = await s3.listObjectsV2(params).promise();
        
        const sortedObjects = data.Contents.sort((a, b) => {
          return new Date(b.LastModified) - new Date(a.LastModified);
        });
    
        // Return the sorted image keys
        return sortedObjects.map(object => object.Key);
      } catch (error) {
        console.error("Error fetching S3 bucket objects:", error);
        return [];
    }
  }
  
  
  
document.addEventListener('DOMContentLoaded', async function() {
    
          const imageKeys = await listImagesFromS3(); // Get list of image file names
          if (imageKeys.length === 0) {
              console.log("No images found in the S3 bucket.");
              return;
          }


      // Create a post for each image in the S3 bucket
          imageKeys.forEach((imageKey) => {
          const imageKeyWithPlus = imageKey.replace(/ /g, '+');  // Replace all spaces with '+'
  
          const imageUrl = `https://aws-test-nodar.s3.us-east-1.amazonaws.com/${imageKeyWithPlus}`; // Construct the full image URL
  
          // Now create a post for each image
          displayPost(imageUrl);
    });
  });
  
  
  
  
  // Function to display posts
  
async function displayPost(imageUrl) {
    const postId = await getPostId(imageUrl);
    const feed = document.querySelector('.feed');
    const postDiv = document.createElement('div');
    const name = await setPostName(imageUrl);
    const postUsername = await setPostUsername(imageUrl);
    const date = await setPostDate(imageUrl);
    const caption_ = await getPostCaption(imageUrl);
    const likes = await getLikes(postId);
    const postUserId = await setPostUserID(imageUrl);

    postDiv.classList.add('post');

    postDiv.innerHTML = `

        <div class="postBody">
            <div class="profile-link-post">
                <img src="assets/Blank Profile Photo.png" alt="" class="profilePhoto">
                    <div class="profile-link-name" style="margin-bottom: 8px;">
                        <p style="margin-bottom: 0px;">${name}</p>
                        <p2 style="color: #444444; margin-top: 0px;">@${postUsername}</p2>
                        <p class="post-date" style="color: #888888; font-size: 12px;margin-top:5px">${date}</p>
                    </div>
                <button class = "followButton">Follow</button>
            </div>

            <p id="caption">${caption_}</p>
            <img class="postPhoto" src="${imageUrl}" alt="">
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
    `;


    feed.appendChild(postDiv);



    // Message Functionality

    const messageButton = postDiv.querySelector('.messageIcon');
    messageButton.onclick = function() {
        const messageBox = document.getElementById("messageBox");
        const messageCaption = document.getElementById("imageInfo")
        const messageName = document.getElementById("recipientName");
        const messageImage = document.getElementById("postImagePreview");
        
        messageImage.src = imageUrl;
        messageName.textContent = name;
        messageCaption.textContent = caption_;
        messageBox.style.display = "block";
    }
    


    // Follow Functionality

    const profileLink = document.querySelector('.profile-link-name');
    const followButton = postDiv.querySelector('.followButton'); // Using class instead of ID
    const following = await checkFollow(userId, postUserId);

    if (following || parseInt(postUserId) === parseInt(userId)) {
        followButton.style.display = 'none';
        
    } else {
        followButton.style.display = 'flex';
    }

    followButton.onclick = async function() {
        followUser(userId, postUserId);
        followButton.textContent = "Following";
    }

    
// Add Like Functionality

    // Make button red if already liked

        let isLiked = await checkLike(userId, postId);
        const likeIcon = postDiv.querySelector('.likeIcon');
        if (isLiked > 0) {
            likeIcon.classList.add("fa-solid");
            likeIcon.classList.remove("fa-regular");
            likeIcon.style.color = '#DA0037';
        }

    // Allow user to like and unlike posts

    postDiv.querySelector('.likeButton').addEventListener('click', async function () {
        
        const likeButton = postDiv.querySelector('.likeButton');
        const likeCounter = postDiv.querySelector('.likeCounter');
        let currentLikes = await getLikes(postId);
        let isLiked = await checkLike(userId, postId);
        likeIcon.classList.remove('fa-bounce');
        void likeIcon.offsetWidth;  // Force a reflow to restart the animation


        likeIcon.classList.add('fa-bounce');
        // Toggle like/unlike
        if (isLiked > 0) {
            likeIcon.classList.add("fa-regular");
            likeIcon.classList.remove("fa-solid");
            await deleteLike(userId, postId)
            likeCounter.textContent = await getLikes(postId);
            likeButton.classList.remove('liked');
            likeIcon.style.color = '';
        } else {
            // Not liked yet, so like it
            await addLike(postId, userId, 1);  // Increase the like count            
            currentLikes = await getLikes(postId);
            likeIcon.classList.add("fa-solid");
            likeIcon.classList.remove("fa-regular");
            likeCounter.textContent = currentLikes;
            likeButton.classList.add('liked');
            likeIcon.style.color = '#DA0037';
        }
    });

    

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


    showComments()
    }
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
            // alert(data.message); // Show success message
            // For example, remove the like button or decrement the like count:
            // document.getElementById(`likeButton-${post_id}`).classList.remove('liked');
            // document.getElementById(`likeCount-${post_id}`).textContent = data.newLikeCount;
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


        showImages();


// Display top posts

        async function getTopPosts(imageUrl) {
            try {
                // Fetch the top posts from the API
                const response = await fetch('http://localhost:3000/api/v1/getTopPosts');
        
                // If the response is okay, parse the JSON and log the posts
                if (response.ok) {
                    const data = await response.json();
                    return data.Posts;
                } else {
                    console.error('Error fetching top posts:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        
        async function setTrendingTab() {
            const posts = await getTopPosts();
            console.log(posts)
            const trendingList = document.getElementById('trendingList'); // Get the parent container
            let trendingLimit = 5
            let trendingHTML = '';
            if (posts.length < 5) {
                trendingLimit = posts.length
            }
            for (let i = 0; i < trendingLimit; i++) {
                const post = posts[i];
                // Build the HTML string for each trending item
                trendingHTML += `
                    <div class="trendingItem">
                    <p style = "color:rgb(209, 209, 209); font-size: 20px;margin-right: 10px;">#${i + 1}</p>
                        <img src="${post.image_url}" alt="" style="width: 50px; height: 50px; border-radius: 10px;margin-right: 10px;">
                        <div style = "display: flex; flex-direction: column;">
                        <p class="name" style="color: #EDEDED;cursor: pointer;margin: 0px;font-weight: bolder;">${await setPostName(post.image_url)}</p>
                        <p class="caption" style="color: lightgrey;margin: 0px;">${await getPostCaption(post.image_url)}</p>
                        </div>
                    </div>
                `;
            }
        
            // Append the generated HTML to the trendingList container
            trendingList.innerHTML = trendingHTML;
        }
        


setTrendingTab();