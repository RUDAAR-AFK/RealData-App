/**
 * Configuration des parcours de collecte par type de bien
 */
const parcours = {
  MAISON: [
    { q: "Prix Net Vendeur (€) ?", cle: "prix" },
    { q: "Surface habitable (m2) ?", cle: "surface" },
    { q: "Surface de la parcelle / terrain (m2) ?", cle: "terrain" },
    { q: "État général (Travaux à prévoir ?) ?", cle: "technique" },
    { q: "DPE (Classe énergétique) ?", cle: "dpe" },
    { q: "Adresse du bien ?", cle: "adresse" },
  ],
  APPARTEMENT: [
    { q: "Prix Net Vendeur (€) ?", cle: "prix" },
    { q: "Surface Carrez (m2) ?", cle: "surface" },
    { q: "Étage et ascenseur ?", cle: "etage" },
    { q: "Montant des charges de copropriété annuelles (€) ?", cle: "charges" },
    { q: "DPE (Classe énergétique) ?", cle: "dpe" },
    { q: "Adresse du bien ?", cle: "adresse" },
  ],
  IMMEUBLE: [
    { q: "Prix Net Vendeur de l'ensemble (€) ?", cle: "prix" },
    { q: "Nombre total de lots ?", cle: "lots" },
    { q: "Surface totale (m2) ?", cle: "surface" },
    { q: "État de la toiture et des communs ?", cle: "technique" },
    { q: "Montant de la Taxe Foncière (€) ?", cle: "taxe" },
    { q: "Adresse de l'immeuble ?", cle: "adresse" },
  ],
  TERRAIN: [
    { q: "Prix Net Vendeur (€) ?", cle: "prix" },
    { q: "Surface du terrain (m2) ?", cle: "surface" },
    { q: "Le terrain est-il viabilisé (Oui/Non) ?", cle: "technique" },
    { q: "Zone au PLU (ex: U, AU, N...) ?", cle: "plu" },
    { q: "Adresse du terrain ?", cle: "adresse" },
  ],
  COMMERCE: [
    { q: "Prix Net Vendeur (€) ?", cle: "prix" },
    { q: "Loyer annuel HC encaissé (€) ?", cle: "loyer" },
    { q: "Surface commerciale (m2) ?", cle: "surface" },
    { q: "Type de bail (3/6/9, précaire...) ?", cle: "bail" },
    { q: "Taxe foncière à la charge du preneur ?", cle: "taxe" },
    { q: "Adresse du local ?", cle: "adresse" },
  ],
  PARKING: [
    { q: "Prix du lot de parkings/boxs (€) ?", cle: "prix" },
    { q: "Nombre d'emplacements ?", cle: "lots" },
    { q: "Le site est-il sécurisé (Portail, Caméra) ?", cle: "technique" },
    { q: "Charges de copro annuelles (€) ?", cle: "charges" },
    { q: "Adresse précise ?", cle: "adresse" },
  ],
};

let typeBienSelectionne = null;
let indexQuestion = 0;
let reponses = {};

function ajouterMessage(texte, auteur) {
  const box = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.className = `msg ${auteur}`;
  div.innerHTML = texte;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function traiterSaisie() {
  const input = document.getElementById("user-input");
  const texte = input.value.trim();
  if (texte === "") return;

  ajouterMessage(texte, "user");
  input.value = "";

  // Logique de sélection du type au départ
  if (!typeBienSelectionne) {
    const choix = texte.toUpperCase();
    if (parcours[choix]) {
      typeBienSelectionne = choix;
      setTimeout(
        () =>
          ajouterMessage(
            `Analyse lancée pour : <strong>${typeBienSelectionne}</strong>.`,
            "bot",
          ),
        400,
      );
      setTimeout(
        () => ajouterMessage(parcours[typeBienSelectionne][0].q, "bot"),
        1000,
      );
    } else {
      ajouterMessage(
        "Option non reconnue. Merci de choisir parmi les types listés ci-dessus.",
        "bot",
      );
    }
    return;
  }

  // Déroulement des questions
  const questionsActuelles = parcours[typeBienSelectionne];
  reponses[questionsActuelles[indexQuestion].cle] = texte;
  indexQuestion++;

  if (indexQuestion < questionsActuelles.length) {
    setTimeout(
      () => ajouterMessage(questionsActuelles[indexQuestion].q, "bot"),
      500,
    );
  } else {
    finaliserAnalyse();
  }
}

function finaliserAnalyse() {
  const p = parseFloat(reponses.prix) || 0;
  const s = parseFloat(reponses.surface) || 0;
  const ratio = s > 0 ? (p / s).toFixed(2) : 0;

  const rapportHTML = `
        <div style="background: #ffffff; border: 2px solid #2c3e50; border-radius: 8px; padding: 15px; margin-top: 10px; color: #333;">
            <h3 style="margin: 0 0 10px 0; color: #2c3e50; border-bottom: 2px solid #3498db;">📊 FICHE SYNTHÈSE : ${typeBienSelectionne}</h3>
            <p><strong>📍 Localisation :</strong> ${reponses.adresse}</p>
            <p><strong>💰 Valeur d'acquisition :</strong> ${p.toLocaleString()} €</p>
            ${s > 0 ? `<p><strong>📏 Analyse surfacique :</strong> ${s} m² (${ratio} €/m²)</p>` : ""}
            ${reponses.dpe ? `<p><strong>⚡ Diagnostic :</strong> Classe ${reponses.dpe}</p>` : ""}
            ${reponses.technique ? `<p><strong>🛠 État technique :</strong> ${reponses.technique}</p>` : ""}
            <div style="background: #2c3e50; color: white; padding: 10px; border-radius: 4px; text-align: center; margin-top: 15px; font-weight: bold; font-size: 0.9em;">
                DOSSIER REALDATA IMMO VALIDÉ
            </div>
        </div>
    `;

  document.getElementById("input-area").style.display = "none";
  ajouterMessage("Analyse technique terminée. Génération du rapport...", "bot");
  setTimeout(() => ajouterMessage(rapportHTML, "bot"), 800);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-valider").onclick = traiterSaisie;
  document.getElementById("user-input").onkeypress = (e) => {
    if (e.key === "Enter") traiterSaisie();
  };

  setTimeout(() => {
    ajouterMessage(
      "Bienvenue dans l'assistant RealData. Quel type de bien souhaitez-vous analyser ?<br><br><strong>MAISON, APPARTEMENT, IMMEUBLE, TERRAIN, COMMERCE, PARKING</strong>",
      "bot",
    );
  }, 800);
});
