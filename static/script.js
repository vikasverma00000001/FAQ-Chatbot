// ==============================
// Get HTML Elements
// ==============================

const chatBox = document.getElementById("chat-box");
const inputBox = document.getElementById("user-input");
const sendButton = document.getElementById("send-btn");


// ==============================
// Add Message
// ==============================

function addMessage(message, sender, time = "") {

    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message");

    messageDiv.classList.add(sender);

    messageDiv.innerHTML =

        `<p>${message}</p>

        <small>${time}</small>`;

    chatBox.appendChild(messageDiv);

    chatBox.scrollTop = chatBox.scrollHeight;

}


// ==============================
// Send Message
// ==============================

async function sendMessage(){

    const userMessage = inputBox.value.trim();

    if(userMessage === ""){
        return;
    }

    // Show User Message

//    addMessage("Typing...", "bot");
//    addMessage(userMessage,"user");

    const now = new Date();

const time = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
});

addMessage(

    userMessage,

    "user",

    time

);

    // Clear Input

    inputBox.value = "";

    try{

        const response = await fetch("/chat",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                message:userMessage

            })

        });

        const data = await response.json();

        addMessage(

    data.response,

    "bot",

    data.time

);

    }

    catch(error){

        addMessage(
            "Server Error! Please try again.",
            "bot"
        );

        console.error(error);

    }

}


// ==============================
// Button Click
// ==============================

sendButton.addEventListener(
    "click",
    sendMessage
);


// ==============================
// Enter Key
// ==============================

inputBox.addEventListener(
    "keypress",
    function(event){

        if(event.key==="Enter"){

            sendMessage();

        }

    }
);


// ==============================
// Welcome Message
// ==============================

//window.onload=function(){
//
//    addMessage(
//        "Hello \nWelcome to FAQ Chatbot.\nAsk me any FAQ question.",
//        "bot"
//    );
//
//}

window.onload=function(){

    inputBox.focus();

}