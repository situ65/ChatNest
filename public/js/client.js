//  const socket = io("http://localhost:8000");

// const form = document.getElementById('send-container');
// const messageInput = document.getElementById('messageInp');
// const messagecontainer = document.getElementById('messagecontainer');
// var audio = new Audio('modern_ios_chime.wav');

// //function append event info to the container
// const append = (message, position) => {
//     const messageElement = document.createElement('div');
//     messageElement.innerText = message;
//     messageElement.classList.add('message');
//     messageElement.classList.add(position);
//     messagecontainer.append(messageElement);
//     if (position === 'left') {
//     audio.currentTime = 0;
//     audio.play().catch(error => {
//         console.log("Audio play prevented:", error);
//     });
// }
// }




// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const message = messageInput.value;
//     append(`You: ${message}`, 'right');
//     socket.emit('send', message);

//     messageInput.value = '';
// });

// //ask new user for name & let server know
// const name = prompt("Enter your name to join");
// socket.emit('new-user-joined', name);

// //if user join receive his name from server
// socket.on('user-joined', name => {
//     append(`${name} joined the chat`, 'right');
// });

// //if send receive
// socket.on('receive', data => {
//     append(`${data.name}: ${data.message}`, 'left');
// });

// socket.on('left', name => {
//     append(`${name} left the chat`, 'left');
// })









//=====================================================================================




const socket = io("http://localhost:8000");

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.getElementById('messagecontainer');

var audio = new Audio('modern_ios_chime.wav');

// append message
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message', position);
    messageContainer.append(messageElement);

    if (position === 'left') {
        audio.currentTime = 0;
        audio.play().catch(error => {
            console.log("Audio blocked:", error);
        });
    }
};

// send message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();

    if (!message) return;

    append(`You: ${message}`, 'right');
    socket.emit('send', message);

    messageInput.value = '';
});

// username
let name = prompt("Enter your name to join");
if (!name) name = "Anonymous";

socket.emit('new-user-joined', name);

// events
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'left');
});

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');
});

socket.on('left', name => {
    append(`${name} left the chat`, 'left');
});