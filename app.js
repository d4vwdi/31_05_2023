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

const collectionRef = db.collection('banco');
app.get("/consulta", function(req, res){
    /*Lista todos o documentos SELECT/READ */
collectionRef.get()
  .then(snapshot => {
    snapshot.forEach(doc => {

      // Cria uma referência para um documento em outra coleção usando o ID do documento atual
      const cityRef = db.collection('banco').doc(doc.id);

      // Obtém o documento usando a referência
      const unity = cityRef.get();

      // Acessa os dados do documento obtido
      cityRef.get().then(unity => {
        if (unity && unity.exists) {
          // Imprime o ID do documento e seus dados
          var res = (unity.id, '=>', unity.data());
        }
      })
        .catch(err => {
          // Trata erros ao obter o documento
          console.log(err);
        });
    });
  })
  .catch(error => {
    // Trata erros ao obter os documentos da coleção
    console.error('Erro ao obter documentos:', error);
  });
})

app.get("/excluir/:id", function(req, res){
    db.collection('cities').doc(doc.id).delete();

    console.log('Deleted document');
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


app.listen(8081, function(){
    console.log("Servidor ativo!")
})