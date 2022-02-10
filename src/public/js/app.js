
const messgeList = document.querySelector("ul");
const messgeForm = document.querySelector("form#message");
const nickForm = document.querySelector("form#nick");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload){
    const msg = {type,payload};
    return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
    console.log("Connected to Server");
});

socket.addEventListener("message", ( message) => {
   const li = document.createElement("li");
   li.innerText = message.data;
   messgeList.append(li);
});

socket.addEventListener("close",() => {
    console.log("Disconnecetd from server");
});


function handleSubmit(event){
    event.preventDefault();
    const input = messgeForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    input.value ="";
}

function handleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
}


messgeForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);