// La liste des 10 points d'Eric pour l'analyse d'un projet fictif
const questions = [
  { id: 1, q: "Quel est le prix Net Vendeur (€) ?", cle: "prix" },
  { id: 2, q: "Montant des honoraires d'agence (€) ?", cle: "honoraires" },
  { id: 3, q: "Surface Carrez du bien (m2) ?", cle: "surface" },
  { id: 4, q: "Note du DPE (A à G) ?", cle: "dpe" },
  { id: 5, q: "Montant de la Taxe Foncière (€/an) ?", cle: "taxe" },
  { id: 6, q: "Charges de copropriété mensuelles (€) ?", cle: "charges" },
  { id: 7, q: "État technique (Toiture, Élec...) ?", cle: "etat" },
  { id: 8, q: "Adresse précise du projet ?", cle: "adresse" },
  { id: 9, q: "Type de compteurs (Indiv/Communs) ?", cle: "compteurs" },
  { id: 10, q: "Potentiel de division ou extension ?", cle: "potentiel" },
];

let etapeActuelle = 0;
let donneesRecoltees = {};

function ajouterMessage(texte, type) {
  const chatBox = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.className = `msg ${type}`;
  div.innerText = texte;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function envoyerReponse() {
  const input = document.getElementById("user-input");
  const reponse = input.value.trim();

  if (reponse === "") return;

  // 1. On affiche la réponse de l'utilisateur
  ajouterMessage(reponse, "user");

  // 2. On enregistre la donnée
  donneesRecoltees[questions[etapeActuelle].cle] = reponse;
  input.value = "";

  // 3. On passe à la question suivante
  etapeActuelle++;

  if (etapeActuelle < questions.length) {
    setTimeout(() => {
      ajouterMessage(questions[etapeActuelle].q, "bot");
    }, 500);
  } else {
    afficherResultatFinal();
  }
}

function afficherResultatFinal() {
  const p = parseFloat(donneesRecoltees.prix);
  const h = parseFloat(donneesRecoltees.honoraires);
  const t = parseFloat(donneesRecoltees.taxe);
  const c = parseFloat(donneesRecoltees.charges) * 12; // On annualise les charges

  const prixTotal = p + h;
  // On simule un loyer fictif basé sur 10€/m2 pour l'exemple
  const loyerFictif = (parseFloat(donneesRecoltees.surface) || 0) * 10;
  const rendementNet = ((loyerFictif * 12 - t - c) / prixTotal) * 100;

  setTimeout(() => {
    ajouterMessage("--- ANALYSE TERMINÉE ---", "bot");
    ajouterMessage(
      `Pour ce projet fictif à ${donneesRecoltees.adresse}, le rendement net estimé (base 10€/m2) est de ${rendementNet.toFixed(2)} %.`,
      "bot",
    );
    document.getElementById("input-area").classList.add("hidden");
  }, 1000);
}

// Lancement automatique de la première question
window.onload = () => {
  setTimeout(() => {
    ajouterMessage(questions[0].q, "bot");
  }, 1000);
};
