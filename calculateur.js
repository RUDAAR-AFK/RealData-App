const questions = [
  { q: "Quel est le prix Net Vendeur de l'acquisition (€) ?", cle: "prix" },
  { q: "Montant des honoraires d'agence (€) ?", cle: "honoraires" },
  { q: "Surface Carrez totale (m2) ?", cle: "surface" },
  { q: "Note du DPE (A à G) ?", cle: "dpe" },
  { q: "Taxe Foncière annuelle (€) ?", cle: "taxe" },
  { q: "Charges de copropriété mensuelles (€) ?", cle: "charges" },
  { q: "État technique (Toiture, Élec, Plomberie) ?", cle: "etat" },
  { q: "Adresse précise du bien ?", cle: "adresse" },
  { q: "Type de compteurs (Indiv/Communs) ?", cle: "compteurs" },
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
  const p = parseFloat(reponses.prix) || 0;
  const h = parseFloat(reponses.honoraires) || 0;
  const s = parseFloat(reponses.surface) || 0;
  const total = p + h;

  // Simulation d'un rendu professionnel
  const rapportHTML = `
        <div style="border-top: 2px solid #2c3e50; margin-top: 10px; padding-top: 10px; text-align: left;">
            <strong style="color: #2c3e50;">SYNTHÈSE DU DOSSIER :</strong><br><br>
            • <strong>Localisation :</strong> ${reponses.adresse}<br>
            • <strong>Investissement :</strong> ${total.toLocaleString()} €<br>
            • <strong>Surface :</strong> ${s} m² (${(total / s).toFixed(2)} €/m²)<br>
            • <strong>DPE :</strong> Classe ${reponses.dpe}<br>
            • <strong>Note technique :</strong> ${reponses.etat}<br><br>
            <div style="background: #2c3e50; color: white; padding: 10px; border-radius: 5px; text-align: center;">
                Dossier prêt pour comité d'investissement
            </div>
        </div>
    `;

  ajouterMessage("--- ANALYSE TERMINÉE ---", "bot");

  // On injecte le rapport directement dans la discussion
  const box = document.getElementById("chat-box");
  const divRapport = document.createElement("div");
  divRapport.className = "msg bot";
  divRapport.innerHTML = rapportHTML;
  box.appendChild(divRapport);

  document.getElementById("input-area").classList.add("hidden");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-valider").onclick = traiterSaisie;
  document.getElementById("user-input").onkeypress = (e) => {
    if (e.key === "Enter") traiterSaisie();
  };
  setTimeout(() => ajouterMessage(questions[0].q, "bot"), 800);
});
