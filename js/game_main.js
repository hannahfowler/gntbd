//create game
var game = new Phaser.Game(800, 800, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

//all NECESSARY globals
var PIECE_WIDTH = 200,
PIECE_HEIGHT = 200,
PUZZLE_WIDTH= 800,
PUZZLE_HEIGHT= 800,
BOARD_COLS = 4,
BOARD_ROWS = 4;

var CHAR_TILE_HEIGHT = 100;
var CHAR_TILE_WIDTH = 100;

var map; 
var backgroundLayer,
	pathwayLayer,
	blockedLayer,
	layer; 

var sqaure; 
var player,
	items;
var cursors; 
var rightKey,
	leftKey,
	upKey,
	downKey;


//load necessary assets
function preload(){
	//load player image
	game.load.image('player', 'assets/star.png'); 

	//tilemap in json format
	game.load.tilemap('MyTilemap', 'assets/map-data.json', null, Phaser.Tilemap.TILED_JSON);
	//load image with all tile assets in it
    game.load.image('tiles', 'assets/terrain_atlas.png');

}

function create(){

	//add tilemap to game, using key written when loading
	map = game.add.tilemap('MyTilemap');
 
    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    map.addTilesetImage('tiles', 'tiles');
 
    //create layers
    backgroundLayer = map.createLayer('backgroundLayer');
    pathwayLayer = map.createLayer('pathwayLayer');
    blockedLayer = map.createLayer('blockedLayer');
 
    //collision on blockedLayer (water tiles)
    map.setCollisionBetween(1, 100000, true, 'blockedLayer');
 
    //!!!resizes the game world to match the layer dimensions!!!
    backgroundLayer.resizeWorld();

    createItems(); 

     //create player
	var result = findObjectsByType('playerStart', map, 'objectsLayer');
	console.log("result is: " + result[0].x + ", " + result[0].y); 
	 
	//we know there is just one result
	player = game.add.sprite(result[0].x, result[0].y, 'player');
	game.physics.arcade.enable(player);
	 
	//the camera will follow the player in the world
	game.camera.follow(player);
	 
	//move player with cursor keys
	cursors = game.input.keyboard.createCursorKeys();

	// rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	// leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	// upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	// downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
}

function update(){
	//player movement
   	player.body.velocity.y = 0;
    player.body.velocity.x = 0;
 
    if(cursors.up.isDown) {
      player.body.velocity.y -= 50;
      console.log("player should be moving down"); 
    }
    else if(cursors.down.isDown) {
      player.body.velocity.y += 50;
    }
    if(cursors.left.isDown) {
      player.body.velocity.x -= 50;
    }
    else if(cursors.right.isDown) {
      player.body.velocity.x += 50;
    }

    game.physics.arcade.collide(player, blockedLayer);
	game.physics.arcade.overlap(player, items, collect, null, this);

}

function collect(player, collectable) {
    console.log('yummy!');
 
    //remove sprite
    collectable.destroy();
}

//create all items in object item layer in Tiled
function createItems() {
    //create items
    items = game.add.group();
    items.enableBody = true;
    var item;    
    result = findObjectsByType('item', map, 'objectsLayer');
    result.forEach(function(element){
      createFromTiledObject(element, items);
    }, this);
}

function createFromTiledObject(element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);
 
      //copy all properties to the sprite
      Object.keys(element.properties).forEach(function(key){
        sprite[key] = element.properties[key];
      });
}

function findObjectsByType(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust the y position
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact pixel position as in Tiled
        element.y -= map.tileHeight;
        result.push(element);
      }      
    });
    return result;
}

function render(){
	//game.debug.geom(square,'#0fffff');
}