
let totaux_1 = document.getElementById('totaux_1');
let totaux_2 = document.getElementById('totaux_2');
let totaux_3 = document.getElementById('totaux_3');
let totaux_4 = document.getElementById('totaux_4');

let table_d_etape_1 = totaux_1.parentElement.parentElement.parentElement.parentElement.parentElement;
let table_d_etape_2 = totaux_2.parentElement.parentElement.parentElement.parentElement.parentElement;
let table_d_etape_3 = totaux_3.parentElement.parentElement.parentElement.parentElement.parentElement;
let table_d_etape_4 = totaux_4.parentElement.parentElement.parentElement.parentElement.parentElement;

console.log(typeof(parseInt(totaux_1.textContent)));

if(parseInt(totaux_1.textContent) == 0) { table_d_etape_1.style.display = 'none'; }
if(parseInt(totaux_2.textContent) == 0) { table_d_etape_2.style.display = 'none'; }
if(parseInt(totaux_3.textContent) == 0) { table_d_etape_3.style.display = 'none'; }
if(parseInt(totaux_4.textContent) == 0) { table_d_etape_4.style.display = 'none'; }