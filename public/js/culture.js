
let fiches = document.querySelector('.culture_fiches:not(#culture_fiche_info)');
let culture_fiches = document.querySelectorAll('.culture_fiches');
let champs_info = document.getElementById('champs_info');
let champs_info_form = document.getElementById('champs_info_form');


document.getElementsByTagName('.culture_fiches:not(#culture_fiche_info)').style.display = 'none';

function a() {
    culture_fiches.forEach(fiche => {

        let id_fiche = fiche.id;
            
        if(id_fiche === 'culture_fiche_info') {     
            fiche.style.display = 'block';
        }else{
            fiche.style.display = 'none';
        }
    });
}