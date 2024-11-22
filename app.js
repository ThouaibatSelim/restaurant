//import 
const express = require("express");
const fs = require("fs");

//app type express
const app = express();

//Vues
app.set("views", "./views"); //emplacement
app.set("view engine", "ejs"); //moteur

app.use(express.static("public"));

// ACCUEIL
app.get("/accueil", (req, res) => {

    //heure

    const date = new Date();
    let heure = date.toLocaleTimeString();
    let salut = "Bonjour"

    if (date.toLocaleTimeString < 18){
        salut = "Bonsoir";
    
    }

    utilisateur = {
        prenom: ["Thouaïbat", "Ali", "Madi"],
        nom: "Sélim",
        bonj: salut
    };
    res.render("accueil");
});

//     fs.readFile("accueil.html", (err, data) => {
//         if (err) {
//             res.status(404).send("Le fichier est introuvable.");
//         } else {
//             res.status(200).contentType("text/html").send(data);
//         }
//     });

// MENU
app.get("/menu", (req, res) => {

    thes = {
        nom: ["Thé Ngizi (Miel)", "Thé Tsingiziwu (Gingembre)", 
            "Thé Masandzé (Citronelle)", "Thé Nana (Menthe)", 
            "Thé Lavani (Vanille)", " Thé Anfou (Jasmin)"],
        prix: 2,

    };

    patisseries = {
        nom: ["Tartes au Citron", "Tartes à l'Ananas", "Fondants au Chocolat", 
            "Mharé wa Sinia", "Karara", "Macarons à la Fraise"],
        prix: 4,
    };
    res.render("menu");

    apperitif = {
        nom: ["Samboussas & Nems", "Bouchons", "Beignets aux crevettes", 
            "Mini Croissants au fromage", "Mini Quiches au Poulet"],
        prix: 5
    },

    boissons = {
        nom: ["Limonade", "Jus d'Orange", "Jus de Mangue", "Jus de Tamarin", "Jus de Sakuwa"],
        prix : 2,
    }

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

module.exports = app;
