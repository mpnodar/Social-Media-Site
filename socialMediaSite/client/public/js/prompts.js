  
document.addEventListener('DOMContentLoaded', async function() {
  const openButton = document.getElementById('reopenPopupButton');
  
  await fetch('http://localhost:3000/api/v1/getPrompt')
  .then(response => response.json())
  .then(data => {
      const prompt = data.prompt;
      // document.getElementById('promptText').textContent = prompt;
      showPopup('Daily Task!', prompt);
      reopen(prompt);
  })
  .catch(error => {
      console.error('Error fetching prompt:', error);
  });

  function reopen(prompt) {
    openButton.addEventListener('click', async function() {
        showPopup('Daily Task!', prompt);
    });
  }
  
  // Function to show the popup with fade-in and animation
  function showPopup(title, message) {
      const popup = document.getElementById('popupModal');
      const popupTitle = document.getElementById('popupTitle');
      const popupMessage = document.getElementById('popupMessage');

      // Set the popup content dynamically
      popupTitle.textContent = title;
      popupMessage.textContent = message;

      // Show the popup and trigger the fade-in animation
      popup.style.display = 'flex'; // Display the modal
      popup.querySelector('.popup-modal-content').style.animation = 'popupEnter 0.2s ease-out'; // Trigger fade-in animation
      popup.style.opacity = '1'
    }

  function closePopup() {
      const popup = document.getElementById('popupModal');
      const modalContent = popup.querySelector('.popup-modal-content');
      const modal = popup.querySelector('.popup-modal');

      modalContent.style.animation = 'popupExit 0.2s ease-out'; // Trigger fade-out animation
      popup.style.opacity = '0';

      setTimeout(() => {
          popup.style.display = 'none'; // Hide the modal
      }, 190); // Matches the animation duration
  }

  document.getElementById('closePopup').addEventListener('click', closePopup);


});


