import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        uppercase: true,
        unique: [true, "name is not Unique"],
    },
    agelimit: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxLength: [300, "words limit exceeds"]
    },
    genre: {
        type: [String],
        enum: {
            values: ["comedy", "drama", "horror", "romantic", "adventure"],
            message: '{VALUE} is not in genre'
        },
        required: true,
        lowercase: true
    },
    posterUrl: {
        type: String,
        required: [true, "Poster Url is not provided"],

    },
    releaseDate: {
        type: Date,
        required: true,
    },
    language: {
        type: String,
        required: true,
        uppercase: true
    },
    cast: {
        type: [String],
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    }
},{timestamps:true})

export const Movie = mongoose.model("Movie",movieSchema);