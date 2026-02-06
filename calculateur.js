/**
 * Calcule le rendement Net-Net d'un investissement
 * Formule : ((Loyer Annuel - Charges) / Prix Total) * 100
 */
function calculerRendementNet(
  prixNetVendeur,
  honoraires,
  loyerMensuel,
  taxeFonciere,
  charges,
) {
  const prixTotal = prixNetVendeur + honoraires;
  const loyerAnnuelNet = loyerMensuel * 12 - taxeFonciere - charges;

  const rendementNet = (loyerAnnuelNet / prixTotal) * 100;

  return rendementNet.toFixed(2);
}

// --- TEST SUR UN PROJET FICTIF : "Résidence Horizon" ---
const projetHorizon = {
  prix: 320000,
  frais: 28000,
  loyer: 2100,
  taxe: 1800,
  divers: 600,
};

const resultatNet = calculerRendementNet(
  projetHorizon.prix,
  projetHorizon.frais,
  projetHorizon.loyer,
  projetHorizon.taxe,
  projetHorizon.divers,
);

console.log("--- RealData Immo : Analyse Pro ---");
console.log("Projet : Résidence Horizon");
console.log("Rendement Net : " + resultatNet + " %");
