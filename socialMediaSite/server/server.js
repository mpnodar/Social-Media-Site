const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
// const path = require('path');
const jwt = require('jsonwebtoken');
const { error } = require('console');
require('dotenv').config();
const port = process.env.PORT || 3000;
const dbPassword = process.env.PGPASSWORD;
const dbName = process.env.PGDATABASE;
const dbHost = process.env.PGHOST;
const dbUser = process.env.PGUSER;
const dbPort = process.env.PGPORT;
const app = express();


const pool = new Pool({
    user: dbUser,
    host: dbHost,
    database: dbName,
    password: dbPassword,    
    port: dbPort,          
});

app.use(bodyParser.json());
app.use(cors({
    origin: '*',
}));


// Create User

app.post('/api/v1/createUser', async (req, res) => {
    const { firstname, lastname, username, email, phone, password, age, location, date_of_birth } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user data into the database
    const query = `
        INSERT INTO users (firstname, lastname, username, email, phone, password, age, location, date_of_birth)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
    `;
    try {
        const result = await pool.query(query, [
            firstname, lastname, username, email, phone, hashedPassword, age, location, date_of_birth
        ]);
        res.status(201).json({
            status: 'success',
            user: result.rows[0],
        });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error creating user.',
        });
    }
});


// Login

app.post('/api/v1/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, 'your_secret_key', { expiresIn: '1h' });
        // sessionStorage.setItem('token', token);
        res.status(200).json({
            message: 'Login successful',
            token: token,
            user: {
                id: user.id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                birthday: user.birthday,
                phone: user.phone,
                location: user.location,
                email: user.email,
                age: user.age
            }
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
});


// Get Prompt

app.get('/api/v1/getPrompt', async (req, res) => {
    const seed = (100 * parseInt(new Date().getDay())) % 28;
    // const seed = 27;
    try {
        const result = await pool.query(`SELECT * FROM prompts`);
        const prompt = result.rows[seed].prompt;

        if (!prompt) {
            return res.status(404).json({ message: 'No prompts found.' });
        }

        res.status(200).json({ prompt: prompt });
    } catch (error) {
        console.error('Error fetching prompt:', error);
        res.status(500).json({ message: 'Error fetching prompt.' });
    }
});



// Get comments for post

app.get('/api/v1/getComments/:post_id', async (req, res) => {
    const { post_id } = req.params
    try {
        const comment_text = await pool.query(`SELECT comment_text FROM comments WHERE post_id = ${post_id}`); // Fetch one post
        const user_id = await pool.query(`SELECT id FROM comments WHERE post_id = ${post_id}`); // Fetch one post

        const comments = comment_text.rows;
        const id = user_id.rows;

        if (!comments) {
            return res.status(404).json({ message: 'No posts found.' });
        }

        res.status(200).json({ 
            
            id: id,
            comments: comments

        }); // Send post as JSON response
    
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Error fetching comments.' });
    }
});




// Get post info

app.get('/api/v1/getPost', async (req, res) => {
    try {
        const result = await pool.query(`SELECT post_id, image_url, likes, caption FROM posts`); // Fetch one post
        const postId = await pool.query(`SELECT post_id FROM posts`);
        const post = result.rows;
        const id = postId.rows;

        if (!post) {
            return res.status(404).json({ message: 'No posts found.' });
        }

        res.status(200).json({ 
            post: post,
            id: id
        }); // Send post as JSON response
    
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Error fetching post.' });
    }
});



// Get All Posts from Specific User (Don't delete!)

app.get('/api/v1/getUserPost/:id', async (req, res) => {
    const { id } = req.params;
    const { column } = req.query;  // Get the column name from query params (e.g. ?column=image_url)


    try {
        const result = await pool.query(`SELECT ${column} FROM posts WHERE id = $1`, [id]); // Use dynamic column name
        const post = result.rows;  // Query results

        if (post.length === 0) {
            return res.status(404).json({ message: 'No posts found.' });
        }

        res.status(200).json({ post: post }); // Send the post data
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Error fetching post.' });
    }
});



app.get('/api/v1/getUserPost/:id', async (req, res) => {
    const { id } = req.params;
    const { column } = req.query;  // Get the column name from query params (e.g. ?column=image_url)


    try {
        const result = await pool.query(`SELECT ${column} FROM posts WHERE id = $1`, [id]); // Use dynamic column name
        const post = result.rows;  // Query results

        if (post.length === 0) {
            return res.status(404).json({ message: 'No posts found.' });
        }

        res.status(200).json({ post: post }); // Send the post data
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Error fetching post.' });
    }
});



// Get user info from post

app.get('/api/v1/getUserIdFromPost/:id', async (req, res) => {
    const { id } = req.params;
    const { column } = req.query;  // Get the column name from query params (e.g. ?column=image_url)


    try {
        const result = await pool.query(`select image_url, firstname, lastname, username from (select distinct * FROM posts join users on posts.id = users.id)`, [id]); // Use dynamic column name
        
        const post = result.rows;

        if (post.length === 0) {
            return res.status(404).json({ message: 'No posts found.' });
        }

        res.status(200).json({ post: post }); // Send the post data
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Error fetching post.' });
    }
});







// Endpoint to fetch the caption for a post with a specific image URL
app.get('/api/v1/getCaption/:imageUrl', async (req, res) => {
    const { imageUrl } = req.params; // Get the imageUrl from the route parameter
    try {
        const result = await pool.query('SELECT caption FROM posts WHERE image_url = $1', [imageUrl]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No post found for the provided image URL.' });
        }

        // Send the caption in the response
        res.status(200).json({ caption: result.rows[0].caption });
    } catch (error) {
        console.error('Error fetching caption:', error);
        res.status(500).json({ message: 'Error fetching caption.' });
    }
});


// Get Post Id from URL

app.get('/api/v1/getPostId/:imageUrl', async (req, res) => {
    const { imageUrl } = req.params; // Get the imageUrl from the route parameter
    try {
        const result = await pool.query('SELECT post_id FROM posts WHERE image_url = $1', [imageUrl]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No post found for the provided image URL.' });
        }

        // Send the caption in the response
        res.status(200).json({ post_id: result.rows[0].post_id });
    } catch (error) {
        console.error('Error fetching caption:', error);
        res.status(500).json({ message: 'Error fetching caption.' });
    }
});

// Get user info from image_url

app.get('/api/v1/getPostUserInfo/:imageUrl', async (req, res) => {
    const { imageUrl } = req.params; // Get the imageUrl from the route parameter
    try {
        const id = await pool.query('SELECT users.id FROM (posts JOIN users ON posts.id = users.id) where image_url = $1', [decodeURIComponent(imageUrl)]);
        const firstname = await pool.query('SELECT firstname FROM (posts JOIN users ON posts.id = users.id) where image_url = $1', [decodeURIComponent(imageUrl)]);
        const lastname = await pool.query('SELECT lastname FROM (posts JOIN users ON posts.id = users.id) where image_url = $1', [decodeURIComponent(imageUrl)]);
        const username = await pool.query('SELECT username FROM (posts JOIN users ON posts.id = users.id) where image_url = $1', [decodeURIComponent(imageUrl)]);
        const date = await pool.query('SELECT created_at FROM (posts JOIN users ON posts.id = users.id) where image_url = $1', [decodeURIComponent(imageUrl)]);



        // Send the caption in the response
        res.status(200).json({ 
            user_id: id.rows[0],
            firstname: firstname.rows[0],
            lastname: lastname.rows[0],
            username: username.rows[0],
            date: date.rows[0]
         });
    } catch (error) {
        console.error('Error fetching caption:', error);
        res.status(500).json({ message: 'Error fetching caption.' });
    }
});

// Get user info from ID

app.get('/api/v1/getUserInfo/:id', async (req, res) => {
    const { id } = req.params; // Get the imageUrl from the route parameter
    try {
        const firstname = await pool.query('SELECT firstname FROM users WHERE id = $1', [id]);
        const lastname = await pool.query('SELECT lastname FROM users where id = $1', [id]);
        const username = await pool.query('SELECT username FROM users where id = $1', [id]);


        // Send the caption in the response
        res.status(200).json({ 
            firstname: firstname.rows[0],
            lastname: lastname.rows[0],
            username: username.rows[0]
         });
    } catch (error) {
        console.error('Error fetching caption:', error);
        res.status(500).json({ message: 'Error fetching caption.' });
    }
});





// Update Username
app.put('/api/v1/changeUsername', async (req, res) => {
    const { userId, newUsername } = req.body;
    if (!userId || !newUsername) {
        return res.status(400).json({ message: 'User ID and new username are required' });
    }

    try {
        // Check if new username already exists
        const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [newUsername]);
        const queryID = await pool.query('SELECT id FROM users WHERE username = $1', [newUsername]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Update username in the database
        const query = 'UPDATE users SET username = $1 WHERE id = $2 RETURNING *';
        const result = await pool.query(query, [newUsername, userId]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        res.status(200).json({
            user: result.rows[0]  // This is the updated user object
        });
    } catch (error) {
        console.error('Error updating username:', error);
        res.status(500).json({ message: 'Error updating username' });
    }
});


// Update name


app.put('/api/v1/changeName', async (req, res) => {
    console.log('Request body:', req.body);  // Log the body to see if it's parsed correctly

    const { userId, newFirstname, newLastname } = req.body;
    console.log('userId:', userId, 'newFirstname:', newFirstname, 'newLastname:', newLastname);

    if (!userId || !newFirstname || !newLastname) {
        return res.status(400).json({ message: 'First and last name required' });
    }

    try {

        // Update username in the database
        const query = 'UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3 RETURNING *';
        const result = await pool.query(query, [newFirstname, newLastname, userId]);
        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        res.status(200).json({
            user: result.rows[0]  // This is the updated user object
        });
    } catch (error) {
        console.error('Error updating username:', error);
        res.status(500).json({ message: 'Error updating username' });
    }
});



// Insert image into posts table

app.post('/api/v1/createPost', async (req, res) => {
    const { id, image_url, caption } = req.body;


    // Insert the user data into the database
    const query = `
        INSERT INTO posts (id, image_url, caption)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    try {
        const result = await pool.query(query, [
            id, image_url, caption
        ]);
        res.status(201).json({
            status: 'success',
            post: result.rows[0],
        });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error creating user.',
        });
    }
});


// Create Comment

app.post('/api/v1/createComment', async (req, res) => {
    const { id, post_id, comment_text } = req.body;

    // Insert the user data into the database
    const query = `
        INSERT INTO comments (id, post_id, comment_text)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    try {
        const result = await pool.query(query, [
            id, post_id, comment_text
        ]);
        res.status(201).json({
            status: 'success',
            comment: result.rows[0],
        });
    } catch (error) {
        console.error('Error inserting user:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error creating user.',
        });
    }
});



// Add Like

app.post('/api/v1/addLike', async (req, res) => {
    const { post_id, id, likecount } = req.body;
    
    try {
         {
            // Post does not exist, so insert a new like
            const insertQuery = `
                INSERT INTO likes (post_id, id, likecount)
                VALUES ($1, $2, $3)
                RETURNING *;
            `;
            
            const insertResult = await pool.query(insertQuery, [
                post_id, id, likecount
            ]);
            
            res.status(201).json({
                status: 'success',
                like: insertResult.rows[0],
            });
        }
    } catch (error) {
        // console.error('Error processing like:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error processing like.',
        });
    }
});




