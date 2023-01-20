//main script to fetch data from the server

import { loadChart, updateChart } from "./data/loadchart.js";

const beginningElement = document.getElementById("beginning");
const endingElement = document.getElementById("ending");
const ctx = document.getElementById("canvas").getContext("2d");

//global variable ObjctdataChart
let sessionVariables = {
  //object of main Chart
  chartObject: "",
};

//set default beginning and ending

beginningElement.addEventListener("input", (e) => {
  let begin = Date.parse(beginningElement.value);
  let end = Date.parse(endingElement.value);
  let dates = { beginning: begin, ending: end };
  let dataChart = sessionVariables.chartObject;
  updateChart(dates, dataChart);
});

endingElement.addEventListener("input", (e) => {
  let begin = Date.parse(beginningElement.value);
  let end = Date.parse(endingElement.value);
  let dates = { beginning: begin, ending: end };
  let dataChart = sessionVariables.chartObject;
  updateChart(dates, dataChart);
});

// Fetch Data and Draw Chart
function fetchDataAndDrawChart(canvasElement, nameOfChart) {
  fetch("/data/boulderbar", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      name: "Boulderbar",
      task: "fetch data for graph",
    }),
  })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (response) {
          console.log("wainting for response");
          console.log(response);
          let chartName = loadChart(canvasElement, response, nameOfChart);
          sessionVariables.chartObject = chartName;
        });
      } else {
        throw Error("Something went wrong");
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

fetchDataAndDrawChart(ctx, "boulderChart");
