const request = require('request');
const querystring = require('querystring'); // for url encoding.

const baseURL = 'https://query.wikidata.org/sparql';

//only template literal strings can be multi line.
const query = `SELECT DISTINCT ?country ?countryLabel ?flag ?capital ?capitalLabel ?population WHERE {
  ?country wdt:P31 wd:Q6256.
  #?country wdt:P41 ?flag.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  OPTIONAL { ?country wdt:P41 ?flag }
  OPTIONAL { ?country wdt:P36 ?capital. }
  OPTIONAL { ?country wdt:P1082 ?population. }
}`;

/**
 * @callback cb
 * @param {truthy | falsy} err
 * @param responce
 * @param {JSON} body
 */
/**
 * @param {string} query - the query to submit to the wikidata api.
 * @param callback
 * @param {string} [format]
 */
function queryRequest(sparql, cb) {
  //I should send the query as a get unless it's really long in which case a post.
  let querystr = querystring.stringify({query:sparql});
  //format = format || "json"
  let url = baseURL + '?' + querystr;
  let options = {
    url: url,
    headers: {
      Accept: 'application/sparql-results+json',
    },
  };
  //callbacks have access to the containing functions scope.
  //return value and callback?
  let bodyStr = request(options, function (err, responce, body) {
    if (err) {
      console.log("error! " + err);
    } else {
      //console.log(responce)
      console.log(body);
    }
  });

}

queryRequest(query);
