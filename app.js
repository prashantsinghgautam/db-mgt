const express = require('express');
const app = express();
const port = 3000; // Choose a suitable port

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// MySQL Configuration
const mysql = require('mysql');
const db = mysql.createConnection({
  host: '127.0.0.1', // MySQL server host
  user: 'root', // MySQL username
  password: 'king', // MySQL password
  database: 'db_mgt' // MySQL database name
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error: ' + err.message);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Serve the HTML form
app.get('/create-table', (req, res) => {
  res.sendFile(__dirname + '/public/createTable.html');
});

// Handle form submission and create tables
app.post('/create-table', (req, res) => {
  const { tableName, columnName, columnType } = req.body;

  // Create the table with the provided column
  const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
    ${columnName} ${columnType}
  )`;

  db.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating table: ' + err.message);
      res.send('Error creating table.');
    } else {
      console.log('Table created successfully.');
      res.send('Table created successfully.');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
