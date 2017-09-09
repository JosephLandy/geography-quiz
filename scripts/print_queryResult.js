const fs = require('fs');

function printResults() {
  let filepath = "../query.json";
  fs.readFile(filepath, (err, data) => {
    console.log(JSON.stringify(JSON.parse(data), null, 2));
  })
}


printResults();
