// power_consumption
//current
const textFieldElement = document.getElementById("text_watt");
const currentEnergyElement = document.getElementById("currentEnergy");
const leistungsverlaufElement = document.getElementById("leistungsverlauf");
//hour
const hourlyEnergyElement = document.getElementById("hourlyEnergy");
//day
const dailyEnergyElement = document.getElementById("dailyEnergy");
//month
const monthlyEnergyElement = document.getElementById("monthlyEnergy");
//year
const yearlyEnergyElement = document.getElementById("yearlyEnergy");

textFieldElement.innerText = "Javascript loaded";

// function to change between current, hour, day, week, year
const periods = ["current", "hour", "day", "month", "year"];
function choose(id) {
  for (let i = 0; i < periods.length; i++) {
    let c = document.getElementById("control_" + periods[i]);
    if (c) c.className = periods[i] == id ? "button button_selected" : "button";
    //find all Elements with class="maxmin_+periods[i]" and hide or show them
    const maxminElements = document.getElementsByClassName(
      "maxmin_" + periods[i]
    );
    if (periods[i] == id) {
      for (let j = 0; j < maxminElements.length; j++) {
        maxminElements[j].classList.remove("hide");
      }
    } else {
      for (let j = 0; j < maxminElements.length; j++) {
        maxminElements[j].classList.add("hide");
      }
    }
  }
}

// Fetch Data and Draw Chart
function fetchData() {
  fetch("/data/power_consumption", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      name: "power_consumption",
      task: "fetch data for power consumption",
    }),
  })
    .then(function (electricity_dict) {
      if (electricity_dict.ok) {
        electricity_dict.json().then(function (electricity_dict) {
          console.log("wainting for response");
          console.log(electricity_dict);
          currentEnergyElement.src = electricity_dict["grafana_url"]["url_id4"];
          leistungsverlaufElement.src =
            electricity_dict["grafana_url"]["url_id2"];
          hourlyEnergyElement.src = electricity_dict["grafana_url"]["url_id7"];
          dailyEnergyElement.src = electricity_dict["grafana_url"]["url_id6"];
          monthlyEnergyElement.src = electricity_dict["grafana_url"]["url_id8"];
          yearlyEnergyElement.src = electricity_dict["grafana_url"]["url_id9"];
          textFieldElement.innerText = `The current power consumption of the heat pump is:${electricity_dict["current_heat_pump"][3]} [W] 
          \n The total energy consumption of the heat pump is: ${electricity_dict["current_heat_pump"][2]} [Wh] 
          \n At time: ${electricity_dict["current_heat_pump"][1]}
          \n The current power consumption of the dehumidifier is:${electricity_dict["current_fritz"][2]} [W] 
          \n The total energy consumption of the dehumidifier is: ${electricity_dict["current_fritz"][3]} [Wh] 
          \n At time: ${electricity_dict["current_fritz"][1]}`;
        });
      } else {
        throw Error("Something went wrong");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

fetchData();