// Remove Like


app.delete('/api/v1/deleteLike/:id/:post_id', async (req, res) => {
    const { id, post_id } = req.params;  // Extract `like_id` and `post_id` from the URL parameters
    
    try {
        // Perform the delete query with the provided `like_id` and `post_id`
        const result = await pool.query(
            `DELETE FROM likes WHERE id = $1 AND post_id = $2 RETURNING *`, 
            [id, post_id]
        );

        // Check if a row was deleted
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Like not found for this post.' });
        }

        // Return a success message if deletion was successful
        res.status(200).json({ 
            message: 'Like successfully deleted.',
            deletedLike: result.rows[0]  // Return the deleted like details if needed
        });
    } catch (error) {
        console.error('Error deleting like:', error);
        res.status(500).json({ message: 'Error deleting like.' });
    }
});


// Get Like Amount

app.get('/api/v1/getLikes/:id/:post_id', async (req, res) => {
    const { id, post_id } = req.params
    try {
        const likes = await pool.query(`SELECT COUNT(*) FROM likes WHERE post_id = ${post_id}`); // Fetch one post
        const checkLikes = await pool.query(`SELECT COUNT(*) FROM likes WHERE post_id = ${post_id} and id = ${id}`); // Check if user has liked the post

        const likeCount = likes.rows[0];
        const checkLikeCount = checkLikes.rows[0];
        if (!likes) {
            return res.status(404).json({ message: 'No posts found.' });
        }

        res.status(200).json({ 
            
            likes: likeCount,
            likeCheck: checkLikeCount

        });
    
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ message: 'Error fetching comments.' });
    }
});



