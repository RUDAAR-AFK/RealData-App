/* REALDATA IMMO - LE CERVEAU DE CALCUL (v1.3)
    Propriété de : Rudy LE DISEZ
    Expert métier : Franck (30 ans d'XP)
*/

function finaliser() {
  // 1. Extraction et Nettoyage des données
  const p = parseFloat(reponses.prix) || 0;
  const h = parseFloat(reponses.honoraires) || 0;
  const totalAcquisition = p + h;
  const surface = parseFloat(reponses.surface) || 0;
  const loyer = parseFloat(reponses.loyer) || 0;
  const taxe = parseFloat(reponses.taxe) || 0;
  const dpe = reponses.dpe ? reponses.dpe.toUpperCase() : "N/A";

  // 2. Initialisation des indicateurs
  let indicateursHtml = "";
  let scoreLiquidite = 6; // Base neutre sur 10

  // --- CALCULS UNIVERSELS ---

  // Prix au m²
  if (surface > 0) {
    const prixM2 = (p / surface).toFixed(2);
    indicateursHtml += `<p><strong>📊 Valeur :</strong> ${prixM2} €/m²</p>`;
  }

  // Impact du DPE sur la liquidité
  if (["A", "B"].includes(dpe)) scoreLiquidite += 2;
  if (["F", "G"].includes(dpe)) scoreLiquidite -= 3;

  // --- LOGIQUE PAR ARCHÉTYPE (INTELLIGENCE MÉTIER) ---

  // Cas INVESTISSEUR (Immeuble, Parking, Commerce)
  if (loyer > 0) {
    const loyerAnnuel = typeBien === "PARKING" ? loyer * 12 : loyer;
    const rendementBrut = ((loyerAnnuel / totalAcquisition) * 100).toFixed(2);
    const rendementNet = (
      ((loyerAnnuel - taxe) / totalAcquisition) *
      100
    ).toFixed(2);

    indicateursHtml += `
            <p style="color:#27ae60;"><strong>📈 Rendement Brut :</strong> ${rendementBrut}%</p>
            <p style="color:#2ecc71;"><strong>💰 Rendement Net (estimé) :</strong> ${rendementNet}%</p>
        `;

    // Bonus liquidité si rendement > 8%
    if (parseFloat(rendementBrut) > 8) scoreLiquidite += 1;
  }

  // Cas RÉSIDENTIEL (Maison, Appartement)
  if (typeBien === "MAISON" || typeBien === "APPARTEMENT") {
    if (reponses.technique && reponses.technique.toLowerCase().includes("neuf"))
      scoreLiquidite += 1;
    if (
      reponses.potentiel &&
      reponses.potentiel.toLowerCase().includes("extension")
    ) {
      indicateursHtml += `<p style="color:#e67e22;"><strong>🌟 Atout :</strong> Fort potentiel de valorisation</p>`;
    }
  }

  // 3. GÉNÉRATION DU RAPPORT VISUEL (LE GRAPHISTE)
  const rapport = `
        <div style="background: #ffffff; border: 2px solid #2c3e50; border-radius: 12px; padding: 20px; margin-top: 15px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #3498db; padding-bottom: 10px; margin-bottom: 15px;">
                <h3 style="margin:0; color:#2c3e50; text-transform: uppercase;">RealData Immo : ${typeBien}</h3>
                <span style="background:#3498db; color:white; padding:4px 10px; border-radius:20px; font-size:12px;">DOSSIER #RF-${Math.floor(Math.random() * 1000)}</span>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div style="border-right: 1px solid #eee; padding-right: 10px;">
                    <p style="margin: 5px 0;"><strong>📍 Emplacement :</strong><br>${reponses.adresse}</p>
                    <p style="margin: 5px 0;"><strong>💸 Acquisition :</strong><br>${totalAcquisition.toLocaleString()} € <small>(honoraires inclus)</small></p>
                    <p style="margin: 5px 0;"><strong>⚡ DPE :</strong> ${dpe}</p>
                </div>
                <div>
                    ${indicateursHtml}
                    <p style="margin: 5px 0;"><strong>📑 Taxe Foncière :</strong> ${taxe} €/an</p>
                </div>
            </div>

            <div style="background: #f8f9fa; border-left: 4px solid #3498db; padding: 10px; margin: 15px 0; font-style: italic; font-size: 14px;">
                "Note de l'expert : ${reponses.technique}. Potentiel identifié : ${reponses.potentiel}."
            </div>

            <div style="display: flex; align-items: center; justify-content: center; background: #2c3e50; color: white; padding: 12px; border-radius: 8px; font-weight: bold; font-size: 16px;">
                SCORE DE LIQUIDITÉ : ${Math.max(0, Math.min(10, scoreLiquidite))}/10
            </div>
        </div>
    `;

  // 4. Finalisation de l'UI
  document.getElementById("input-area").style.display = "none";
  document.getElementById("btn-reset").style.display = "block";
  ajouterMessage(
    "Analyse technique et financière terminée. Voici la synthèse de RealData Immo :",
    "bot",
  );
  setTimeout(() => ajouterMessage(rapport, "bot"), 800);
}
