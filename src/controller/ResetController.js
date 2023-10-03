
export default function resetHandler(model, canvasObj) {
    //console.log ("IN RESET")
    model.resetBoard()
    model.victory = false
}

export function chooseConfigHandler(model, canvasObj, configIdx) {
    //console.log ("IN CHOOSE CONFIG")
    model.chooseConfiguration(configIdx)
    model.victory = false
    model.resetBoard()
}