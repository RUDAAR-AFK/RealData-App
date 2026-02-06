export function calculerRapport(reponses, type) {
  const p = parseFloat(reponses.prix) || 0;
  const h = parseFloat(reponses.honoraires) || 0;
  const total = p + h;
  const surf = parseFloat(reponses.surface) || 0;
  const loyer = parseFloat(reponses.loyer) || 0;
  const taxe = parseFloat(reponses.taxe) || 0;
  const dpe = reponses.dpe ? reponses.dpe.toUpperCase() : "N/A";

  const nTech = parseInt(reponses.n_tech) || 3;
  const nRes = parseInt(reponses.n_res) || 3;

  let htmlStats = "";
  let score = 5;

  // Calcul Rendement
  if (loyer > 0) {
    const annuel = type === "PARKING" ? loyer * 12 : loyer;
    const rBrut = ((annuel / total) * 100).toFixed(2);
    const rNet = (((annuel - taxe) / total) * 100).toFixed(2);
    htmlStats += `<p style="color:#27ae60;">📈 Brut : ${rBrut}% | 💰 Net : ${rNet}%</p>`;
  }

  // Logic Santé
  if (["A", "B"].includes(dpe)) score += 2;
  if (["F", "G"].includes(dpe)) score -= 3;
  score += nTech - 3 + (nRes - 3) * 0.5;

  return {
    total: total.toLocaleString(),
    stats: htmlStats,
    score: Math.max(0, Math.min(10, score.toFixed(1))),
    dpe: dpe,
  };
}
