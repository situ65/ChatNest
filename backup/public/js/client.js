 const socket = io();

// Elements
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");

// Sounds
const sendSound = new Audio("sounds/send.wav");
const receiveSound = new Audio("sounds/send.wav");

// Append message
const appendMessage = (message, position) => {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.classList.add("message", position);
    messageContainer.append(messageElement);

    // auto scroll
    messageContainer.scrollTop = messageContainer.scrollHeight;
};

// Username
const name = prompt("Enter your name");
socket.emit("new-user-joined", name);

// User joined
socket.on("user-joined", (name) => {
    appendMessage(`${name} joined the chat`, "left");
});

// Receive message (ONLY ONCE)
socket.on("receive", (data) => {
    appendMessage(`${data.name}: ${data.message}`, "left");
    receiveSound.play();
});

// User left
socket.on("left", (name) => {
    appendMessage(`${name} left the chat`, "left");
});

// Send message (ONLY ONCE)
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const message = messageInput.value.trim();
    if (message === "") return;

    appendMessage(`You: ${message}`, "right");
    sendSound.play();

    socket.emit("send", message);
    messageInput.value = "";
});