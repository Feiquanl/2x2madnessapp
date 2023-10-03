import React from 'react';
import './App.css';
import Model, { Group } from './model/Model.js'
import redrawCanvas from './boundary/Boundary.js';
import processClick, { isGroupRemovable, removeGroup } from './controller/Controller.js';
import resetHandler, {chooseConfigHandler} from './controller/ResetController.js';
import rotateHandler from './controller/RotateController.js';

function App() {
  const [model, setModel] = React.useState(new Model())
  const [redraw, forceRedraw] = React.useState(0);
  const [steps, setStep] = React.useState(0);
  const [statusMessage, updateMessage] = React.useState();

  const updateStep = () => {
    setStep(steps + 1)
  }

  const resetTextDisplay = () => {
    setStep(0)
    updateMessage()
  }

  const appRef = React.useRef(null);      // to be able to access "top level" app object
  const canvasRef = React.useRef(null);   // need to be able to refer to Canvas

  // identify WHAT STATE you monitor
  React.useEffect(() => {
    redrawCanvas(model, canvasRef.current, appRef.current)
    forceRedraw(0)
  }, [model, redraw])

  const handleClick = (e) => {
    const canvasRect = canvasRef.current.getBoundingClientRect();

    // normalizing RAW point into localized canvas coordinates.
    let x = e.clientX - canvasRect.left
    let y = e.clientY - canvasRect.top

    let groupIdx = processClick(model, canvasRef.current, x, y)
    if (groupIdx != null) {
      let group = new Group(groupIdx[0], groupIdx[1])
      //console.log('group: (' + group.x + ',' + group.y + ')')

      if (model.board.isEmpty(group)) {
        model.board.selected = null
      } else if (model.board.isAllSameColor(group)) {
        removeGroup(model, group)
        updateStep()
        if (model.board.isSolved()) {
          console.log('Yay, solved!')
          updateMessage('Yay, you solved it!')
        }
      } else {
        model.board.selected = group
      }
      forceRedraw(1)
    }
  }

  return (
    <div className="App">
      This is <canvas tabIndex="1"
        className="App-canvas"
        ref={canvasRef}
        width="400"
        height="400"
        onClick={handleClick}
      />

      <button className="reset_button" onClick={(e) => {resetHandler(model, canvasRef.current); forceRedraw(1); resetTextDisplay()}} >Reset</button>
      <button className="choose_4x4_button" onClick={(e) => {chooseConfigHandler(model, canvasRef.current, 0); forceRedraw(1); resetTextDisplay()}} >4x4</button>
      <button className="choose_5x5_button" onClick={(e) => {chooseConfigHandler(model, canvasRef.current, 1); forceRedraw(1); resetTextDisplay()}} >5x5</button>
      <button className="choose_6x6_button" onClick={(e) => {chooseConfigHandler(model, canvasRef.current, 2); forceRedraw(1); resetTextDisplay()}} >6x6</button>
      <button className="clockWiseRotate" onClick={(e) => { rotateHandler(model, canvasRef.current, true, updateStep); forceRedraw(1) }} >Clockwise</button>
      <button className="counterClockWiseRotate" onClick={(e) => { rotateHandler(model, canvasRef.current, false, updateStep); forceRedraw(1) }} >CounterClockwise</button>
      <button className="stepCounter">steps used: {steps} </button>
      <p className="Status">{statusMessage}</p>
    </div>
  );
}

export default App;