 const { response } = require('express');
const express = require('express');
 const app = express();

 app.use(express.json())

 /* data structure */
 let id = 1
 const clients = []
 
 /* get all customers method */
 app.get("/clients", function(req, res){
   res.json(clients);
    
 });

 /* get customers by id method */
 app.get("/clients/:id", function(req, res){
   const {id} = req.params
   const customer = clients.find(cli => cli.id == id)
   if (!customer) return res.status(204).json();

   res.json(customer)
 })

 /* create customer method */
 app.post("/clients", function(req, res){

   const canBeStored = false
   if( Number(req.body.idade) < 18){
      return res.json({"msg": "Não é possível cadastrar um cliente menor de 18 anos"})
   }
 
   req.body.id = id
   id++
    clients.push(req.body)
   return res.json({"msg": "Cliente cadastrado com sucesso"})
   
  
   
})

 /* update customer method */
 app.put("/clients/:id", function(req, res){
   clients.forEach((customer, index) =>{
      if (customer.id = id){
         
         clients[index].nome = req.body.nome;
         clients[index].cnpj = req.body.cnpj;
         clients[index].dataNascimento = req.body.dataNascimento;
         clients[index].idade = req.body.idade;
         return res.json({"msg": "Cliente atualizado com sucesso"})
      }

   })
   return res.status(204).json();
 });

 /* delete customer */
 app.delete("/clients/:id", function(req, res){
   clients.forEach((customer, index) =>{
      if (customer.id = id){
         clients.splice(index,1)
      }
      
   });

   return res.json({"msg": "Cliente apagado com sucesso"})
 })

 /* runs server */
 app.listen(3000, function(){
     console.log('Server is running');
 })
