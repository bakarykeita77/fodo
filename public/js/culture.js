

let champs_container = document.getElementById('champs_container');
let culture_card = document.querySelectorAll('.culture_card');
let culture_titre = document.getElementById('culture_titre');
let cultures = document.querySelectorAll('.cultures p');





function chargerEtAfficherDetailsDuChamps() {

    champs_container.style.display = 'none';
    culture_card.forEach(element => {
        
        element.addEventListener('click', () => {
            
            let culture = element.firstElementChild.innerHTML;
            let lieu_de_la_culture = culture.split(' ')[2];

            culture_titre.innerHTML = culture;

            champs_container.style.display = 'block';
            styliserCulturesCards();


            function styliserCulturesCards() {
                culture_card.forEach(element => {
                    if (element.firstElementChild.innerHTML.split(' ')[2] ===lieu_de_la_culture) {
                        element.style.backgroundColor = '#fff';
                    }else{
                        element.style.backgroundColor = 'greenyellow';
                    }
                    
                });
            }
        });
    });
}
function fermetureDesDetailsDuChamps() {
    document.getElementById('details_foot').addEventListener('click', () => {
        fermetureVertical(details_de_champs);
    })
}