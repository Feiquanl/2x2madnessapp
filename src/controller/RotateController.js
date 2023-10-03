import { getSuggestedQuery } from "@testing-library/react";
import { getSquareIdxForGroup, getOriginalColor } from "./Controller";

export default function rotateHandler(model, canvasObj, direction, setStep) {
    console.log ("try to rotate")
    let selected = model.board.selected;
    if (selected != null){
        //console.log('Selected group:(' + selected.x + ',' + selected.y + ')')
        let selectedSq= getSquareIdxForGroup(selected, model.board.size)
        console.log('selected squares:' + selectedSq)
        rotateColor(model.board.squares, selectedSq, direction)
        setStep();
    }
}

export function rotateColor(squares, selectedSq, direction){
    // if rotate clockwise, the shift shold be -1, otherwise, it's the other direction
    let shift = direction? -1: 1;
    let n = selectedSq.length;
    let originalColor = getOriginalColor(squares, selectedSq)
    let current=[]
    let nextInSelectedSq  = []
    //let next  = []
    // store the original color
    console.log('original colors: ' + originalColor)


    for(let idx=0; idx<n; idx++){
        current = selectedSq[idx]
        nextInSelectedSq = (idx + shift + n) % n
        //next = selectedSq[nextInSelectedSq]
        //console.log('current:' +current +'next:'+next)
        //console.log('before: current square:(x,y, color)' + squares[current].row + 
        //      ',' + squares[current].column +',' +squares[current].color)
        squares[current].color = originalColor[nextInSelectedSq]
        //console.log('after: current square:(x,y, color)' + squares[current].row + 
        //      ',' + squares[current].column +',' +squares[current].color)
    }
}