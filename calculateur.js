/**
 * Moteur de calcul RealData Immo
 * Analyse de rentabilité et indice de santé du bâti
 */

const calculateRealDataMetrics = (reponses, type) => {
  const p = parseFloat(reponses.prix) || 0;
  const h = parseFloat(reponses.honoraires) || 0;
  const total = p + h;
  const surface = parseFloat(reponses.surface) || 0;
  const loyer = parseFloat(reponses.loyer) || 0;
  const taxe = parseFloat(reponses.taxe) || 0;
  const dpe = reponses.dpe ? reponses.dpe.toUpperCase() : "N/A";

  // Notes de 1 à 5
  const nTech = parseInt(reponses.note_technique) || 3;
  const nRes = parseInt(reponses.note_reseaux) || 3;

  let indicateursHtml = "";
  let scoreSante = 5; // Base neutre sur 10

  // 1. Calcul de la Valeur
  if (surface > 0) {
    indicateursHtml += `<p><strong>📊 Valeur :</strong> ${(p / surface).toFixed(2)} €/m²</p>`;
  }

  // 2. Calcul Rendement (Investissement)
  if (loyer > 0) {
    const rBrut = ((loyer / total) * 100).toFixed(2);
    const rNet = (((loyer - taxe) / total) * 100).toFixed(2);
    indicateursHtml += `<p style="color:#27ae60;"><strong>📈 Rendement Brut :</strong> ${rBrut}%</p>`;
    indicateursHtml += `<p style="color:#2ecc71;"><strong>💰 Rendement Net :</strong> ${rNet}%</p>`;
  }

  // 3. Logique de l'Indice de Santé (L'intelligence Franck)
  // DPE impact
  if (["A", "B"].includes(dpe)) scoreSante += 2;
  if (["F", "G"].includes(dpe)) scoreSante -= 3;

  // Impact des notes techniques (1-5)
  scoreSante += nTech - 3; // Note 5 donne +2, Note 1 donne -2
  scoreSante += (nRes - 3) * 0.5;

  return {
    total: total.toLocaleString(),
    indicateurs: indicateursHtml,
    score: Math.max(0, Math.min(10, scoreSante.toFixed(1))),
    dpe: dpe,
  };
};
