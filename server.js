const app = require('./app'); // Import the app instance
const mysql = require('mysql2'); // MySQL library

const port = 3001;
const host = 'localhost';

// MySQL Connection Setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "", // Ensure this matches your MySQL setup
    database: 'attendanceJframebd'
});

// Establish MySQL connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Routes
app.get('/getUsers', (req, res) => {
    const myquery = "SELECT * FROM `userdetails`";
    db.query(myquery, (err, result) => {
        if (err) {
            console.error(err); // Log error for debugging
            res.status(500).json({ error: 'Failed to fetch users' }); // Send proper error response
        } else {
            res.json({ results: result }); // Send query result
        }
    });
});

// Start the server
const server = app.listen(port, host, () => {
    console.log(`Node server is listening on ${server.address().port}`);
});
