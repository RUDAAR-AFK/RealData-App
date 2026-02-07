// calculator.js - Calibré sur tes 10 clés universelles
export function calculerRapport(reponses, type) {
  // Conversion des chiffres
  const prixNet = parseFloat(reponses.prix) || 0;
  const honoraires = parseFloat(reponses.honoraires) || 0;
  const prixFAI = prixNet + honoraires;
  const surface = parseFloat(reponses.surface) || 0;

  // Calculs financiers
  const prixM2 = surface > 0 ? Math.round(prixFAI / surface) : 0;

  // Calcul de la note technique globale (sur 10)
  const n_tech = parseInt(reponses.n_tech) || 0;
  const n_res = parseInt(reponses.n_res) || 0;
  const scoreTechnique = ((n_tech + n_res) / 10) * 10;

  // Logique de rendement (pour Immeuble, Commerce, Parking)
  let rendementHtml = "";
  if (reponses.loyer) {
    const loyerAnnuel =
      parseFloat(reponses.loyer) * (type === "PARKING" ? 12 : 1);
    const rendement =
      prixFAI > 0 ? ((loyerAnnuel / prixFAI) * 100).toFixed(2) : 0;
    rendementHtml = `• Rendement Brut : <strong>${rendement} %</strong><br>`;
  }

  // Préparation du bloc visuel "Expertise"
  const statsHtml = `
        <div style="background: #f4f7f6; padding: 15px; border-radius: 10px; margin: 10px 0; border-left: 5px solid #2c3e50;">
            <strong style="color:#2c3e50;">📊 ANALYSE DU BIEN (${type})</strong><br>
            <div style="margin-top:8px;">
                • Prix FAI : <strong>${prixFAI.toLocaleString()} €</strong><br>
                • Prix au m² : <strong>${prixM2} €/m²</strong><br>
                ${rendementHtml}
                • État Technique : <strong>${scoreTechnique}/10</strong><br>
                • Taxe Foncière : ${reponses.taxe || 0} €
            </div>
            <div style="margin-top:8px; font-size: 0.9em; color: #666;">
                📍 <em>${reponses.adresse}</em>
            </div>
        </div>
    `;

  return {
    total: prixFAI.toLocaleString(),
    dpe: reponses.dpe ? reponses.dpe.toUpperCase() : "NC",
    stats: statsHtml,
    score: scoreTechnique,
  };
}
