import { calculerRapport } from "./calculator.js";

let questions = [];
let etapeActuelle = 0;
let reponses = {};

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const btnValider = document.getElementById("btn-valider");

// On charge le questionnaire depuis le dossier
async function chargerConfiguration() {
  try {
    const response = await fetch("RealData-App/parcours.json");
    questions = await response.json();
    afficherQuestion();
  } catch (error) {
    ajouterMessage(
      "Erreur : Impossible de charger le cerveau du chatbot.",
      "bot",
    );
  }
}

function ajouterMessage(texte, auteur) {
  const div = document.createElement("div");
  div.classList.add("msg", auteur);
  div.innerHTML = texte;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function afficherQuestion() {
  if (etapeActuelle < questions.length) {
    ajouterMessage(questions[etapeActuelle].question, "bot");
  } else {
    finirExpertise();
  }
}

function finirExpertise() {
  const typeBien = reponses.type || "Bien immobilier";
  const resultat = calculerRapport(reponses, typeBien);
  ajouterMessage("### Expertise Terminée", "bot");
  ajouterMessage(resultat.stats, "bot");
}

btnValider.onclick = () => {
  const texte = userInput.value.trim();
  if (texte) {
    ajouterMessage(texte, "user");
    const cle = questions[etapeActuelle].id;
    reponses[cle] = texte;
    userInput.value = "";
    etapeActuelle++;
    setTimeout(afficherQuestion, 500);
  }
};

userInput.onkeypress = (e) => {
  if (e.key === "Enter") btnValider.click();
};

chargerConfiguration();
