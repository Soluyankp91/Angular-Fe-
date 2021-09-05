const express = require("express");
const GameRouter_2 = express.Router();
const { createGames } = require("../services/GameService");

GameRouter_2.post("/createGame", (req, res) => {
    let { name, price, description, genres } = req.body;
    createGames(name, price, description, genres).then(
        () => {
            res.status(200).json({ message: "Success" });
        },
        (err) => {
            res.status(400).json({ message: err.message });
        }
    );
});
module.exports = { GameRouter_2 };
