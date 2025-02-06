const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const nodemailer = require('nodemailer');
const port = 3000;


// Configuração do motor de template
app.set('view engine', 'ejs');
//app.set('views', 'views');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Diretório para os arquivos estáticos (ex: CSS, imagens, JS)
app.use(express.static('public'));

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'marthecweb'
});

// Conectar ao banco de dados
db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL.');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


// =========================================== //
// === ROTAS === ROTAS === ROTAS === ROTAS === //


// Arquivos CSS
app.get('/bootstrap', (req, res) => { res.sendFile(__dirname + '/public/css/bootstrap.css')}) 
app.get('/style', (req, res) => { res.sendFile(__dirname + '/public/css/style.css')}) 

// Arquivos JS
//app.get('/btnRolagem', (req, res) => { res.sendFile(__dirname + '/public/js/botao-rolagem.js')}) // Botão de Rolagem
app.get('/formContato', (req, res) => { res.sendFile(__dirname + '/public/js/formContato.js')})


// Imagens
app.get('/logo', (req, res) => { res.sendFile(__dirname + '/public/img/logo.png' )}) // Logo
app.get('/bg', (req, res) => { res.sendFile(__dirname + '/public/img/main_01.png' )}) // Bg main
app.get('/necessidade', (req, res) => { res.sendFile(__dirname + '/public/img/notebook.jpg' )}) // 

// Páginas
app.get('/', (req, res) => { res.render('index'); });
app.get('/contato', (req, res) => { res.render('/pages/contato'); });
app.get('/orcamento', (req, res) => { res.render('/pages/orcamento'); });
app.get('/planos', (req, res) => { res.render('/pages/planos'); });
app.get('/sobre', (req, res) => { res.render('/pages/sobre'); });


// FORM Contato
app.get('/obrigado', (req, res) => { res.render('layouts/obrigado'); });
app.post('/form_contato', (req, res) => {
  const { name, phone } = req.body;

  const query = 'INSERT INTO form_contato (name, phone) VALUES (?, ?)';
  db.query(query, [name, phone], (err, result) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.send('Dados enviados com sucesso!');
  });
});


// Rota para processar o formulário Lead



// Rota para criar um novo registro
app.post('/criar', (req, res) => {
    const { nome, email } = req.body;
    const query = `INSERT INTO cliente (nome, email) VALUES (?, ?)`;
    db.query(query, [nome, email], (err, result) => {
      if (err) {
        return res.status(500).send('Erro ao inserir dados no banco de dados');
      }
      res.send('Dados inseridos com sucesso!');
    });
  });
  
// Rota para ler os registros
app.get('/ler', (req, res) => {
  const query = `SELECT * FROM clientes`;
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
  const query = `UPDATE clientes SET nome = ?, email = ? WHERE id = ?`;
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
  const query = `DELETE FROM clientes WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao deletar dados no banco de dados');
    }
    res.send('Dados deletados com sucesso!');
  });
});



