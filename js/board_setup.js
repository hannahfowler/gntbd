function prepareBoard() {

    var piecesIndex = 0;

    // BOARD_COLS = Math.floor(PUZZLE_WIDTH / PIECE_WIDTH); //3 = 600 / 200
    // BOARD_ROWS = Math.floor(PUZZLE_HEIGHT / PIECE_HEIGHT); //3 = 600 / 200
    var coords = new Array(BOARD_COLS);
    for(var i =0; i < BOARD_ROWS; i++){
        coords[i] = new Array(BOARD_ROWS);
    }
    totalPieces = BOARD_COLS * BOARD_ROWS; // 9 = 3 x 3

    piecesGroup = game.add.group();
    //selectPiecesGroup = game.add.group();

    var moveBoard = (PUZZLE_WIDTH/PIECE_WIDTH/2)*PIECE_WIDTH;
    console.log("THE MOVEBOARD IS : " + moveBoard);
    // piecesGroup.x += moveBoard + PIECE_WIDTH/2;
    // piecesGroup.y += moveBoard;
    // selectPiecesGroup.x +=moveBoard + PIECE_WIDTH/2;
    // selectPiecesGroup.y += moveBoard;

    console.log("Game position at (" + game.x + ", " + game.y + ")"); 

    console.log("Pieces group position x: " + piecesGroup.x); 
    console.log("Pieces group position y: " + piecesGroup.y); 

    for (i = 0; i < BOARD_ROWS; i++)
    {
        for (j = 0; j < BOARD_COLS; j++)
        {

            piece = piecesGroup.create(j * PIECE_WIDTH, i * PIECE_HEIGHT, "puzzle", piecesIndex);
            piecesGroup.add(piece);  
            piece.inputEnabled = true;
            piece.id = piecesIndex;
            piece.currentCords = [i,j];
            //piece.type = pieceTypeMap[piecesIndex];
            piece.selected = false; 
            //piece.events.onInputDown.add(selectPiece, this);
            //piece.anchor.set(0.5); //set anchor so tile rotates around center

            //setExitsByType(piece, piece.type); //set piece exit booleans based on type of tile
            piecesIndex++;
        }
    }
}

function placePlayer(){
    //square = new Phaser.Rectangle(75, 75, 50, 50);
    //character = game.add.sprite(50, 50, 'character'); 
}



