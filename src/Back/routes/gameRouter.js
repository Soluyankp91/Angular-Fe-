const express = require("express");
const GameRouter = express.Router();
const { authMiddleware } = require("../middlewares/AuthMiddleware");
const {
    getUserLibraryGames,
    getUserAvailable,
    addGameToUser,
} = require("../services/GameService");

GameRouter.use(authMiddleware);
GameRouter.get("/current", (req, res) => {
    const { _id } = req.user;
    getUserLibraryGames(_id).then(
        (result) => {
            res.status(200).json({
                games: result,
            });
        },
        (err) => {
            res.status(400).json({ message: "Something went wrong" });
        }
    );
});
GameRouter.get("/available", (req, res) => {
    const { _id } = req.user;
    getUserAvailable(_id).then(
        (result) => {
            res.status(200).json({
                games: result,
            });
        },
        (err) => {
            res.status(400).json({ message: "Something went wrong" });
        }
    );
});
GameRouter.post("/addToUser/:gameId", (req, res) => {
    const { gameId } = req.params;
    const { _id } = req.user;
    addGameToUser(_id, gameId).then(
        () => {
            res.status(200).json({ message: "Success" });
        },
        (err) => {
            res.status(400).json({ message: "Something went wrong" });
        }
    );
});
module.exports = {
    GameRouter,
};
