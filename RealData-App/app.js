import { calculerRapport } from "./calculator.js";

let catalogueComplet = {};
let questionsSelectionnees = [];
let etapeActuelle = -1;
let reponses = {};
let typeChoisi = "";

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const btnValider = document.getElementById("btn-valider");
const fileInput = document.getElementById("file-input");
const btnPhoto = document.getElementById("btn-photo");

// 1. LIEN BOUTON PHOTO : On le met ici pour qu'il soit actif tout le temps
btnPhoto.onclick = () => fileInput.click();

fileInput.onchange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Image = event.target.result;
      ajouterMessage(
        `<img src="${base64Image}" style="width:100px; border-radius:10px;">`,
        "user",
      );

      // On stocke dans une galerie libre pour ne pas bloquer le questionnaire
      if (!reponses.galerie) reponses.galerie = [];
      reponses.galerie.push(base64Image);
    };
    reader.readAsDataURL(file);
  }
};

async function chargerConfiguration() {
  try {
    const response = await fetch("RealData-App/parcours.json");
    catalogueComplet = await response.json();
    ajouterMessage(
      "Salut Rudy ! Quel type de bien expertisons-nous ? (MAISON, APPARTEMENT, IMMEUBLE, TERRAIN, COMMERCE, PARKING)",
      "bot",
    );
  } catch (error) {
    ajouterMessage("Erreur : Impossible de charger ton catalogue.", "bot");
  }
}

function ajouterMessage(texte, auteur) {
  const div = document.createElement("div");
  div.classList.add("msg", auteur);
  div.innerHTML = texte;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function gererReponse() {
  const texte = userInput.value.trim();
  if (!texte) return;

  ajouterMessage(texte, "user");
  userInput.value = "";

  if (etapeActuelle === -1) {
    const choix = texte.toUpperCase();
    if (catalogueComplet[choix]) {
      typeChoisi = choix;
      questionsSelectionnees = catalogueComplet[choix];
      reponses["type"] = choix;
      etapeActuelle = 0;
      setTimeout(poserQuestion, 500);
    } else {
      ajouterMessage(
        "Choisis parmi : " + Object.keys(catalogueComplet).join(", "),
        "bot",
      );
    }
  } else {
    const questionCourante = questionsSelectionnees[etapeActuelle];
    reponses[questionCourante.cle] = texte;
    etapeActuelle++;
    setTimeout(poserQuestion, 500);
  }
}

function poserQuestion() {
  if (etapeActuelle < questionsSelectionnees.length) {
    ajouterMessage(questionsSelectionnees[etapeActuelle].q, "bot");
  } else {
    const resultat = calculerRapport(reponses, typeChoisi);
    ajouterMessage("### Expertise Terminée", "bot");
    ajouterMessage(resultat.stats, "bot");
  }
}

btnValider.onclick = gererReponse;
userInput.onkeypress = (e) => {
  if (e.key === "Enter") gererReponse();
};

chargerConfiguration();
