
// Anush Bundel 2023BCS0005

const express = require("express");
const http = require("http");
const axios = require("axios");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = 3000;

app.use(express.static("public"));

// WebSocket connection
io.on("connection", (socket) => {

    console.log("Client connected");

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });

});

async function fetchLocation() {

    try {
        const response = await axios.get("http://ip-api.com/json/"); // External Geolocation API
        const data = response.data;

        const location = {
            city: data.city,
            region: data.regionName,
            country: data.country,
            latitude: data.lat,
            longitude: data.lon,
            time: new Date().toLocaleTimeString()
        };

        // Send location to all connected clients
        io.emit("locationUpdate", location);

    } catch (error) {
        console.error("Location fetch error:", error);
    }

}

// Update location every 5 seconds
setInterval(fetchLocation, 5000);

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
