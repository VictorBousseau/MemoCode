// 1. Définition de la variable de projection pour afficher uniquement le Nom et masquer l'id
// Cette variable est utilisée dans les requêtes suivantes pour simplifier l'affichage.
sortie = { "_id": 0, "Nom": 1 };

// 2. Trouver les sportifs qui ont 32 ans.
// Affiche uniquement leur nom.
db.Sportifs.find({ "Age": 32 }, sortie);

// 3. Trouver les sportifs âgés de 32 ans ou plus.
// Affiche le Nom et l'Age (l'id est masqué).
// Résultats triés par Age décroissant, puis par Nom croissant.
db.Sportifs.find({ "Age": { "$gte": 32 } }, { "_id": 0, "Nom": 1, "Age": 1 }).sort({ "Age": -1, "Nom": 1 });

// 4. Trouver les sportifs de sexe féminin.
// Limite le résultat aux 5 premiers documents trouvés.
db.Sportifs.find({ "Sexe": "F" }).limit(5);

// 5. Trouver les sportifs de sexe féminin qui jouent au "Basket ball".
// Affiche uniquement leur nom (utilise la variable 'sortie').
db.Sportifs.find({ "Sports.Jouer": "Basket ball", "Sexe": "F" }, sortie);

// 6. Trouver les sportifs qui ont 32 ans ou plus, OU qui sont de sexe féminin.
// Affiche le Nom, l'Age et le Sexe.
db.Sportifs.find(
    { "$or": [{ "Age": { "$gte": 32 } }, { "Sexe": "F" }] },
    { "_id": 0, "Nom": 1, "Age": 1, "Sexe": 1 }
);

// 7. Trouver les sportifs qui sont aussi arbitres (le champ "Sports.Arbitrer" existe).
// Affiche uniquement leur nom.
db.Sportifs.find({ "Sports.Arbitrer": { "$exists": true } }, sortie);

// 8. Compter le nombre total de gymnases.
// Utilise une agrégation pour grouper tous les documents (null) et sommer le nombre d'occurrences.
db.Gymnases.aggregate([{ $group: { "_id": null, "nb": { $sum: 1 } } }]);

// 9. Calculer la surface moyenne de tous les gymnases.
db.Gymnases.aggregate([{ $group: { "_id": null, "surfmoy": { $avg: "$Surface" } } }]);

// 10. Compter le nombre de gymnases par ville.
// Groupe les gymnases par leur champ "Ville".
db.Gymnases.aggregate([{ $group: { "_id": "$Ville", "nb": { $sum: 1 } } }]);

// 11. Pour chaque ville, calculer des statistiques sur les surfaces des gymnases :
// Nombre de gymnases, surface totale, surface moyenne, surface minimum et surface maximum.
db.Gymnases.aggregate([{
    $group: {
        "_id": "$Ville",
        "nb": { $sum: 1 },
        "surfaceTotale": { $sum: "$Surface" },
        "surfaceMoyenne": { $avg: "$Surface" },
        "surfaceMinimum": { $min: "$Surface" },
        "surfaceMaximum": { $max: "$Surface" }
    }
}]);

// 12. Compter le nombre de gymnases par ville qui proposent des séances de "Volley ball".
// Filtre d'abord les gymnases ayant une séance de Volley ball ($match), puis groupe par Ville.
db.Gymnases.aggregate([
    { $match: { "Seances.Libelle": "Volley ball" } },
    { $group: { "_id": "$Ville", "nb": { $sum: 1 } } }
]);

// 13. Afficher les 5 premières séances de gymnases après les avoir "déroulées" (unwind).
// $unwind décompose le tableau "Seances" pour créer un document par séance.
db.Gymnases.aggregate([{ $unwind: "$Seances" }, { $limit: 5 }]).pretty();

// 14. Compter le nombre total de séances par jour de la semaine.
// $unwind permet de traiter chaque séance individuellement.
// Note: Cela distingue "Lundi" de "lundi" si la casse varie.
db.Gymnases.aggregate([{ $unwind: "$Seances" }, { $group: { "_id": "$Seances.Jour", "nb": { $sum: 1 } } }]);

// 15. Compter le nombre de séances par jour, en ignorant la casse (majuscule/minuscule).
// Convertit le nom du jour en minuscules ($toLower) avant de grouper.
db.Gymnases.aggregate([{ $unwind: "$Seances" }, { $group: { "_id": { $toLower: "$Seances.Jour" }, "nb": { $sum: 1 } } }]);

// 16. Même chose que la requête précédente (nombre de séances par jour insensible à la casse).
// Utilise une étape $project intermédiaire pour créer un champ "Jour" en minuscules.
db.Gymnases.aggregate([
    { $unwind: "$Seances" },
    { $project: { "Jour": { $toLower: "$Seances.Jour" } } },
    { $group: { "_id": "$Jour", "nb": { $sum: 1 } } }
]);

// =================================================================================================
// 2. Interrogation simple et agrégation
// =================================================================================================

