
let projets_plus = document.getElementById('projets_plus');

projets_plus.addEventListener('click', () => {
    let nom_du_projet = prompt('Taper le nom du projet');

    document.getElementById('projets_list').innerHTML += '<li>'+nom_du_projet+'</li>';
});