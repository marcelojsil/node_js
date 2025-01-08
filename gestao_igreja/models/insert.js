const table = require('../create_db')

// formPessoa = Adicionar uma pessoa
table.Pessoas.create({
    nome: req.body.nome,
    email: req.body.email
}).then(()=>{res.send('Pessoa adicionada com sucesso!')})
.catch((erro)=>{res.send('Erro ao adicionar pessoa'+erro)})



