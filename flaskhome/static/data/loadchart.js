//draw Graph
// create a new chart, using chart.js and luxon as a time adapter. parameter 1 is the canvas element (html). parameter 2 is the data as an object. parameter 3 is the name of the chart.
function loadChart(canvasElement, dataFile, nameOfChart) {
  console.log(
    `loading chart using canvas Element: ${canvasElement}. The name of the Chart is: ${nameOfChart}`
  );
  nameOfChart = new Chart(canvasElement, {
    type: "line",
    options: {
      scales: {
        x: {
          type: "time",
          adapters: { date: { locale: "de", zone: "UTC+1" } },
          min: Date.now() - 4 * 24 * 60 * 60 * 1000,
          max: Date.now(),
          time: {
            //unit: "hour",
            displayFormats: {
              hour: "ccc dd.LLL H:mm",
            },
          },
          parsing: false,
        },
      },
    },
  });
  nameOfChart.data = dataFile;
  nameOfChart.update();
  return nameOfChart;
}

//update the the min and max value of the time cartesian axis of the chart using the dates object (parameter1). parameter 2 is the name of the chart.
function updateChart(dates, nameChart) {
  console.log(
    `updating chart using the following dates for beginning ${dates.beginning} and for the ending ${dates.ending}.`
  );
  nameChart.options.scales.x.min = dates.beginning;
  nameChart.options.scales.x.max = dates.ending;
  nameChart.update();
}

export { loadChart, updateChart };
