// ! Set up awal menggunakan express
const express = require("express");
const app = express();
// ! Untuk ejs
const ejs = require("ejs");
app.set("view engine", "ejs");
// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// untuk menjalankan port
const port = process.env.PORT || 3005;
const path = require("path");

// menambil data dari file data.js
const data = require("./data/data");
const anime = require("./data/data");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/home.ejs"));
});
app.get("/anime", (req, res) => {
    res.send(data);
});
app.post(`/anime/item`, (req, res) => {
    const { title, years, id } = req.body;
    anime.push({
        title,
        years,
        id,
    });

    res.send(data);
});

app.delete(`/anime/item/:id`, (req, res) => {
    const id = req.params.id;

    anime.splice(id - 1, 1);
    res.send(data);
});
app.put(`/anime/item/:id`, (req, res) => {
    const id = req.params.id;
    const { title, years } = req.body;
    anime.splice(id - 1, 1, {
        title,
        years,
        id,
    });
    res.send(data);
});

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
