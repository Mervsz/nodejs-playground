const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

messageOne.textContent = "";
messageTwo.textContent = "";
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  fetch(`/weather?address=${location}`)
    .then((response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = `${data.error}`;
        } else {
          console.log(data, "data");
          messageOne.textContent = `location is ${data.location}`;
          messageTwo.textContent = `forecast is ${data.forecast}`;
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
  console.log("submit", location);
});
