import { globalConfig} from "../configs"

export default function redrawCanvas(model, canvasObj, appObj) {
    const ctx = canvasObj.getContext('2d');

    // clear the canvas area before rendering the coordinates held in state
    ctx.clearRect( 0,0, canvasObj.width, canvasObj.height);  // assume square region
    let width = globalConfig.width

    // (1) SOMEHOW DRAW BOARD!!!
        for (let idxx=0; idxx< model.board.size; idxx++){
            for (let idxy = 0; idxy < model.board.size; idxy++) {
                drawSquare(ctx, model.board.squares[idxx][idxy], width, 'blue') 
            }
        }

    // (2) DRAW THE SELECTED GROUP IF ANY
    let selected = model.board.selected
    if (selected != null){
        highlightSelcted(ctx, selected, width)
        drawCenterCircle(ctx, (selected.x)*width, (selected.y)*width, 'black', 'red')
   }

//    // NOTHING colored for the stroke
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 1

    // (3) SOMEHOW DRAW CIRCLES!!!
    for (let idx = 1; idx < model.board.size; idx++) {
        for (let idxy= 1; idxy < model.board.size; idxy++) {
            if (selected != null && idx == selected.x && idxy == selected.y){
                // nothing need to be done with selected group here
            }else{
            drawCenterCircle(ctx, idx * width, idxy * width, 'black', 'white')
            }
        }
    }
}

export function drawSquare(ctx, sq, width, strokeColor) {
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 1
    if(sq.color==null){
        ctx.fillStyle = 'white'
    } else{
        ctx.fillStyle = sq.color
    }
    //console.log('(row, column, color): (' + sq.row + ',' + sq.column+ ',' + sq.color + ')')
    ctx.fillRect(sq.column * width, sq.row * width, width, width)
    ctx.rect(sq.column* width, sq.row * width, width, width)
    ctx.strokeRect(sq.column* width, sq.row * width, width, width)
}


export function drawCenterCircle(ctx, x, y, strokeColor, fillColor) {
    ctx.strokeStyle = strokeColor
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.arc(x, y, 10, 0, 2 * Math.PI, false)
    ctx.fillStyle = fillColor
    ctx.fill()
    ctx.stroke();
    //console.log('x: ' + x + "y:" + y)
}

export function highlightSelcted(ctx, group, width) {
    let csq = group.x - 1;
    let rsq = group.y - 1;
    //console.log('csq:' + csq + 'rsq:' + rsq)
    ctx.strokeStyle = 'red'
    ctx.lineWidth = 4
    ctx.rect(csq * 60, rsq * 60, width * 2, width * 2)
    ctx.strokeRect(csq * 60, rsq * 60, width * 2, width * 2)
}