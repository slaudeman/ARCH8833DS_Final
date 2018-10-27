var range = document.getElementById("rotateRange");
var outputRange = document.getElementById("rotateDeg");
outputRange.innerHTML = range.value;

range.oninput = function() {
  outputRange.innerHTML = this.value;
}

var scale = document.getElementById("scaleRange");
var outputScale = document.getElementById("scaleVal");
outputScale.innerHTML = scale.value;

scale.oninput = function() {
  outputScale.innerHTML = this.value;
}

var KEYCODE = {
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    SPACE: 32,
    UP: 38
}

window.addEventListener('load', function() {

  var radiobuttons = document.querySelectorAll('[role=radio]');

  for(var i = 0; i < radiobuttons.length; i++ ) {
    var rb = radiobuttons[i];

    console.log(rb.tagName + " " + rb.id)

    rb.addEventListener('click', clickRadioGroup);
    rb.addEventListener('keydown', keyDownRadioGroup);
    rb.addEventListener('focus', focusRadioButton);
    rb.addEventListener('blur', blurRadioButton);
  }

});

/*
* @function firstRadioButton
*
* @desc Returns the first radio button
*
* @param   {Object}  event  =  Standard W3C event object
*/

function firstRadioButton(node) {

  var first = node.parentNode.firstChild;

  while(first) {
    if (first.nodeType === Node.ELEMENT_NODE) {
      if (first.getAttribute("role") === 'radio') return first;
    }
    first = first.nextSibling;
  }

  return null;
}

/*
* @function lastRadioButton
*
* @desc Returns the last radio button
*
* @param   {Object}  event  =  Standard W3C event object
*/

function lastRadioButton(node) {

  var last = node.parentNode.lastChild;

  while(last) {
    if (last.nodeType === Node.ELEMENT_NODE) {
      if (last.getAttribute("role") === 'radio') return last;
    }
    last = last.previousSibling;
  }

  return last;
}

/*
* @function nextRadioButton
*
* @desc Returns the next radio button
*
* @param   {Object}  event  =  Standard W3C event object
*/

function nextRadioButton(node) {

  var next = node.nextSibling;

  while(next) {
    if (next.nodeType === Node.ELEMENT_NODE) {
      if (next.getAttribute("role") === 'radio') return next;
    }
    next = next.nextSibling;
  }

  return null;
}

/*
* @function previousRadioButton
*
* @desc Returns the previous radio button
*
* @param   {Object}  event  =  Standard W3C event object
*/

function previousRadioButton(node) {

  var prev = node.previousSibling;

  while(prev) {
    if (prev.nodeType === Node.ELEMENT_NODE) {
      if (prev.getAttribute("role") === 'radio') return prev;
    }
    prev = prev.previousSibling;
  }

  return null;
}

/*
* @function getImage
*
* @desc Gets the image for radio box
*
* @param   {Object}  event  =  Standard W3C event object
*/

function getImage(node) {

  var child = node.firstChild;

  while(child) {
    if (child.nodeType === Node.ELEMENT_NODE) {
      if (child.tagName === 'IMG') return child;
    }
    child = child.nextSibling;
  }

  return null;
}

/*
* @function setRadioButton
*
* @desc Toogles the state of a radio button
*
* @param   {Object}  event  -  Standard W3C event object
*
*/

function setRadioButton(node, state) {
  var image = getImage(node);

  if (state == 'true') {
    node.setAttribute('aria-checked', 'true')
    node.tabIndex = 0;
    node.focus()
  }
  else {
    node.setAttribute('aria-checked', 'false') 
    node.tabIndex = -1;
  }
}

/*
* @function clickRadioGroup
*
* @desc
*
* @param   {Object}  node  -  DOM node of updated group radio buttons
*/

function clickRadioGroup(event) {
  var type = event.type;

  if (type === 'click') {
    // If either enter or space is pressed, execute the funtion

    var node = event.currentTarget;

    var radioButton = firstRadioButton(node);

    while (radioButton) {
      setRadioButton(radioButton, "false");
      radioButton = nextRadioButton(radioButton);
    }

    setRadioButton(node, "true");

    event.preventDefault();
    event.stopPropagation();
  }
}

/*
* @function keyDownRadioGroup
*
* @desc
*
* @param   {Object}   node  -  DOM node of updated group radio buttons
*/

