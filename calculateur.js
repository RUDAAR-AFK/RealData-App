function calculateRealDataMetrics(reponses, type) {
    const p = parseFloat(reponses.prix) || 0;
    const h = parseFloat(reponses.honoraires) || 0;
    const total = p + h;
    const surface = parseFloat(reponses.surface) || 0;
    const loyer = parseFloat(reponses.loyer) || 0;
    const taxe = parseFloat(reponses.taxe) || 0;
    const dpe = reponses.dpe ? reponses.dpe.toUpperCase() : "N/A";
    
    const nTech = parseInt(reponses.note_technique) || 3;
    const nRes = parseInt(reponses.note_reseaux) || 3;

    let indicateursHtml = "";
    let scoreSante = 5;

    if (surface > 0) {
        const prixM2 = (p / surface).toFixed(2);
        indicateursHtml += `<p><strong>📊 Valeur :</strong> ${prixM2} €/m²</p>`;
    }

    if (loyer > 0) {
        const loyerAnnuel = (type === "PARKING") ? loyer * 12 : loyer;
        const rendementBrut = ((loyerAnnuel / total) * 100).toFixed(2);
        const rendementNet = (((loyerAnnuel - taxe) / total) * 100).toFixed(2);
        indicateursHtml += `
            <p style="color:#27ae60;"><strong>📈 Rendement Brut :</strong> ${rendementBrut}%</p>
            <p style="color:#2ecc71;"><strong>💰 Rendement Net :</strong> ${rendementNet}%</p>`;
    }

    // Calcul du score de santé (DPE + Notes techniques)
    if (["A", "B"].includes(dpe)) scoreSante += 2;
    if (["F", "G"].includes(dpe)) scoreSante -= 3;
    scoreSante += (nTech - 3); 
    scoreSante += (nRes - 3) * 0.5;

    return {
        total: total.toLocaleString(),
        indicateurs: indicateursHtml,
        score: Math.max(0, Math.min(10, scoreSante.toFixed(1))),
        dpe: dpe
    };
}