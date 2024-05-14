const socket = io();
const activeUser = document.querySelector('#total-user')
const form = document.querySelector('#send-container')
const hidden = document.querySelector('hidden')
const newUser = document.querySelector('#newConnect')
const msg = document.querySelector('#msgInput')
const chatContainer = document.querySelector('#chat-container')
// const rightuser = document.querySelector('.right');

let name = prompt('Enter your name');
socket.emit('Username', { name });
form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
})

socket.on('total-user', (count) => {
    activeUser.innerHTML = `<p> Active User ${count}<p>`  
})
socket.on('new-user', (data) =>{
    newUser.innerHTML   =`<p> ${data} Join </p>` 
    newUser.classList.remove('hidden')
    setTimeout(() =>{
        newUser.classList.add('hidden')
        newUser.classList.remove('newUser');
    },1300)
})

// function to send message

function sendMessage() {
    let message = msg.value
    if (message !== '') {
        const text = document.createElement('p')
        text.className = ' right';
        text.innerText = message;
        chatContainer.appendChild(text);
        socket.emit('total-user', message);
        msg.value = '';
    }
}

// Listen for incoming messages from the server
socket.on('receive-message', (data) => {
    const text = document.createElement('p'); 
    text.className = 'left'; 
    const name= `${data.username}`;  
    let ampm = 'AM';
    const currentDate = new Date();
    const originalHours = currentDate.getHours();
    let hours = originalHours;

    if (hours >= 12) {
        hours -= 12;
        ampm = 'PM';
    }

    const orgMinute = currentDate.getMinutes();
    let minutes = orgMinute

    if(minutes<10){
        minutes = `0${minutes}`
    }

    const formattedTime = `${hours}:${minutes}`;
    text.innerHTML = `<span class="nameColor"> ${name} <br></span> ${data.message} <span class="timeFormate"> <br> ${formattedTime} ${ampm}</span>`;
    chatContainer.appendChild(text);

});




