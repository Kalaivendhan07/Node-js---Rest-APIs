const mysql = require("mysql");

const db = mysql.createConnection({
  host: "b6xdcs1w7iq9mztofky2-mysql.services.clever-cloud.com",
  user: "uaypidusshorpusf",
  password: "AKYbOskQ7amuZA9O4IC7",
  database: "b6xdcs1w7iq9mztofky2",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to MySQL database.");
  }
});

const createUsersTable = () => {
    const sql = `
        CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  task VARCHAR(255),
  entered_by int DEFAULT NULL,
  entered_date datetime DEFAULT now(),
  updated_by int DEFAULT NULL,
  updated_date timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  status varchar(10) DEFAULT 'A',
  FOREIGN KEY (user_id) REFERENCES users(id)
)
    `;
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('Users table created successfully.');
        }
    });
};

// Call the function to create the table
createUsersTable();