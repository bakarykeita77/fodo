
const express = require('express');
const mysql = require('mysql');
const myconnection = require('express-myconnection');
const path = require('path');
const sharp = require('sharp');
const { LONG } = require('mysql/lib/protocol/constants/types');
const { urlencoded } = require('express');

const connect = {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'fodo'
}

// sharp('./images/logos/houe.jpg')
//     .webp()
//     .toFile('houe.webp')
//     .then((info) => { console.log(info); })
// .catch(erreur => {console.log(erreur);});

const app = express();

//Rendre les contenus des dossiers public et view disponibles
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'view')));

//Extraction des donnees du formulaire
    app.use(express.urlencoded({extended: false}));

//Connection a la base de donnees
    app.use(myconnection(mysql,connect,'pool'));

//Moteur d'affichage
    app.set('view engine', 'ejs');
    app.set('views', 'view');

    
//Recuperation et affichage des data de la base de donnees
    app.get('/', (req, res) => {
        req.getConnection((erreur,connection) => {
            if(erreur) {
                console.log(erreur);
            }else{
                let requete =  'SELECT * FROM champs INNER JOIN lieux ON champs.id_lieu = lieux.id';
                connection.query(requete, [], (erreur, data) => {
                    if(erreur){
                        console.log(erreur);
                    }else{
                        res.status(200).render('index', { data });
                    }
                });
            }
        });
    });

    app.get('/culture', (req, res) => {
        req.getConnection((erreur,connection) => {
            if(erreur) {
                console.log(erreur);
            }else{
                let culture = req.url.split('?')[1].split('=')[1];
                let requete =  'SELECT * FROM champs INNER JOIN lieux ON champs.id_lieu = lieux.id AND champs.culture = "'+culture+'"';
                connection.query(requete, [], (erreur, data) => {
                    if(erreur){
                        console.log(erreur);
                    }else{
                        res.status(200).render('culture', { data });
                        console.log(data);
                    }
                });
            }
        });
    });

    app.get('/accueil', (req, res) => {
        req.getConnection((erreur,connection) => {
            if(erreur) 
            { console.log(erreur); }
            else
            { 
                connection.query('SELECT * FROM champs', [], (erreur, data) => {
                    if(erreur)
                    { console.log(erreur); }
                    else
                    { res.status(200).render('accueil', { data }); }
                });
             }
        });
        
    });
    
    app.get('/propos', (req, res) => {
        res.status(200).render('propos');
    });


//Envoi des donnees a la base de donnees
    app.post('/', (req, res) => {
 
        let id = (req.body.id === "") ? null : req.body.id;
        let id_lieu = req.body.id_lieu;
        let culture = req.body.culture;
        let superficie = req.body.superficie;
        let observations_de_la_culture = req.body.observations_de_la_culture;
       
        if(id_lieu == '')      { return; } 
        if(culture == '')      { return; } 
        if(superficie == '')   { return; } 
        if(observations_de_la_culture == '') { return; } 

        req.getConnection((erreur,connection) => {
            if(erreur) {
                console.log(erreur);
            }else{

                let requetesql = (id === null) ? 
                    "INSERT INTO champs(id, id_lieu, culture ,superficie ,observations_de_la_culture) VALUES(?,?,?,?,?)" : 
                    "UPDATE champs SET id_lieu = ?, culture = ? ,superficie = ?, observations_de_la_culture = ? WHERE id = ?";
                let donnees = (id === null) ? 
                    [null, id_lieu, culture, superficie, observations_de_la_culture] : 
                    [id_lieu, culture, superficie, observations_de_la_culture, id];
                                    
                connection.query(requetesql, donnees, (erreur, data) => {
                    if(erreur) {
                        console.log(erreur);
                    }else{
                        res.status(300).redirect('/');
                    }
                });
            }
        });
    });

//Suppression des donnees de la base de donnees
    app.delete('/:id', (req, res) => {
        req.getConnection((erreur, connection) => {
            if(erreur) {
                console.log(erreur);
            }else{
                let id = req.params.id;
              
                connection.query('DELETE FROM champs WHERE id = ?', [id], (erreur, data) => {
                    if(erreur) {
                        console.log(erreur);
                    }else{
                        res.status(200).json({routeRacine:'/'});
                    }
                });
            }
        });
    });

    app.use((req, res) => {
        res.status(404).render('erreur');
    });

    
    app.listen(3000, () => {
        console.log('Le serveur tourne sur le port 3000');
    });

    function recuperationEtAffichageDesDonnees(localite) {
        app.get('/culture', (req, res) => {
            req.getConnection((erreur, connection) => {
                if(erreur) { console.log(erreur); }
                else{
                    connection.query('SELECT cultures FROM champs WHERE localite = "'+localite+'"', [], (erreur, data) => {
                        if(erreur) { console.log(erreur); }
                        else{
                            console.log(data);
                            res.status(200).render('culture', { data });
                        }
                    });
                }
            });
        });
    }