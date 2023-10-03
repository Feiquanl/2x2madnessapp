import { config_4x4, config_5x5, config_6x6 } from "../configs"
import { getSquareIdxForGroup, getOriginalColor } from "../controller/Controller"

export class Group {
    constructor (x, y){
        // these are the x and y index of each group
        this.x = x // column index
        this.y = y  // row index
    }
}

export class Square {
    constructor (r, c, color) {
        this.row = r
        this.column = c
        this.color = color
    }
}

export class Board {
    constructor (config) {
        this.squares = []
        this.size = parseInt(config.numColumns)
        this.selected = null
        this.moveCount = 0

        this.squares = Array.from(Array(this.size), () => new Array(this.size));
        for (let idxx=0; idxx< this.size; idxx++){
            for (let idxy = 0; idxy < this.size; idxy++) {
                this.squares[idxx][idxy] = new Square(idxx, idxy, null) // initialize to empty square
            }
        }

        for (let csq of config.baseSquares) {
            //  { "color" : "green", "row": "0", "column" : "0" },
            let sq = new Square(parseInt(csq.row), parseInt(csq.column), csq.color)
            this.squares[csq.row][csq.column].color = csq.color
        } 
    }

    selectGroup(idxx, idxy){
        this.selected = new Group(idxx, idxy)
    }

    isAllSameColor(group){
        let squares = this.squares;
        let colors = getOriginalColor(squares, group)
        const allEqual = arr => arr.every(val => val === arr[0]);
        let match = allEqual(colors)
        //console.log('color match? :' + match)
        return match
    }

    isEmpty(group) {
        let squares = this.squares;
        let colors = getOriginalColor(squares, group)
        const allEmpty = arr => arr.every(val => val === null);
        let isempty = allEmpty(colors)
        //console.log('group isEmpty? :' + isempty)
        return isempty
    }
    
    isSolved(){
        let squares = this.squares
        let size = this.size
        //console.log('checking if it is solved:')
        //let sq = []
        for (let idxx =0; idxx<size; idxx++){
            for (let idxy = 0; idxy< size; idxy++) {
                if (squares[idxy][idxx].color != null){
                    //sq = squares[idxy][idxx]
                    //console.log('No, not yet!')
                    //console.log('working with ('+idxy+',' + idxx+')')
                    //console.log('square: (' + sq.row + ','+sq.column+',' +sq.color+')')
                    return false
                }
            }
        }
        //console.log('Yes, it is solved!')
        return true
    }
}

export default class Model {
    constructor() {
        this.configs = [config_4x4, config_5x5, config_6x6]
        this.currentConfig = 0;
        this.board = new Board(this.configs[this.currentConfig])
        this.victory = false
    }

    chooseConfiguration(idx){
        idx = idx % this.configs.length
        this.currentConfig = idx
    }

    resetBoard(){
        this.board = new Board(this.configs[this.currentConfig])
    }
}