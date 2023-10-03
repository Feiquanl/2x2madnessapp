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

export function getSquareIdxForGroup(group){
    let sqIdxx = [group.x-1, group.x, group.x, group.x-1] //x is column index
    let sqIdxy = [group.y-1, group.y-1, group.y, group.y] //y is row index
    return [sqIdxx, sqIdxy]
}

export function getOriginalColor(squares, group){
    let originalColor = []
    let [idxx, idxy] = getSquareIdxForGroup(group)
    for(let idx=0; idx<idxx.length; idx++){
        originalColor.push(squares[idxy[idx]][idxx[idx]].color)
    }
    return originalColor
}

export function removeGroup(model, group){
    let squares = model.board.squares
    let [idxx, idxy] = getSquareIdxForGroup(group, model.board.size)
    for (let idx = 0; idx<idxx.length; idx++){
        squares[idxy[idx]][idxx[idx]].color = null
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