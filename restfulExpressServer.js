const express = require("express");
const fs = require("fs");
const app = express();
const port = 8000;
app.use(express.json());

app.get("/pets", (req, res) => {
  fs.readFile("pets.json", "utf8", (error, data) => {
    if (error) {
      console.log(error);
    } else {
      jsonObj = JSON.parse(data);
      res.send(jsonObj);
    }
  });
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
