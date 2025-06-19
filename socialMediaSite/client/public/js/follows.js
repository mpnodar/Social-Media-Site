
const myId = localStorage.getItem('id');


// Get the amount of followers of the user
async function getFollows(user_id) {
    const results = await fetch(`http://localhost:3000/api/v1/getFollowcount/${user_id}`)
    const data = await results.json();
    const followers = data.followers.count;
    return followers;
}

// Get the amount of profiles the user is following
async function getFollowingCount(user_id) {
    const results = await fetch(`http://localhost:3000/api/v1/getFollowingCount/${user_id}`)
    const data = await results.json();
    const followers = data.followers.count;
    return followers;
}


async function followUser(follower_id, followed_id) {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/followUser/${follower_id}/${followed_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        if (response.ok) {
            console.log(data.message); // Successfully followed
            console.log(data.follow);  // Newly inserted follow data
        } else {
            console.error(data.message); // Error message (already following)
        }
    } catch (error) {
        console.error('Error following user:', error);
    }
}

async function checkFollow (follower_id, followed_id) {
    const result = await fetch(`http://localhost:3000/api/v1/getFollows/${follower_id}/${followed_id}`);
    const data = await result.json();
    const followLength = data.follow.length;
    if (parseInt(followLength) > 0) {
        return true;
    }
    return (false);
}



// Set Profile Followers Count

document.addEventListener('DOMContentLoaded', async function() {

    const followingCount = await getFollowingCount(myId);

    let followingNumber = document.getElementById('followingCount');
    if (followingCount < 2){
        followingNumber.textContent = followingCount;
    }
    else {
        followingNumber.textContent = followingCount;
    }

    let followersNumber = document.getElementById("followerCount");
    const followerCount = await getFollows(myId);
    if (followerCount < 2){
        followersNumber.textContent = followerCount + " " + 'Follower';
    }
    else {
        followersNumber.textContent = followerCount + " " + 'Followers';
    }
    

})
