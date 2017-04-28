function heuristic(pStart, pEnd) {
	var costVec = pEnd.subtract(pStart);
	return Math.abs(costVec.x) + Math.abs(costVec.y);
}

function generateUUID() {
	var d = new Date().getTime();
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
	return uuid;
};

var Map = function(tileCountX, tileCountY, tileWidth, tileHeight) {

	this.nodes = []
	this.width = tileCountX
	this.height = tileCountY
	this.tileWidth = tileWidth
	this.tileHeight = tileHeight

	for (x = 0; x < this.width; x++) {
		this.nodes[x] = []
		for (y = 0; y < this.height; y++) {
			this.nodes[x][y] = new Node(x * tileWidth + tileWidth / 2, y * tileHeight + tileHeight / 2);
		}
	}

	//Loops through every node
	for (x = 0; x < this.width; x++) {
		for (y = 0; y < this.height; y++) {
			//Loops through every neighbour
			for (xi = x - 1; xi <= x + 1; xi++) {
				for (yi = y - 1; yi <= y + 1; yi++) {
					//Check the neighbour is in a cardinal direction, and not itself
					if (/*(x === xi || y === yi) &&*/ !(x === xi && y === yi)) {
						//Ensures that the neighbour is on the map
						if (xi < 0 || yi < 0 || xi >= this.width || yi >= this.height) continue;

						//Create a connection
						this.nodes[x][y].connections.push(new Connection(this.nodes[x][y], this.nodes[xi][yi], heuristic(this.nodes[x][y].position, this.nodes[xi][yi].position)));
					}
				}
			}
		}
	}

	//console.log(this.nodes);
}

var Node = function(x, y) {
	this.position = new Vec2(x, y);
	this.block = false;
	this.connections = [];

	this.parent = null;

	this.gScore = 0;
	this.hScore = 0;
	this.fScore = 0;

	this.ID = generateUUID();
}

var Connection = function(pStart, pEnd, pCost) {
	this.start = pStart
	this.end = pEnd
	this.cost = pCost;
}

Math.clamp = function(pVal, pMin, pMax) {
	return (pVal < pMin ? pMin : (pVal > pMax ? pMax : pVal));
}

Map.prototype.posToCoord = function(pPos) {
	return new Vec2(Math.clamp(Math.floor(pPos.x / (this.tileWidth * this.width) * this.width), 0, this.width - 1),
				Math.clamp(Math.floor(pPos.y / (this.tileHeight * this.height) * this.height), 0, this.height - 1));
}

Map.prototype.coordToNode = function(pCoord) {
	return this.nodes[pCoord.x][pCoord.y];
}

Map.prototype.block = function(blocked, xi, yi) {
	this.coordToNode(this.posToCoord(new Vec2(xi, yi))).block = blocked;
}

Map.prototype.navigateTo = function(pTo, pFrom) {
	//Keep track of searched nodes
	var searched = [];

	//Priority queue for the unsearched nodes
	var unsearched = [];

	//Find the end nodes
	var startNode = this.coordToNode(this.posToCoord(pFrom));
	var endNode = this.coordToNode(this.posToCoord(pTo));

	//Add the starting to our queue
	unsearched.push(startNode);

	//Keep track of the current node
	var current = null;

	//Search through all unsearched
	while (unsearched.length) {
		//Sort the queue
		unsearched.sort(function(a, b) {
			return a.fScore - b.fScore;
		});

		//Get the next node to process
		current = unsearched.splice(0, 1)[0];

		//Check if reached end
		if (current === endNode) break;

		//Loop through all connections
		for (var i = 0; i < current.connections.length; i++) {
			//Get the end node
			var next = current.connections[i].end;

			//Prevent searching blocked nodes or nodes that have already been searched
			if (next.block || next.ID in searched) continue;

			//Set the parent reference
			next.parent = current;

			//Add the node to the searched
			searched[next.ID] = 1;

			//Set score values
			next.gScore = current.fScore + current.connections[i].cost;
			next.hScore = heuristic(next.position, endNode.position);
			next.fScore = next.gScore + next.hScore;

			//Add to the queue
			unsearched.push(next);
		}
	}

	//Create an array to hold the path
	var path = [];

	//Check if the end was found
	if (current === endNode) {
		//Copy the nodes into the path array
		for (var i = 0; current !== startNode; i++) {
			path[i] = current;
			current = current.parent;
		}

		//Reverse the array
		path.reverse();
	}

	//Return the path array
	return path;
};

/*left = 0
top = 1
right = 2
bottom = 3
map.maxCons = 3
nodes[whatever].conNum = -1

for (i = 0; i < thhis.maxCons; i++) {
	nodes[whatever].conNum = i
}*/
