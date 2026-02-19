import { calculerRapport } from "./calculator.js";

let catalogueComplet = {};
let questionsSelectionnees = [];
let etapeActuelle = -1;
let reponses = {};
let typeChoisi = "";

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const btnValider = document.getElementById("btn-valider");

async function chargerConfiguration() {
  try {
    // On cherche le fichier depuis la racine où se trouve l'index
    const response = await fetch("RealData-App/parcours.json");
    catalogueComplet = await response.json();
    ajouterMessage(
      "Salut Rudy ! Quel type de bien expertisons-nous ? (MAISON, APPARTEMENT, IMMEUBLE, TERRAIN, COMMERCE, PARKING)",
      "bot",
    );
  } catch (error) {
    ajouterMessage(
      "Erreur : Impossible de charger ton catalogue de questions.",
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

function gererReponse() {
  const fileInput = document.getElementById("file-input");
  const btnPhoto = document.getElementById("btn-photo");

  btnPhoto.onclick = () => fileInput.click();

  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result;

        // Lucia : On affiche la miniature dans le chat
        ajouterMessage(
          `<img src="${base64Image}" style="width:100px; border-radius:10px;">`,
          "user",
        );

        // On stocke l'image et on passe à la suite
        reponses[questionsSelectionnees[etapeActuelle].cle] = base64Image;
        etapeActuelle++;
        setTimeout(poserQuestion, 500);
      };
      reader.readAsDataURL(file);
    }
  };
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
        "Ce type n'est pas dans ton fichier. Choisis parmi : " +
          Object.keys(catalogueComplet).join(", "),
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
  // CORRECTION ICI : La ligne qui faisait planter Prettier est réparée
  function poserQuestion() {
    if (etapeActuelle < questionsSelectionnees.length) {
      const question = questionsSelectionnees[etapeActuelle];
      ajouterMessage(question.q, "bot");

      // Si la question demande une image, on montre le bouton photo
      const btnPhoto = document.getElementById("btn-photo");
      if (question.type === "image") {
        btnPhoto.style.display = "inline-block";
      } else {
        btnPhoto.style.display = "none";
      }
    } else {
      // ... reste de ton code de fin d'expertise
    }
  }
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
