
    let forms_container = document.getElementById('forms_container');
    let form_culture = document.getElementById('form_culture');
    let form_culture_titre = document.getElementById('form_culture_titre');
    let nav_laterale_li = document.querySelectorAll('#nav_laterale_list li');
    let cultures = document.querySelectorAll('#nav_laterale_list li .culture');
    let id_lieux = document.querySelectorAll('#nav_laterale_list li .id_lieu');
    let nav_laterale_plus = document.getElementById('nav_laterale_plus');
    let submit = document.getElementById('submit');

    let trois_points = document.querySelectorAll('.trois_points');
    let options_container = document.querySelectorAll('.options_container');
    let modifier_champs = document.getElementById('modifier_champs');
    let supprimer_champs = document.getElementById('supprimer_champs');

    let asides_container = document.getElementById('asides_container');
    let nom_de_la_culture = document.getElementById('nom_de_la_culture');
    let image_de_localite = document.querySelector('#image_de_localite img');
    let cultures_cards = document.querySelectorAll('.cultures_cards');
    let liste_exaustive_des_cultures = document.getElementById('liste_exaustive_des_cultures');
    let details_de_champs = document.getElementById('details_de_champs');


/*----------------------------------------------------------------------------------------------------------------*/ 


    for (let i = 0; i < cultures.length; i++) {

        let element = cultures[i];
        
        element.addEventListener('click', () => {
            
            afficherCultureCards();
            chargerCultureImage();
            chargemerEtAfficherDetailsDuChamps();
            fermetureDesDetailsDuChamps();
            
     
            function afficherCultureCards() {
                for (let i = 0; i < cultures_cards.length; i++) {

                    let cards_container = cultures_cards[i];
                    let element_id = cultures_cards[i].id.split('_')[2];

                    
                    if(element.textContent === element_id) {
                        cards_container.style.display = 'flex';
                    }else{
                        cards_container.style.display = 'none';
                    }
                }  
            }
            function chargerCultureImage() {
                nom_de_la_culture.innerHTML = "Champs de "+element.textContent;
                image_de_localite.src = './images/cultures/'+element.textContent+'.jpg';
            }
            function chargementEtAffichageDesDetailsDuChamps() {

                let cards = document.querySelectorAll('.card');
                cards.forEach(element => {
                    element.addEventListener('click', () => {

                        chargementDesDetailsDuChamps();
                        affichageVertical(details_de_champs);

                        
                        function chargementDesDetailsDuChamps() {
                            let nom_de_la_culture = document.getElementById('nom_de_la_culture').innerHTML;
                            document.getElementById('nom_de_la_culture').innerHTML = nom_de_la_culture;
                        }
                    });
                });
            }
            function chargemerEtAfficherDetailsDuChamps() {

            }
            function fermetureDesDetailsDuChamps() {
                document.getElementById('details_foot').addEventListener('click', () => {
                    fermetureVertical(details_de_champs);
                })
            }
        });       
    }

    nav_laterale_plus.addEventListener('click', () => { 
        affichageHorizontal(form_culture); 
        form_culture_titre.innerHTML = '<span id="titre_comentaire">Ajouter un nouveau champs</span><br><br>';
        viderLesChamps();
        
        image_de_localite.src = '';
    });

    submit.addEventListener('click', () => { fermetureHorizontal(form_culture); });
    asides_container.addEventListener('click', () => { fermetureHorizontal(form_culture); });
    form_culture_fermeture.addEventListener('click', () => { fermetureHorizontal(form_culture); });

    trois_points.forEach(element => {
        element.addEventListener('click', function() {

            let container_id = this.nextElementSibling.id;
            let container_actif = this.nextElementSibling;
            let option_active = document.querySelector('#'+container_id+' div');
            let localite = this.previousElementSibling.previousElementSibling.textContent;

            for(var i=0; i<options_container.length; i++) {
                if(options_container[i].id !== container_id) {

                    let container_inactif = document.getElementById(options_container[i].id);
                    let option_inactif = document.querySelector('#'+container_inactif.id+' .champs_options');

                    fermetureHorizontal(option_inactif);
                    container_inactif.parentElement.style.color = 'black';
                    container_inactif.parentElement.style.backgroundColor = 'white';
                    
                    document.querySelector('#'+container_id+' .modifier_champs').addEventListener('click', () => {
                        masquer(option_active);
                        affichageHorizontal(form_culture);
                        form_culture_titre.innerHTML = '<span id="titre_comentaire">Modifier le champs de</span> <h3 id="titre">'+localite+'</h3>';
                    });
                    document.querySelector('#'+container_id+' .supprimer_champs').addEventListener('click', () => {
                        fermetureHorizontal(option_active);
                    });
                }
            }

            affichageHorizontal(option_active);
            nav_laterale_plus.addEventListener('click', () => { fermetureHorizontal(option_active); });
            container_actif.parentElement.style.color = 'green';
            container_actif.parentElement.style.backgroundColor = '#0080000a';
        });
    });


/*----------------------------------------------------------------------------------------------------------------*/ 



    function affichageVertical(element) {
        element.parentElement.style.display = 'block'; 
        element.parentElement.style.height = 'auto'; 
        element.style.animation = 'glisser_de_haut 0.5s'; 
    }
    function fermetureVertical(element) {
        element.style.animation = 'glisser_en_haut 0.5s'; 
        setTimeout(() => {
            element.parentElement.style.height = 0;
            element.parentElement.style.display = 'none';
        }, 200);
    }
    function affichageHorizontal(element) {
        element.parentElement.style.display = 'block'; 
        element.style.animation = 'glisser_de_gauche 0.25s'; 
    }
    function fermetureHorizontal(element) {
        element.style.animation = 'glisser_a_gauche 0.25s'; 
        setTimeout(() => {
            element.parentElement.style.display = 'none';
        }, 200);
    }
    function masquer(element) {
        element.parentElement.style.display = 'none';
    }
    function charger_form_culture(id, id_lieu, culture, superficie, observations) {
        document.getElementById('id').value = id;
        document.getElementById('id_lieu').value = id_lieu;
        document.getElementById('culture').value = culture;
        document.getElementById('superficie').value = superficie;
        document.getElementById('observations').value = observations;
    }
    function supprimer(id) {
        let chemin = '/'+id;
        
        fetch(chemin, {method : 'DELETE'})
        .then(response => console.log(response.json()))
        .then(donnee => window.location.href = donnee.routeRacine)
        .catch(erreur => console.log(erreur))
    }
    function viderLesChamps() {
        let inputs = document.querySelectorAll('input:not(#submit)');
        for(var i=0; i<inputs.length; i++) { inputs[i].value = ''; }
    }