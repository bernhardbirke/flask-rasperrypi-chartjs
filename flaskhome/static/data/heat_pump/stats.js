// power_consumption
//current
const textFieldElement = document.getElementById("text_watt");
const currentElement1 = document.getElementById("current1");
const currentElement2 = document.getElementById("current2");
//hour
const hourElement1 = document.getElementById("hour1");
//day
const dayElement1 = document.getElementById("day1");
const dayElement2 = document.getElementById("day2");
//month
const monthElement1 = document.getElementById("month1");
const monthElement2 = document.getElementById("month2");
//year
const yearElement1 = document.getElementById("year1");
const yearElement2 = document.getElementById("year2");

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
  fetch("/data/heat_pump/stats", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      name: "heat_pump_stats",
      task: "fetch data for heat pump statistics",
    }),
  })
    .then(function (electricity_dict) {
      if (electricity_dict.ok) {
        electricity_dict.json().then(function (electricity_dict) {
          console.log("wainting for response");
          console.log(electricity_dict);
          currentElement1.src = electricity_dict["grafana_url"]["current1"];
          currentElement2.src = electricity_dict["grafana_url"]["current2"];

          hourElement1.src = electricity_dict["grafana_url"]["hour1"];

          dayElement1.src = electricity_dict["grafana_url"]["day1"];
          dayElement2.src = electricity_dict["grafana_url"]["day2"];

          monthElement1.src = electricity_dict["grafana_url"]["month1"];
          monthElement2.src = electricity_dict["grafana_url"]["month2"];

          yearElement1.src = electricity_dict["grafana_url"]["year1"];
          yearElement2.src = electricity_dict["grafana_url"]["year2"];
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
