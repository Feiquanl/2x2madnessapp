
export default function resetHandler(model, canvasObj) {
    //console.log ("IN RESET")
    model.resetBoard();
}

export function chooseConfigHandler(model, canvasObj, configIdx) {
    //console.log ("IN CHOOSE CONFIG")
    model.chooseConfiguration(configIdx)
    model.resetBoard();
}