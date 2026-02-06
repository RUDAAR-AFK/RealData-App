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
  if (!box) return;

  const div = document.createElement("div");
  div.className = `msg ${auteur}`;

  // Si le texte contient du HTML, on utilise innerHTML, sinon innerText
  if (texte.includes("<")) {
    div.innerHTML = texte;
  } else {
    div.innerText = texte;
  }

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
      console.log("Fin des questions atteinte. Lancement du rapport...");
      finaliserAnalyse();
    }
  }
}

function finaliserAnalyse() {
  // Calculs de base pour le rapport
  const p = parseFloat(reponses.prix) || 0;
  const h = parseFloat(reponses.honoraires) || 0;
  const s = parseFloat(reponses.surface) || 0;
  const totalInvesti = p + h;
  const prixM2 = s > 0 ? (totalInvesti / s).toFixed(2) : 0;

  console.log("Données récoltées :", reponses);

  // On prépare un bloc HTML unique et propre
  const rapportHTML = `
        <div style="background: #ffffff; border: 2px solid #2c3e50; border-radius: 8px; padding: 15px; margin-top: 10px; color: #333; text-align: left;">
            <h3 style="margin-top: 0; color: #2c3e50; border-bottom: 1px solid #eee;">📊 RAPPORT REALDATA</h3>
            <p><strong>📍 Adresse :</strong> ${reponses.adresse}</p>
            <p><strong>💰 Investissement :</strong> ${totalInvesti.toLocaleString()} €</p>
            <p><strong>📏 Surface :</strong> ${s} m² (${prixM2} €/m²)</p>
            <p><strong>⚡ DPE :</strong> Classe ${reponses.dpe}</p>
            <p><strong>🛠 État :</strong> ${reponses.etat}</p>
            <p><strong>📈 Potentiel :</strong> ${reponses.potentiel}</p>
            <div style="background: #27ae60; color: white; padding: 8px; border-radius: 4px; text-align: center; margin-top: 10px; font-weight: bold;">
                DOSSIER COMPLET
            </div>
        </div>
    `;

  // On cache la zone de saisie
  const inputArea = document.getElementById("input-area");
  if (inputArea) inputArea.style.display = "none";

  // On affiche le message final et le rapport
  ajouterMessage("--- ANALYSE TERMINÉE ---", "bot");
  setTimeout(() => {
    ajouterMessage(rapportHTML, "bot");
  }, 600);
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-valider");
  const input = document.getElementById("user-input");

  if (btn) btn.onclick = traiterSaisie;
  if (input) {
    input.onkeypress = (e) => {
      if (e.key === "Enter") traiterSaisie();
    };
  }

  console.log("Assistant RealData initialisé.");
  setTimeout(() => ajouterMessage(questions[0].q, "bot"), 800);
});
