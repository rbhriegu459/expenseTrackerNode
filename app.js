const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rishita',
  database: 'sys',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL');
});

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up the view engine (EJS)
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  db.query('SELECT * FROM expenses', (err, results) => {
    if (err) throw err;
    res.render('index', {expenses : results });
  });
});

app.post('/addExpense', (req, res) => {
  const { description, amount } = req.body;
  // console.log(req.body);
  const newExpense = {description, amount };
  db.query('INSERT INTO expenses SET ?', newExpense, (err, result) => {
    if (err) throw err;
    res.redirect('/');
  });
});

// app.post('/delete/:id', (req, res) => {
//   const itemId = req.params.id;
  
//   // Delete item from the database
//   console.log(itemId);
//   connection.query('DELETE FROM expenses WHERE id = ?', [itemId], (error) => {
//       if (error) throw error;
//       res.redirect('/');
//   });
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
