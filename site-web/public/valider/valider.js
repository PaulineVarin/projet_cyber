function getCookieByName(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

nb_ue = getCookieByName("number_ue")
document.title = "Validation notes pour l'UE" + nb_ue ;

const notes = new Map();
    notes.set('1', {
        etudiant : 'Pauline',
        note : 10,
        statut : false,
        ue : 1 
    });
    
    notes.set('2', {
        etudiant : 'Carolane',
        note : 15,
        statut : false,
        ue : 1  
    });

    notes.set('3', {
        etudiant : 'Morgan',
        note : 12,
        statut : false,
        ue : 2  
    });

    notes.set('4', {
        etudiant : 'Carolane',
        note : 11,
        statut : false,
        ue : 2  
    });

    notes.set('5', {
        etudiant : 'Pauline',
        note : 15,
        statut : false,
        ue : 3  
    });

    notes.set('6', {
        etudiant : 'Morgan',
        note : 15,
        statut : true,
        ue : 3  
    });

    notes.set('7', {
        etudiant : 'Carolane',
        note : 17,
        statut : true,
        ue : 3  
    });


function initTables() {
    for ([key, element] of notes) {
        if(element.statut == false && element.ue == nb_ue) {
            //rajouter une nouvelle ligne dans le body du tableau avec les infos pour les notes à valider
            ligne_table = document.createElement('tr')
    
            cellule_nom = document.createElement('th')
            cellule_nom.innerHTML = element.etudiant
    
            cellule_note = document.createElement('th')
            cellule_note.innerHTML = element.note
    
            cellule_ue = document.createElement('th')
            cellule_ue.innerHTML = element.ue
        
            cellule_statut = document.createElement('th')
            if(element.statut == false) {
                cellule_statut.innerHTML = "En attente de validation"
            } else {
                cellule_statut.innerHTML = "Validation faite"
            }
        
            ligne_table.appendChild(cellule_nom)
            ligne_table.appendChild(cellule_note)
            ligne_table.appendChild(cellule_ue)
            ligne_table.appendChild(cellule_statut)
    
            document.getElementById("table_body_non_val").appendChild(ligne_table)
        }
    
        if(element.statut == true && element.ue == nb_ue) {
            //rajouter une nouvelle ligne dans le body du tableau avec les infos pour les notes à valider
            ligne_table = document.createElement('tr')
    
            cellule_nom = document.createElement('th')
            cellule_nom.innerHTML = element.etudiant
    
            cellule_note = document.createElement('th')
            cellule_note.innerHTML = element.note
    
            cellule_ue = document.createElement('th')
            cellule_ue.innerHTML = element.ue
        
            cellule_statut = document.createElement('th')
            if(element.statut == false) {
                cellule_statut.innerHTML = "En attente de validation"
            } else {
                cellule_statut.innerHTML = "Validation faite"
            }
        
            ligne_table.appendChild(cellule_nom)
            ligne_table.appendChild(cellule_note)
            ligne_table.appendChild(cellule_ue)
            ligne_table.appendChild(cellule_statut)
    
            document.getElementById("table_body_val").appendChild(ligne_table)
        }
    }

}


function validerNotes() {
    notes.forEach((value, key) => {
        value.statut = true
        notes.set(key, value);
    });

    parent = document.getElementById("table_body_non_val")
    while (parent.hasChildNodes()) {
        parent.removeChild(parent.firstChild)
    }

    parent = document.getElementById("table_body_val")
    while (parent.hasChildNodes()) {
        parent.removeChild(parent.firstChild)
    }

    initTables()

}


initTables()
