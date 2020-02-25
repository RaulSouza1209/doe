/// MODULES
const express = require('express');
const nunjucks = require('nunjucks');

/// INIT SERVER
const app = express();

/// CONECT TO DB
const Pool = require('pg').Pool;
const db = new Pool({
  user: 'postgres',
  password: '1209',
  host: 'localhost',
  port: 5432,
  database: 'doe2'
});

/// TEMPLATE ENGINE
nunjucks.configure('./', { express: app, noCache: true });

/// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

/// ROUTES
app.get('/', (req, res) => {
  db.query('SELECT * FROM donors', (err, result) => {
    if (err) return res.send('Erro no banco de dados');

    const donors = result.rows;
    res.render('index.html', { donors });
  });
});

app.post('/', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const blood = req.body.blood;

  if (name === '' || email === '' || blood === '') {
    return res.send('Todos os campos são obrigatórios');
  }

  const query = `INSERT INTO donors ("name", "email", "blood") 
                VALUES ($1, $2, $3)`;

  const values = [name, email, blood];

  db.query(query, values, err => {
    if (err) return console.log(err);
    return res.redirect('/');
  });
});

/// LISTENING
app.listen(3000, () => {
  console.log('Servidor iniciado');
});
