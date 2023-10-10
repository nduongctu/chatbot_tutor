document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("chat-form");
  const userInput = document.getElementById("user-input");
  const chatMessages = document.getElementById("chat-messages");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const message = userInput.value;
    appendMessage("user", message);
    userInput.value = "";

    fetch("/tools", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
      const response = data.message;
      appendMessage("bot", response);
    })
    .catch(error => console.error(error));
  });

  function appendMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add(sender);
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
  }
});