
const express = require('express');
const mysql = require('mysql');
const myconnection = require('express-myconnection');
const { LONG } = require('mysql/lib/protocol/constants/types');
const { urlencoded } = require('express');

const connect = {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'fodo'
}

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
                connection.query('INSERT INTO champs(id, localite, nombre_de_champs, cultures) VALUES(?,?,?,?)', [null, nom_de_localite, nombre_de_champs, cultures], (erreur, data) => {
                    if(erreur) {
                        console.log(erreur);
                    }else{
                        res.status(300).redirect('/');
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