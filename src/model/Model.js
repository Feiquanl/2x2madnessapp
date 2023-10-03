import { config_4x4, config_5x5, config_6x6 } from "../configs"
import { getSquareIdxForGroup, getOriginalColor } from "../controller/Controller"

export class Group {
    constructor (x, y){
        // these are the x and y index of each group
        this.x = x
        this.y = y
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
        //console.log(this.selected)
        
        for (let csq of config.baseSquares) {
            //  { "color" : "green", "row": "0", "column" : "0" },
            let sq = new Square(parseInt(csq.row), parseInt(csq.column), csq.color)
            this.squares.push(sq)
        } 
         
    }

    isAllSameColor(group){
        let squares = this.squares;
        let sqIdx = getSquareIdxForGroup(group, this.size)
        let colors = getOriginalColor(squares, sqIdx)
        const allEqual = arr => arr.every(val => val === arr[0]);
        let match = allEqual(colors)
        console.log('color match? :' + match)
        return match
    }

    isEmpty(group) {
        let squares = this.squares;
        let sqIdx = getSquareIdxForGroup(group, this.size)
        let colors = getOriginalColor(squares, sqIdx)
        const allWhite = arr => arr.every(val => val === 'white');
        let isempty = allWhite(colors)
        console.log('group isEmpty? :' + isempty)
        return isempty
    }
    
    isSolved(){
        let squares = this.squares;
        let colors = []
        for (let idx =0; idx<squares.length; idx++){
            colors.push(squares[idx].color)
        }
        const allWhite = arr => arr.every(val => val === 'white');
        let solved = allWhite(colors)
        //console.log('Yay, solved!')
        return solved
    }
}

export default class Model {
    constructor() {
        this.configs = [config_4x4, config_5x5, config_6x6]
        this.currentConfig = 0;
        this.board = new Board(this.configs[this.currentConfig])
    }

    chooseConfiguration(idx){
        idx = idx % this.configs.length
        this.currentConfig = idx
    }

    resetBoard(){
        this.board = new Board(this.configs[this.currentConfig])
    }
}