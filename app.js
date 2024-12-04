//import 
const express = require("express");
const fs = require("fs");

const mysql2 = require('mysql2');
const myConnection = require("express-myconnection");


//app type express
const app = express();

const connection = {
    host : 'localhost',
    user : 'root',
    password : 'mythouaiL9222',
    port : 3306,
    database : 'restaurant'
};

//Middleware de connection
app.use(myConnection( mysql2, connection, "pool"));

//récuperer données form
app.use(express.urlencoded({extended: false}));

//Vues
app.set("views", "./views"); //emplacement
app.set("view engine", "ejs"); //moteur

app.use(express.static("public"));

// *

// app.get("*", (req, res) =>{
//     res.status(404).render("introuvable");

// });

// ACCUEIL
app.get("/accueil", (req, res) => {
//renvoyer la page accueil
    res.render("accueil");
}
);

// MENU
app.get("/menu", (req, res) => {

//afficher les noms et prix depuis la base de données

    //thés
    req.getConnection((erreur, connection) => {
        if(erreur) {
            console.log(erreur);
        } else {
            connection.query("SELECT * FROM thes", [], (err, resultat) => {
                if (err) {
                    console.log(err);
                } else {
                console.log("resultat : ", resultat);
                res.render("menu", {resultat});
            }

            
        }
)}

});

//patisseries
// req.getConnection((error, connection) => {
//     if(error) {
//         console.log(error);
//     } else {
//         connection.query("SELECT * FROM patisseries", [], (err, result) => {
//             if (err) {
//                 console.log(err);
//             } else {
//             console.log("resultat : ", result);
//             res.render("menu", {result});
//         }
//     }
// )}

// });

// tableaux plats
    thes = {
        nom: ["Thé Ngizi (Miel)", "Thé Tsingiziwu (Gingembre)", 
            "Thé Masandzé (Citronelle)", "Thé Nana (Menthe)", 
            "Thé Lavani (Vanille)", " Thé Anfou (Jasmin)"],
        prix: 2

    };

    patisseries = {
        nom: ["Tartes au Citron", "Tartes à l'Ananas", "Fondants au Chocolat", 
            "Mharé wa Sinia", "Karara", "Macarons à la Fraise"],
        prix: 4
    };
    
    apperitif = {
        nom: ["Samboussas & Nems", "Bouchons", "Beignets aux crevettes", 
            "Mini Croissants au fromage", "Mini Quiches au Poulet"],
            prix: 5
    };
        
    boissons = {
            nom: ["Limonade", "Jus d'Orange", "Jus de Mangue", "Jus de Tamarin", "Jus de Sakuwa"],
            prix : 3
    };
        // res.render("menu");

    // fs.readFile("menu.html", (err, data) => {
    //     if (err) {
    //         res.status(404).send("Le fichier est introuvable.");
    //     } else {
    //         res.status(200).contentType("text/html").send(data);
    //     }
    // });

});

// EQUIPE
app.get("/equipe", (req, res) => {

    //tableau prénom-nom, poste de l'équipe
    equipe = [ 
        {
            nom: "Thouaïbat Sélim", role: "Créatrice et Gérante",
        },
        {
            nom: "Kamal Abdou", role: "Cuisinier/Pâtissier"
        },
        {
            nom: "Fatima Houmadi", role: "Serveuse"
        },
        {
            nom: "Ali Hachim", role: "Livreur"
        },
        {
            nom: "Bacar Daoud", role: "Comptable"
        }
    ]
    res.render("equipe");
    // fs.readFile("equipe.html", (err, data) => {
    //     if (err) {
    //         res.status(404).send("Le fichier est introuvable.");
    //     } else {
    //         res.status(200).contentType("text/html").send(data);
    //     }
    // });
});

// CONTACT
app.get("/contact", (req, res) => {

    res.render("contact");
    // fs.readFile("contact.html", (err, data) => {
    //     if (err) {
    //         res.status(404).send("Le fichier est introuvable.");
    //     } else {
    //         res.status(200).contentType("text/html;charset=utf-8").send(data);
    //     }
    // });
});

//NEW
app.post("/new", (req, res) => {
    //afficher le corps de ma requête
    console.log("Corps requête BODY", req.body);
    console.log("Corps requête NOM", req.body.nom);
    console.log("Corps requête PRIX", req.body.prix);
   
    let nomThe = req.body.nom;
    let prixThe = req.body.prix;
    let idThe = req.body.id;
    let requeteSQL;

    //si id vide --> id = null
    if(req.body.id === "") { 
        idThe = null;
        requeteSQL = "INSERT INTO thes (id, nom, prix) VALUES (?,?,?)";
    } else{
            idThe = req.body.id;
        requeteSQL = "UPDATE thes SET nom = ?, prix = ? WHERE id = ?";
        }

        //Ordre de données
        let ordreDonnees;
        if (idThe === null) {
        ordreDonnees = [null, nomThe, prixThe];
        } else {
        ordreDonnees = [nomThe, prixThe, idThe];
        }

    //enregistrer dans la base de données
    req.getConnection((erreur, connection) => {
        if(erreur) {
            console.log(erreur);
        } else {
            connection.query(requeteSQL, ordreDonnees, (err, resultat) => {
                if (err) {
                    console.log(err);
                } else {
                console.log("Insertion Réussie!");
                res.status(300).redirect("menu");
            }

            }
)}  
    })
});

module.exports = app;