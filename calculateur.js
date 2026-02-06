// Fonction pour calculer la rentabilité brute
function calculerRentabiliteBrute(prixNetVendeur, honoraires, loyerMensuel) {
  const prixTotal = prixNetVendeur + honoraires;
  const loyerAnnuel = loyerMensuel * 12;

  // La formule magique : (Loyer Annuel / Prix Total) * 100
  const rendement = (loyerAnnuel / prixTotal) * 100;

  return rendement.toFixed(2); // On garde 2 chiffres après la virgule
}

// Simulation pour un de tes immeubles
const resultat = calculerRentabiliteBrute(400000, 20000, 2500);
console.log("Le rendement brut estimé est de : " + resultat + "%");
