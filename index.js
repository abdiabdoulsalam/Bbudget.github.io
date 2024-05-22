
// un tableau de depenses
let depenses = [
    // {titre: 'maison', montant: '25000'},
    // {titre: 'eau', montant: '15000'},
    // {titre: 'repas', montant: '35000'}
]

let revenus = []
let budgetgeneral = 0
let depensegeneral = 0
let solde = 0

let tbbody = document.getElementById('tbody')
let tbody = document.getElementById('tbodyrevenu')

/**
 * 
 */

let sommeBudget = localStorage.getItem('budget')
let depensesomme = localStorage.getItem('depense')
let soldeElement = document.getElementById('psolde');


let soldev = 0
function soldetest(){
    soldev = updateTotal() - updateTotaldepense()
    localStorage.setItem('solde', soldev)
    soldeElement.textContent = soldev + ' CFA'
}
/***
 * 
 */

function createTable() {
    const tbody = document.getElementById('tbody'); // Assurez-vous que tbody est correctement défini

    for (let index = 0; index < depenses.length; index++) {
        let row = document.createElement('tr');

        // Créer le bouton de suppression
        let buttonCell = document.createElement('td');
        let deleteButton = document.createElement('button');
        let buttonText = document.createTextNode("Supprimer");
        deleteButton.setAttribute("class", "deleteButton");
        deleteButton.appendChild(buttonText);
        deleteButton.setAttribute('depenses', depenses[index].montant); // Ajouter l'attribut au bouton de suppression

        // Ajouter le bouton de suppression à la cellule
        buttonCell.appendChild(deleteButton);

        // Ajouter les cellules contenant les données de la dépense
        for (let element = 0; element < Object.values(depenses[index]).length; element++) {
            const cell = document.createElement('td')
            const cellText = document.createTextNode(Object.values(depenses[index])[element])
            cell.appendChild(cellText)
            row.appendChild(cell);
        }

        // Ajouter la cellule du bouton de suppression à la ligne
        row.appendChild(buttonCell);
        row.setAttribute('id', depenses[index].montant);

        // Ajouter la ligne au tbody
        tbody.prepend(row);
        depensegeneral = depensegeneral + parseInt(depenses[index].montant)
        ondepenseUpdate()
    }
    soldetest()
}

function ondepenseUpdate() {
    localStorage.setItem('depense', depensegeneral)
}