// 1. Quels sont les gymnases de “Villetaneuse” ou de “Sarcelles” qui ont une surface de plus de 400 m2 ?
db.Gymnases.find(
    {
        "Ville": { "$in": ["Villetaneuse", "Sarcelles"] },
        "Surface": { "$gt": 400 }
    }
);

// 2. Quels sont les sportifs (identifiant et nom) qui pratiquent du hand ball ?
db.Sportifs.find(
    { "Sports.Jouer": "Hand ball" },
    { "_id": 1, "Nom": 1 }
);

// 3. Dans quels gymnases et quels jours y a-t-il des séances de hand ball ?
// On affiche le nom du gymnase, la ville, et les seances concernées (ou juste le jour si on veut être précis, mais ici on projette le détail).
db.Gymnases.find(
    { "Seances.Libelle": "Hand ball" },
    { "NomGymnase": 1, "Ville": 1, "Seances.Jour": 1 }
);

// 4. Dans quels gymnases peut-on jouer au hockey le mercredi après 15H ?
// Note: "apres 15H" suppose un horaire de début > 15 ou >= 15. On suppose 15.00 format num ou string.
db.Gymnases.find(
    {
        "Seances.Libelle": "Hockey",
        "Seances.Jour": { "$regex": /mercredi/i }, // 'mercredi' ou 'Mercredi'
        "Seances.Horaire": { "$gt": 15 }
    },
    { "NomGymnase": 1, "Ville": 1, "Seances.$": 1 } // Projection sur la séance correspondante
);

// 5. Quels sportifs (identifiant et nom) ne pratiquent aucun sport ?
// C'est-à-dire que le tableau "Sports.Jouer" n'existe pas ou est vide.
db.Sportifs.find(
    {
        "$or": [
            { "Sports.Jouer": { "$exists": false } },
            { "Sports.Jouer": { "$size": 0 } }
        ]
    },
    { "_id": 1, "Nom": 1 }
);

// 6. Quels gymnases n’ont pas de séances le dimanche ?
db.Gymnases.find(
    { "Seances.Jour": { "$nin": ["Dimanche", "dimanche"] } }
);

// 7. Quels gymnases ne proposent que des séances de basket ball ou de volley ball ?
// Cela signifie qu'il n'y a PAS de séance qui NE SOIT PAS Basket ou Volley.
db.Gymnases.find({
    "Seances": {
        "$not": {
            "$elemMatch": {
                "Libelle": { "$nin": ["Basket ball", "Volley ball"] }
            }
        }
    }
}, { "_id": 0 });

// 8. Quels sont les entraîneurs qui sont aussi joueurs ?
// Le sportif doit avoir les champs "Sports.Jouer" et "Sports.Entrainer".
db.Sportifs.find({
    "Sports.Jouer": { "$exists": true, "$ne": [] },
    "Sports.Entrainer": { "$exists": true, "$ne": [] }
});

// 9. Quels sont les sportifs qui sont des conseillers ?
// On cherche les Id qui sont présents dans le champ "IdSportifConseiller" des autres.
// Cela nécessite d'abord de récupérer les IDs des conseillers, puis de chercher ces IDs.
// En une seule commande pure (hors script complet), on peut le faire en 2 temps ou via aggregation.
// Version script deux temps :
// var conseillers = db.Sportifs.distinct("IdSportifConseiller");
// db.Sportifs.find({ "_id": { "$in": conseillers } });

// 10. Pour le sportif “Kervadec” quel est le nom de son conseiller ?
// Nécessite une jointure ou deux requêtes.
// 1. Trouver l'IdSportifConseiller de Kervadec.
// 2. Trouver le Nom du sportif ayant cet Id.
// db.Sportifs.findOne({ "Nom": "Kervadec" }).IdSportifConseiller
// puis findOne sur ce résultat.

// 11. Quels entraîneurs entraînent du hand ball et du basket ball ?
db.Sportifs.find({
    "Sports.Entrainer": { "$all": ["Hand ball", "Basket ball"] }
});

// 12. Quels sont les couples de sportifs (identifiant et nom et prénom de chaque) de même age ?
// Nécessite une auto-jointure (self-join). Possible via aggregate.
db.Sportifs.aggregate([
    { "$project": { "Nom": 1, "Prenom": 1, "Age": 1 } },
    {
        "$lookup": {
            "from": "Sportifs",
            "let": { "age": "$Age", "id": "$_id" },
            "pipeline": [
                {
                    "$match": {
                        "$expr": {
                            "$and": [
                                { "$eq": ["$Age", "$$age"] },
                                { "$lt": ["$_id", "$$id"] } // Pour éviter les doublons (A,B) et (B,A) et (A,A)
                            ]
                        }
                    }
                },
                { "$project": { "Nom": 1, "Prenom": 1 } }
            ],
            "as": "MemeAge"
        }
    },
    { "$match": { "MemeAge": { "$ne": [] } } }
]);

// 13. Quelle est la moyenne d’âge des sportives qui pratiquent du basket ball ?
db.Sportifs.aggregate([
    { "$match": { "Sexe": "F", "Sports.Jouer": "Basket ball" } },
    { "$group": { "_id": null, "MoyenneAge": { "$avg": "$Age" } } }
]);

