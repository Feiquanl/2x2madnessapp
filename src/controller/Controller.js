import { globalConfig} from "../configs"

export default function processClick(model, canvas, x, y) {
    console.log ("DO SOMETHING with " + x + "," + y)
    let width = globalConfig.width
    let idxx = rounding(x/width, model.board.size)
    let idxy = rounding(y/width, model.board.size)

    if ((idxx > 0 && idxx < model.board.size) &&
        (idxy > 0 && idxy < model.board.size)) {
            return[idxx, idxy]  // idxy: rowIdx, idxx: columnIdx
    } else {
        return null
    }
    //console.log('idxx: ' + idxx + 'idxy: '+idxy)
    
}

export function getSquareIdxForGroup(group, size){
    let sqIdx = []
    sqIdx.push((group.y-1)*size + group.x -1)
    sqIdx.push((group.y-1)*size + group.x)
    sqIdx.push((group.y)*size + group.x)
    sqIdx.push((group.y)*size + group.x-1)
    return sqIdx
}

export function getOriginalColor(squares, selectedSq){
    let originalColor = []
    let n = selectedSq.length
    let current = []
    for (let idx = 0; idx< n; idx++){
        current = selectedSq[idx]
        //console.log('current: ' + current)
        originalColor.push(squares[current].color)
    }
    return originalColor
}

export function removeGroup(model, group){
    let squares = model.board.squares
    let sqIdx = getSquareIdxForGroup(group, model.board.size)
    for (let idx = 0; idx<sqIdx.length; idx++){
        squares[sqIdx[idx]].color = "white"
    }
    model.board.selected = null
}

export function rounding(x, size) {
    let idx = []
    if(x< 1){
        idx=1
    }else if (Math.round(x) > size -1 && Math.round(x) <= size){
        idx = size-1
    } else {
        idx = Math.round(x)
    }
    console.log('x to rounding: '+ x + ' result:' + idx)
    return idx
}