// Get Follower Count

app.get('/api/v1/getFollowCount/:followed_id', async (req, res) => {
    try {
        const { followed_id } = req.params;
        const query = `SELECT COUNT(*) FROM follows WHERE followed_id = $1`;
        const follow = await pool.query(query, [followed_id]);
        
        if (!follow) {
            res.status(404).json({message: "Follow relationship does not exist"})
        }
        res.status(200).json({followers: follow.rows[0]})
    }
    catch (err) {
        res.status(500).json({
            message: "Error fetching follow relationship."
        })
        console.log(error)
    }
})


// Get Following Count

app.get('/api/v1/getFollowingCount/:follower_id', async (req, res) => {
    try {
        const { follower_id } = req.params;
        const query = `SELECT COUNT(*) FROM follows WHERE follower_id = $1`;
        const follow = await pool.query(query, [follower_id]);
        
        if (!follow) {
            res.status(404).json({message: "Follow relationship does not exist"})
        }
        res.status(200).json({followers: follow.rows[0]})
    }
    catch (err) {
        res.status(500).json({
            message: "Error fetching follow relationship."
        })
        console.log(error)
    }
})



// Get Follows

app.get('/api/v1/getFollows/:follower_id/:followed_id', async (req, res) => {
    try {
        const { follower_id, followed_id } = req.params;
        const query = `SELECT * FROM follows WHERE follower_id = $1 and followed_id = $2`;
        const follow = await pool.query(query, [follower_id, followed_id]);
        
        if (!follow) {
            res.status(404).json({message: "Follow relationship does not exist"})
        }
        res.status(200).json({follow: follow.rows})
    }
    catch (err) {
        res.status(500).json({
            message: "Error fetching follow relationship."
        })
        console.log(error)
    }
})



