
// Anush Bundel 2023BCS0005

const socket = io();

socket.on("connect", () => {
    console.log("Connected to server");
});

socket.on("locationUpdate", (data) => {

    document.getElementById("location").innerHTML = `
    City: ${data.city} <br>
    Region: ${data.region} <br>
    Country: ${data.country} <br>
    Latitude: ${data.latitude} <br>
    Longitude: ${data.longitude} <br>
    Updated: ${data.time}
    `;

});
