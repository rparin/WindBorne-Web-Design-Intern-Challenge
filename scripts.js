// Wait for the document to be ready
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
});

// Function to set up event listeners
function setupEventListeners() {
  valuesEventListener();
  colorsEventListener();
  sizesEventListener();
}

function valuesEventListener() {
  const valuesFieldset = document.querySelector("#Values");
  if (valuesFieldset) {
    valuesFieldset.addEventListener("change", (event) => {
      const gauge = document.querySelector(".gauge");
      const gaugeMin = document.querySelector(".gauge-min");
      const gaugeMax = document.querySelector(".gauge-max");
      if (event.target.type === "number" && gauge && gaugeMin && gaugeMax) {
        const abrNum = abbreviateNumber(event.target.value);
        switch (event.target.name) {
          case "minValue":
            gaugeMin.style.fontSize = getFontSize(event.target.value);
            gaugeMin.textContent = abrNum;
            break;
          case "maxValue":
            gaugeMax.style.fontSize = getFontSize(event.target.value);
            gaugeMax.textContent = abrNum;
            break;
          default:
            //curValue
            gauge.textContent = abrNum;
            break;
        }
      }
    });
  }
}

function colorsEventListener() {
  const colorsFieldset = document.querySelector("#Colors");
  if (colorsFieldset) {
    colorsFieldset.addEventListener("change", (event) => {
      const gauge = document.querySelector(".gauge");
      const gaugeMin = document.querySelector(".gauge-min");
      const gaugeMax = document.querySelector(".gauge-max");
      if (event.target.type === "color" && gauge && gaugeMin && gaugeMax) {
        switch (event.target.name) {
          case "minVColor":
            gauge.style.setProperty("--min", event.target.value);
            gaugeMin.style.color = event.target.value;
            break;
          case "midVColor":
            gauge.style.setProperty("--mid", event.target.value);
            break;
          default:
            //maxVColor
            gaugeMax.style.color = event.target.value;
            gauge.style.setProperty("--max", event.target.value);
            break;
        }
      }
    });
  }
}

function sizesEventListener() {
  const sizesFieldset = document.querySelector("#Sizes");
  if (sizesFieldset) {
    sizesFieldset.addEventListener("change", (event) => {
      const container = document.querySelector(".container");
      const markerMain = document.querySelector(".marker-main");
      const markerDot = document.querySelector(".marker-dot");
      const markerPoint = document.querySelector(".marker-point");
      const gauge = document.querySelector(".gauge");
      const gaugeMin = document.querySelector(".gauge-min");
      const gaugeMax = document.querySelector(".gauge-max");
      if (
        event.target.type === "radio" &&
        container &&
        markerMain &&
        markerDot &&
        gauge &&
        gaugeMin &&
        gaugeMax
      ) {
        switch (event.target.value) {
          case "large":
            container.style.height = "170px";
            container.style.width = "136px";
            markerMain.style.padding = "0.5rem";
            markerDot.style.margin = "0.2rem";
            markerPoint.style.borderLeft = "14px solid transparent";
            markerPoint.style.borderRight = markerPoint.style.borderLeft;
            markerPoint.style.borderTop = "20px solid white";
            gauge.style.setProperty("--b", "12px");
            gauge.style.setProperty("--w", "110px");
            gauge.style.fontSize = "2.5rem";
            gaugeMin.style.bottom = "50px";
            gaugeMax.style.bottom = "50px";
            gaugeMin.style.right = "82px";
            gaugeMax.style.right = "35px";
            gaugeMin.style.fontSize = getFontSize(gaugeMin.textContent);
            gaugeMax.style.fontSize = getFontSize(gaugeMax.textContent);
            break;
          default:
            //small
            container.style.height = "150px";
            container.style.width = "116px";
            markerMain.style.padding = "0.4rem";
            markerDot.style.margin = "0.1rem";
            markerPoint.style.borderLeft = "9px solid transparent";
            markerPoint.style.borderRight = markerPoint.style.borderLeft;
            markerPoint.style.borderTop = "10px solid white";
            gauge.style.setProperty("--b", "9px");
            gauge.style.setProperty("--w", "80px");
            gauge.style.fontSize = "2rem";
            gaugeMin.style.fontSize = getFontSize(gaugeMin.textContent);
            gaugeMax.style.fontSize = getFontSize(gaugeMax.textContent);
            gaugeMin.style.bottom = "58px";
            gaugeMax.style.right = "34px";
            gaugeMax.style.bottom = "58px";
            gaugeMin.style.right = "62px";
            break;
        }
      }
    });
  }
}

// HELPER FUNCTIONS
function getFontSize(num) {
  if (
    num >= 1000 ||
    num.includes("K") ||
    num.includes("M") ||
    num.includes("B") ||
    num.includes("T")
  ) {
    return "smallest";
  }
  if (num >= 100) return "smaller";
  return "medium";
}

function abbreviateNumber(num) {
  const precision = 2;
  const map = [
    { suffix: "T", threshold: 1e12 },
    { suffix: "B", threshold: 1e9 },
    { suffix: "M", threshold: 1e6 },
    { suffix: "K", threshold: 1e3 },
    { suffix: "", threshold: 1 },
  ];

  const found = map.find((x) => Math.abs(num) >= x.threshold);
  if (found) {
    const formatted = (num / found.threshold).toFixed(precision) + found.suffix;
    return formatted.replace(".00", "");
  }

  return num;
}
