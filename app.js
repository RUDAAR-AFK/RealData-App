import { calculerRapport } from "./calculator.js";

let parcoursData = {};
let currentType = null;
let currentIndex = 0;
let reponses = {};

async function init() {
  const res = await fetch("./parcours.json");
  parcoursData = await res.json();
  ajouterMessage(
    "Bienvenue dans <strong>RealData Immo</strong>. Sélectionnez :<br>MAISON, APPARTEMENT, IMMEUBLE, TERRAIN, COMMERCE, PARKING",
    "bot",
  );
}

function ajouterMessage(txt, type) {
  const div = document.createElement("div");
  div.className = `msg ${type}`;
  div.innerHTML = txt;
  document.getElementById("chat-box").appendChild(div);
  document.getElementById("chat-box").scrollTop =
    document.getElementById("chat-box").scrollHeight;
}

window.traiterSaisie = () => {
  const input = document.getElementById("user-input");
  const val = input.value.trim();
  if (!val) return;
  ajouterMessage(val, "user");
  input.value = "";

  if (!currentType) {
    if (parcoursData[val.toUpperCase()]) {
      currentType = val.toUpperCase();
      ajouterMessage(`Analyse technique lancée pour ${currentType}.`, "bot");
      ajouterMessage(parcoursData[currentType][0].q, "bot");
    }
  } else {
    reponses[parcoursData[currentType][currentIndex].cle] = val;
    currentIndex++;
    if (currentIndex < parcoursData[currentType].length) {
      ajouterMessage(parcoursData[currentType][currentIndex].q, "bot");
    } else {
      const r = calculerRapport(reponses, currentType);
      const html = `
                <div class="report">
                    <h3>RealData Immo : ${currentType}</h3>
                    <p>📍 ${reponses.adresse} | 💰 ${r.total} € | ⚡ DPE: ${r.dpe}</p>
                    ${r.stats}
                    <div class="score">SANTÉ & CONFORT : ${r.score}/10</div>
                </div>`;
      ajouterMessage(html, "bot");
      document.getElementById("input-area").style.display = "none";
      document.getElementById("btn-reset").style.display = "block";
    }
  }
};

document.getElementById("btn-valider").onclick = window.traiterSaisie;
init();
