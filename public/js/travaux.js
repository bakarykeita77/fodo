
    let tr_1 = document.querySelectorAll('.tr_1');
    let tr_2 = document.querySelectorAll('.tr_2');
    let tr_3 = document.querySelectorAll('.tr_3');
    let tr_4 = document.querySelectorAll('.tr_4');

    let totaux_1 = document.getElementById('totaux_1');
    let totaux_2 = document.getElementById('totaux_2');
    let totaux_3 = document.getElementById('totaux_3');
    let totaux_4 = document.getElementById('totaux_4');

    
 // Masquer les parties des travaux non effectues.
    if(totaux_1.textContent == 0) {
        tr_1.forEach(element => {
            element.style.display = 'none';
        });
    }

    if(totaux_2.textContent == 0) {
        tr_2.forEach(element => {
            element.style.display = 'none';
        });
    }

    if(totaux_3.textContent == 0) {
        tr_3.forEach(element => {
            element.style.display = 'none';
        });
    }

    if(totaux_4.textContent == 0) {
        tr_4.forEach(element => {
            element.style.display = 'none';
        });
    }