
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