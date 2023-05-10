const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Middleware pour gérer les CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// Récupérer tous les librairie
app.get('/librairie', (req, res) => {
  fs.readFile('librairie.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const librairie = JSON.parse(data);
    res.send(librairie);
  });
});

// Récupérer un livre par son ID
app.get('/librairie/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile('librairie.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const librairie = JSON.parse(data);
    const livre = librairie.find(l => l.id === id);
    if (!livre) {
      res.status(404).send('Livre non trouvé');
    } else {
      res.send(livre);
    }
  });
});

// Récupérer un livre par son nom
app.get('/librairie/nom/:nom', (req, res) => {
  const nom = req.params.nom;
  fs.readFile('librairie.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const librairie = JSON.parse(data);
    const livre = librairie.find(l => l.nom.toLowerCase() === nom.toLowerCase());
    if (!livre) {
      res.status(404).send('Livre non trouvé');
    } else {
      res.send(livre);
    }
  });
});

// Ajouter un nouveau livre
app.post('/librairie', (req, res) => {
  const nouveauLivre = req.body;
  fs.readFile('librairie.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const librairie = JSON.parse(data);
    librairie.push(nouveauLivre);
    const json = JSON.stringify(librairie, null, 2);
    fs.writeFile('librairie.json', json, (err) => {
      if (err) throw err;
      res.send('Livre ajouté');
    });
  });
});

// Modifier un livre par son ID
app.put('/librairie/:id', (req, res) => {
  const id = req.params.id;
  const livreModifie = req.body;
  fs.readFile('librairie.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const librairie = JSON.parse(data);
    const index = librairie.findIndex(l => l.id === id);
    if (index === -1) {
      res.status(404).send('Livre non trouvé');
    } else {
      librairie[index] = livreModifie;
      const json = JSON.stringify(librairie, null, 2);
      fs.writeFile('librairie.json', json, (err) => {
        if (err) throw err;
        res.send('Livre modifié');
      });
    }
  });
});

// Supprimer un livre par son ID
app.delete('/librairie/:id', (req, res) => {
    const id = req.params.id;
    fs.readFile('librairie.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const librairie = JSON.parse(data);
    const index = librairie.findIndex(l => l.id === id);
    if (index === -1) {
    res.status(404).send('Livre non trouvé');
    } else {
    librairie.splice(index, 1);
    const json = JSON.stringify(librairie, null, 2);
    fs.writeFile('librairie.json', json, (err) => {
    if (err) throw err;
    res.send('Livre supprimé');
    });
   }
  });
});

// Lancer le serveur
app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
    });
