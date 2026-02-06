const parcours = {
  MAISON: [
    { q: "1. Prix Net Vendeur (€) ?", cle: "prix" },
    { q: "2. Honoraires d'agence (€) ?", cle: "honoraires" },
    { q: "3. Surface habitable (m2) ?", cle: "surface" },
    { q: "4. DPE (A à G) ?", cle: "dpe" },
    { q: "5. Taxe Foncière (€) ?", cle: "taxe" },
    { q: "6. Mode de chauffage ?", cle: "chauffage" },
    { q: "7. État Toiture/Isolation ?", cle: "technique" },
    { q: "8. Adresse précise ?", cle: "adresse" },
    { q: "9. Assainissement ?", cle: "reseaux" },
    { q: "10. Potentiel d'extension ?", cle: "potentiel" },
  ],
  APPARTEMENT: [
    { q: "1. Prix Net Vendeur (€) ?", cle: "prix" },
    { q: "2. Honoraires d'agence (€) ?", cle: "honoraires" },
    { q: "3. Surface Loi Carrez (m2) ?", cle: "surface" },
    { q: "4. DPE (A à G) ?", cle: "dpe" },
    { q: "5. Taxe Foncière (€) ?", cle: "taxe" },
    { q: "6. Charges annuelles (€) ?", cle: "charges" },
    { q: "7. État des parties communes ?", cle: "technique" },
    { q: "8. Adresse et étage ?", cle: "adresse" },
    { q: "9. Cave / Parking ?", cle: "annexes" },
    { q: "10. Travaux de copro votés ?", cle: "potentiel" },
  ],
  IMMEUBLE: [
    { q: "1. Prix Net Vendeur (€) ?", cle: "prix" },
    { q: "2. Honoraires (€) ?", cle: "honoraires" },
    { q: "3. Nombre de lots ?", cle: "lots" },
    { q: "4. Loyers annuels HC (€) ?", cle: "loyer" },
    { q: "5. Taxe Foncière (€) ?", cle: "taxe" },
    { q: "6. État des compteurs ?", cle: "reseaux" },
    { q: "7. État du Gros Œuvre ?", cle: "technique" },
    { q: "8. Adresse ?", cle: "adresse" },
    { q: "9. Chauffage (Indiv/Coll) ?", cle: "chauffage" },
    { q: "10. Potentiel de division ?", cle: "potentiel" },
  ],
  TERRAIN: [
    { q: "1. Prix Net Vendeur (€) ?", cle: "prix" },
    { q: "2. Honoraires (€) ?", cle: "honoraires" },
    { q: "3. Surface cadastrale (m2) ?", cle: "surface" },
    { q: "4. Zone au PLU ?", cle: "plu" },
    { q: "5. Taxes d'aménagement (€) ?", cle: "taxe" },
    { q: "6. Étude G1/G2 faite ?", cle: "dpe" },
    { q: "7. Viabilisation ?", cle: "technique" },
    { q: "8. Adresse ?", cle: "adresse" },
    { q: "9. Libre de constructeur ?", cle: "reseaux" },
    { q: "10. Emprise au sol (CES) ?", cle: "potentiel" },
  ],
  COMMERCE: [
    { q: "1. Prix (€) ?", cle: "prix" },
    { q: "2. Honoraires (€) ?", cle: "honoraires" },
    { q: "3. Surface commerciale (m2) ?", cle: "surface" },
    { q: "4. Type de bail ?", cle: "bail" },
    { q: "5. Taxe Foncière ?", cle: "taxe" },
    { q: "6. Loyer annuel (€) ?", cle: "loyer" },
    { q: "7. État technique ?", cle: "technique" },
    { q: "8. Adresse ?", cle: "adresse" },
    { q: "9. Charges copro ?", cle: "charges" },
    { q: "10. Droit au bail ?", cle: "potentiel" },
  ],
  PARKING: [
    { q: "1. Prix (€) ?", cle: "prix" },
    { q: "2. Honoraires (€) ?", cle: "honoraires" },
    { q: "3. Nombre de places ?", cle: "lots" },
    { q: "4. Loyer mensuel moyen (€) ?", cle: "loyer" },
    { q: "5. Taxe Foncière (€) ?", cle: "taxe" },
    { q: "6. Charges annuelles (€) ?", cle: "charges" },
    { q: "7. Sécurisation ?", cle: "technique" },
    { q: "8. Adresse ?", cle: "adresse" },
    { q: "9. Dimensions ?", cle: "surface" },
    { q: "10. Bornes électriques ?", cle: "potentiel" },
  ],
};

let typeBien = null,
  index = 0,
  reponses = {};

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

  if (!typeBien) {
    const choix = texte.toUpperCase();
    if (parcours[choix]) {
      typeBien = choix;
      setTimeout(() => {
        ajouterMessage(
          `Analyse technique lancée : <strong>${typeBien}</strong>.`,
          "bot",
        );
        setTimeout(() => ajouterMessage(parcours[typeBien][0].q, "bot"), 600);
      }, 400);
    } else {
      ajouterMessage(
        "Veuillez saisir : MAISON, APPARTEMENT, IMMEUBLE, TERRAIN, COMMERCE ou PARKING.",
        "bot",
      );
    }
  } else {
    const qActuelles = parcours[typeBien];
    reponses[qActuelles[index].cle] = texte;
    index++;
    if (index < qActuelles.length) {
      setTimeout(() => ajouterMessage(qActuelles[index].q, "bot"), 500);
    } else {
      finaliser();
    }
  }
}

function finaliser() {
  const p = parseFloat(reponses.prix) || 0;
  const h = parseFloat(reponses.honoraires) || 0;
  const total = p + h;

  const rapport = `
        <div style="background: #ffffff; border: 2px solid #2c3e50; border-radius: 10px; padding: 15px; margin-top: 10px;">
            <h3 style="margin-top:0; color:#3498db;">RealData Immo : Fiche ${typeBien}</h3>
            <p><strong>📍 Adresse :</strong> ${reponses.adresse}</p>
            <p><strong>💰 Investissement :</strong> ${total.toLocaleString()} €</p>
            <p><strong>📏 Dimensions :</strong> ${reponses.surface || reponses.lots}</p>
            <p><strong>🛠 État :</strong> ${reponses.technique}</p>
            <div style="background:#2c3e50; color:white; padding:10px; border-radius:5px; text-align:center; font-weight:bold;">DOSSIER VALIDÉ</div>
        </div>`;

  document.getElementById("input-area").style.display = "none";
  document.getElementById("btn-reset").style.display = "block";
  ajouterMessage("Analyse terminée. Voici la synthèse :", "bot");
  setTimeout(() => ajouterMessage(rapport, "bot"), 800);
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-valider").onclick = traiterSaisie;
  document.getElementById("user-input").onkeypress = (e) => {
    if (e.key === "Enter") traiterSaisie();
  };
  setTimeout(() => {
    ajouterMessage(
      "Bienvenue dans l'assistant professionnel <strong>RealData Immo</strong>.<br><br>Choisissez la catégorie :<br><strong>MAISON, APPARTEMENT, IMMEUBLE, TERRAIN, COMMERCE, PARKING</strong>",
      "bot",
    );
  }, 600);
});
