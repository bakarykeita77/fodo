
const express = require('express');
const mysql = require('mysql');
const myconnection = require('express-myconnection');

const connect = {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'fodo'
}

const app = express();

//Gestion des erreurs
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
                connection.query('SELECT * FROM champ', [],(erreur,data) => {
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
                connection.query('SELECT * FROM champ', [], (erreur, data) => {
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

    app.use((req, res) => {
        res.status(404).render('erreur');
    });

    app.listen(3000, () => {
        console.log('Le serveur tourne sur le port 3000');
    });