const rangeHeight = document.querySelector("input[type='range']#height");
const rangeWeight = document.querySelector("input[type='range']#weight");
const statusMessages = [
  {
    title: "underweight",
    message: "Oh no, you need to get some more mass",
  },
  {
    title: "healthy",
    message: "Congratulations, you're at your ideal weight",
  },
  {
    title: "overweight",
    message: "Be careful, you're starting to become a obese person",
  },
  {
    title: "obese",
    message: "Please, you must lose weight right now",
  },
];

function updateAppColor(newStatusTitle) {
  const status = document.querySelector(`dt#${newStatusTitle}`);
  const { color } = getComputedStyle(status);

  const app = document.querySelector(".app");
  app.style.background = color;
}

function updateStatus(newStatusTitle, newStatusMessage) {
  const statusTitle = document.querySelector(".status-title");
  const statusMessage = document.querySelector(".status-message");

  statusTitle.textContent = newStatusTitle;
  statusMessage.textContent = newStatusMessage;
}

function getStatusTitle(bmiValue) {
  if (bmiValue < 18.5) {
    return "underweight";
  } else if (bmiValue < 24.9) {
    return "healthy";
  } else if (bmiValue < 29.9) {
    return "overweight";
  } else {
    return "obese";
  }
}

function updateBmiValue(newValue) {
  const bmi = document.querySelector(".result .value");
  bmi.textContent = newValue;
}

function getBmiValue(heigth, weigth) {
  return (weigth / Math.pow(heigth / 100, 2)).toFixed(2);
}

function updateRangeValue(rangeType, newValue) {
  const value = document.querySelector(`label[for='${rangeType}'] .value`);
  value.textContent = newValue;
}

function updateAppValues(heigth, weigth) {
  const bmiValue = getBmiValue(heigth, weigth);
  updateBmiValue(bmiValue);

  const statusTitle = getStatusTitle(bmiValue);
  const statusMessage = statusMessages.filter(
    (message) => message.title === statusTitle
  )[0].message;

  updateStatus(statusTitle, statusMessage);
  updateAppColor(statusTitle);
}

function handleRangeChange({ currentTarget }) {
  const heigth = +rangeHeight.value;
  const weigth = +rangeWeight.value;

  console.log({ heigth, weigth });

  updateRangeValue(
    currentTarget.id,
    currentTarget.id === "height" ? heigth : weigth
  );

  updateAppValues(heigth, weigth);
}

rangeHeight.addEventListener("change", handleRangeChange);
rangeWeight.addEventListener("change", handleRangeChange);

updateAppValues(181, 74);
