const express = require("express");
var app = express();
let port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/data/json", (req, res) => {
    res.send(importData);
});

app.listen(port, () => {
    console.log('App is listening on port http://localhost: ${port}');
});