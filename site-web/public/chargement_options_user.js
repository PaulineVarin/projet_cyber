function getCookieByName(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

roleU = getCookieByName("role_user")
console.log(roleU)

if(roleU.toLowerCase().includes("moniteur")) {
    console.log("moniteur")
    elem = document.createElement('p')
    elem.innerHTML = "Aucune action disponible"
    document.getElementsByTagName("body")[0].appendChild(elem)
} 

if (roleU.toLowerCase().includes("enseignant_titulaire")) {
    elem = document.createElement('button')
    elem.innerHTML = "Lire les notes pour l'UE 1 "
    elem.onclick = function () {
        window.location.href = '/ue1/read';
    };
    document.getElementsByTagName("body")[0].appendChild(elem)

    elem = document.createElement('button')
    elem.innerHTML = "Lire les notes pour l'UE 2 "
    elem.onclick = function () {
        window.location.href = '/ue2/read';
    };
    document.getElementsByTagName("body")[0].appendChild(elem)

    elem = document.createElement('button')
    elem.innerHTML = "Lire les notes pour l'UE 3"
    elem.onclick = function () {
        window.location.href = '/ue3/read';
    };
    document.getElementsByTagName("body")[0].appendChild(elem)
}

if (roleU.toLowerCase().includes("charges_td")) {
    console.log("hello")
    for (let item of roleU.split('-')) {
        if (item.toLowerCase().includes("charges_td")){
            nb_ue = item.split('_')[2]
        }
    }

    elem = document.createElement('button')
    elem.innerHTML = "Lire les notes pour l'UE " + nb_ue
    elem.onclick = function () {
        window.location.href = '/ue'+nb_ue+'/read';
    };
    document.getElementsByTagName("body")[0].appendChild(elem)

    elem = document.createElement('button')
    elem.innerHTML = "Ecrire les notes pour l'UE " + nb_ue
    elem.onclick = function () {
        window.location.href = '/ue'+nb_ue+'/write';
    };
    document.getElementsByTagName("body")[0].appendChild(elem)
}

if (roleU.toLowerCase().includes("responsable_ue")) {
    for (let item of roleU.split('-')) {
        if (item.toLowerCase().includes("responsable_ue")){
            nb_ue = item.split('_')[2]
        }
    }

    elem = document.createElement('button')
    elem.innerHTML = "Valider les notes pour l'UE " + nb_ue
    elem.onclick = function () {
        window.location.href = '/ue'+nb_ue+'/validate';
    };
    document.getElementsByTagName("body")[0].appendChild(elem)
}