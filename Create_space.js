require('es6-promise').polyfill();
require('isomorphic-fetch');

var maxId = Number.MAX_SAFE_INTEGER
var minId = 6;
var newId = Math.floor(Math.random() * (maxId - minId + 1)) + minId
var id
var name
var prompt = require('prompt');

// prompt.start();
// prompt.get(['id', 'name'], function (err, result){
	// console.log('input received')
	// console.log('id:' + result.id)
	// console.log('name:' + result.name)
	
	 // return id = prompt.history('id').value;
	 // return name = prompt.history('name').value
// })



fetch('http://localhost:8000/spaces/', {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
       "id": newId, 
	   "name": 'A new room'
   })
}).then(function(response) {
      return response.json()
    }).then(function(json) {
      console.log('parsed json: ', json)
    }).catch(function(ex) {
      console.log('parsing failed: ', ex)
    });