// Follow User

app.post('/api/v1/followUser/:follower_id/:followed_id', async (req, res) => {
    const { follower_id, followed_id } = req.params;

    try {
        // Check if the follow relationship already exists
        const checkFollow = await pool.query(
            'SELECT * FROM follows WHERE follower_id = $1 AND followed_id = $2',
            [follower_id, followed_id]
        );

        if (checkFollow.rowCount > 0) {
            // If already following, send a message
            return res.status(400).json({ message: 'You are already following this user.' });
        }

        // Insert the follow relationship if it doesn't exist
        const result = await pool.query(
            'INSERT INTO follows (follower_id, followed_id) VALUES ($1, $2) RETURNING *',
            [follower_id, followed_id]
        );

        // Return the newly inserted follow relationship
        res.status(201).json({
            message: 'Successfully followed the user.',
            follow: result.rows[0]  // Send back the inserted follow data
        });
    } catch (err) {
        console.error('Error following user:', err);
        res.status(500).json({ message: 'Failed to follow user' });
    }
});


app.get('/api/v1/getTopPosts', async (req, res) => {
    try {
        const query = 'SELECT posts.*, SUM(likes.likecount) AS total_likes FROM posts JOIN likes ON posts.post_id = likes.post_id GROUP BY posts.post_id ORDER BY total_likes DESC LIMIT 6';
        const results = await pool.query(query);
        const posts = results.rows;

        res.status(200).json({ Posts: posts });
    } catch (error) {
        console.error('Error fetching top posts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




// Check if Server is Running

app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
});