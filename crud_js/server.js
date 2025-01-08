const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser')
const Sequelize  = require('sequelize')

// == CONFIG EXPRESS ==
const app = express();
app.use(express.json())

// == CONFIG O BODY PARSER ==
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// == CONFIG CORS ==
const cors = require('cors');
app.use(cors());

// == CONEXÃO COM O BANCO ==
const db = mysql.createConnection({
  host: 'localhost',    // Endereço do servidor MySQL
  user: 'root',         // Usuário do MySQL
  password: '', // Senha do MySQL
  database: 'teste' // Nome do banco de dados
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL.');
});


// == ADICIONAR DADOS EM UMA TABELA S/ SEQUELIZE ==
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/view/formAddUser.html') 
})
app.post('/', (req, res) => {
    const { nome, email } = req.body;
  
    const query = 'INSERT INTO users (nome, email) VALUES (?, ?)';
    db.query(query, [nome, email], (err, result) => {
      if (err) {
        return res.status(500).send('Erro ao inserir dados no banco de dados');
      }
      res.sendFile(__dirname+'/index.html');
    });
  });

// == LISTAR DADOS DE UMA TABELA ==
app.get('/dados', (req, res) => {
  const query = 'SELECT * FROM users ORDER BY id DESC'; 
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Erro na consulta ao banco de dados');
    }
    res.json(results); // Retorna os dados em formato JSON
  });
});

// == DELETAR DADOS DE UMA TABELA ==
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
  
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).send('Erro ao deletar dados no banco de dados');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('Registro não encontrado');
      }
      res.sendFile(__dirname+'/delete.html/:id');
    });
  });

// Iniciando o servidor
app.listen(3000, () => {
  console.log(`Servidor rodando em http://localhost:3000`);
});
