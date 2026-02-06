const questions = [
  { q: "Quel est le prix Net Vendeur (€) ?", cle: "prix" },
  { q: "Montant des honoraires d'agence (€) ?", cle: "honoraires" },
  { q: "Surface Carrez totale (m2) ?", cle: "surface" },
  { q: "Note du DPE (A à G) ?", cle: "dpe" },
  { q: "Taxe Foncière annuelle (€) ?", cle: "taxe" },
  { q: "Charges de copropriété mensuelles (€) ?", cle: "charges" },
  { q: "État technique (Toiture, Élec...) ?", cle: "etat" },
  { q: "Adresse précise du bien ?", cle: "adresse" },
  { q: "Compteurs (Individuels/Communs) ?", cle: "compteurs" },
  { q: "Potentiel de division ou extension ?", cle: "potentiel" },
];

let indexQuestion = 0;
let reponses = {};

function ajouterMessage(texte, auteur) {
  const box = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.className = `msg ${auteur}`;
  div.innerText = texte;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function traiterSaisie() {
  const input = document.getElementById("user-input");
  const texte = input.value.trim();

  if (texte !== "") {
    ajouterMessage(texte, "user");
    reponses[questions[indexQuestion].cle] = texte;
    input.value = "";
    indexQuestion++;

    if (indexQuestion < questions.length) {
      setTimeout(() => ajouterMessage(questions[indexQuestion].q, "bot"), 500);
    } else {
      finaliserAnalyse();
    }
  }
}

function finaliserAnalyse() {
  ajouterMessage("--- ANALYSE TERMINÉE ---", "bot");
  ajouterMessage("Données fictives enregistrées avec succès.", "bot");
  document.getElementById("input-area").classList.add("hidden");
}

// Branchement des événements
document.addEventListener("DOMContentLoaded", () => {
  // 1. Gestion du bouton
  document.getElementById("btn-valider").onclick = traiterSaisie;

  // 2. Gestion de la touche Entrée
  document.getElementById("user-input").onkeypress = (e) => {
    if (e.key === "Enter") traiterSaisie();
  };

  // 3. Première question
  setTimeout(() => ajouterMessage(questions[0].q, "bot"), 800);
});
