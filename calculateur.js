function calculerMaintenant() {
  // 1. On récupère les éléments
  const prixInput = document.getElementById("prix");
  const loyerInput = document.getElementById("loyer");
  const zone = document.getElementById("resultat-zone");

  // 2. On transforme le texte en nombres
  const prix = parseFloat(prixInput.value);
  const loyer = parseFloat(loyerInput.value);

  // 3. Calcul du rendement brut
  const rendement = ((loyer * 12) / prix) * 100;

  // 4. Affichage du résultat avec style
  zone.style.display = "block";
  zone.style.backgroundColor = "#f1fdf7";
  zone.innerHTML = `
        <div style="font-size: 0.9em; color: #27ae60;">RÉSULTAT DE L'ANALYSE</div>
        <div style="font-size: 1.8em; color: #1e8449;">${rendement.toFixed(2)} %</div>
        <div style="font-size: 0.8em; color: #7f8c8d; margin-top: 5px;">Rendement Brut Fictif</div>
    `;

  console.log("Calcul RealData effectué avec succès !");
}
