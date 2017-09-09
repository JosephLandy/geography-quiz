import $ from 'jquery';
var optionsListTemplate = require('../views/mc-options-list-template.hbs');
var basicTemplate = require('../views/basic-template.hbs');
// NOTE: URL must be in this format to avoid cross site scripting issues.
const TOPLEVELURL = "http://localhost:3000";
$(document).ready(() => {

  $('#ajax-btn').click(() => {
    var url = TOPLEVELURL + '/questionData';

    $.getJSON(url).done(function (data) {
      console.log(JSON.stringify(data, 2));
      //injectTemplate("hbs-container", OptionsListTemplate, data);
      var htmlTemplated = optionsListTemplate(data);
      $('#hbs-container').html(htmlTemplated);
    });
  });
});

//including a sort of generic function like this might well be a security risk.
/**
 * compile html using a given template and add it to an element.
 * @param  {[string]} targetid [element id to add result to]
 * @param  {[function]} template [description]
 * @param  {[object]} data     [description]
 * @return {[void]}          [description]
 */
// function injectTemplate(targetid, template, data) {
//   console.log("#" + targetid);
//   console.log(template(data));
//   $("#" + targetid).html(template(data));
//
// }
