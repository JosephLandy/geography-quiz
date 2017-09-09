
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const fs = require('fs');
const clone = require('clone');

const URL = 'mongodb://localhost:27017/geography_db';

const concatenated = [
  "languages",
  "forms_of_government",
  "currencies"
]

function buildDB() {
  // THIS PATH IS RELATIVE TO THE FOLDER THE NODE COMMAND IS RUN FROM!
  let filepath = "../query.json";
  fs.readFile(filepath, (err, data) => {
    console.log(err);
    assert.equal(err, null, "Error occured. in readFile call.");
    assert.notEqual(data, null, "read nothing from file!");
    //console.log(data);
    var geoData = JSON.parse(data);
    //console.log(JSON.stringify(geoData, null, 2));
    // now have to go through and tokenize any concatenated entries, such
    // as languages.

    //I think I should rewrite this to use a map.
    for (let entry of geoData) {
      //now replace any empty strings with null.
      //both null and empty strings are falsy.
      for (let field in entry) {
        if (entry.hasOwnProperty(field)) {
          if(!entry[field])
            entry[field] = null;
        }
      }
      splitConcatenated(entry);
      //now parse the mediawiki url to get the url of the image itself.
      entry.flagfn = commonsURL_getfn(entry);
      console.log(entry.flagfn);
    }


    console.log(JSON.stringify(geoData, null, 2));

    MongoClient.connect(URL, (err, db) => {
      assert.equal(err, null, "error occured in mongo connect call.");

      let countries = db.collection('countries');

      //result is an object of type insertWriteOpResult.
      //it's properties aren't that interesting.
      countries.insertMany(geoData, (err, result) => {
        //assert() //tests for truthy. alias of assert.ok() instead.
        assert.equal(null, err);
        console.log(`inserted ${result.insertedCount} items`);
        db.close();
      });
    });
  });
}

function buildDB2() {
  // THIS PATH IS RELATIVE TO THE FOLDER THE NODE COMMAND IS RUN FROM!
  let filepath = "../query.json";
  fs.readFile(filepath, (err, data) => {
    assert.equal(err, null, "Error occured. in readFile call.");
    assert.notEqual(data, null, "read nothing from file!");


    let geoData = JSON.parse(data);

    // go through and tokenize any comma deliminated entries.
    geoData = geoData.map((entryUNSAFE) => {
      // replace empty string fields wth null.
      let entry = clone(entryUNSAFE);
      for (let field in entry) {
        if (entry.hasOwnProperty(field)) {
          if(!entry[field])
            entry[field] = null;
        }
      }
      return entry;
    }).map(splitConcatenated);

    //console.log(JSON.stringify(geoData, null, 2));

    

  });
}

function splitConcatenated(entryUNSAFE) {
  let entryObj = clone(entryUNSAFE);
  for (element of concatenated) {
    if (entryObj[element]) {
      entryObj[element] = entryObj[element].split(", ");
    }
  }
  return entryObj;
}


function insert_into_DB(geoData) {

  MongoClient.connect(URL, (err, db) => {
    assert.equal(err, null, "error occured in mongo connect call.");

    //drop the collection before rebuilding it.
    db.collection('countries').drop(); //this is probably inefficient.

    var countries = db.collection('countries');

    //result is an object of type insertWriteOpResult.
    //it's properties aren't that interesting.
    countries.insertMany(geoData, (err, result) => {
      //assert() //tests for truthy. alias of assert.ok() instead.
      assert.equal(null, err);
      console.log(`inserted ${result.insertedCount} items`);
      db.close();
    });
  });

}


buildDB2();
