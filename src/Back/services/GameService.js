const { GameModel } = require("../models/gamesModel");
const { UserModel } = require("../models/userModel");
const http_errors = require("http-errors");
const e = require("express");

const createGames = (name, price, description, genres) => {
    let possible = ["Indie", "Action", "Adventure"];
    // let result = {};
    // for (let i = 0; i < genres.length; i++) {
    //     if (possible.includes(genres[i])) {
    //         result[genres[i]] = true;
    //     }
    // } another option
    // console.log(result);
    let a = possible.reduce((acc, current) => {
        if (genres.includes(current)) {
            acc[current] = true;
            return acc;
        }
        return acc;
    }, {});
    console.log(a);
    const game = new GameModel({
        name: name,
        price: price,
        description: description,
        genres: a,
    });
    return game.save();
};
const getUserLibraryGames = (userId) => {
    return UserModel.findOne({ _id: userId }).then((user) => {
        let games = [];
        if (user) {
            user.games.forEach((gameId) => {
                games.push({ _id: gameId });
            });
            return GameModel.find({ $or: games }).then(
                (result) => {
                    return result;
                },
                (err) => {
                    console.log(err);
                }
            );
        } else {
            throw new http_errors(400, `User:${userId} do not exist`);
        }
    });
};
let getUserAvailable = (userId) => {
    return UserModel.findOne({ _id: userId }).then((user) => {
        let games = [];
        if (user) {
            user.games.forEach((gameId) => {
                games.push({ _id: gameId });
            });
            return GameModel.find({ _id: { $nin: games } }).then(
                (result) => {
                    return result;
                },
                (err) => {
                    console.log(err.message);
                }
            );
        } else {
            throw new http_errors(400, `User:${userId} do not exist`);
        }
    });
};
let addGameToUser = (userId, gameId) => {
    return UserModel.findOne({ _id: userId }).then((user) => {
        if (user) {
            return GameModel.findOne({ _id: gameId }).then((game) => {
                if (game) {
                    let isPresent = false;
                    user.games.forEach((el) => {
                        if (el === gameId) {
                            isPresent = true;
                        }
                    });
                    if (isPresent) {
                        throw new http_errors(
                            400,
                            `Such game is already present`
                        );
                    }
                    user.games.push(gameId);
                    return user.save();
                } else {
                    throw new http_errors(400, `Game:${gameId} do not exist`);
                }
            });
        } else {
            throw new http_errors(400, `User:${userId} do not exist`);
        }
    });
};
module.exports = {
    createGames,
    getUserLibraryGames,
    getUserAvailable,
    addGameToUser,
};
