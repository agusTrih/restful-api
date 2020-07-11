// ! Set up awal menggunakan express
const express = require("express");
const app = express();
// ! Untuk ejs
const ejs = require("ejs");

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// membaca file di .ejs
app.set("view engine", "ejs");

// untuk menjalankan port
const port = process.env.PORT || 3005;
const path = require("path");

// menambil data dari file data.js
const data = require("./data/data");
const anime = require("./data/data");

// membaca file statis
app.use(express.static("views"));

app.get("/", (req, res) => {
    /* untuk masuk kedalam file ejs
    tidak perlu diawali dengan /views lagi,
    langsung file atau folder yang ada 
     di dalamnya */
    res.render("Home");
});

// ini contoh router ke dalam file html
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname + "/views/Home.html"));
// });

// Get
app.get("/anime", (req, res) => {
    res.send(data);
});
app.get("/anime/:id", (req, res) => {
    const id = req.params.id;

    res.send(data[id]);
});
app.post(`/anime`, (req, res) => {
    const { title, years, id } = req.body;
    anime.push({
        title,
        years,
        id,
    });

    res.send(data);
});
// delete
app.delete(`/anime/:id`, (req, res) => {
    const id = req.params.id;

    anime.splice(id - 1, 1);
    res.send(data);
});
// put
app.put(`/anime/:id`, (req, res) => {
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
