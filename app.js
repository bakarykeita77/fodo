
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
                let requete =  'SELECT * FROM champs \
                                JOIN champs_cultures \
                                ON champs.id = champs_cultures.id_champs \
                                JOIN cultures \
                                ON cultures.id = champs_cultures.id_culture \
                                JOIN lieux \
                                ON lieux.id = champs.id_lieu\
                ';

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
                    "UPDATE champs SET id_lieu = ?, culture = ? ,superficie = ?, WHERE id = ?";  /* pour modifier les donnees */
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

    // Afficher les projets
    app.get('/projet', (req, res) => {
        req.getConnection((erreur, connection) => {
            if(erreur) {
                console.log(erreur);
            }else{
            
                let lieu      = req.url.split('?')[1].split('&')[0].split('=')[1];
                let id_lieu   = req.url.split('?')[1].split('&')[1].split('=')[1];
                let culture   = req.url.split('?')[1].split('&')[2].split('=')[1];
                let id_champs = req.url.split('?')[1].split('&')[3].split('=')[1];

                res.status(200).render('projet_'+id_champs, {lieu, id_lieu, culture, id_champs});
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

                let requete =  'SELECT * FROM champs \
                                JOIN champs_cultures \
                                ON champs.id = champs_cultures.id_champs \
                                JOIN cultures \
                                ON cultures.id = champs_cultures.id_culture\
                                JOIN champs_lieux \
                                ON champs.id = champs_lieux.id_champs \
                                JOIN lieux \
                                ON lieux.id = champs_lieux.id_lieu\
                                WHERE culture = "'+culture+'" \
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

    app.get('/champs', (req, res) => {
        req.getConnection((erreur,connection) => {
            if(erreur) {
                console.log(erreur);
            }else{

                let lieu       = req.url.split('?')[1].split('&')[0].split('=')[1];
                let id_lieu    = req.url.split('?')[1].split('&')[1].split('=')[1];
                let culture    = req.url.split('?')[1].split('&')[2].split('=')[1];
                let id_champs  = req.url.split('?')[1].split('&')[3].split('=')[1];
                let superficie = req.url.split('?')[1].split('&')[4].split('=')[1];

                let requete =  'SELECT * FROM champs \
                                JOIN champs_cultures \
                                ON champs.id = champs_cultures.id_champs \
                                JOIN cultures \
                                ON cultures.id = champs_cultures.id_culture\
                                JOIN champs_lieux \
                                ON champs.id = champs_lieux.id_champs \
                                JOIN lieux \
                                ON lieux.id = champs_lieux.id_lieu\
                                JOIN champs_etapes \
                                ON champs.id = champs_etapes.id_champs \
                                JOIN travaux \
                                ON champs.id = travaux.id_champs \
                                JOIN etapes \
                                ON etapes.id = champs_etapes.id_etapes \
                                WHERE culture = "'+culture+'" \
                                AND village = "'+lieu+'"';
    
                connection.query(requete, [], (erreur, data) => {
                    if(erreur){
                        console.log(erreur);
                    }else{
                        res.status(300).redirect('/travaux?lieu='+lieu+'&id_lieu='+id_lieu+'&culture='+culture+'&id_champs='+id_champs+'&superficie='+superficie);
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
          
                let lieu      = req.url.split('?')[1].split('&')[0].split('=')[1];
                let id_lieu   = req.url.split('?')[1].split('&')[1].split('=')[1];
                let culture   = req.url.split('?')[1].split('&')[2].split('=')[1];
                let id_champs = req.url.split('?')[1].split('&')[3].split('=')[1];

                let requete =  'SELECT * \
                                FROM champs \
                                JOIN champs_cultures \
                                ON champs.id = champs_cultures.id_champs \
                                JOIN cultures \
                                ON cultures.id = champs_cultures.id_culture\
                                JOIN champs_lieux \
                                ON champs.id = champs_lieux.id_champs \
                                JOIN lieux \
                                ON lieux.id = champs_lieux.id_lieu\
                                JOIN travaux \
                                ON champs.id = travaux.id_champs \
                                JOIN etapes \
                                ON etapes.id = travaux.id_etape \
                                WHERE culture = "'+culture+'" \
                                AND village = "'+lieu+'"';

                connection.query(requete, [], (erreur, data) => {
                    if(erreur){
                        console.log(erreur);
                    }else{
                        res.status(200).render('travaux', { data, lieu, id_lieu, culture, id_champs });
                    }
                });

            }
        });
    });

 /*---------------------------------------------------------------------------------------------------------------------------------------*/

     // Insertion ou modification des donnees de la table champs
    app.post('/travaux', (req, res) => {
 
        let id_lieu   = req.body.id_lieu;
        let lieu      = req.body.lieu;
        let culture   = req.body.culture;
        let id_champs = req.body.id_champs;
        let id_etape  = req.body.etape;
        let date      = req.body.date;
        let quantite  = req.body.quantite;
        let travail   = req.body.travail;
        let moyen     = req.body.moyen;
        let personnel = req.body.personnel;
        let duree     = req.body.duree;
        let cout      = req.body.cout;


        req.getConnection((erreur,connection) => {
            if(erreur) {
                console.log(erreur);
            }else{

                let requetesql = "INSERT INTO travaux(id, id_lieu, id_champs, id_etape, date, travail, moyen, personnel, quantite, duree ,cout ) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
                let donnees = [null, id_lieu, id_champs, id_etape, date, travail, moyen, personnel, quantite, duree ,cout];
                                    
                connection.query(requetesql, donnees, (erreur, data) => {
                    if(erreur) {
                        console.log(erreur);
                    }else{
                        res.status(200).redirect('/travaux?lieu='+lieu+'&id_lieu='+id_lieu+'&culture='+culture+'&id_champs='+id_champs);
                    }
                });
            }
        });
    });

 /*---------------------------------------------------------------------------------------------------------------------------------------*/

 // Affichage du fiche des travaux journaliers
    app.get('/journal', (req, res) => {                                    
        req.getConnection((erreur, connection) => {
            if(erreur) {
                console.log(erreur);
            }else{
                
                let lieu      = req.url.split('?')[1].split('&')[0].split('=')[1];
                let id_lieu   = req.url.split('?')[1].split('&')[1].split('=')[1];
                let culture   = req.url.split('?')[1].split('&')[2].split('=')[1];
                let id_champs = req.url.split('?')[1].split('&')[3].split('=')[1];

                let requete =  'SELECT * FROM champs \
                                JOIN champs_cultures \
                                ON champs.id = champs_cultures.id_champs \
                                JOIN cultures \
                                ON cultures.id = champs_cultures.id_culture \
                                JOIN lieux \
                                ON lieux.id = champs.id_lieu\
                                WHERE culture = "'+culture+'" \
                                AND village = "'+lieu+'" \
                ';


                connection.query(requete, [], (erreur, data) => {
                    if(erreur) {
                        console.log(erreur);
                    }else{
                        res.status(200).render('journal', {data, lieu, id_lieu, culture, id_champs});
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
                
                let lieu      = req.url.split('?')[1].split('&')[0].split('=')[1];
                let id_lieu   = req.url.split('?')[1].split('&')[1].split('=')[1];
                let culture   = req.url.split('?')[1].split('&')[2].split('=')[1];
                let id_champs = req.url.split('?')[1].split('&')[3].split('=')[1];

                let requete =  'SELECT * FROM champs \
                                JOIN champs_cultures \
                                ON champs.id = champs_cultures.id_champs \
                                JOIN cultures \
                                ON cultures.id = champs_cultures.id_culture \
                                JOIN champs_lieux \
                                ON champs.id = champs_lieux.id_champs \
                                JOIN lieux \
                                ON lieux.id = champs_lieux.id_lieu \
                                WHERE culture = "'+culture+'" \
                                AND village = "'+lieu+'" \
                ';

                                
                connection.query(requete, [], (erreur, data) => {
                    if(erreur){
                        console.log(erreur);
                    }else{
                        res.status(200).render('champs_info', { data, lieu, id_lieu, culture, id_champs });
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