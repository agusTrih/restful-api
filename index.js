const express = require("express");
const app = express();
const ejs = require("ejs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 3005;
const path = require("path");

const data = require("./data/data");
const anime = require("./data/data");
// CRUD
app.get("/", (req, res) => res.send("selamat datang di anime collection"));
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
