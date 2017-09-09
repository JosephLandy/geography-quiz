
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const QuestionsAccess = require('./questions-db-access.js');

/*
in order to serve static files, such as css, images, static html, javascript
files etc, need to register one or more uses of the built in express.static
middleware function.
*/

const questions = new QuestionsAccess();

app.use(express.static('client/dist'));

//the basic functionality of this app would only need get requests to acquire a set of questions, and the answer.
app.get('/', (request, res) => {
  //res.render(path.join(__dirname, 'client','dist', 'index.html'));
  //res.send("express JS sent this biatch.");
  res.sendFile(path.join(__dirname, 'client','dist', 'index.html'));
});


app.get('/questionData', (request, res) => {
  console.log(questions.stringy);
  let qd = {
    answer: 'Canada',
    responses: [
      {
        answerID: 'A0',
        country:'Sweden',
        flaglink:'http://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Sweden.svg'
      },
      {
        answerID: 'A1',
        country: 'Pakistan',
        flaglink: 'http://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Pakistan.svg'
      },
      {
        answerID: 'A2',
        country: 'Mongolia',
        flaglink: 'http://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20Mongolia.svg'
      }
    ]
  };
  console.log("sending question data.");
  res.send(JSON.stringify(qd, null, 4));
});

app.use((err, request, responce, next) => {
  //the middleware with a 4 parameter callback is the error handler.
  //should be the last middleware defined.
  console.log(err);
  responce.status(500).send('error occured.');


});

app.listen(port, (err) => {
  //this function is called when the server terminates. So I can close down
  //a db connection here.
  //no, I don't think it works like that! I have to trap the signal using the
  //process module :(
  if (err) {
    console.log('error occured');
    return;
  }
  console.log(`server listening on ${port}`);
});
