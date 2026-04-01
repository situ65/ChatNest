 const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");


const app = express();
 

// serve frontend files
app.use(express.static(path.join(__dirname, "../public")));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const users = {};

// socket connection
io.on("connection", (socket) => {

    console.log("User connected:", socket.id);

    socket.on("new-user-joined", (name) => {
        users[socket.id] = name;
        socket.broadcast.emit("user-joined", name);
    });

    socket.on("send", (message) => {
        socket.broadcast.emit("receive", {
            message: message,
            name: users[socket.id]
        });
    });

    socket.on("disconnect", () => {
        if (users[socket.id]) {
            socket.broadcast.emit("left", users[socket.id]);
            delete users[socket.id];
        }
    });


    

}); // ✅ IMPORTANT CLOSING BRACKET

// server start (OUTSIDE socket block)
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log("🔥 Server file is running...");
});