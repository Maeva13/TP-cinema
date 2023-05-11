const express = require("express");
const router = express.Router();
const Film = require("../../models/Cinema");

// Importer le modèle Cinema
const Cinema = require("../../models/Cinema");

// @route GET api/cinema/test
router.get("/test", (req, res) => res.send("Route de test du cinéma!"));

// @route GET api/cinema
router.get("/", (req, res) => {
  Cinema.find()
    .then((films) => res.json(films))
    .catch((err) =>
      res.status(404).json({ noFilmsFound: "Aucun film trouvé..." })
    );
});

// @route GET api/cinema/:id
router.get("/:titre", async (req, res) => {
  try {
    const film = await Cinema.findOne({
      where: { titre: req.params.titre },
    });
    if (film) {
      res.json({
        titre: film.titre,
        realisateur: film.realisateur,
        acteurs: film.acteurs,
        description: film.description,
        image: film.image,
      });
    } else {
      res.status(404).json({ noFilmFound: "Aucun film trouvé..." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


// @route POST api/cinema
router.post("/", (req, res) => {
  Cinema.create(req.body)
    .then((film) => res.json({ msg: "Film ajouté avec succès !" }))
    .catch((err) =>
      res.status(400).json({ error: "Impossible d'ajouter le film..." })
    );
});

// @route PUT api/cinema/:id
router.put("/:id", (req, res) => {
  Cinema.findByIdAndUpdate(req.params.id, req.body)
    .then((film) => res.json({ msg: "Mise à jour effectuée avec succès !" }))
    .catch((err) =>
      res.status(400).json({ error: "Impossible de mettre à jour le film..." })
    );
});

// @route DELETE api/cinema/:id
router.delete("/:id", (req, res) => {
  Cinema.findByIdAndRemove(req.params.id, req.body)
    .then((film) => res.json({ msg: "Film supprimé avec succès !" }))
    .catch((err) =>
      res.status(404).json({ error: "Impossible de supprimer le film..." })
    );
});

module.exports = router;
