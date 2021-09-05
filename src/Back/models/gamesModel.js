const mongoose = require("mongoose");
const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
        unique: false,
    },
    description: {
        type: String,
        required: true,
        default: "game description",
    },
    genres: {
        Indie: {
            type: Boolean,
            default: false,
            required: true,
        },
        Action: {
            type: Boolean,
            default: false,
            required: true,
        },
        Adventure: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
});
const GameModel = mongoose.model("games", GameSchema);
module.exports = { GameModel };
