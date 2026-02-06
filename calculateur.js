// Définition des parcours de questions
const parcours = {
  IMMEUBLE: [
    { q: "Prix Net Vendeur de l'immeuble (€) ?", cle: "prix" },
    { q: "Nombre total de lots ?", cle: "lots" },
    { q: "Surface totale (m2) ?", cle: "surface" },
    { q: "État de la toiture et gros œuvre ?", cle: "technique" },
    { q: "Taxe Foncière (€) ?", cle: "taxe" },
    { q: "Adresse de l'immeuble ?", cle: "adresse" },
  ],
  APPARTEMENT: [
    { q: "Prix Net Vendeur (€) ?", cle: "prix" },
    { q: "Étage et présence d'un ascenseur ?", cle: "etage" },
    { q: "Surface Carrez (m2) ?", cle: "surface" },
    { q: "Montant des charges de copro mensuelles (€) ?", cle: "charges" },
    { q: "DPE (A à G) ?", cle: "dpe" },
    { q: "Adresse du bien ?", cle: "adresse" },
  ],
  BOX: [
    { q: "Prix du lot de boxs (€) ?", cle: "prix" },
    { q: "Nombre de boxs ?", cle: "lots" },
    { q: "Sécurisation (Portail, Caméras) ?", cle: "technique" },
    { q: "Taxe Foncière (€) ?", cle: "taxe" },
    { q: "Adresse des boxs ?", cle: "adresse" },
  ],
};

let typeBienSelectionne = null;
let indexQuestion = 0;
let reponses = {};

function ajouterMessage(texte, auteur) {
  const box = document.getElementById("chat-box");
  const div = document.createElement("div");
  div.className = `msg ${auteur}`;
  div.innerHTML = texte.includes("<") ? texte : texte;
  if (!texte.includes("<")) div.innerText = texte;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function traiterSaisie() {
  const input = document.getElementById("user-input");
  const texte = input.value.trim();
  if (texte === "") return;

  ajouterMessage(texte, "user");
  input.value = "";

  // ÉTAPE 1 : Sélection du type de bien
  if (!typeBienSelectionne) {
    const choix = texte.toUpperCase();
    if (parcours[choix]) {
      typeBienSelectionne = choix;
      setTimeout(
        () =>
          ajouterMessage(
            `Parfait. Début de l'analyse : ${typeBienSelectionne}.`,
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
        "Merci de choisir entre : IMMEUBLE, APPARTEMENT ou BOX.",
        "bot",
      );
    }
    return;
  }

  // ÉTAPE 2 : Déroulement des questions spécifiques
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
  const s = parseFloat(reponses.surface) || 1; // Évite division par zero

  const rapportHTML = `
        <div style="background: #ffffff; border: 2px solid #2c3e50; border-radius: 8px; padding: 15px; margin-top: 10px; color: #333; text-align: left;">
            <h3 style="margin: 0 0 10px 0; color: #2c3e50;">📊 RAPPORT ${typeBienSelectionne}</h3>
            <p><strong>📍 Adresse :</strong> ${reponses.adresse}</p>
            <p><strong>💰 Prix :</strong> ${p.toLocaleString()} €</p>
            ${reponses.surface ? `<p><strong>📏 Ratio :</strong> ${(p / s).toFixed(2)} €/m²</p>` : ""}
            <p><strong>🛠 État/Infos :</strong> ${reponses.technique || "N/A"}</p>
            <div style="background: #27ae60; color: white; padding: 8px; border-radius: 4px; text-align: center; margin-top: 10px; font-weight: bold;">
                ANALYSE TERMINÉE
            </div>
        </div>
    `;

  document.getElementById("input-area").style.display = "none";
  ajouterMessage("Synthèse générée avec succès.", "bot");
  setTimeout(() => ajouterMessage(rapportHTML, "bot"), 600);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-valider").onclick = traiterSaisie;
  document.getElementById("user-input").onkeypress = (e) => {
    if (e.key === "Enter") traiterSaisie();
  };

  setTimeout(() => {
    ajouterMessage(
      "Quel type de bien souhaitez-vous analyser ? (Tapez : IMMEUBLE, APPARTEMENT ou BOX)",
      "bot",
    );
  }, 800);
});