function createTableRevenu() {
    const tbbody = document.getElementById('tbodyrevenu'); // Assurez-vous que tbody est correctement défini

    for (let index = 0; index < revenus.length; index++) {
        let row = document.createElement('tr');

        // Créer le bouton de suppression
        let buttonCell = document.createElement('td');
        let deleteButton = document.createElement('button');
        let buttonText = document.createTextNode("Supprimer");
        deleteButton.setAttribute("class", "deleteButtonRevenu");
        deleteButton.appendChild(buttonText);
        deleteButton.setAttribute('revenus', revenus[index].montantRevenu); // Ajouter l'attribut au bouton de suppression

        // Ajouter le bouton de suppression à la cellule
        buttonCell.appendChild(deleteButton);

        // Ajouter les cellules contenant les données du revenu
        for (let element = 0; element < Object.values(revenus[index]).length; element++) {
            const cell = document.createElement('td');
            const cellText = document.createTextNode(Object.values(revenus[index])[element]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        // Ajouter la cellule du bouton de suppression à la ligne
        row.appendChild(buttonCell);
        row.setAttribute('id', revenus[index].montantRevenu);
        // Ajouter la ligne au tbody
        tbbody.prepend(row);
        budgetgeneral = budgetgeneral + parseInt(revenus[index].montantRevenu)
        onUpdatebudget()
    }
    soldetest()
}

function onUpdatebudget() {
    localStorage.setItem('budget', budgetgeneral)
}
///////

// model 
let model = document.getElementById('depenseModel')
let modalbutton = document.getElementById('adddepenseModelButton')
let depenseModelg = document.querySelector('.modelcontentgeneral')

let revenumodel = document.getElementById('revenumodel')
let revenumodelbutton = document.getElementById('addrevenuModelButton')

revenumodelbutton.onclick = function () {
    revenumodel.style.display = 'block'
    depenseModelg.style.display = "none"
}

modalbutton.onclick = function () {
    model.style.display = "block"
    depenseModelg.style.display = "none"
}

let addDepenseButton = document.querySelector('.valide')


let addrevenuButton = document.getElementById('valide-revenu')
let tbbodyrevenu = document.getElementById('tbodyrevenu')

//      REVENU TABLE 
//REVENU TABLE
//    REVENU TABLE
//REVENU TABLE
function updateTotal() {
    let sommerevenu = revenus.reduce((acc, revenu) => acc + parseInt(revenu.montantRevenu), 0)
    console.log(sommerevenu)
    return sommerevenu
}

function onUpdate() {
    localStorage.setItem('cle', JSON.stringify(revenus))
}

let revenuvalue = document.getElementById('pbudget')

addrevenuButton.onclick = function (event) {
    event.preventDefault()

    let titreRevenu = document.querySelector('.tr-input').value
    let montantRevenu = document.querySelector('.mr-input').value

    if (!titreRevenu || !montantRevenu) {
        alert('merci de tout remplir')
        return
    }

    const newrevenue = { titreRevenu, montantRevenu }
    revenus.push(newrevenue)
    onUpdate()

    // creation d'une condition 

    console.log('revenus', revenus)

    updateTotal()

    let sommerevenu = revenus.reduce((acc, revenus) => acc + parseInt(revenus.montantRevenu), 0)
    console.log(sommerevenu)

    revenuvalue.textContent = updateTotal() + ' CFA'

    // ajouter un tr 
    let row = document.createElement('tr')

    let cell0 = row.insertCell(0)
    const cell0Text = document.createTextNode(titreRevenu)
    cell0.appendChild(cell0Text)
    row.appendChild(cell0)

    let cell1 = row.insertCell(0)
    const cell1Text = document.createTextNode(montantRevenu + ' CFA')
    cell1.appendChild(cell1Text)
    row.appendChild(cell1)


    // // creer le button de suppression
    let buttonCell = document.createElement('td')
    let deleteButton = document.createElement('button')
    let buttonText = document.createTextNode("Supprimer")
    deleteButton.setAttribute("class", "deleteButton")
    deleteButton.setAttribute('revenus', montantRevenu)
    deleteButton.appendChild(buttonText)

    // ajouter un evenement
    deleteButton.addEventListener('click', function () {
        const montantRevenu = this.getAttribute('revenus')
        let row = document.getElementById(montantRevenu)
        if (confirm("voulez vous supprime cette revenu") == true) {
            row.parentNode.removeChild(row)
            revenus = revenus.filter(revenus => revenus.montantRevenu !== montantRevenu)
            updateTotal()
            console.log(revenus)
            revenuvalue.textContent = updateTotal() + ' CFA'
            onUpdate()
        }

    })

    updateTotal()
    console.log(revenus)

    buttonCell.appendChild(deleteButton)
    row.appendChild(buttonCell)
    row.setAttribute('id', montantRevenu)

    tbbodyrevenu.prepend(row)

    document.getElementById('tr-input').value = ''
    document.getElementById('mr-input').value = ''

    revenumodel.style.display = 'none'
    depenseModelg.style.display = 'block'
    soldetest()
}

const todoInStorage = localStorage.getItem('cle')?.toString()
if (todoInStorage) {
    revenus = JSON.parse(todoInStorage)
    console.log(todoInStorage)
    console.log(revenus)
}
createTableRevenu()

let depensevalue = document.getElementById('pdepenses')

// depense tableau
//          depense tableau 
// depense tableau 
//          depense tableau 


function updateTotaldepense() {
    let sommedepense = depenses.reduce((acc, depense) => acc + parseInt(depense.montant), 0)
    console.log(sommedepense)
    return sommedepense
}

function onUpdatedepense() {
    localStorage.setItem('cledepense', JSON.stringify(depenses))
}

addDepenseButton.onclick = function (event) {
    event.preventDefault()
    const titre = document.getElementById('t-input').value
    const montant = document.getElementById('m-input').value

    if (!titre || !montant) {
        alert('merci de tout remplir')
        return
    }

    const newdepense = { titre, montant }
    depenses.push(newdepense)
    onUpdatedepense()

    console.log('depenses', depenses)

    let sommedepense = depenses.reduce((acc, depense) => acc + parseInt(depense.montant), 0)
    console.log(sommedepense)


    depensevalue.textContent = updateTotaldepense() + ' CFA'

    // ajouter un tr 
    let row = document.createElement('tr')

    let cell0 = row.insertCell(0)
    const cell0Text = document.createTextNode(titre)
    cell0.appendChild(cell0Text)
    row.appendChild(cell0)

    let cell1 = row.insertCell(1)
    const cell1Text = document.createTextNode(montant + " CFA")
    cell1.appendChild(cell1Text)
    row.appendChild(cell1)

    // creer le button de suppression
    let buttonCell = document.createElement('td')
    let deleteButton = document.createElement('button')
    let buttonText = document.createTextNode("Supprimer")
    deleteButton.setAttribute("class", "deleteButton")
    deleteButton.setAttribute('depenses', montant)
    deleteButton.appendChild(buttonText)

    // ajouter un evenement
    deleteButton.addEventListener('click', function () {
        const montant = this.getAttribute('depenses')
        let row = document.getElementById(montant)
        if (confirm("voulez vous supprime cette depense") == true) {
            row.parentNode.removeChild(row)
            depenses = depenses.filter(depenses => depenses.montant !== montant)
            updateTotaldepense()
            console.log(depenses)
            depensevalue.textContent = updateTotaldepense() + ' CFA'
            onUpdatedepense()
        }
    })

    updateTotaldepense()
    console.log(depenses)

    buttonCell.appendChild(deleteButton)
    row.appendChild(buttonCell)
    row.setAttribute('id', montant)
    tbbody.prepend(row)

    document.getElementById('t-input').value = ''
    document.getElementById('m-input').value = ''

    model.style.display = 'none'
    depenseModelg.style.display = 'block'

    
    soldetest()
}

const todoInStoragedepense = localStorage.getItem('cledepense')?.toString()
if (todoInStoragedepense) {
    depenses = JSON.parse(todoInStoragedepense)
    console.log(todoInStoragedepense)
    console.log(depenses)
}

createTable()

depensevalue.textContent = depensegeneral + ' CFA'
let deleteButton = document.querySelectorAll(".deleteButton")
deleteButton.forEach(function (button) {
    button.addEventListener('click', function () {
        const montant = this.getAttribute('depenses')
        let row = document.getElementById(montant)
        if (row) {
            row.parentNode.removeChild(row);
            depenses = depenses.filter(depenses => depenses.montant !== montant)
            depensegeneral = depensegeneral - parseInt(montant)

            ondepenseUpdate()
            depensevalue.textContent = depensegeneral + ' CFA'
            onUpdatedepense()
            soldetest()
        }
    })
})


revenuvalue.textContent = budgetgeneral + ' CFA'

let deleteButtonrevenu = document.querySelectorAll(".deleteButtonRevenu")
deleteButtonrevenu.forEach(function (button) {
    button.addEventListener('click', function () {
        const montantRevenu = this.getAttribute('revenus')
        let row = document.getElementById(montantRevenu)
        row.parentNode.removeChild(row)
        revenus = revenus.filter(revenus => revenus.montantRevenu !== montantRevenu)

        budgetgeneral = budgetgeneral - parseInt(montantRevenu)
        onUpdatebudget()
        revenuvalue.textContent = budgetgeneral + ' CFA'
        onUpdate()
        soldetest()
    })
})

let soldevaleur = localStorage.getItem('solde')
soldeElement.textContent = soldevaleur + ' CFA';







