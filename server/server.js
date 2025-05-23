import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DB_URL,
});

app.listen(8080, () => console.log("You've docked on port 8080!"));

app.get("/", (req, res) => res.json({ message: "route leader, standing by." }));

app.get("/get_data", async (req, res) => {
  const query = await db.query(
    "SELECT * FROM entries ORDER BY date_written DESC, id DESC LIMIT 20"
  );
  res.json(query.rows);
});

app.post("/write", (req, res) => {
  const userSub = req.body;
  const query = db.query(
    `INSERT INTO entries (name, message, date_written) VALUES($1, $2, $3)`,
    [userSub.name, userSub.message, userSub.date_written]
  );
  res.json(query);
});
