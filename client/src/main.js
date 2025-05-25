/**
 * @function submitHandler
 * @param {event} e event handler for form submission.
 * @description collects form data and sends it to server as json.
 */
function submitHandler(e) {
  e.preventDefault();
  const dataOnPage = new FormData(bookPage);
  const values = Object.fromEntries(dataOnPage);
  values.date_written = getDate();
  fetch("https://reuben-guestbook.onrender.com/write", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  bookPage.reset();
  main();
  const msgs = document.getElementById("msgView");
  msgs.scrollIntoView(true);
}

/**
 * @function getDate
 * @returns date string in format 'dd/mm/YY HH:MM' but excludes leading 0s.
 */
function getDate() {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();
  const hrs = now.getHours();
  let mins = now.getMinutes();
  console.log(mins);
  mins = mins <= 9 ? `0${mins}` : mins;
  return `${day}/${month}/${year} ${hrs}:${mins}`;
}

/**
 * @function createMessage
 * @param {object} message the message data from the database—>server.
 * @description creates the necessary elements for an individual message,
 *  chevron made for mobile resolution.
 */
function createMessage(message) {
  // NEED TO MAKE :
  // box
  // —> field x3
  // —> delete button ?? if we get there
  //   —> we did not.

  const msgBox = document.createElement("div");
  const msgName = document.createElement("h2");
  const msgMsg = document.createElement("p");
  const msgDate = document.createElement("p");

  // inject a class system

  msgBox.classList.add("message");
  msgName.classList.add("message-name", "ms");
  msgMsg.classList.add("message-message", "kav");
  msgDate.classList.add("message-date", "kav");

  // Add content to elements

  msgName.textContent = message.name;
  msgMsg.textContent = message.message;
  msgDate.textContent = message.date_written;

  // Put em in coach

  msgBox.append(msgName, msgMsg, msgDate);
  responses.appendChild(msgBox);
}

/**
 * @async @function main
 * @description performs GET HTTP request for guestbook messages
 *  and loops through each to create DOM elements.
 */
async function main() {
  const messages = await fetch("http://localhost:8080/get_data");
  const msgData = await messages.json();
  const responses = document.getElementById("responses");
  // now runs more than just on load, so needs to wipe existing elements first
  responses.innerHTML = "";
  msgData.forEach((msg) => createMessage(msg));
}
main();

const bookPage = document.querySelector("form");
const scroller = document.getElementById("scrollButton");
bookPage.addEventListener("submit", submitHandler);
scroller.addEventListener("click", () => scrollTo(0, 0));
