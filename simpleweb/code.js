const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to the new world.");
});

app.listen(8080, () => {
    console.log("Logging in the new world.");
});