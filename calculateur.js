/**
 * Calcule le rendement Net-Net d'un investissement fictif
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

// --- LOGIQUE D'AFFICHAGE ---

// Données d'un projet fictif : "Résidence Horizon"
const projetFictif = {
  nom: "Résidence Horizon",
  prix: 320000,
  frais: 28000,
  loyer: 2100,
  taxe: 1800,
  divers: 600,
};

// On lance le calcul
const resultat = calculerRendementNet(
  projetFictif.prix,
  projetFictif.frais,
  projetFictif.loyer,
  projetFictif.taxe,
  projetFictif.divers,
);

// LA MAGIE : On envoie le résultat dans la page HTML
const zoneAffichage = document.getElementById("affichage-test");

if (zoneAffichage) {
  zoneAffichage.innerHTML = `
        PROJET : ${projetFictif.nom} <br>
        Investissement total : ${projetFictif.prix + projetFictif.frais} € <br>
        <span style="color: #27ae60;">RENDEMENT NET : ${resultat} %</span>
    `;
  // On cherche la zone grise dans le HTML
  const zoneAffichage = document.getElementById("affichage-test");

  // Si on l'a trouvée, on injecte les résultats
  if (zoneAffichage) {
    zoneAffichage.innerHTML = `
        <strong style="color: #2c3e50;">PROJET : ${projetFictif.nom}</strong><br>
        Investissement total : ${projetFictif.prix + projetFictif.frais} € <br>
        <span style="color: #27ae60; font-size: 1.2em;">RENDEMENT NET : ${resultat} %</span>
    `;
  }
}
