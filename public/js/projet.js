
let couvercle_edition_projet = document.getElementById('couvercle_edition_projet');
let modifier_projet = document.querySelectorAll('.modifier_projet');
let fermer_edition_projet = document.querySelector('#fermer_edition_projet');
let inputs = document.querySelectorAll('#editer_projet table td input');
let id_champs = document.getElementById('id_champs');


modifier_projet.forEach((element) => {
    element.addEventListener('click', () => { 

        couvercle_edition_projet.style.display = 'block';

     // Selection des td consernes par les modifications
        let tr_id = element.parentElement.id;
        let tds   = document.querySelectorAll('#'+tr_id+' td');

     // Recuperation des valeurs a modifier dans des variables.    
        let id          = tds[0].textContent;
        let projet_name = tds[1].textContent;
        let no          = tds[2].textContent;
        let tache       = tds[3].textContent;
        let duree       = tds[4].textContent;
        let debut       = tds[5].textContent;
        let fin         = tds[6].textContent;
        let moyen       = tds[7].textContent;
        let personnel   = tds[9].textContent;
        let cout        = tds[10].textContent;

     // Insertion des valeurs a modifier dans les inputs de editer_projet.
        inputs[0].value = parseInt(id);
        inputs[1].value = projet_name;
        inputs[2].value = no;
        inputs[3].value = tache;
        inputs[4].value = duree;
        inputs[5].value = debut;
        inputs[6].value = fin;
        inputs[7].value = moyen;0
        inputs[8].value = personnel;
        inputs[9].value = cout;

     // Mettre en surbrillance la ligne selectionnee
        document.querySelectorAll('#'+tr_id+' td:not(.sans_bordure, .td_options)').forEach(element => {
            element.style.backgroundColor = 'yellow';
        });

        
     // Enlever la surbrillance sur la ligne selectionnee
        fermer_edition_projet.addEventListener('click', () => {
            setTimeout(() => {
                document.querySelectorAll('#'+tr_id+' td:not(.sans_bordure, .td_options)').forEach(element => {
                    element.style.backgroundColor = 'white';
                });
            }, 1000);
        });
        
    });
});

fermer_edition_projet.addEventListener('click', () => { couvercle_edition_projet.style.display = 'none'; });

