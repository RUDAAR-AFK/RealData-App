# schema_v1.py

FIELD_GROUPS = {
    "identite": {
        "label": "📍 IDENTITÉ DU BIEN",
        "fields": [
            {"id": "type_bien", "label": "Type de bien (Maison/Appart/Terrain)", "type": "str"},
            {"id": "adresse", "label": "Adresse complète", "type": "str"},
            {"id": "prix_fai", "label": "Prix FAI (€)", "type": "int"}
        ]
    },
    "technique": {
        "label": "🏗️ CARACTÉRISTIQUES TECHNIQUES",
        "fields": [
            {"id": "surface_habitable", "label": "Surface habitable (m²)", "type": "float"},
            {"id": "nb_pieces", "label": "Nombre de pièces", "type": "int"},
            {"id": "dpe", "label": "Classe DPE (A-G)", "type": "str"}
        ]
    }
}