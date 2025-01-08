const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;
const table = "users";

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: "teste"
});

// Conectar ao banco de dados
db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL.');
});

// Rota para criar um novo registro
app.post('/criar', (req, res) => {
  const { nome, email } = req.body;
  const query = `INSERT INTO ${table} (nome, email) VALUES (?, ?)`;
  db.query(query, [nome, email], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao inserir dados no banco de dados');
    }
    res.send('Dados inseridos com sucesso!');
  });
});

// Rota para ler os registros
app.get('/ler', (req, res) => {
  const query = `SELECT * FROM ${table}`;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao buscar dados no banco de dados');
    }
    res.json(results);
  });
});

// Rota para atualizar um registro
app.put('/atualizar/:id', (req, res) => {
  const id = req.params.id;
  const { nome, email } = req.body;
  const query = `UPDATE ${table} SET nome = ?, email = ? WHERE id = ?`;
  db.query(query, [nome, email, id], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao atualizar dados no banco de dados');
    }
    res.send('Dados atualizados com sucesso!');
  });
});

// Rota para deletar um registro
app.delete('/deletar/:id', (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM ${table} WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao deletar dados no banco de dados');
    }
    res.send('Dados deletados com sucesso!');
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
