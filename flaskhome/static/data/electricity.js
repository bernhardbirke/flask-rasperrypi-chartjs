// Electricity

const textFieldElement = document.getElementById("text_watt");
const currentEnergyElement = document.getElementById("currentEnergy");
const hourlyEnergyElement = document.getElementById("hourlyEnergy");
const leistungsverlaufElement = document.getElementById("leistungsverlauf");

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
    .then(function (electricity_dict) {
      if (electricity_dict.ok) {
        electricity_dict.json().then(function (electricity_dict) {
          console.log("wainting for response");
          console.log(electricity_dict);
          currentEnergyElement.src = electricity_dict["grafana_url"]["url_id4"];
          hourlyEnergyElement.src = electricity_dict["grafana_url"]["url_id6"];
          leistungsverlaufElement.src =
            electricity_dict["grafana_url"]["url_id2"];
          textFieldElement.innerText = `The current Power usage is:${electricity_dict["current_power"][2]} Watts \n At time: ${electricity_dict["current_power"][1]}`;
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
