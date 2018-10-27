require('es6-promise').polyfill();
require('isomorphic-fetch');

fetch('http://localhost:8000/spaces/2', {
  method: 'put',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
       "name": "A new kitchen!"
   })
}).then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('parsed json: ', json)
    }).catch(function(ex) {
      console.log('parsing failed: ', ex)
    });
