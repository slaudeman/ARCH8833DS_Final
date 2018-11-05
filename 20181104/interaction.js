
document.body.onclick = my_onclick_function;

function my_onclick_function(e)
{
  var clickedElementID = e.target.id;
  console.log("The ID of element clicked: ", clickedElementID);	  
  
  var selectedElement = document.getElementById(clickedElementID);
  var newRandomColor = getRandomColor();
  console.log("Setting text color to: ", newRandomColor);	  
	selectedElement.style.color = newRandomColor;
  
	// selectedElement.style.backgroundColor = getRandomColor(); // optional!
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
