import { getSuggestedQuery } from "@testing-library/react";
import { getSquareIdxForGroup, getOriginalColor } from "./Controller";

export default function rotateHandler(model, canvasObj, direction, setStep) {
    console.log ("try to rotate")
    let selected = model.board.selected;
    if (selected != null){
        //console.log('Selected group:(' + selected.x + ',' + selected.y + ')')
        rotateColor(model.board.squares, selected, direction)
        setStep();
    }
}

export function rotateColor(squares, selected, direction){
    // if rotate clockwise, the shift shold be -1, otherwise, it's the other direction
    let shift = direction? -1: 1;
    let [idxx, idxy] = getSquareIdxForGroup(selected)
    let originalColor = getOriginalColor(squares, selected) // store the original color
    let n = originalColor.length
    let nextColorIdx=[]
    console.log('original colors: ' + originalColor)

    for(let idx=0; idx<idxx.length; idx++){
        nextColorIdx = (idx + shift + n) % n
        squares[idxy[idx]][idxx[idx]].color = originalColor[nextColorIdx]
    }
}