// heat_pump_process
//current
const textFieldElement = document.getElementById("text_watt");
const currentElement1 = document.getElementById("current1");
const currentElement2 = document.getElementById("current2");
const currentElement3 = document.getElementById("current3");
const currentElement4 = document.getElementById("current4");
const currentElement5 = document.getElementById("current5");
//hour
const hourElement1 = document.getElementById("hour1");
const hourElement2 = document.getElementById("hour2");
const hourElement3 = document.getElementById("hour3");
const hourElement4 = document.getElementById("hour4");
const hourElement5 = document.getElementById("hour5");
//day
const dayElement1 = document.getElementById("day1");
const dayElement2 = document.getElementById("day2");
const dayElement3 = document.getElementById("day3");
const dayElement4 = document.getElementById("day4");
const dayElement5 = document.getElementById("day5");
//month
const monthElement1 = document.getElementById("month1");
const monthElement2 = document.getElementById("month2");
const monthElement3 = document.getElementById("month3");
const monthElement4 = document.getElementById("month4");
const monthElement5 = document.getElementById("month5");
//year
const yearElement1 = document.getElementById("year1");
const yearElement2 = document.getElementById("year2");
const yearElement3 = document.getElementById("year3");
const yearElement4 = document.getElementById("year4");
const yearElement5 = document.getElementById("year5");

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
  fetch("/data/heat_pump/process", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      name: "heat_pump_process",
      task: "fetch data for heat pump processes",
    }),
  })
    .then(function (electricity_dict) {
      if (electricity_dict.ok) {
        electricity_dict.json().then(function (electricity_dict) {
          console.log("wainting for response");
          console.log(electricity_dict);
          currentElement1.src = electricity_dict["grafana_url"]["current1"];
          currentElement2.src = electricity_dict["grafana_url"]["current2"];
          currentElement3.src = electricity_dict["grafana_url"]["current3"];
          currentElement4.src = electricity_dict["grafana_url"]["current4"];
          currentElement5.src = electricity_dict["grafana_url"]["current5"];

          hourElement1.src = electricity_dict["grafana_url"]["hour1"];
          hourElement2.src = electricity_dict["grafana_url"]["hour2"];
          hourElement3.src = electricity_dict["grafana_url"]["hour3"];
          hourElement4.src = electricity_dict["grafana_url"]["hour4"];
          hourElement5.src = electricity_dict["grafana_url"]["hour5"];

          dayElement1.src = electricity_dict["grafana_url"]["day1"];
          dayElement2.src = electricity_dict["grafana_url"]["day2"];
          dayElement3.src = electricity_dict["grafana_url"]["day3"];
          dayElement4.src = electricity_dict["grafana_url"]["day4"];
          dayElement5.src = electricity_dict["grafana_url"]["day5"];

          monthElement1.src = electricity_dict["grafana_url"]["month1"];
          monthElement2.src = electricity_dict["grafana_url"]["month2"];
          monthElement3.src = electricity_dict["grafana_url"]["month3"];
          monthElement4.src = electricity_dict["grafana_url"]["month4"];
          monthElement5.src = electricity_dict["grafana_url"]["month5"];

          yearElement1.src = electricity_dict["grafana_url"]["year1"];
          yearElement2.src = electricity_dict["grafana_url"]["year2"];
          yearElement3.src = electricity_dict["grafana_url"]["year3"];
          yearElement4.src = electricity_dict["grafana_url"]["year4"];
          yearElement5.src = electricity_dict["grafana_url"]["year5"];
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
