document.addEventListener("DOMContentLoaded", async function() {
    

    // Function to get post ID, maybe change later

    // async function getPostId(imageUrl) {
    //     try {
    //         // Construct the URL with the imageUrl parameter
    //         const response = await fetch(`http://localhost:3000/api/v1/getPostId/${encodeURIComponent(imageUrl)}`);
    //         if (!response.ok) {
    //             console.error('Error fetching caption');
    //             return;
    //         }
    
    //         const data = await response.json();
            
    //         const id = data.post_id;
    
    //         return id;
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // }
    


    // Declare all necessary variables
    
    const userId = localStorage.getItem('id');
    const url = "postTestAssets/Lazlow.jpg";
    const postId = 123;
    const feed = document.querySelector('.feed');
    const postDiv = document.createElement('div');
    const postUsername = 'BillyBob';
    const name = "Billy Bob";
    const date = '03/26/2002';
    const caption = 'This is a caption';
    const postUserId = 3;
    const likes = await getLikes(postId);



    // Actual HTML of the Post

    postDiv.innerHTML = `
        <div class="postBody">
            <div class="profile-link-post">
                <img src="postTestAssets/Will.jpg" alt="" class="profilePhoto">
                    <div class="profile-link-name" style="margin-bottom: 8px;">
                        <p style="margin-bottom: 0px; color: #171717;">${name}</p>
                        <p2 style="color: #444444; margin-top: 0px;">@${postUsername}</p2>
                        <p class="post-date" style="color: #888888; font-size: 12px;margin-top:5px">${date}</p>
                    </div>
                <button class = "followButton">Follow</button>
            </div>

            <p id="caption">${caption}</p>
            <img class="postPhoto" src=${url} alt="">
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

        <div class="commentSection" style="display: none;">
            <div id="commentSectionHeader">Comments</div>
            <div class="comment-input" id="commentBox">
                <textarea id="commentInput" placeholder="Add a comment..."></textarea>
                <button id="commentButton" class="commentButton">Post</button>
            </div>
            <div class="comments"></div>
        </div>
    `;



    // Like Functionality of the posts


    // Check if the post is liked, display as red if so

    let isLiked = await checkLike(userId, postId);
        const likeIcon = postDiv.querySelector('.likeIcon');
        if (isLiked > 0) {
            likeIcon.classList.add("fa-solid");
            likeIcon.classList.remove("fa-regular");
            likeIcon.style.color = '#DA0037';
        }


    feed.appendChild(postDiv);
});



// Add Like Functionality

    // Make button red if already liked

        

    // // Allow user to like and unlike posts

    // postDiv.querySelector('.likeButton').addEventListener('click', async function () {
        
    //     const likeButton = postDiv.querySelector('.likeButton');
    //     const likeCounter = postDiv.querySelector('.likeCounter');
    //     let currentLikes = await getLikes(postId);
    //     let isLiked = await checkLike(userId, postId);
    //     likeIcon.classList.remove('fa-bounce');
    //     void likeIcon.offsetWidth;  // Force a reflow to restart the animation


    //     likeIcon.classList.add('fa-bounce');
    //     // Toggle like/unlike
    //     if (isLiked > 0) {
    //         likeIcon.classList.add("fa-regular");
    //         likeIcon.classList.remove("fa-solid");
    //         await deleteLike(userId, postId)
    //         likeCounter.textContent = await getLikes(postId);
    //         likeButton.classList.remove('liked');
    //         likeIcon.style.color = '';
    //     } else {
    //         // Not liked yet, so like it
    //         await addLike(postId, userId, 1);  // Increase the like count            
    //         currentLikes = await getLikes(postId);
    //         likeIcon.classList.add("fa-solid");
    //         likeIcon.classList.remove("fa-regular");
    //         likeCounter.textContent = currentLikes;
    //         likeButton.classList.add('liked');
    //         likeIcon.style.color = '#DA0037';
    //     }
    // });