
// function to change between day, week, month, year
const periods = ["day", "week", "month", "year"];
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

// highlight Humidity greater than 65%

function highlightNum(){
	//find all Elements with class="metric_large" and hide or show them
	const metricLargeElements = document.getElementsByClassName("metric_large");
	for (let i = 0; i < metricLargeElements.length; i++) {
		if (Number(metricLargeElements[i].innerText) < 66) {
			metricLargeElements[i].classList.remove("metric_highlight");
			} else {
			metricLargeElements[i].classList.add("metric_highlight"); 
		}
	}
}

highlightNum()




// image lightbox
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
document.body.appendChild(lightbox);

const images = document.querySelectorAll("img");
images.forEach((image) => {
  image.addEventListener("click", (e) => {
    lightbox.classList.add("active");
    const img = document.createElement("img");
    img.src = image.src;
    while (lightbox.firstChild) {
      lightbox.removeChild(lightbox.firstChild);
    }
    lightbox.appendChild(img);
  });
});

lightbox.addEventListener("click", (e) => {
  if (e.target !== e.currentTarget) return;
  lightbox.classList.remove("active");
});