function keyDownRadioGroup(event) {
  var type = event.type;
  var next = false;

  if(type === "keydown"){
    var node = event.currentTarget;

    switch (event.keyCode) {
      case KEYCODE.DOWN:
      case KEYCODE.RIGHT:
        var next = nextRadioButton(node);
        if (!next) next = firstRadioButton(node); //if node is the last node, node cycles to first.
        break;

      case KEYCODE.UP:
      case KEYCODE.LEFT:
        next = previousRadioButton(node);
        if (!next) next = lastRadioButton(node); //if node is the last node, node cycles to first.
        break;

      case KEYCODE.SPACE:
        next = node;
        break;
    }

    if (next) {
      var radioButton = firstRadioButton(node);

      while (radioButton) {
        setRadioButton(radioButton, "false");
        radioButton = nextRadioButton(radioButton);
      }

      setRadioButton(next, "true");

      event.preventDefault();
      event.stopPropagation();
    }
  }
}

/*
* @function focusRadioButton
*
* @desc Adds focus styling to label element encapsulating standard radio button
*
* @param   {Object}  event  -  Standard W3C event object
*/

function focusRadioButton(event) {
  event.currentTarget.className += ' focus';
}

/*
* @function blurRadioButton
*
* @desc Adds focus styling to the label element encapsulating standard radio button
*
* @param   {Object}  event  -  Standard W3C event object
*/

function blurRadioButton(event) {
   event.currentTarget.className = event.currentTarget.className.replace(' focus','');
}




//////// SLIDERS FOR COLOR /////////


/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*
*   File:   slider.js
*
*   Desc:   Slider widget that implements ARIA Authoring Practices
*/

// Create Slider that contains value, valuemin, valuemax, and valuenow
var Slider = function (domNode)  {

  this.domNode = domNode;
  this.railDomNode = domNode.parentNode;

  this.valueDomNode = false;

  this.valueMin = 0;
  this.valueMax = 100;
  this.valueNow = 50;

  this.railWidth = 0;

  this.thumbWidth  = 8;
  this.thumbHeight = 28;

  this.keyCode = Object.freeze({
    'left': 37,
    'up': 38,
    'right': 39,
    'down': 40,
    'pageUp': 33,
    'pageDown': 34,
    'end': 35,
    'home': 36
  });
};

// Initialize slider
Slider.prototype.init = function () {

  if (this.domNode.getAttribute('aria-valuemin')) {
    this.valueMin = parseInt((this.domNode.getAttribute('aria-valuemin')));
  }
  if (this.domNode.getAttribute('aria-valuemax')) {
    this.valueMax = parseInt((this.domNode.getAttribute('aria-valuemax')));
  }
  if (this.domNode.getAttribute('aria-valuenow')) {
    this.valueNow = parseInt((this.domNode.getAttribute('aria-valuenow')));
  }

  this.railWidth = parseInt(this.railDomNode.style.width.slice(0, -2));

  this.valueDomNode = this.railDomNode.nextElementSibling;

  if (this.valueDomNode) {

    this.valueDomNode.innerHTML = '0';
    this.valueDomNode.style.left = (this.railDomNode.offsetLeft + this.railWidth + 10) + 'px';
    this.valueDomNode.style.top = (this.railDomNode.offsetTop - 8) + 'px';
  }

  if (this.domNode.tabIndex != 0) {
    this.domNode.tabIndex = 0;
  }

  this.domNode.style.width = this.thumbWidth + 'px';
  this.domNode.style.height = this.thumbHeight + 'px';
  this.domNode.style.top = (this.thumbHeight / -2) + 'px';

  this.domNode.addEventListener('keydown',    this.handleKeyDown.bind(this));
  // add onmousedown, move, and onmouseup
  this.domNode.addEventListener('mousedown', this.handleMouseDown.bind(this));

  this.domNode.addEventListener('focus',      this.handleFocus.bind(this));
  this.domNode.addEventListener('blur',       this.handleBlur.bind(this));

  this.railDomNode.addEventListener('click', this.handleClick.bind(this));

  this.moveSliderTo(this.valueNow);

};

Slider.prototype.moveSliderTo = function (value) {

  if (value > this.valueMax) {
    value = this.valueMax;
  }

  if (value < this.valueMin) {
    value = this.valueMin;
  }

  this.valueNow = value;

  this.domNode.setAttribute('aria-valuenow', this.valueNow);

  var pos = Math.round(
    (this.valueNow * this.railWidth) / (this.valueMax - this.valueMin)
  ) - (this.thumbWidth / 2);

  this.domNode.style.left = pos + 'px';

  if (this.valueDomNode) {
    this.valueDomNode.innerHTML = this.valueNow.toString();
  }

  updateColorBox();

};

