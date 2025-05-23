function submitHandler(e) {
  e.preventDefault();
  const dataOnPage = new FormData(bookPage);
  const values = Object.fromEntries(dataOnPage);
  values.date_written = getDate();
  console.log(values);
  fetch("http://localhost:8080/write", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
}

function getDate() {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();
  const hrs = now.getHours;
}

function createMessage(message) {
  const responses = document.getElementById("responses");

  // NEED TO MAKE :
  // box
  // —> field x3
  // —> chevron - group w feild #1
  // —> delete button ?? if we get there

  const msgBox = document.createElement("div");
  const msgName = document.createElement("h3");
  const msgMsg = document.createElement("p");
  const msgDate = document.createElement("p");
  const chevron = document.createElement("img");
  const nameAndChev = document.createElement("div");

  // inject a class system

  msgBox.classList.add("message");
  msgName.classList.add("message-name", "ms");
  msgMsg.classList.add("message-message", "kav");
  msgDate.classList.add("message-date", "kav");
  chevron.classList.add("chevron");
  nameAndChev.classList.add("name-chevron");

  // Add content to elements

  msgName.textContent = message.name;
  msgMsg.textContent = message.message;
  msgDate.textContent = message.date_written;
  chevron.src = "../chevron.svg";

  // Put em in coach

  nameAndChev.append(msgName, chevron);
  msgBox.append(nameAndChev, msgMsg, msgDate);
  responses.appendChild(msgBox);
}

(async () => {
  const messages = await fetch("http://localhost:8080/get_data");
  msgData = await messages.json();
  msgData.forEach((msg) => createMessage(msg));
})();

const bookPage = document.querySelector("form");
bookPage.addEventListener("submit", submitHandler);
