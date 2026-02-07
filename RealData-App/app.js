import { calculerRapport } from "./calculator.js";

let catalogueComplet = {}; 
let questionsSelectionnees = []; 
let etapeActuelle = -1; // -1 signifie qu'on attend de choisir le type de bien
let reponses = {};
let typeChoisi = "";

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const btnValider = document.getElementById("btn-valider");

// 1. Initialisation : Chargement du catalogue et accueil
async function chargerConfiguration() {
  try {
    // On charge le fichier JSON depuis son dossier
    const response = await fetch("RealData-App/parcours.json");
    catalogueComplet = await response.json();
    ajouterMessage("Salut Rudy ! Quel type de bien expertisons-nous ? (MAISON, APPARTEMENT, IMMEUBLE, TERRAIN, COMMERCE, PARKING)", "bot");
  } catch (error) {
    ajouterMessage("Erreur : Le fichier parcours.json est introuvable ou mal formé.", "bot");
  }
}

// 2. Gestionnaire d'affichage des messages
function ajouterMessage(texte, auteur) {
  const div = document.createElement("div");
  div.classList.add("msg", auteur);
  div.innerHTML = texte;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// 3. Logique de progression du Chatbot
function gererReponse() {
  const texte = userInput.value.trim();
  if (!texte) return;

  ajouterMessage(texte, "user");
  userInput.value = "";

  if (etapeActuelle === -1) {
    // ÉTAPE : Déterminer la catégorie (MAISON, IMMEUBLE...)
    const choix = texte.toUpperCase();
    if (catalogueComplet[choix]) {
      typeChoisi = choix;
      questionsSelectionnees = catalogueComplet[choix];
      reponses["type"] = choix;
      etapeActuelle = 0;
      setTimeout(poserQuestion, 500);
    } else {
      ajouterMessage("Ce type n'est pas reconnu. Choisis parmi : " + Object.keys(catalogueComplet).join(", "), "bot");
    }
  } else {
    // ÉTAPE : Enregistrement de la réponse et suite
    const questionCourante = questionsSelectionnees[etapeActuelle];
    reponses[questionCourante.cle] = texte; // Utilise la clé définie dans ton JSON
    etapeActuelle++;
    setTimeout(poserQuestion, 500);
  }
}

// 4. Affichage de la question ou du rapport final
function poserQuestion() {
  if (etapeActuelle < questionsSelectionne