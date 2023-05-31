const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('./projetoweb-5b32b-firebase-adminsdk-pdihf-7474ad1985.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();


app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", function(req, res){
    res.render("primeira_pagina")
})

app.get("/consulta", function(req, res){
    
})

app.get("/excluir/:id", function(req, res){
     
})

app.get("/atualizar/:id", function(req, res){
    
})

app.post("/cadastrar", function(req, res){
    var res = db.collection('banco').add({
        nome: req.body.nome,
        telefone: req.body.telefone,
        origem: req.body.origem,
        data_contato: req.body.data_contato,
        observacao: req.body.observacao
    })

    console.log('Added document');
})

app.post("/confirmar", function(req, res){
    
})


app.listen(8081, function(){
    console.log("Servidor ativo!")
})