// 14. Quels sont les sportifs les plus jeunes ?
// On cherche l'âge minimum d'abord, ou on trie et on limite si on veut juste quelques uns.
// Si on veut *tous* ceux qui ont l'âge minimum :
// 1. Trouver min âge via aggregate
// 2. Find avec cet âge.
// Ou tout en un :
db.Sportifs.aggregate([
    { "$group": { "_id": null, "minAge": { "$min": "$Age" } } },
    {
        "$lookup": {
            "from": "Sportifs",
            "localField": "minAge",
            "foreignField": "Age",
            "as": "Jeunes"
        }
    },
    { "$unwind": "$Jeunes" },
    { "$replaceRoot": { "newRoot": "$Jeunes" } }
]);

// 15. Quels sont les gymnases de “Stains” ou de “Montmorency” qui ont la plus grande surface ?
// Même logique : trouver max surface pour ces villes.
db.Gymnases.find({ "Ville": { "$in": ["Stains", "Montmorency"] } }).sort({ "Surface": -1 }).limit(1);

// 16. Quels entraîneurs n’entraînent que du hand ball ou du basket ball ?
db.Sportifs.find({
    "Sports.Entrainer": {
        "$exists": true,
        "$not": { "$elemMatch": { "$nin": ["Hand ball", "Basket ball"] } }
    }
});

// 17. Quels sont les couples de sportifs (identifiant et nom et prénom de chaque) de même âge avec le même conseiller ?
db.Sportifs.aggregate([
    { "$match": { "IdSportifConseiller": { "$exists": true } } },
    {
        "$lookup": {
            "from": "Sportifs",
            "let": { "age": "$Age", "conseiller": "$IdSportifConseiller", "id": "$_id" },
            "pipeline": [
                {
                    "$match": {
                        "$expr": {
                            "$and": [
                                { "$eq": ["$Age", "$$age"] },
                                { "$eq": ["$IdSportifConseiller", "$$conseiller"] },
                                { "$lt": ["$_id", "$$id"] }
                            ]
                        }
                    }
                }
            ],
            "as": "Pairs"
        }
    },
    { "$match": { "Pairs": { "$ne": [] } } }
]);

// 18. Quels sportifs n’ont pas de conseillers ?
db.Sportifs.find({
    "$or": [
        { "IdSportifConseiller": { "$exists": false } },
        { "IdSportifConseiller": null }
    ]
});

// 19. Pour chaque sportif donner le nombre de sports qu’il arbitre
db.Sportifs.aggregate([
    { "$match": { "Sports.Arbitrer": { "$exists": true } } },
    { "$project": { "Nom": 1, "NbArbitrage": { "$size": "$Sports.Arbitrer" } } }
]);

// 20. Pour chaque gymnase de Stains donner par jour d’ouverture les horaires des premières et dernières séances
db.Gymnases.aggregate([
    { "$match": { "Ville": "Stains" } },
    { "$unwind": "$Seances" },
    {
        "$group": {
            "_id": { "Gymnase": "$NomGymnase", "Jour": "$Seances.Jour" },
            "Debut": { "$min": "$Seances.Horaire" },
            "Fin": { "$max": "$Seances.Horaire" } // Attention: il faudrait ajouter la durée pour avoir la vraie fin
        }
    }
]);

// 22. Pour chaque entraîneur de hand ball quel est le nombre de séances journalières qu’il assure ?
// Les séances sont dans Gymnases. Chaque séance a un IdEntraineur.
db.Gymnases.aggregate([
    { "$unwind": "$Seances" },
    { "$match": { "Seances.Libelle": "Hand ball" } },
    {
        "$group": {
            "_id": { "Entraineur": "$Seances.IdEntraineur", "Jour": "$Seances.Jour" },
            "NbSeances": { "$sum": 1 }
        }
    }
]);

// 23. Quels sont les gymnases ayant plus de 15 séances le mercredi ?
db.Gymnases.aggregate([
    { "$unwind": "$Seances" },
    { "$match": { "Seances.Jour": { "$regex": /mercredi/i } } },
    { "$group": { "_id": "$NomGymnase", "NbSeances": { "$sum": 1 } } },
    { "$match": { "NbSeances": { "$gt": 15 } } }
]);

// 24. Pour chaque gymnase de Montmorency : quel est le nombre de séances journalières de chaque sport proposé ?
db.Gymnases.aggregate([
    { "$match": { "Ville": "Montmorency" } },
    { "$unwind": "$Seances" },
    {
        "$group": {
            "_id": { "Gymnase": "$NomGymnase", "Sport": "$Seances.Libelle", "Jour": "$Seances.Jour" },
            "NbSeances": { "$sum": 1 }
        }
    }
]);





db.Gymnases.aggregate([
    {
        "$group": {
            "_id": null,
            "Moyenne": { "$avg": "$Surface" }
        }
    },
    {
        "$project": {
            "_id": 0,
            "Moyenne": 1
        }
    }
]);






