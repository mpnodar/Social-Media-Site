
require('dotenv').config();


// AWS S3 Configuration
AWS.config.update({
  region: S3_REGION, 
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});




// Show the submitPhoto div as soon as a file is selected
document.addEventListener('DOMContentLoaded', () => {
document.getElementById('imageUpload').addEventListener('change', function(event) {
  const file = event.target.files[0];

  if (!file) {
      return; // No file selected
  }

  // Show the preview box after file selection

  submitBox.style.display = 'flex';
  submitBox.style.opacity = '1';

  // Display the preview of the image
  const previewImage = document.getElementById('photoPreview');
  previewImage.src = URL.createObjectURL(file);
})
});

// Function to handle file upload when the form is submitted
function uploadFile(event) {
  event.preventDefault(); // Prevent form from reloading the page

  const fileInput = document.getElementById('imageUpload');
  const file = fileInput.files[0];

  if (!file) {
      alert("Please select a file first.");
      return;
  }

  // S3 upload parameters
  const params = {
      Bucket: process.env.S3_BUCKET, // Bucket name
      Key: file.name, // File name
      Body: file, // File content
      ContentType: file.type
  };

  // Upload file to S3

  s3.upload(params, function (err, data) {
      if (err) {
          console.error('Error uploading file:', err);
          alert('Error uploading file');
      } else {
            document.getElementById('uploadButton1').addEventListener('click', () => {
              showPopup('Upload Complete', 'Your photo has been uploaded successfully!');
            });
          alert('File uploaded successfully');
          // document.getElementById('imagePreview').src = data.Location; // Optionally update the preview with the uploaded URL
          
        }
  });

  const caption_ = document.getElementById('captionInput').value;
  const fileName = file.name.replace(/ /g, '+');  // Replace all spaces with '+'

  const postData = {
      id: id,
      image_url:  process.env.S3_BASE_URL + fileName,
      caption: caption_
  };
  console.log("Post Data Being Sent:", postData);  // Debugging step
  showImages();


  fetch('http://localhost:3000/api/v1/createPost', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),  // Send data in the request body
})
.then(response => response.json())
.then(data => {
    console.log('Post Created:', data);
    const postId = data.post.post_id;
    addLike(postId, 48, 0);
})
.catch(error => {
    console.error('Error:', error);
    alert('An error occurred while creating the account.');
});
}



// Upload Photo and Make Preview Box Disappear
document.addEventListener('DOMContentLoaded', () => {

const imageForm = document.getElementById('imageForm');

imageForm.addEventListener('submit', uploadFile);
imageForm.addEventListener('submit', function () {
  // submitBox.style.display = 'none';
  submitBox.style.opacity= '0';
  setTimeout(() => {
      submitBox.style.display = 'none';
    }, 1000);
  
});


// Make the functionality the same for both upload buttons

document.getElementById('uploadButton1').addEventListener('click', function() {
  document.getElementById('imageUpload').click();
});

});