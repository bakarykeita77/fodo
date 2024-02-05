
const express = require('express');
const mysql = require('mysql');
const myconnection = require('express-myconnection');
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

sharp('./images/logos/houe.jpg')
    .webp()
    .toFile('houe.webp')
    .then((info) => { console.log(info); })
.catch(erreur => {console.log(erreur);});

const app = express();


//Extraction des donnees du formulaire
    app.use(express.urlencoded({extended: false}));

//Connection a la base de donnees
    app.use(myconnection(mysql,connect,'pool'));

//Moteur d'affichage
    app.set('view engine', 'ejs');
    app.set('views', 'html');

//Recuperation et affichage des data de la base de donnees
    app.get('/', (req, res) => {
        req.getConnection((erreur,connection) => {
            if(erreur) {
                console.log(erreur);
            }else{
                connection.query('SELECT * FROM champs', [],(erreur,data) => {
                    if(erreur){
                        console.log(erreur);
                    }else{
                        res.status(200).render('accueil', { data });
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
        let nom_de_localite = req.body.localite;
        let nombre_de_champs = req.body.nombre_de_champs;
        let cultures = req.body.cultures;
       
        if(nom_de_localite == '')  { return; } 
        if(nombre_de_champs == '') { return; } 
        if(cultures == '')         { return; } 

        req.getConnection((erreur,connection) => {
            if(erreur) {
                console.log(erreur);
            }else{

                let requetesql = (id === null) ? 
                    "INSERT INTO champs(id, localite, nombre_de_champs, cultures) VALUES(?,?,?,?)" : 
                    "UPDATE champs SET localite = ?, nombre_de_champs = ?, cultures = ? WHERE id = ?";
                let donnees = (id === null) ? 
                    [null, nom_de_localite, nombre_de_champs, cultures] : 
                    [nom_de_localite, nombre_de_champs, cultures, id];
                                    
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
    app.use('/images', express.static('C:/Users/ABDESOUZA/Desktop/fodo/images/'));

    
    app.listen(3000, () => {
        console.log('Le serveur tourne sur le port 3000');
    });