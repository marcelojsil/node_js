const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const nodemailer = require('nodemailer');
const port = 3000;

/* Configuração do transporte de e-mail
const transporter = nodemailer.createTransport({
    service: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
        user: 'marcelo.igrejadacidade@gmail.com', // Substitua pelo seu e-mail
        pass: 'giopau2011' // Substitua pela sua senha
    }
});
*/

// Configuração do motor de template
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Diretório para os arquivos estáticos (ex: CSS, imagens, JS)
app.use(express.static('public'));

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '',
  database: 'marthec'
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
app.get('/styleHeader', (req, res) => { res.sendFile(__dirname + '/public/css/header.css')})
app.get('/styleFooter', (req, res) => { res.sendFile(__dirname + '/public/css/footer.css')})
app.get('/styleElement', (req, res) => { res.sendFile(__dirname + '/public/css/elementos.css')})
app.get('/form_contato', (req, res) => { res.sendFile(__dirname + '/public/css/formContato.css')})

// Arquivos JS
app.get('/btnRolagem', (req, res) => { res.sendFile(__dirname + '/public/js/botao-rolagem.js')}) // Botão de Rolagem
app.get('/menuSuspenso', (req, res) => { res.sendFile(__dirname + '/public/js/menu-suspenso.js')}) // Menu Suspenso
app.get('/btnWhats', (req, res) => { res.sendFile(__dirname + '/public/js/whatsapp.js')}) // Botão do WhatsApp
app.get('/slides', (req, res) => { res.sendFile(__dirname + '/public/js/slides.js')}) // SlideShow

// Imagens
app.get('/logo', (req, res) => { res.sendFile(__dirname + '/public/img/logo.png' )}) // Logo
app.get('/logoFooter', (req,res) => { res.sendFile(__dirname + '/public/img/marthec_1.png' )}) //Logo no Rodapé

// Páginas
app.get('/', (req, res) => { res.render('index'); });
app.get('/sobre', (req, res) => { res.render('./pages/sobre.ejs'); });
app.get('/servicos', (req, res) => { res.render('./pages/servicos.ejs'); });
app.get('/contatos', (req, res) => { res.render('./pages/contatos.ejs'); });
app.get('/email', (req, res) => { res.render('./email.ejs')}) 


// Rota para processar o formulário Lead
app.post('/submit', (req, res) => {
  const { nome, email, whats } = req.body;

  if (!nome || !email || !whats) {
      return res.status(400).send('Por favor, preencha todos os campos corretamente.');
  } 

  const query = `INSERT INTO lead_site (nome, email, whats) VALUES (?, ?, ?)`;
  db.query(query, [nome, email, whats], (err, result) => {
      if (err) {
          console.error('Erro ao salvar os dados:', err);
          return res.status(500).send('Erro ao salvar os dados no banco de dados.');
      }else {
        res.redirect('/');
      }

  });
});

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