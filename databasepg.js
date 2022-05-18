const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localHost",
  database: "petshopdb",
  password: "SH@t@wni10",
  port: 5432,
});
pool.connect();

const express = require("express");
const fs = require("fs");
const app = express();
const port = 8000;
app.use(express.json());

app.get("/pets", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM pets;");
    res.send(data.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/pets/:id", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM pets WHERE id = $1;", [
      req.params.id,
    ]);
    res.send(data.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/pets", async (req, res) => {
  try {
    const data = await pool.query(
      "INSERT INTO pets(age, kind, name) VALUES($1, $2, $3)",
      [req.body.age, req.body.kind, req.body.name]
    );
    res.send(req.body);
  } catch (err) {
    console.error(err.message);
  }
});

app.patch("/pets/:id", async (req, res) => {
  try {
    const data = await pool.query("UPDATE pets SET name = $1 WHERE id = $2;", [
      req.body.name,
      req.params.id,
    ]);
    res.send(req.body);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/pets/:id", async (req, res) => {
  try {
    const data = await pool.query("DELETE FROM pets WHERE id = $1;", [
      req.params.id,
    ]);
    res.send(data.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
