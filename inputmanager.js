var Inputmanager = new function() {
	//Save key state information
	var previousState = [];
	var currentState = [];
	var bufferState = [];

	//Subscribe to event listener
	window.addEventListener('keydown', function(evt) {
		//log in event reletive to array, key has been pressed
		bufferState[evt.keyCode] = true;
	}, false);

	window.addEventListener('keyup', function(evt) {
		//log in veent relative to array, key has been released
		bufferState[evt.keyCode] = false;
	}, false);

	this.update = function() {
		//loop through all array elements to update ande convert
		for (var i = 0; i < bufferState.length; i = i + 1) {
			//save previous atate value
			previousState[i] = currentState[i];

			//Get the new key state 
			currentState[i] = bufferState[i];
		}
	}

	this.keyDown = function(pKey) {
		return currentState[pKey];
	}

	this.keyPressed = function(pKey) {
		return currentState[pKey] && !previousState[pKey];
	}

	this.keyUp = function(pKey) {
		return !currentState[pKey];
	}

	this.keyReleased = function(pKey) {
		return previousState[pKey] && !currentState[pKey];
	}
}

var Keys = {
	//NUMBERS
	NUM0: 48,
	NUM1: 49,
	NUM2: 50,
	NUM3: 51,
	NUM4: 52,
	NUM5: 53,
	NUM6: 54,
	NUM7: 55,
	NUM8: 56,
	NUM9: 57,
	PAD0: 96,
	PAD1: 97,
	PAD2: 98,
	PAD3: 99,
	PAD4: 100,
	PAD5: 101,
	PAD6: 102,
	PAD7: 103,
	PAD8: 104,
	PAD9: 105,

	//LETTERS
	A: 65,
	B: 66,
	C: 67,
	D: 68,
	E: 69,
	F: 70,
	G: 71,
	H: 72,
	I: 73,
	J: 74,
	K: 75,
	L: 76,
	M: 77,
	N: 78,
	O: 79,
	P: 80,
	Q: 81,
	R: 82,
	S: 83,
	T: 84,
	U: 85,
	V: 86,
	W: 87,
	X: 88,
	Y: 89,
	Z: 90,

	//SPECIAL CHARACTERS
	BACKSPACE: 8,
	TAB: 9,
	ENTER: 13,
	SHIFT: 16,
	CTRL: 17,
	ALT: 18,
	PAUSE: 19,
	CAPS: 20,
	ESCAPE: 27,
	SPACE: 32,
	PAGE_UP: 33,
	PAGE_DOWN: 34,
	END: 35,
	HOME: 36,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	INSERT: 45,
	DELETE: 46,
	LEFT_WIN: 91,
	RIGHT_WIN: 92,
	SELECT: 93,
	MULTIPLY: 106,
	ADD: 107,
	SUBTRACT: 109,
	DECIMAL_POINT: 110,
	DIVIDE: 111,
	NUM_LOCK: 144,
	SCOLL_LOCK: 145,
	SEMI_COLON: 186,
	EQUAL_SIGN: 187,
	COMMA: 188,
	DASH: 189,
	PERIOD: 190,
	FORWARD_SLASH: 191,
	BACK_SLASH: 220,
	TILDE: 192,
	OPEN_BRACKET: 219,
	CLOSE_BRACKET: 221,
	SINGLE_QUOTE: 222,

	//FUNCTION KEYS
	F1: 112,
	F2: 113,
	F3: 114,
	F4: 115,
	F5: 116,
	F6: 117,
	F7: 118,
	F8: 119,
	F9: 120,
	F10: 121,
	F11: 122,
	F12: 123
};