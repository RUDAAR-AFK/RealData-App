/**
 * Fonction déclenchée par le bouton du site
 * Utilise la formule du rendement brut pour ce test
 */
function calculerMaintenant() {
  // 1. Récupération des chiffres tapés par l'utilisateur
  const prix = parseFloat(document.getElementById("prix").value);
  const loyer = parseFloat(document.getElementById("loyer").value);
  const zone = document.getElementById("resultat-zone");

  // 2. La formule magique
  const rendementBrut = ((loyer * 12) / prix) * 100;

  // 3. Affichage visuel
  zone.style.display = "block";
  zone.style.backgroundColor = "#e8f6f3";
  zone.style.color = "#16a085";
  zone.innerHTML = "RENDEMENT BRUT : " + rendementBrut.toFixed(2) + " %";

  console.log(
    "Calcul exécuté pour RealData Immo : " + rendementBrut.toFixed(2) + "%",
  );
}
