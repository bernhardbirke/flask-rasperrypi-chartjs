// Electricity

const textFieldElement = document.getElementById("text_watt");

textFieldElement.innerText = "New current Power usage is: 300 Watts";

// Fetch Data and Draw Chart
function fetchDataElectricity() {
  fetch("/data/electricity", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      name: "Electricity",
      task: "fetch data for power usage",
    }),
  })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (response) {
          console.log("wainting for response");
          console.log(response);
          textFieldElement.innerText = `The current Power usage is:${response[2]} Watts \n At time: ${response[1]}`;
        });
      } else {
        throw Error("Something went wrong");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

fetchDataElectricity();
