
// Get Likes from PostID

async function getLikes(post_id) {
    notId = 0;
    const response = await fetch(`http://localhost:3000/api/v1/getLikes/${notId}/${post_id}`)
    const data = await response.json();
    const likes = data.likes.count;
    return likes;
}

// Check if user has liked a post

async function checkLike(id, post_id) {
    const response = await fetch(`http://localhost:3000/api/v1/getLikes/${id}/${post_id}`)
    const data = await response.json();
    const check = data.likeCheck.count;
    return check;
}



// Add Like Functionality

    // Make button red if already liked

        // let isLiked = await checkLike(userId, postId);
        // const likeIcon = postDiv.querySelector('.likeIcon');
        // if (isLiked > 0) {
        //     likeIcon.classList.add("fa-solid");
        //     likeIcon.classList.remove("fa-regular");
        //     likeIcon.style.color = '#DA0037';
        // }

    // Allow user to like and unlike posts

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