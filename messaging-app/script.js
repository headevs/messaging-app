// Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const messageList = document.getElementById('messageList');

    sendButton.addEventListener('click', () => {
        const messageText = messageInput.value.trim();
        if (messageText) {
            const messageData = {
                text: messageText,
                timestamp: Date.now(),
                profileImage: 'https://via.placeholder.com/30' // Placeholder image
            };
            database.ref('messages').push(messageData);
            messageInput.value = '';
        }
    });

    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendButton.click();
        }
    });

    database.ref('messages').on('child_added', (snapshot) => {
        const message = snapshot.val();
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');

        const profileIcon = document.createElement('div');
        profileIcon.classList.add('profile-icon');
        profileIcon.style.backgroundImage = `url(${message.profileImage})`;

        const messageTextElement = document.createElement('div');
        messageTextElement.classList.add('message-text');
        messageTextElement.textContent = message.text;

        messageElement.appendChild(profileIcon);
        messageElement.appendChild(messageTextElement);

        messageList.appendChild(messageElement);
        messageList.scrollTop = messageList.scrollHeight;
    });
});
