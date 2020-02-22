const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("products.db");
var faker = require("faker");

generatePrice = () => {
  return (
    faker.random.number({
      min: 200,
      max: 3500
    }) + Math.random()
  );
};

getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

db.serialize(function() {
  db.run(
    "CREATE TABLE IF NOT EXISTS Product(Maker TEXT, Model Int, Type TEXT, PRIMARY KEY (Maker, Model));"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS PC(Model Int PRIMARY KEY,Speed REAL,RAM Int,HD Int,Price Real);"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS Laptop(Model Int PRIMARY KEY, Speed REAL, RAM Int, HD Int, Screen Int, Price Real);"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS Printer(Model Int PRIMARY KEY, Color bit, Type TEXT, Price Real);"
  );

  const prodStmt = db.prepare("INSERT INTO Product VALUES (?, ?, ?)");
  for (let i = 0; i < 200; i++) {
    prodStmt.run(
      faker.company.companyName(),
      faker.random.uuid(),
      faker.commerce.productName()
    );
  }
  prodStmt.finalize();

  const pcStmt = db.prepare("INSERT INTO PC VALUES (?, ?, ?, ?, ?)");
  for (let i = 0; i < 200; i++) {
    pcStmt.run(
      faker.random.uuid(),
      Math.random(),
      faker.random.number({
        min: 2,
        max: 32
      }),
      faker.random.number({
        min: 128,
        max: 1000
      }),
      generatePrice()
    );
  }
  pcStmt.finalize();

  const lapStmt = db.prepare("INSERT INTO Laptop VALUES (?, ?, ?, ?, ?, ?)");
  for (let i = 0; i < 200; i++) {
    lapStmt.run(
      faker.random.uuid(),
      Math.random(),
      faker.random.number({
        min: 2,
        max: 32
      }),
      faker.random.number({
        min: 128,
        max: 1000
      }),
      faker.random.number({
        min: 10,
        max: 17
      }),
      generatePrice()
    );
  }
  lapStmt.finalize();

  // int, bit, text, real
  const prntStmt = db.prepare("INSERT INTO Printer VALUES (?, ?, ?, ?)");
  for (let i = 0; i < 200; i++) {
    prntStmt.run(
      faker.random.uuid(),
      faker.random.number({
        min: 0,
        max: 1
      }),
      faker.commerce.productName(),
      generatePrice()
    );
  }
  prntStmt.finalize();
});

db.close();
