import { useState } from "react";
import React from 'react'
import { fillWithBombs, NUM_ROWS, NUM_COLUMNS, NUM_BOMBS, BOMB, fillNeighbors } from "./bombFunctions"



export default function BoardGame() {

    const [Originalgrid, setGrid] = useState();
    const [uiGrid, setUiGrid] = useState();
    const [loosed, setLoosed] = useState(false)
    const [playing, setPlaying] = useState(false)
    const [score, setScore] = useState(0)

    function readNeighbours(x, y) {
        let pl = []
        try {
            if ((x > 0) && (y > 0) && (Originalgrid[y - 1][x - 1] !== BOMB)) {
                setUiGrid((currVal) => {
                    let newUi = [...currVal];
                    newUi[y - 1][x - 1] = "Shown";
                    return newUi;
                });
            }
            if ((x > 0) && Originalgrid[y - 1][x] !== BOMB) {
                setUiGrid((currVal) => {
                    let newUi = [...currVal];
                    newUi[y - 1][x] = "Shown";
                    return newUi;
                });
            }
            if ((x > 0) && (y < NUM_COLUMNS) && Originalgrid[y - 1][x + 1] !== BOMB) {
                setUiGrid((currVal) => {
                    let newUi = [...currVal];
                    newUi[y - 1][x + 1] = "Shown";
                    return newUi;
                });
            }
            if ((y > 0) && Originalgrid[y][x - 1] !== BOMB) {
                setUiGrid((currVal) => {
                    let newUi = [...currVal];
                    newUi[y][x - 1] = "Shown";
                    return newUi;
                });
            }
            if ((y < NUM_COLUMNS) && Originalgrid[y][x + 1] !== BOMB) {
                setUiGrid((currVal) => {
                    let newUi = [...currVal];
                    newUi[y][x + 1] = "Shown";
                    return newUi;
                });
            }
            if ((x < NUM_ROWS) && (y > 0) && Originalgrid[y + 1][x - 1] !== BOMB) {
                setUiGrid((currVal) => {
                    let newUi = [...currVal];
                    newUi[y + 1][x - 1] = "Shown";
                    return newUi;
                });
            }
            if ((x < NUM_ROWS) && Originalgrid[y + 1][x] !== BOMB) {
                setUiGrid((currVal) => {
                    let newUi = [...currVal];
                    newUi[y + 1][x] = "Shown";
                    return newUi;
                });
            }
            if ((x < NUM_ROWS) && (y < NUM_COLUMNS) && Originalgrid[y + 1][x + 1] !== BOMB) {
                setUiGrid((currVal) => {
                    let newUi = [...currVal];
                    newUi[y + 1][x + 1] = "Shown";
                    return newUi;
                });
            }
        } catch (e) {
            console.error(`EXCEPTION happened!`, e);
        }
        return pl;
    }

    function checkBlock(y, x) {
        //let theBlock = Originalgrid[y][x]
        try {
            let theBlock = Originalgrid[y][x]
            console.log(theBlock)
            if (theBlock !== BOMB) {
                setUiGrid((currVal) => {
                    let newUi = [...currVal];
                    newUi[y][x] = "Shown";
                    return newUi;
                });
                setScore((currVal) => {
                    let newScore = currVal + 1
                    return newScore;
                });
            }
            if (theBlock === 0) {
                console.log(y, x - 1);
                console.log(y, y + 1);
                console.log(y - 1, x);
                console.log(y - 1, x - 1);
                console.log(y - 1, x + 1);
                console.log(y + 1, x - 1);
                console.log(x + 1, y + 1);
                checkBlock(y, x - 1);
                checkBlock(y, x + 1);
                //checkBlock(y, y + 1);
                // checkBlock(y - 1, x);
                // checkBlock(y - 1, x - 1);
                // checkBlock(y - 1, x + 1);
                // checkBlock(y + 1, x - 1);
                // checkBlock(x + 1, y + 1);
            }
        } catch {
            console.log("I CANT!")
        }
        // if (theBlock){
        //     console.log(theBlock)
        //     if (theBlock !== BOMB) {
        //         setUiGrid((currVal) => {
        //             let newUi = [...currVal];
        //             newUi[y][x] = "Shown";
        //             return newUi;
        //         });
        //         setScore((currVal) => {
        //             let newScore = currVal + 1
        //             return newScore;
        //         });
        //         if (theBlock === 0) {
        //             console.log('0!')
        //             checkBlock(y, x-1);
        //             checkBlock(y, y+1);
        //             checkBlock(y-1, x);
        //             checkBlock(y-1, x-1);
        //             checkBlock(y-1, x+1);
        //             checkBlock(y+1, x-1);
        //             checkBlock(x+1, y+1);
        //         }
        //     } else {
        //         setLoosed(true)
        //     }
        // }
    }



    function startFunc() {
        console.log("starting...")
        let newGrid = fillWithBombs(NUM_BOMBS);
        setGrid(newGrid);
        setUiGrid(
            Array.from(Array(NUM_ROWS), () =>
                Array.from(Array(NUM_COLUMNS), () => 'hidden')
            )
        );
        setPlaying(true)
        //console.log("the grid: ")
        //console.table(newGrid)
    }

    function restartFunc() {
        setPlaying(false)
        setLoosed(false)
        setScore(0)
        //window.location.reload(false);
        //console.log("restarting...")
        startFunc()
    }

    if (playing) {
        if (!loosed) {
            return (
                <div>
                    <h1>Score: {score}</h1>
                    <table>
                        <tbody>
                            {
                                Originalgrid.map((ele, rowIndex) => { //here
                                    return (
                                        <tr key={`row-${rowIndex}`} >
                                            {
                                                ele.map((ele2, colIndex) => {
                                                    let x = colIndex
                                                    let y = rowIndex
                                                    return (<td key={`col-${colIndex}`} onClick={(e) => checkBlock(y, x)}>{uiGrid[y][x] === "hidden" ? <div>{" "}</div> : <h3>{Originalgrid[y][x]}</h3>}</td>)
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (
                <div>
                    <table>

                        <tbody>
                            {
                                Originalgrid.map((ele, rowIndex) => { //here
                                    return (
                                        <tr key={`row-${rowIndex}`} >
                                            {
                                                ele.map((ele2, colIndex) => {
                                                    let x = colIndex
                                                    let y = rowIndex
                                                    return (<td key={`col-${colIndex}`}><h3>{ele2}</h3></td>)
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <h4>You Lost. <br></br> Your score: {score}</h4>
                    <button onClick={(e) => restartFunc()} className={"btn-restart"}>Restart</button>
                </div>
            )
        }
    } else {
        return (
            <div>
                <button onClick={(e) => startFunc()} className={"btn"}>Start</button>

            </div>
        )
    }
}

//last