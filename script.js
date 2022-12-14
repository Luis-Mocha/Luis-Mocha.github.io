/*Preliminari*/

const form = document.querySelector('#ticket-form');
const formTitle = document.querySelector('#form-title');
const formGenre = document.querySelector('#form-genre');
const formDate = document.querySelector('#form-date');
const formRating = document.querySelector('#form-rating');

const totalTicketsSlot = document.querySelector('.total-tickets');
const averageRating = document.querySelector('.average-rating')
const ticketListElement = document.querySelector('.ticket-list');


/*OPERAZIONI INIZIALI*/

// Prepariamo una chiave per lo storage
const STORAGE_KEY = '__project-ticket-list_';

//Preparo la lista in cui inseriro i nuovi oggetti creati
let tickets = [];


//Controllo  se ci sono elementi salvati nello storage
const prevList = localStorage.getItem(STORAGE_KEY);

// Se li trovo
if (prevList) {
  // 1. Utilizzo la lista precedente al posto di quella vuota
  tickets = JSON.parse(prevList);

  // 2. Ricalcolo il numero totale di ticket
  calculateTickets();

  // 3.Ricalcolo l'average rating

  calculateAverageRating();

  // 4. Rirenderizzo la lista
  renderList();
}



/*EVENTI DINAMICI*/

// Intercetto l'invio del form
form.addEventListener('submit', function (event) {
    // 1. Bloccho il ricaricamento della pagina
    event.preventDefault();
  
    // 2. Raccolgo i dati del form
    const title = formTitle.value.trim();
    const genre = formGenre.value.trim();
    const date = formDate.value.trim();
    const rating = formRating.value.trim();

    // 3. Aggiungo un ticket alla lista
    addTicket(title,genre,date,rating);

    // 4.Pulisco il form
    form.reset();
    
    // 5.Riposto il cursore sul primo campo
    formTitle.focus();

}
)

/* FUNZIONI */

//Funzione per aggiungere il ticket alla lista
function addTicket(title,genre,date,rating) {

    // 1.Creo l'oggetto che rappresenta il ticket
    const newTicket = {
        title,
        genre,
        date,
        rating: Number(rating) //penso che fosse in ogni caso un numero
    }

    //2.Aggiungo l'oggetto alla lista
    tickets.push(newTicket);
    console.log(tickets);

    //3.Aggiorno il localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets)) 

    //4.Calcolo il totale dei tickets
    calculateTickets()

    //5.Calcolo l'average rating
    calculateAverageRating()

    //6.Renderizzo la lista dei regali
    renderList()

}


//funzione per calcolare il totale dei tickets
function calculateTickets () {
    let total = 0 
    total = tickets.length;
//stampo il totale
totalTicketsSlot.innerText = total
}

//funzione per calcolare la media dei rating
function calculateAverageRating() {
    let totalRatings = 0

    for (let i = 0; i < tickets.length; i++) {
        totalRatings += tickets[i].rating
    }

    averageRating.innerHTML = formatAmount(totalRatings/tickets.length); 
}
// Funzione per formattare una cifra
function formatAmount(amount) {
    return amount.toFixed(2);
}


//Funzione per renderizzare la lista Ticket
function renderList() {
    //1.Svuoto la lista non aggiornata
    ticketListElement.innerHTML = '';

    //2.Per tutti i ticket
    for (let i = 0; i < tickets.length; i++) {
        //3.codice per un elemento ticket
        const ticketElement = createListElement(i);

        //4.Lo collego alla lista nella pagina
        ticketListElement.innerHTML += ticketElement;
    }
        // 5. Rendo cliccabili i bottoni
        setDeleteButtons();
}
//Funzione per creare un elemento nella lista
function createListElement(i) {
    const ticket = tickets[i];

    //Restiturisco il codice html di un ticket nella lista
    return `
    <li class="ticket">
        <div class="ticket-top">
            <h2 class="ticket-title">${ticket.title}</h2>
            <p class="ticket-genre">${ticket.genre}</p>
        </div>
        <div class="ticket-bottom">
            <div class="ticket-date">${ticket.date}</div>
            <strong class="ticket-rating">${ticket.rating}⭐</strong>
            <button class="ticket-button" data-index="${i}">🗑</button>
        </div>
    </li>
    `;
}


// Funzione per attivare il bottone per eliminare un ticket
function setDeleteButtons() {
    // 1. Recupero tutti i bottoni dei ticket
    const deleteButtons = document.querySelectorAll('.ticket-button');
  
    // 2. Per ognuno dei bottoni....
    for (let i = 0; i < deleteButtons.length; i++) {
      // 3. Reupero il singolo bottone ad ogni giro
      const button = deleteButtons[i];
  
      // 4. Aggiungo l'event listener
      button.addEventListener('click', function () {

      // 5. Individuo l'index corrispondente
      const index = button.dataset.index;

      // 6. Rimuovo il ticket dalla lista
      removeTicket(index);
      });
    }
  }

// Funzione per rimuovere il ticket dalla lista
function removeTicket(index) {
    //1.Rimuovo il ticket dalla lista
    tickets.splice(index, 1);
    console.log(tickets);
  
    //2.Aggiorno il localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  
    //3.Ricalcolo il totale
    calculateTickets();

    //4.Ricalcolo l'average rating
    calculateAverageRating();
  
    //5.Rerinderizzo la lista
    renderList();
}

/* MODAL WINDOW */
const recapButton = document.querySelector('.recap-button')
const modalWindow = document.querySelector('.modal-window')
const closeModalButton = document.querySelector('.close-modal-button')

//Apro la modale
recapButton.addEventListener('click', function () {
    recapButton.classList.add('recap-button-hidden');
    openModal();
})

//Funzione per aprire la modale
function openModal() {
    modalWindow.classList.remove('modal-hidden')
}

//Chiudere la modale
closeModalButton.addEventListener('click', function () {
    closeModal();

    displayRecapButton();
}
)
//Funzioni
function closeModal() {
    modalWindow.classList.add('modal-hidden')}

function displayRecapButton() {
    recapButton.classList.remove('recap-button-hidden')}