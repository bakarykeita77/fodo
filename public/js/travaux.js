
let travaux_plus = document.getElementById('travaux_plus');

let totaux_1 = document.getElementById('totaux_1');
let totaux_2 = document.getElementById('totaux_2');
let totaux_3 = document.getElementById('totaux_3');
let totaux_4 = document.getElementById('totaux_4');

let table_d_etape_1 = totaux_1.parentElement.parentElement.parentElement.parentElement.parentElement;
let table_d_etape_2 = totaux_2.parentElement.parentElement.parentElement.parentElement.parentElement;
let table_d_etape_3 = totaux_3.parentElement.parentElement.parentElement.parentElement.parentElement;
let table_d_etape_4 = totaux_4.parentElement.parentElement.parentElement.parentElement.parentElement;

let fermeture_de_fiche = document.getElementById('fermeture_de_fiche');
let couvercle_de_fiche = document.getElementById('couvercle_de_fiche');


couvercle_de_fiche.style.display = 'none';
travaux_plus.addEventListener('click', () => { couvercle_de_fiche.style.display = 'block'; });
fermeture_de_fiche.addEventListener('click', () => { couvercle_de_fiche.style.display = 'none'; });

if(parseInt(totaux_1.textContent) == 0) { table_d_etape_1.style.display = 'none'; }
if(parseInt(totaux_2.textContent) == 0) { table_d_etape_2.style.display = 'none'; }
if(parseInt(totaux_3.textContent) == 0) { table_d_etape_3.style.display = 'none'; }
if(parseInt(totaux_4.textContent) == 0) { table_d_etape_4.style.display = 'none'; }