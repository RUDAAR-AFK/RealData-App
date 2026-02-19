// calculator.js

export function calculerRapport(reponses, type) {
    const prixNet = parseFloat(reponses.prix) || 0;
    const honoraires = parseFloat(reponses.honoraires) || 0;
    const prixFAI = prixNet + honoraires;
    const surface = parseFloat(reponses.surface) || 0;
    const prixM2 = surface > 0 ? Math.round(prixFAI / surface) : 0;

    // Calcul du score technique basé sur tes notes de 1 à 5
    const n_tech = parseInt(reponses.n_tech) || 0;
    const n_res = parseInt(reponses.n_res) || 0;
    const scoreGlobal = ((n_tech + n_res) / 10) * 10;

    // 1. PRÉPARATION DE LA GALERIE PHOTOS
    let sectionPhotos = "";
    if (reponses.galerie && reponses.galerie.length > 0) {
        sectionPhotos = `
            <section style="margin-top: 20px;">
                <h2>🖼️ Galerie Photos du Bien</h2>
                <div class="galerie-rapport">`;
        
        reponses.galerie.forEach((photo) => {
            sectionPhotos += `<img src="${photo}" class="img-rapport">`;
        });
        
        sectionPhotos += `</div></section>`;
    }

    // 2. GÉNÉRATION DU RAPPORT HTML (Ton grand dossier complet)
    const rapportExpertise = `
        <div id="dossier-immo" style="font-family: Arial, sans-serif; border: 2px solid #333; padding: 30px; background: white; color: #333;">
            <h1 style="text-align: center; border-bottom: 2px solid #27ae60; padding-bottom: 10px;">DOSSIER D'EXPERTISE IMMOBILIÈRE</h1>
            <p style="text-align: right;"><em>Généré le : ${new Date().toLocaleDateString()}</em></p>
            
            <section>
                <h2>📍 Localisation & Type</h2>
                <p><strong>Type de bien :</strong> ${type}</p>
                <p><strong>Adresse :</strong> ${reponses.adresse || "Non renseignée"}</p>
            </section>

            <section style="background: #f4f4f4; padding: 15px; margin: 20px 0;">
                <h2>💰 Évaluation Financière</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr><td>Prix Net Vendeur :</td><td style="text-align:right">${prixNet.toLocaleString()} €</td></tr>
                    <tr><td>Honoraires d'agence :</td><td style="text-align:right">${honoraires.toLocaleString()} €</td></tr>
                    <tr style="font-weight:bold; color: #27ae60;"><td>Prix FAI :</td><td style="text-align:right">${prixFAI.toLocaleString()} €</td></tr>
                    <tr><td>Valeur au m² :</td><td style="text-align:right">${prixM2} €/m²</td></tr>
                </table>
            </section>

            <section>
                <h2>🏗️ Analyse Technique & Santé</h2>
                <p><strong>Classe Énergétique (DPE) :</strong> ${reponses.dpe ? reponses.dpe.toUpperCase() : "NC"}</p>
                <p><strong>Score État Global :</strong> ${scoreGlobal}/10</p>
                <p><strong>Note Technique :</strong> ${n_tech}/5 | <strong>Note Réseaux :</strong> ${n_res}/5</p>
                <p><strong>Observations :</strong> ${reponses.divers || "Aucune"}</p>
            </section>

            ${sectionPhotos}

            <div style="margin-top: 40px; text-align: center; font-size: 0.8em; color: #777;">
                Expertise réalisée par Rudy LE DISEZ - Outil RealData Immo
            </div>
        </div>
        <button onclick="window.print()" style="margin-top: 20px; width: 100%; padding: 15px; background: #2c3e50; color: white; border: none; border-radius: 5px; cursor: pointer;">
            🖨️ Télécharger le dossier (PDF)
        </button>
    `;

    return {
        total: prixFAI.toLocaleString(),
        dpe: reponses.dpe || "NC",
        stats: rapportExpertise,
        score: scoreGlobal,
    };
}