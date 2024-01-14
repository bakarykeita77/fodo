
let nav_laterale_plus = document.getElementById('nav_laterale_plus');
let nav_laterale_list = document.getElementById('nav_laterale_list');


nav_laterale_plus.addEventListener('click', ajouterUnElementALaListe);

function ajouterUnElementALaListe() {

    let nom_de_nouveau_element = prompt('Taper le nom du nouveau Champs');

    nav_laterale_list.innerHTML += "<li>"+nom_de_nouveau_element+"</li>";
}