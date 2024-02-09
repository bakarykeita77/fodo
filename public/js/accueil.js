
    let form_container = document.getElementById('form_container');
    let form = document.getElementById('form');
    let form_titre = document.getElementById('form_titre');
    let nav_laterale_plus = document.getElementById('nav_laterale_plus');
    let submit = document.getElementById('submit');

    let trois_points = document.querySelectorAll('.trois_points');
    let options_container = document.querySelectorAll('.options_container');
    let modifier_champs = document.getElementById('modifier_champs');
    let supprimer_champs = document.getElementById('supprimer_champs');

    let asides_container = document.getElementById('asides_container');


/*----------------------------------------------------------------------------------------------------------------*/ 


    nav_laterale_plus.addEventListener('click', () => { 
        afficher(form); 
        form_titre.innerHTML = '<span id="titre_comentaire">Ajouter un nouveau champs</span><br><br>';
        viderLesChamps();
    });

    submit.addEventListener('click', () => { fermer(form); });
    asides_container.addEventListener('click', () => { fermer(form); });
    form_fermeture.addEventListener('click', () => { fermer(form); });

    trois_points.forEach(element => {
        element.addEventListener('click', function() {

            let container_id = this.nextElementSibling.id;
            let container_actif = this.nextElementSibling;
            let option_active = document.querySelector('#'+container_id+' div');
            let localite = this.previousElementSibling.textContent;

            for(var i=0; i<options_container.length; i++) {
                if(options_container[i].id !== container_id) {
                    let container_inactif = document.getElementById(options_container[i].id);
                    let option_inactif = document.querySelector('#'+container_inactif.id+' .champs_options');

                    fermer(option_inactif);
                    container_inactif.parentElement.style.color = 'black';
                    container_inactif.parentElement.style.backgroundColor = 'white';
                    
                    document.querySelector('#'+container_id+' .modifier_champs').addEventListener('click', () => {
                        masquer(option_active);
                        afficher(form);
                        form_titre.innerHTML = '<span id="titre_comentaire">Modifier le champs de</span> <h3 id="titre">'+localite+'</h3>';
                    });
                    document.querySelector('#'+container_id+' .supprimer_champs').addEventListener('click', () => {
                        fermer(option_active);
                    });
                }
            }

            afficher(option_active);
            nav_laterale_plus.addEventListener('click', () => { fermer(option_active); });
            container_actif.parentElement.style.color = 'green';
            container_actif.parentElement.style.backgroundColor = '#0080000a';
        });
    });


/*----------------------------------------------------------------------------------------------------------------*/ 


    function afficher(element) {
        element.parentElement.style.display = 'block'; 
        element.style.animation = 'glisser_de_gauche 0.25s'; 
    }
    function fermer(element) {

        element.style.animation = 'glisser_a_gauche 0.25s'; 
        setTimeout(() => {
            element.parentElement.style.display = 'none';
        }, 200);
    }
    function masquer(element) {
        element.parentElement.style.display = 'none';
    }
    function charger_form(id, localite, nombre_de_champs, cultures) {
        document.getElementById('id').value = id;
        document.getElementById('localite').value = localite;
        document.getElementById('nombre_de_champs').value = nombre_de_champs;
        document.getElementById('cultures').value = cultures;
    }
    function supprimer(id) {
        let chemin = '/'+id;
        
        fetch(chemin, {method : 'DELETE'})
        .then(response => response.json())
        .then(donnee => window.location.href = donnee.routeRacine)
        .catch(erreur => console.log(erreur))
    }
    function viderLesChamps() {
        let inputs = document.querySelectorAll('input:not(#submit)');
        for(var i=0; i<inputs.length; i++) { inputs[i].value = ''; }
    }``