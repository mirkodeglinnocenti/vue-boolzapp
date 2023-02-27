

// Vue
const { createApp } = Vue;

// Luxon
const DateTime = luxon.DateTime;

const contacts = [
    {
        name: "Michele",
        avatar: "./img/man-2.png",
        visible: true,
        messages: [
            {
                date: "10/01/2020 15:30:55",
                message: "Hai portato a spasso il cane?",
                status: "sent"
            },
            {
                date: "10/01/2020 15:50:00",
                message: "Ricordati di stendere i panni",
                status: "sent"
            },
            {
                date: "10/01/2020 16:15:22",
                message: "Tutto fatto!",
                status: "received"
            }
        ],
    },
    {
        name: "Fabio",
        avatar: "./img/man-3.png",
        visible: true,
        messages: [
            {
                date: "20/03/2020 16:30:00",
                message: "Ciao come stai?",
                status: "sent"
            },
            {
                date: "20/03/2020 16:30:55",
                message: "Bene grazie! Stasera ci vediamo?",
                status: "received"
            },
            {
                date: "20/03/2020 16:35:00",
                message: "Mi piacerebbe ma devo andare a fare la spesa.",
                status: "sent"
            }
        ],
    },
    {
        name: "Samuele",
        avatar: "./img/man-4.png",
        visible: true,
        messages: [
            {
                date: "28/03/2020 10:10:40",
                message: "La Marianna va in campagna",
                status: "received"
            },
            {
                date: "28/03/2020 10:20:10",
                message: "Sicuro di non aver sbagliato chat?",
                status: "sent"
            },
            {
                date: "28/03/2020 16:15:22",
                message: "Ah scusa!",
                status: "received"
            }
        ],
    },
    {
        name: "Alessandro B.",
        avatar: "./img/man-5.png",
        visible: true,
        messages: [
            {
                date: "10/01/2020 15:30:55",
                message: "Lo sai che ha aperto una nuova pizzeria?",
                status: "sent"
            },
            {
                date: "10/01/2020 15:50:00",
                message: "Si, ma preferirei andare al cinema",
                status: "received"
            }
        ],
    },
    {
        name: "Alessandro L.",
        avatar: "./img/man-6.png",
        visible: true,
        messages: [
            {
                date: "10/01/2020 15:30:55",
                message: "Ricordati di chiamare la nonna",
                status: "sent"
            },
            {
                date: "10/01/2020 15:50:00",
                message: "Va bene, stasera la sento",
                status: "received"
            }
        ],
    },
    {
        name: "Claudia",
        avatar: "./img/woman-1.png",
        visible: true,
        messages: [
            {
                date: "10/01/2020 15:30:55",
                message: "Ciao Claudia, hai novità?",
                status: "sent"
            },
            {
                date: "10/01/2020 15:50:00",
                message: "Non ancora",
                status: "received"
            },
            {
                date: "10/01/2020 15:51:00",
                message: "Nessuna nuova, buona nuova",
                status: "sent"
            }
        ],
    },
    {
        name: "Federico",
        avatar: "./img/man-7.png",
        visible: true,
        messages: [
            {
                date: "10/01/2020 15:30:55",
                message: "Fai gli auguri a Martina che è il suo compleanno!",
                status: "sent"
            },
            {
                date: "10/01/2020 15:50:00",
                message: "Grazie per avermelo ricordato, le scrivo subito!",
                status: "received"
            }
        ],
    },
    {
        name: "Davide",
        avatar: "./img/man-8.png",
        visible: true,
        messages: [
            {
                date: "10/01/2020 15:30:55",
                message: "Ciao, andiamo a mangiare la pizza stasera?",
                status: "received"
            },
            {
                date: "10/01/2020 15:50:00",
                message: "No, l\"ho già mangiata ieri, ordiniamo sushi!",
                status: "sent"
            },
            {
                date: "10/01/2020 15:51:00",
                message: "OK!!",
                status: "received"
            }
        ],
    },
    
    ]

  createApp({
    data() {
      return {
        contacts: contacts,
        currentContact: 0,
        previusContact: 0,
        inputNewMessage: '',
        autoreply : null,
        search: "",
      }
    },
    watch: {
        currentContact: function () {
            this.resetMessage();
        }
    },
    methods:{
        setCurrentContact,
        sendMessage,
        autoMessage,
        getMessageTime,
        timeNow,
        resetMessage,
        getLastMessageTime,
        getAllLastMessageTime,
        searchFilter,
         
    }
  }).mount('#app')





// Funzioni

// Funzione per assegnare il valore di contatto corrente e di contatto precedente
function setCurrentContact (indice) {
    this.previusContact = this.currentContact;
    this.currentContact = indice;
    // console.log(this.previusContact, this.currentContact)
}

// Funzione per inviare un messaggio
function sendMessage () {
    let messageToSent = this.inputNewMessage.trim();

    if (messageToSent === '') {
        return
    }

    let message = {
        date: timeNow(),
        message: messageToSent,
        status: "sent"
    }

    this.contacts[this.currentContact].messages.push(message);

    this.resetMessage();

    const activeContact = this.contacts[this.currentContact] 
    
    // Risposta automatica dopo un secondo
    this.autoreply = setTimeout(this.autoMessage, 1000, activeContact)
    
}

// Funzione per risposta automatica
function autoMessage(contattoAttivo) {

    console.log(this.currentContact,contattoAttivo)

    let message = {
        date: timeNow(),
        message: 'Keep pushing! 💪',
        status: "received"
    }

    contattoAttivo.messages.push(message);


}

// Funzione reset message
function resetMessage () {
    this.inputNewMessage = '';
}

// Funzione per restituire l'ora e i minuti del messaggio visualizzato
function getMessageTime(dataStringa){

    // prendere la stringa con i dati
    const dateToParse = dataStringa;

    // console.log (dateToParse)

    // creare variabile con il formato data spiegata a luxon
    const parsedDate = DateTime.fromFormat(dateToParse, 'dd/LL/yyyy HH:mm:ss')
  
    // console.log(parsedDate.toFormat('HH:mm'));

    // restituire la stringa con il formato scelto
    return parsedDate.toFormat('HH:mm')
}

// Funzione che restituisce ora e minuti dell'istante in cui viene invocata
function timeNow() {

    const now = DateTime.now()

    // creare variabile con il formato data spiegata a luxon
    const timeNow = now.toFormat('dd/LL/yyyy HH:mm:ss');

    return timeNow;

}

// Funzione di ricerca dei nomi nella search bar
function searchFilter(contatto){
    const searchInput = this.search.trim().toLowerCase();
    const name = contatto.name.toLowerCase();

    const verificaNome = !name.includes(searchInput);
    console.log(searchInput, name, verificaNome)

    return verificaNome; 

}

function getLastMessageTime (){

    let messaggiChat = contacts[this.currentContact].messages;
    let lastMessageIndex = contacts[this.currentContact].messages.length - 1;
    // console.log(lastMessageIndex , messaggiChat[lastMessageIndex].date)
    let lastMessageDate = messaggiChat[lastMessageIndex].date;
    
    return getMessageTime(lastMessageDate);
}

function getAllLastMessageTime (contatto){

    let messaggiChat = contatto.messages;
    let lastMessageIndex = contatto.messages.length - 1;
    // console.log(lastMessageIndex , messaggiChat[lastMessageIndex].date)
    let lastMessageDate = messaggiChat[lastMessageIndex].date;
    
    return getMessageTime(lastMessageDate);
}



// let arrayMessaggiRicevuti = contacts[this.currentContact].messages.filter(funzione => this.message.status === 'received')

// console.log(arrayMessaggiRicevuti)