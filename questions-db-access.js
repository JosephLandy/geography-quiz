
const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017/geography_db';
const assert = require('assert');


var QuestionsAccess = function () {
  MongoClient.connect(dbUrl, (err, db) => {
    console.log('mongodb server accessed.');
    this.db = db; // using an arrow function here causes this to be bound to the enclosing context. That's pretty handy.
    console.log("questions object created with MongoClient!!");
  });
};

QuestionsAccess.prototype.constructor = QuestionsAccess;

QuestionsAccess.prototype.closeDB = function () {
  this.db.close(false, function(err, result) {
    assert.equal(null, err);
  });
};

QuestionsAccess.prototype.



module.exports = QuestionsAccess;





trampstamp129
