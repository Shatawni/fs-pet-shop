var fs = require("fs");
const command = process.argv[2];

//reads file
function read() {
  const index = process.argv[3];
  fs.readFile("pets.json", "utf8", (error, data) => {
    if (error) {
      console.log(error);
    } else {
      jsonObj = JSON.parse(data);
      if (!index) {
        console.log(jsonObj);
      } else if (index >= jsonObj.length) {
        console.log("Usage: node pets.js read INDEX");
      } else {
        console.log(jsonObj[index]);
      }
    }
  });
}

function create() {
  const age = parseInt(process.argv[3]);
  const kind = process.argv[4];
  const name = process.argv[5];
  let obj = {};
  if (age && kind && name) {
    fs.readFile("pets.json", "utf8", (error, data) => {
      if (error) {
        console.log(error);
      } else {
        jsonObj = JSON.parse(data);
      }
      obj.age = age;
      obj.kind = kind;
      obj.name = name;
      jsonObj.push(obj);
      const input = JSON.stringify(jsonObj);
      fs.writeFile("pets.json", input, function (error) {
        if (error) {
          console.log(error);
        }
      });
    });
  }
}

if (!command) {
  console.log("Usage: node pets.js [read | create | update | destroy]");
} else if (command === "read") {
  read();
} else if (command === "create") {
  create();
}
