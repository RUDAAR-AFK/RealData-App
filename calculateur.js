/**
 * Configuration des étapes de collecte de données
 */
const questions = [
  {
    id: 1,
    q: "Quel est le prix Net Vendeur de l'acquisition (€) ?",
    cle: "prix",
  },
  {
    id: 2,
    q: "Quel est le montant des honoraires d'agence (€) ?",
    cle: "honoraires",
  },
  { id: 3, q: "Quelle est la surface Carrez totale (m2) ?", cle: "surface" },
  { id: 4, q: "Quelle est la classification DPE du bien ?", cle: "dpe" },
  {
    id: 5,
    q: "Quel est le montant annuel de la Taxe Foncière (€) ?",
    cle: "taxe",
  },
  {
    id: 6,
    q: "Montant moyen des charges de copropriété mensuelles (€) ?",
    cle: "charges",
  },
  {
    id: 7,
    q: "Observations sur l'état technique (Toiture, Électricité, Plomberie) ?",
    cle: "etat",
  },
  {
    id: 8,
    q: "Veuillez renseigner l'adresse précise du bien :",
    cle: "adresse",
  },
  {
    id: 9,
    q: "S'agit-il de compteurs individuels ou communs ?",
    cle: "compteurs",
  },
  {
    id: 10,
    q: "Existe-t-il un potentiel de division ou d'extension ?",
    cle: "potentiel",
  },
];

let etapeActuelle = 0;
let donneesRecoltees = {};

/**
 * Interface de discussion
 */
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

  ajouterMessage(reponse, "user");
  donneesRecoltees[questions[etapeActuelle].cle] = reponse;
  input.value = "";
  etapeActuelle++;

  if (etapeActuelle < questions.length) {
    setTimeout(() => {
      ajouterMessage(questions[etapeActuelle].q, "bot");
    }, 600);
  } else {
    genererRapportFinal();
  }
}

/**
 * Calcul et affichage du rapport
 */
function genererRapportFinal() {
  const p = parseFloat(donneesRecoltees.prix) || 0;
  const h = parseFloat(donneesRecoltees.honoraires) || 0;
  const t = parseFloat(donneesRecoltees.taxe) || 0;
  const c = (parseFloat(donneesRecoltees.charges) || 0) * 12;
  const s = parseFloat(donneesRecoltees.surface) || 0;

  const investissementTotal = p + h;
  // Estimation prudente basée sur un loyer fictif de 11€/m2
  const loyerEstimeAnnuel = s * 11 * 12;
  const rendementNet =
    ((loyerEstimeAnnuel - t - c) / investissementTotal) * 100;

  setTimeout(() => {
    ajouterMessage("--- SYNTHÈSE DE L'ANALYSE ---", "bot");
    ajouterMessage(`Localisation : ${donneesRecoltees.adresse}`, "bot");
    ajouterMessage(
      `Investissement global : ${investissementTotal.toLocaleString()} €`,
      "bot",
    );
    ajouterMessage(
      `Rendement Net Estimé : ${rendementNet.toFixed(2)} % (sur base locative théorique).`,
      "bot",
    );
    ajouterMessage(
      "Dossier enregistré. Vous pouvez fermer cette fenêtre ou rafraîchir pour une nouvelle saisie.",
      "bot",
    );
    document.getElementById("input-area").classList.add("hidden");
  }, 1000);
}

// Initialisation
window.onload = () => {
  setTimeout(() => {
    ajouterMessage(questions[0].q, "bot");
  }, 1000);
};
