const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("public"));

const server = http.createServer(app);
const io = new Server(server);

function getBotReply(message) {
    message = message.toLowerCase();

    if (message.includes("leave")) {
        return "Employees get 20 paid leaves per year.";
    }
    else if (message.includes("timing")) {
        return "Office working hours are 9:30 AM to 6:30 PM.";
    }
    else if (message.includes("dress")) {
        return "Company follows smart casual dress code.";
    }
    else if (message.includes("salary")) {
        return "Salary is credited on the last working day of every month.";
    }
    else {
        return "Ask me about HR policies, onboarding or company rules.";
    }
}

io.on("connection", (socket) => {
    console.log("User Connected");

    socket.on("userMessage", (msg) => {
        const reply = getBotReply(msg);
        socket.emit("botMessage", reply);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected");
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
