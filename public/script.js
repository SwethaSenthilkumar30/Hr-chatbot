// Connect to socket server
const socket = io();

// Chat box reference
const chatBox = document.getElementById("chat-box");

// Function to add message to chat UI
function addMessage(text, className) {
    const msg = document.createElement("div");
    msg.classList.add("message", className);
    msg.innerText = text;

    chatBox.appendChild(msg);

    // Auto scroll to latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to send message
function sendMessage() {
    const input = document.getElementById("message");
    const message = input.value.trim();

    if (message === "") return;

    // Show user message
    addMessage(message, "user-msg");

    // Send message to server
    socket.emit("userMessage", message);

    input.value = "";
}

// Receive bot reply
socket.on("botMessage", (msg) => {

    // Small delay to look realistic
    setTimeout(() => {
        addMessage(msg, "bot-msg");
    }, 500);
});

// Send message when Enter key is pressed
document.getElementById("message").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});





