require('es6-promise').polyfill();
require('isomorphic-fetch');

fetch('http://localhost:8000/spaces/')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log('parsed json: ', json)
  }).catch(function(ex) {
    console.log('parsing failed: ', ex)
  });
