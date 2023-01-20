//select date
//UNUSED! function integrated in script.js

const beginningElement = document.getElementById("beginning");
const endingElement = document.getElementById("ending");
//set default beginning and ending
//beginningElement.value = "2017-06-01T08:30";

begin = Date.parse(beginningElement.value);
end = Date.parse(endingElement.value);
dates = { beginning: begin, ending: end };

export { dates };
