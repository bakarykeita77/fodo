
const express = require('express');
const app = express();

// Moteur d'affichage
app.set('view engine', 'ejs');
app.set('views', 'html');

app.get('/', (req, res) => {
    res.status(200).render('accueil');
});

app.get('/accueil', (req, res) => {
    res.status(200).render('accueil');
});
app.get('/propos', (req, res) => {
    res.status(200).render('propos');
});

app.use((req, res) => {
    res.status(404).render('erreur');
});

app.listen(10000, () => {
    console.log('Le serveur tourne sur le port 10000');
});