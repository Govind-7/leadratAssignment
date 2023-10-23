const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json()); //middlware line to handle json()

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const dbpath = path.join(__dirname, "database.db");
let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({ filename: dbpath, driver: sqlite3.Database });

    app.listen(5000, () => console.log("server running at 5000"));
  } catch (e) {
    console.log(`DB Error: ${e}`);
    process.exit(1);
  }
};
initializeDbAndServer();

app.post("/book", async (request, response) => {
  const { seats } = request.body;
  const placeholders = seats.map(() => "?").join(",");

  const query = `UPDATE ticketDetails
  SET bookingStatus=1
  WHERE ticketNo IN (${placeholders})`;
  const a = await db.run(query, seats);
  //   console.log(a);
  response.send(`booked succesfully ${a.lastId}`);
});

app.get("/data", async (request, response) => {
  const dataQuery = `SELECT * FROM ticketDetails;`;
  const dataArr = await db.all(dataQuery);
  response.send(dataArr);
});
