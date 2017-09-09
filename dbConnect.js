const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dbURL = 'mongodb://localhost:27017/';

function insertDocs(db, callback) {

}



MongoClient.connect(dbURL, (err, db) => {
  assert.equal(null, err); //make sure err is null. Throws error otherwise.
  console.log("connected to mongodb server");
  db.close();
})
