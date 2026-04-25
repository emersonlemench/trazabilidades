const data = {
  "coffee": {
    "name": "Honduras",
    "origin": {
      "country": "Honduras",
      "region": "Comayagua"
    },
    "producer": "Luis Antonio Velásquez",
    "variety": "Parainema",
    "altitude_masl": 1600,
    "process": "Lavado",
    "estimated_notes": [
      "Cítricos dulces",
      "Flor de azahar",
      "Caramelo"
    ]
  },
  "scores": {
    "producer_sheet_total": 86,
    "sca_scan_total": 85.58,
    "attributes": {
      "aroma": 7.78,
      "flavour": 8.10,
      "aftertaste": 8.17,
      "acidity": 7.89,
      "body": 8.12,
      "balance": 7.85,
      "overall": 7.67
    }
  }
};

// -------- UI --------
document.getElementById("coffee-name").textContent = data.coffee.name;

document.getElementById("origin").textContent =
  `${data.coffee.origin.country} - ${data.coffee.origin.region}`;

document.getElementById("producer").textContent = data.coffee.producer;
document.getElementById("variety").textContent = data.coffee.variety;
document.getElementById("altitude").textContent = data.coffee.altitude_masl;
document.getElementById("process").textContent = data.coffee.process;

document.getElementById("notes").textContent =
  data.coffee.estimated_notes.join(", ");

document.getElementById("score-producer").textContent =
  data.scores.producer_sheet_total;

document.getElementById("score-sca").textContent =
  data.scores.sca_scan_total;

// -------- breakdown --------
const breakdown = document.getElementById("score-breakdown");

Object.entries(data.scores.attributes).forEach(([key, value]) => {
  const p = document.createElement("p");
  p.innerHTML = `<strong>${key}:</strong> ${value}`;
  breakdown.appendChild(p);
});

// -------- Radar Chart --------
const canvas = document.getElementById("radarChart");
const ctx = canvas.getContext("2d");

const labels = Object.keys(data.scores.attributes);
const values = Object.values(data.scores.attributes);

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 140;

function drawRadar() {
  const steps = 5;

  // grid
  for (let s = 1; s <= steps; s++) {
    ctx.beginPath();
    labels.forEach((_, i) => {
      const angle = (Math.PI * 2 / labels.length) * i;
      const r = radius * (s / steps);
      const x = centerX + r * Math.sin(angle);
      const y = centerY - r * Math.cos(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.strokeStyle = "#e0d8cf";
    ctx.stroke();
  }

  // axes + labels
  labels.forEach((label, i) => {
    const angle = (Math.PI * 2 / labels.length) * i;
    const x = centerX + radius * Math.sin(angle);
    const y = centerY - radius * Math.cos(angle);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#d6ccc2";
    ctx.stroke();

    ctx.fillStyle = "#5a3e2b";
    ctx.font = "12px Georgia";
    ctx.fillText(label, x, y);
  });

  // data polygon
  ctx.beginPath();
  values.forEach((val, i) => {
    const angle = (Math.PI * 2 / labels.length) * i;
    const r = (val / 10) * radius;
    const x = centerX + r * Math.sin(angle);
    const y = centerY - r * Math.cos(angle);

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();

  ctx.fillStyle = "rgba(139, 94, 60, 0.35)";
  ctx.fill();
  ctx.strokeStyle = "#8b5e3c";
  ctx.lineWidth = 2;
  ctx.stroke();
}

drawRadar();