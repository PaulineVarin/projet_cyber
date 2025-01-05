function getCookieByName(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

nb_ue = getCookieByName("number_ue")
document.title = "Ecriture notes pour l'UE" + nb_ue ;

var notes = new Map();
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

function initTable() {
    console.log("HELLO init NOTE")
    console.log(notes)
    for ([key, element] of notes) {
        if(element.ue == nb_ue) {
            //rajouter une nouvelle ligne dans le body du tableau avec les infos
            ligne_table = document.createElement('tr')
    
            cellule_nom = document.createElement('th')
            cellule_nom.innerHTML = element.etudiant
    
            cellule_ue = document.createElement('th')
            cellule_ue.innerHTML = element.ue
            
            cellule_note = document.createElement('th')
            cellule_note.innerHTML = element.note
    
        
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
    
    
            document.getElementById("table_body").appendChild(ligne_table)
        }
    
    }
}



function ajouterNote() {
    console.log("HELLO AJOUTER NOTE")
    var nameValue = document.getElementById("name_form").value;
    var noteValue = document.getElementById("note_form").value;
    if (nameValue != '' && noteValue !='' && (noteValue <= 20 && noteValue>=0)) {
        var lastindex ; 
        for ([key, element] of notes) {
            lastindex = key
        }
        newindex = Number(lastindex) + 1

        notes.set(newindex, {
            etudiant : nameValue,
            note : noteValue,
            statut : false,
            ue : nb_ue 
        });

        parent = document.getElementById("table_body")
        while (parent.hasChildNodes()) {
            parent.removeChild(parent.firstChild)
        }

        initTable()
    }

}

initTable()

