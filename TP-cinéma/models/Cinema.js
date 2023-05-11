const mongoose = require("mongoose");

const CinemaSchema = new mongoose.Schema({
  titre: String,
  description: String,
  acteurs: [String],
  realisateur: String,
  image: String,
});

module.exports = mongoose.model("Film", CinemaSchema, "Film");
