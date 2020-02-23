const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("products.db");
var faker = require("faker");

// generates price between 200 - 3500
generatePrice = () => {
  return (
    faker.random.number({
      min: 200,
      max: 3500
    }) + Number(Math.random().toFixed(2))
  );
};

getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};

const generateSpeed = () => {
  return getRandomInt(3) + Number(Math.random().toFixed(2));
};

const makerNames = ["Microsoft", "Dell", "Apple", "Altavista", "HP"];

const args = process.argv.slice(2);

if (args.length !== 1) {
  console.error("Error: Supply one arg for the number of values to add");
  process.exit(1);
}

const numVals = args[0];

db.serialize(function() {
  db.run(
    "CREATE TABLE IF NOT EXISTS Product(Maker TEXT, Model Int, Type TEXT, PRIMARY KEY (Maker, Model));"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS PC(Model INTEGER PRIMARY KEY NOT NULL, Speed REAL, RAM Int, HD Int, Price Real);"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS Laptop(Model INTEGER PRIMARY KEY NOT NULL, Speed REAL, RAM Int, HD Int, Screen Int, Price Real);"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS Printer(Model INTEGER PRIMARY KEY NOT NULL, Color bit, Type TEXT, Price Real);"
  );

  const prodStmt = db.prepare("INSERT INTO Product VALUES (?, ?, ?)");
  for (let i = 0; i < numVals; i++) {
    prodStmt.run(
      makerNames[getRandomInt(makerNames.length)],
      faker.random.number({
        min: 1,
        max: 10000
      }),
      faker.commerce.productName()
    );
  }
  prodStmt.finalize();

  const pcStmt = db.prepare(
    "INSERT INTO PC (Speed, RAM, HD, Price) VALUES (?, ?, ?, ?)"
  );
  for (let i = 0; i < numVals; i++) {
    pcStmt.run(
      generateSpeed(),
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

  const lapStmt = db.prepare(
    "INSERT INTO Laptop (Speed, RAM, HD, Screen, Price) VALUES (?, ?, ?, ?, ?)"
  );
  for (let i = 0; i < numVals; i++) {
    lapStmt.run(
      generateSpeed(),
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

  // bit, text, real
  const prntStmt = db.prepare(
    "INSERT INTO Printer (Color, Type, Price) VALUES (?, ?, ?)"
  );
  for (let i = 0; i < 200; i++) {
    prntStmt.run(
      faker.random.number({
        min: 0,
        max: 1
      }),
      faker.commerce.productName(),
      generatePrice()
    );
  }
  prntStmt.finalize();

  console.log(`adding for ${numVals} each table`);
});

db.close();
