/**
 * BIBLIOTHÈQUE DE QUESTIONS EXPERTES REALDATA IMMO
 * 10 points essentiels adaptés par type de dossier
 */
const parcours = {
    "MAISON": [
        { q: "1. Quel est le prix Net Vendeur (€) ?", cle: "prix" },
        { q: "2. Montant des honoraires d'agence (€) ?", cle: "honoraires" },
        { q: "3. Surface habitable exacte (m2) ?", cle: "surface" },
        { q: "4. Classement DPE (Énergie et Climat) ?", cle: "dpe" },
        { q: "5. Montant de la Taxe Foncière annuelle (€) ?", cle: "taxe" },
        { q: "6. Type de chauffage et production d'eau chaude ?", cle: "chauffage" },
        { q: "7. État de la toiture, charpente et isolation ?", cle: "technique" },
        { q: "8. Adresse complète (Ville, Quartier) ?", cle: "adresse" },
        { q: "9. Assainissement (Tout-à-l'égout ou Fosse) ?", cle: "reseaux" },
        { q: "10. Potentiel (Extension, Aménagement de combles, Piscine) ?", cle: "potentiel" }
    ],
    "APPARTEMENT": [
        { q: "1. Quel est le prix Net Vendeur (€) ?", cle: "prix" },
        { q: "2. Montant des honoraires d'agence (€) ?", cle: "honoraires" },
        { q: "3. Surface Loi Carrez (m2) ?", cle: "surface" },
        { q: "4. Classement DPE (A à G) ?", cle: "dpe" },
        { q: "5. Montant de la Taxe Foncière (€) ?", cle: "taxe" },
        { q: "6. Montant des charges de copropriété annuelles (€) ?", cle: "charges" },
        { q: "7. Travaux récents ou votés dans l'immeuble ?", cle: "technique" },
        { q: "8. Adresse, étage et présence d'un ascenseur ?", cle: "adresse" },
        { q: "9. Annexes incluses (Cave, Parking, Garage, Balcon) ?", cle: "annexes" },
        { q: "10. Destination du bien (Habitation, Professionnel, Mixte) ?", cle: "potentiel" }
    ],
    "IMMEUBLE": [
        { q: "1. Prix Net Vendeur de l'immeuble (€) ?", cle: "prix" },
        { q: "2. Honoraires de négociation (€) ?", cle: "honoraires" },
        { q: "3. Nombre total de lots (Habitation, Commerces, Garages) ?", cle: "lots" },
        { q: "4. État locatif actuel (Loyers annuels HC perçus) ?", cle: "loyer" },
        { q: "5. Montant de la Taxe Foncière (€) ?", cle: "taxe" },
        { q: "6. État des compteurs (Eau et Élec : Individuels ou Communs) ?", cle: "reseaux" },
        { q: "7. État du Gros Œuvre (Façade, Toiture, Étanchéité) ?", cle: "technique" },
        { q: "8. Adresse précise de l'ensemble immobilier ?", cle: "adresse" },
        { q: "9. Mode de chauffage (Individuel ou Chaufferie collective) ?", cle: "chauffage" },
        { q: "10. Potentiel de valorisation (Division de lots, Surélévation) ?", cle: "potentiel" }
    ],
    "TERRAIN": [
        { q: "1. Quel est le prix Net Vendeur (€) ?", cle: "prix" },
        { q: "2. Montant des honoraires d'agence (€) ?", cle: "honoraires" },
        { q: "3. Surface cadastrale totale (m2) ?", cle: "surface" },
        { q: "4. Zone au PLU (ex: Zone Urbaine U, à Urbaniser AU...) ?", cle: "plu" },
        { q: "5. Taxes d'aménagement et de raccordement estimées (€) ?", cle: "taxe" },
        { q: "6. Étude de sol G1 ou G2 disponible (Oui/Non) ?", cle: "dpe" },
        { q: "7. Viabilisation (Eau, Élec, Télécom : Sur parcelle ou Bordure) ?", cle: "technique" },
        { q: "8. Adresse, orientation et accès ?", cle: "adresse" },
        { q: "9. Le terrain est-il libre de constructeur ?", cle: "reseaux" },
        { q: "10. Emprise au sol maximum autorisée (CES) ?", cle: "potentiel" }
    ],
    "COMMERCE": [
        { q: "1. Prix de vente du mur ou fonds de commerce (€) ?", cle: "prix" },
        { q: "2. Honoraires HT ou TTC (€) ?", cle: "honoraires" },
        { q: "3. Surface commerciale utile (m2) ?", cle: "surface" },
        { q: "4. Type de bail en cours (3/6/9, précaire, commercial) ?", cle: "bail" },
        { q: "5. Taxe Foncière à la charge du bailleur ou du preneur ?", cle: "taxe" },
        { q: "6. Montant du loyer annuel HC (€) ?", cle: "loyer" },
        { q: "7. État technique (Extraction, Normes PMR, Électricité) ?", cle: "technique" },
        { q: "8. Adresse et visibilité (Linéaire de vitrine) ?", cle: "adresse" },
        { q: "9. Charges de copropriété ou charges de centre commercial ?", cle: "charges" },
        { q: "10. Droit au bail ou pas-de-porte inclus ?", cle: "potentiel" }
    ],
    "PARKING": [
        { q: "1. Prix du lot de parking / box (€) ?", cle: "prix" },
        { q: "2. Honoraires d'agence (€) ?", cle: "honoraires" },
        { q: "3. Nombre d'emplacements vendus ?", cle: "lots" },
        { q: "4. Loyer mensuel moyen