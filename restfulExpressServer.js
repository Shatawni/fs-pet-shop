const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localHost",
  database: "petshopdb",
  password: "SH@t@wni10",
  port: 5432,
});
pool.connect();
const text =
  "INSERT INTO pets (age, kind, name) VALUES ($1, $2, $3) RETURNING *";
const values = [7, "dog", "Brian"];

pool.query(text, values, (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log(res.rows[0]);
  }
});

const express = require("express");
const fs = require("fs");
const app = express();
const port = 8000;
app.use(express.json());

app.get("/pets", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM pets;");
    //fs.readFile("pets.json", "utf8", (error, data) => {
    //if (error) {
    res.send(data.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/pets/:id", (req, res) => {
  fs.readFile("pets.json", "utf8", (error, data) => {
    if (error) {
      res.send(error);
    } else {
      jsonObj = JSON.parse(data);
      if (req.params.id >= jsonObj.length || req.params.id < 0) {
        res.status(404).json({ message: "not found" });
      }
      res.send(jsonObj[req.params.id]);
    }
  });
});

app.post("/pets", (req, res) => {
  fs.readFile("pets.json", "utf8", (error, data) => {
    if (error) {
      res.send(error);
    } else {
      jsonArr = JSON.parse(data);
      let reqBody = req.body;
      const obj = {
        age: parseInt(reqBody.age),
        kind: `${reqBody.kind}`,
        name: `${reqBody.name}`,
      };

      jsonArr.push(obj);
      const input = JSON.stringify(jsonArr);
      fs.writeFile("pets.json", input, (error) => {
        if (error) {
          res.send(error);
        } else {
          res.send(jsonArr[req.params.id]);
        }
      });
    }
  });
});

app.patch("/pets/:id", (req, res) => {
  fs.readFile("pets.json", "utf8", (error, data) => {
    if (error) {
      res.send(error);
    } else {
      jsonArr = JSON.parse(data);
      let reqBody = req.body;
      jsonArr[req.params.id].name = reqBody.name;
      const input = JSON.stringify(jsonArr);
      fs.writeFile("pets.json", input, (error) => {
        if (error) {
          res.send(error);
        } else {
          res.send(jsonArr[req.params.id]);
        }
      });
    }
  });
});

app.delete("/pets/:id", (req, res) => {
  fs.readFile("pets.json", "utf8", (error, data) => {
    if (error) {
      res.send(error);
    } else {
      jsonArr = JSON.parse(data);
      let responseBody = jsonArr[req.params.id];
      jsonArr.splice(req.params.id, 1);
      const input = JSON.stringify(jsonArr);
      fs.writeFile("pets.json", input, (error) => {
        if (error) {
          res.send(error);
        } else {
          res.send(responseBody);
        }
      });
    }
  });
});

app.listen(port, function () {
  console.log(`Listening on Port: ${port}`);
});
