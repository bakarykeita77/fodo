
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

    
 /*---------------------------------------------------------------------------------------------------------------------------------------*/

//Recuperation et affichage des data de la base de donnees
    app.get('/', (req, res) => {
        req.getConnection((erreur,connection) => {
            if(erreur) {
                console.log(erreur);
            }else{
                let requete =  'SELECT * FROM champs';

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

 /*---------------------------------------------------------------------------------------------------------------------------------------*/

 // Insertion ou modification des donnees de la table champs
    app.post('/', (req, res) => {
        
        let id = (req.body.id === "") ? null : req.body.id;
        let id_lieu = req.body.id_lieu;
        let culture = req.body.culture;
        let superficie = req.body.superficie;
        
        if(id_lieu == '')      { return; } 
        if(culture == '')      { return; } 
        if(superficie == '')   { return; } 

        req.getConnection((erreur,connection) => {
            if(erreur) {
                console.log(erreur);
            }else{

                let requetesql = (id === null) ? 
                    "INSERT INTO champs(id, id_lieu, culture ,superficie ) VALUES(?,?,?,?,?)" :  /* pour inserer les donnees */
                    "UPDATE champs SET id_lieu = ?, culture = ? ,superficie = ? WHERE id = ?";  /* pour modifier les donnees */
                let donnees = (id === null) ? 
                    [null, id_lieu, culture, superficie] : /* pour inserer les donnees */
                    [id_lieu, culture, superficie, id];    /* pour modifier les donnees */
                                    
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

/*---------------------------------------------------------------------------------------------------------------------------------------*/

    app.get('/projets', (req, res) => {
        req.getConnection((erreur, connection) => {
            if(erreur) {
                console.log(erreur);
            }else{
                
                let id_champs   = req.url.split('?')[1].split('=')[1];

                let requete = 'SELECT * FROM projets_list';

                connection.query(requete, [], (erreur, data) => {
                    if(erreur) {
                        console.log(erreur);
                    }else{
                        res.status(200).render('projets', {data, id_champs});
                    }
                });
            }
        });
    });


/*---------------------------------------------------------------------------------------------------------------------------------------*/

    // Afficher les projets
    app.get('/projet', (req, res) => {
        req.getConnection((erreur, connection) => {
            if(erreur) {
                console.log(erreur);
            }else{

                let id_champs   = req.url.split('?')[1].split('=')[1];
                let requete  = 'SElECT * FROM projets \
                                JOIN projets_list \
                                ON projets_list.id = projets.id_champs\
                                WHERE id_champs = '+id_champs;

                connection.query(requete, [], (erreur, data) => {
                    if(erreur) {
                        console.log(erreur);
                    }else{
                        res.status(200).render('projet', {data, id_champs});
                    }
                });

            }
        });
    });

/*---------------------------------------------------------------------------------------------------------------------------------------*/

    app.post('/projet', (req, res) => {

        let id          = req.body.input_0;
        let id_champs = req.body.input_1;
        let no          = req.body.input_2;
        let tache       = req.body.input_3;
        let duree       = req.body.input_4;
        let debut       = req.body.input_5;
        let fin         = req.body.input_6;
        let moyen       = req.body.input_7;
        let personnel   = req.body.input_9;
        let cout        = req.body.input_10;

        id        = parseInt(id);
        personnel = parseInt(personnel);
        cout      = parseInt(cout);

        req.getConnection((erreur, connection) => {
            if(erreur) {
                console.log(erreur);
            }else{

                let requete = "UPDATE projets SET no = ?, taches = ?, duree = ?, debut = ?, fin = ?, moyen = ?, personnel = ?, cout = ? WHERE id = ?";
                let modifications = [no, tache, duree, debut, fin, moyen, personnel, cout, id];

                connection.query(requete, modifications, (erreur, data) => {
                    if(erreur) {
                        console.log(erreur);
                    }else{
                        res.status(300).redirect('/projet?id_champs='+id_champs);
                        console.log('Modifications reussies !');
                    }
                    
                });
            }
        });
    });

/*---------------------------------------------------------------------------------------------------------------------------------------*/

    app.get('/cultures', (req, res) => {
        req.getConnection((erreur,connection) => {
            if(erreur) {
                console.log(erreur);
            }else{

                let culture    = req.url.split('?')[1].split('=')[1];

                let requete =  'SELECT * FROM champs  WHERE culture = "'+culture+'" \
                ';
                
                connection.query(requete, [], (erreur, data) => {
                    if(erreur){
                        console.log(erreur);
                    }else{
                        res.status(200).render('cultures', { data, culture });
                    }
                });
            }
        });
    });

 /*---------------------------------------------------------------------------------------------------------------------------------------*/

    app.get('/lieux', (req,res) => {

        req.getConnection((erreur, connection) => {
            if(erreur) {
                console.log(erreur);
            }else{

                let lieu = req.url.split('?')[1].split('=')[1];
                let requete =  'SELECT * FROM champs WHERE lieu = "'+lieu+'"';

                connection.query(requete, [], (erreur, data) => {
                    if(erreur) {
                        console.log(erreur);
                    }else{
                        res.status(200).render('lieux', {data, lieu});
                    }
                });
                
            }
        });
    });

 /*---------------------------------------------------------------------------------------------------------------------------------------*/

    app.get('/champs', (req, res) => {
        req.getConnection((erreur,connection) => {
            if(erreur) {
                console.log(erreur);
            }else{

                let id_champs  = req.url.split('?')[1].split('=')[1];
                let requete =  'SELECT * FROM champs WHERE id = '+id_champs;
    
                connection.query(requete, [], (erreur, data) => {
                    if(erreur){
                        console.log(erreur);
                    }else{
                        res.status(300).redirect('/travaux?id_champs='+id_champs);
                    }
                });
            }
        });
    });

 /*---------------------------------------------------------------------------------------------------------------------------------------*/

    app.get('/travaux', (req, res) => {
        req.getConnection((erreur,connection) => {
            if(erreur) {
                console.log(erreur);
            }else{
          
                let id_champs   = req.url.split('?')[1].split('=')[1];

                let requete =  "SELECT * FROM travaux WHERE id_champs = "+id_champs;

                connection.query(requete, [], (erreur, data) => {
                    if(erreur){
                        console.log(erreur);
                    }else{
                        res.status(200).render('travaux', { data, id_champs });
                    }
                });

            }
        });
    });

 /*---------------------------------------------------------------------------------------------------------------------------------------*/

     // Insertion ou modification des donnees de la table travaux
    app.post('/travaux', (req, res) => {

        let id        = req.body.input_0;
        
        let id_champs = (id === undefined) ? req.body.id_champs : req.body.input_1;
        let id_etape  = (id === undefined) ? req.body.id_etape  : req.body.input_2;
        let date      = (id === undefined) ? req.body.date      : req.body.input_3;
        let travail   = (id === undefined) ? req.body.travail   : req.body.input_4;
        let moyen     = (id === undefined) ? req.body.moyen     : req.body.input_5;
        let quantite  = (id === undefined) ? req.body.quantite  : req.body.input_6;
        let personnel = (id === undefined) ? req.body.personnel : req.body.input_7;
        let duree     = (id === undefined) ? req.body.duree     : req.body.input_8;
        let cout      = (id === undefined) ? req.body.cout      : req.body.input_9;

        id_champs = parseInt(id_champs);
        id_etape  = parseInt(id_etape);
        personnel = parseInt(personnel);
        duree     = parseInt(duree);
        cout      = parseInt(cout);


        req.getConnection((erreur,connection) => {
            if(erreur) {
                console.log(erreur);
            }else{

                let requete_1 = "INSERT INTO travaux(id, id_champs, id_etape, date, travail, moyen, quantite, personnel, duree ,cout ) VALUES(?,?,?,?,?,?,?,?,?,?)";
                let requete_2 = "UPDATE travaux SET date=?, travail=?, moyen=?, quantite=?, personnel=?, duree=?, cout=? WHERE id=?";
                let donnees_1 = [null, id_champs, id_etape, date, travail, moyen, quantite, personnel, duree ,cout];
                let donnees_2 = [date, travail, moyen, quantite, personnel, duree, cout, id];
                let message_de_succes = (id == undefined) ? "Travail enregistre !" : "Modifications enregistree !";

                let requetesql = (id == undefined) ? requete_1 : requete_2;
                let donnees    = (id == undefined) ? donnees_1 : donnees_2;
                                         
                connection.query(requetesql, donnees, (erreur, data) => {
                    if(erreur) {
                        console.log(erreur);
                    }else{
                        res.status(200).redirect('/travaux?id_champs='+id_champs);
                        console.log(message_de_succes);
                    }
                });
            }
        });
    });

 /*---------------------------------------------------------------------------------------------------------------------------------------*/

    app.get('/info', (req, res) => {
        req.getConnection((erreur,connection) => {
            if(erreur) {
                console.log(erreur);
            }else{
                
                let id_champs = req.url.split('?')[1].split('=')[1];

                let requete =  'SELECT * FROM champs \
                                JOIN champs_cultures \
                                ON champs.id = champs_cultures.id_champs \
                                JOIN cultures \
                                ON cultures.id = champs_cultures.id_culture \
                                JOIN champs_lieux \
                                ON champs.id = champs_lieux.id_champs \
                                JOIN lieux \
                                ON lieux.id = champs_lieux.id_lieu \
                                WHERE champs.id = "'+id_champs+'" \
                ';

                                
                connection.query(requete, [], (erreur, data) => {
                    if(erreur){
                        console.log(erreur);
                    }else{
                        res.status(200).render('champs_info', { data, id_champs });
                    }
                });
            }
        });
    });

 /*---------------------------------------------------------------------------------------------------------------------------------------*/

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

 /*---------------------------------------------------------------------------------------------------------------------------------------*/
      
    app.get('/propos', (req, res) => {
        res.status(200).render('propos');
    });

 /*---------------------------------------------------------------------------------------------------------------------------------------*/
    
 // Suppression des donnees de la table champs
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

 /*---------------------------------------------------------------------------------------------------------------------------------------*/

    app.use((req, res) => {
        res.status(404).render('erreur');
    });

 /*---------------------------------------------------------------------------------------------------------------------------------------*/

    app.listen(3000, () => {
        console.log('Le serveur tourne sur le port 3000');
    });