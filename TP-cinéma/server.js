require("dotenv").config();
const express = require("express");
let cors = require("cors");

// routes
const Films = require("../TP-cinéma/routes/api/cinema")

const app = express();

// connexion BDD
const connectDB = require("./db/conn");

app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

app.use("/api/films", Films);

// ouverture du serveur sur le port 5000
app.listen(5000, () => {
  console.log("Serveur à l'écoute"); // afficher un message dans la console.
});
