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

    req.getConnection((erreur, connection) => {
        if(erreur) {
            console.log(erreur);
        } else {
            connection.query("SELECT * FROM thes", [], (err, resultat) => {
                if (err) {
                    console.log(err);
                } else {
                console.log("resultat : ", resultat);
                res.render("accueil", {resultat});
            }

            });
        }
    
    });
});
    //heure
//     const date = new Date();
//     let heure = date.toLocaleTimeString();
//     let salut = "Bonjour";

//     if (date.toLocaleTimeString < 18){
//         salut = "Bonsoir";
    
//     }

//     utilisateur = {
//         prenom: ["Thouaïbat", "Ali", "Madi"],
//         nom: "Sélim",
//         bonj: salut
//     };
//     res.render("accueil");
// });

//     fs.readFile("accueil.html", (err, data) => {
//         if (err) {
//             res.status(404).send("Le fichier est introuvable.");
//         } else {
//             res.status(200).contentType("text/html").send(data);
//         }
//     });

// MENU
app.get("/menu", (req, res) => {

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

//COMMANDE
app.post("/commande", (req, res) => {
    console.log("Corps requête", req.body.nom)
    console.log("Corps requête", req.body.prix)
});

module.exports = app;
