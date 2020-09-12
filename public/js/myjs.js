console.log("Cliesnt side js");
const messageOne = document.getElementById("message-1");
const messagtwo = document.getElementById("message-2");
const icon = document.querySelector("#icon");
const weatherForm = document.querySelector("form");
//const search = document.querySelector("input");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = e.target.elements.city.value;
  messageOne.textContent = "Loading....";
  messagtwo.textContent = "";
  icon.innerHTML = "";
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.city;
        messagtwo.textContent = data.forecast;
        var img2 = document.createElement("img"); // Use DOM HTMLImageElement
        img2.src = "http://openweathermap.org/img/wn/" + data.icon + "@2x.png";
        img2.alt = "alt text";
        document.querySelector("#icon").appendChild(img2);
      }
    });
  });
});
