// async function createNotification({
//     userId,            // who receives it
//     triggeredById,     // who caused it
//     type,              // 'like', 'comment', 'follow', etc.
//     postId = null,
//     commentId = null,
//     messageId = null
// }) {
//     try {
//         const response = await fetch('http://localhost:3000/api/v1/createNotification', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 user_id: userId,
//                 triggered_by_id: triggeredById,
//                 notification_type: type,
//                 post_id: postId,
//                 comment_id: commentId,
//                 message_id: messageId
//             }),
//         });

//         const data = await response.json();
//         if (response.ok) {
//             console.log('Notification created:', data.notification);
//         } else {
//             console.warn('Failed to create notification:', data.message);
//         }
//     } catch (err) {
//         console.error('Error creating notification:', err);
//     }
// }




const userId = localStorage.getItem('id');


async function getNotifications (userId) {
    try {
        const response = await fetch(`http://localhost:3000/api/v1/getNotifications/${userId}`);
        const data = await response.json();

        if (response.ok) {
            console.log("User Notifications:", data.notifications);
            return data.notifications;
        } else {
            console.warn(data.message);
            return[]
        }
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return [];
    }
}

async function getUser(user_id) {
    const response = await fetch(`http://localhost:3000/api/v1/getUserInfo/${user_id}`)
    const data = await response.json();

    try {
        if (response.ok) {
            return data;
        }
    } catch (error) {
        console.error("Error fetching user", error);
        return []
    }
}


async function getNotificationData() {
    const notificationData = await getNotifications(userId);
    let notificationArray = []

    for (i = 0; i < notificationData.length; i++) {
        const notificationType = await notificationData[i].notification_type;
        const notificationUserId = await notificationData[i].triggered_by_id;
        const userData = await getUser(notificationUserId);
        const firstName = await userData.firstname.firstname;
        const lastName = await userData.lastname.lastname;
        const fullName = firstName + " " + lastName;
        if (notificationType === 'like') {
            const textContent = `${fullName} liked your post`
            notificationArray.push(textContent)
        }
        else if (notificationType === 'comment') {
            const textContent = `${fullName} commented on your post`
            notificationArray.push(textContent)        }
    }
    return notificationArray

}


async function displayNotifications () {
    const notificationSection = document.querySelector('.notifications-section');
    const notificationTextArray = await getNotificationData()

        // if (notificationTextArray.length === 0) {
        //     const noNotificationsText = document.createElement('div');
        //     // notificationSection.innerHTML = '';
        //     noNotificationsText.innerHTML = `<p>All up to date!</p>`;
        //     notificationSection.appendChild(noNotificationsText);
        // }
        // else {
            for (let i = 0; i < notificationTextArray.length; i++) {
                
                
                    const notificationBox = document.createElement('div');
                    notificationBox.classList.add('notification-box');

                    notificationBox.innerHTML = `
                        <p class = "notification-text">${notificationTextArray[i]}</p>
                    `
                    notificationSection.appendChild(notificationBox);
            }
        // }

}



document.addEventListener("DOMContentLoaded", async () => {

    await displayNotifications();

});