Slider.prototype.handleKeyDown = function (event) {

  var flag = false;

  switch (event.keyCode) {
    case this.keyCode.left:
    case this.keyCode.down:
      this.moveSliderTo(this.valueNow - 1);
      flag = true;
      break;

    case this.keyCode.right:
    case this.keyCode.up:
      this.moveSliderTo(this.valueNow + 1);
      flag = true;
      break;

    case this.keyCode.pageDown:
      this.moveSliderTo(this.valueNow - 10);
      flag = true;
      break;

    case this.keyCode.pageUp:
      this.moveSliderTo(this.valueNow + 10);
      flag = true;
      break;

    case this.keyCode.home:
      this.moveSliderTo(this.valueMin);
      flag = true;
      break;

    case this.keyCode.end:
      this.moveSliderTo(this.valueMax);
      flag = true;
      break;

    default:
      break;
  }

  if (flag) {
    event.preventDefault();
    event.stopPropagation();
  }

};

Slider.prototype.handleFocus = function (event) {
  this.domNode.classList.add('focus');
  this.railDomNode.classList.add('focus');
};

Slider.prototype.handleBlur = function (event) {
  this.domNode.classList.remove('focus');
  this.railDomNode.classList.remove('focus');
};

// Initialise Sliders on the page
window.addEventListener('load', function () {

  var sliders = document.querySelectorAll('[role=slider]');;

  for (var i = 0; i < sliders.length; i++) {
    var s = new Slider(sliders[i]);
    s.init();
  }

});

Slider.prototype.handleMouseDown = function (event) {

  var self = this;

  var handleMouseMove = function (event) {

    var diffX = event.pageX - self.railDomNode.offsetLeft;
    self.valueNow = parseInt(((self.valueMax - self.valueMin) * diffX) / self.railWidth);
    self.moveSliderTo(self.valueNow);

    event.preventDefault();
    event.stopPropagation();
  };

  var handleMouseUp = function (event) {

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);

  };

    // bind a mousemove event handler to move pointer
  document.addEventListener('mousemove', handleMouseMove);

  // bind a mouseup event handler to stop tracking mouse movements
  document.addEventListener('mouseup', handleMouseUp);

  event.preventDefault();
  event.stopPropagation();

  // Set focus to the clicked handle
  this.domNode.focus();

};

// handleMouseMove has the same functionality as we need for handleMouseClick on the rail
Slider.prototype.handleClick = function (event) {

  var diffX = event.pageX - this.railDomNode.offsetLeft;
  this.valueNow = parseInt(((this.valueMax - this.valueMin) * diffX) / this.railWidth);
  this.moveSliderTo(this.valueNow);

  event.preventDefault();
  event.stopPropagation();

};

/* ---------------------------------------------------------------- */
/*                  Change color of the Box                         */
/* ---------------------------------------------------------------- */

updateColorBox = function () {

  function getColorHex () {
    var r = parseInt(document.getElementById('idRedValue').getAttribute('aria-valuenow')).toString(16);
    var g = parseInt(document.getElementById('idGreenValue').getAttribute('aria-valuenow')).toString(16);
    var b = parseInt(document.getElementById('idBlueValue').getAttribute('aria-valuenow')).toString(16);
	var a = parseInt(document.getElementById('idAlphaValue').getAttribute('aria-valuenow')).toString(16);

    if (r.length === 1) {
      r = '0' + r;
    }
    if (g.length === 1) {
      g = '0' + g;
    }
    if (b.length === 1) {
      b = '0' + b;
    }
	if (a.length === 1) {
      a = '0' + a;
    }
	

    return '#' + r + g + b + a;
  }

  function getColorRGB () {
    var r = document.getElementById('idRedValue').getAttribute('aria-valuenow');
    var g = document.getElementById('idGreenValue').getAttribute('aria-valuenow');
    var b = document.getElementById('idBlueValue').getAttribute('aria-valuenow');
	var a = document.getElementById('idAlphaValue').getAttribute('aria-valuenow');

    return r + ', ' + g +', ' + b + ', ' + a;
  }

  var node = document.getElementById('idColorBox');
  
  function getColorNoA() {
	var r = document.getElementById('idRedValue').getAttribute('aria-valuenow');
    var g = document.getElementById('idGreenValue').getAttribute('aria-valuenow');
    var b = document.getElementById('idBlueValue').getAttribute('aria-valuenow');
	
	return r + ', ' + g +', ' + b;
  }

  if (node) {

    var color = getColorHex();

    node.style.backgroundColor = color;

    node = document.getElementById('idColorValueHex');
    node.value = color;

    node = document.getElementById('idColorValueRGB');
    node.value = getColorRGB();
	var conf = getColorNoA();
	//confirms variable output - leave off unless testing. Messy. No alpha for svg stroke
	//console.log(conf);

  }
};
