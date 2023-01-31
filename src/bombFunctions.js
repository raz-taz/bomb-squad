export const NUM_ROWS = 9;
export const NUM_COLUMNS = 9;
export const NUM_BOMBS = 10;
export const BOMB = "💣"



function countNeighborBombs(x, y, pl) {
    let bombsFound = 0
    try{
        if ((x > 0) && (y > 0) && (pl[x - 1][y - 1] === BOMB)) {
            bombsFound++
        }
        if ((x > 0) && pl[x - 1][y] === BOMB) {
            bombsFound++
        }
        if ((x > 0) && (y < NUM_COLUMNS) && pl[x - 1][y + 1] === BOMB) {
            bombsFound++
        }
        if ((y > 0) && pl[x][y - 1] === BOMB) {
            bombsFound++
        }
        if ((y < NUM_COLUMNS) && pl[x][y + 1] === BOMB) {
            bombsFound++
        }
        if ((x < NUM_ROWS) && (y > 0) &&  pl[x + 1][y - 1] === BOMB) {
            bombsFound++
        }
        if ((x < NUM_ROWS) && pl[x + 1][y] === BOMB) {
            bombsFound++
        }
        if ((x < NUM_ROWS) && (y < NUM_COLUMNS) &&  pl[x + 1][y + 1] === BOMB) {
            bombsFound++
        }
    }catch(e){
      console.error(`EXCEPTION happened!`, e);
    }
    return (bombsFound)
}


export let fillNeighbors = (playingField) => {
    for (let i = 0; i < NUM_ROWS; i++) {
        for (let j = 0; j < NUM_COLUMNS; j++) {
            if (playingField[i][j] !== BOMB) {
                playingField[i][j] = countNeighborBombs(i, j, playingField);
            }
        }
    }
    return (playingField)
}


export let fillWithBombs = (numberOfBombs) => {
    const initialArray = Array.from(Array(NUM_ROWS), () => Array.from(Array(NUM_COLUMNS), () => null))
    let loopCount = 0
    let bombsToSet = numberOfBombs;
    do {
        let randX = Math.floor(Math.random() * NUM_ROWS);
        let randY = Math.floor(Math.random() * NUM_COLUMNS);
        if (initialArray[randX][randY] === null) {
            initialArray[randX][randY] = BOMB;
            bombsToSet -= 1;
        }
        loopCount++
    } while (loopCount < 100 && bombsToSet > 0)

    let arr = fillNeighbors(initialArray);

    return arr;
}