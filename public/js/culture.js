
let fiches = document.querySelector('.table_deroulant_container:not(#culture_fiche_info)');
let table_deroulant_container = document.querySelectorAll('.table_deroulant_container');
let champs_info = document.getElementById('champs_info');
let champs_info_form = document.getElementById('champs_info_form');


document.getElementsByTagName('.table_deroulant_container:not(#culture_fiche_info)').style.display = 'none';

function a() {
    table_deroulant_container.forEach(fiche => {

        let id_fiche = fiche.id;
            
        if(id_fiche === 'culture_fiche_info') {     
            fiche.style.display = 'block';
        }else{
            fiche.style.display = 'none';
        }
    });
}