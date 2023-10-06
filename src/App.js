import React from 'react';
import './App.css';
import Model from './model/Model.js'
import redrawCanvas from './boundary/Boundary.js';
import processClick from './controller/Controller.js';
import resetHandler, {chooseConfigHandler} from './controller/ResetController.js';
import rotateHandler from './controller/RotateController.js';

function App() {
  const [model, setModel] = React.useState(new Model())
  const [redraw, forceRedraw] = React.useState(0);

  const victoryMessage = 'YAY, YOU WIN!'
  const emptyMessage = ''

  const appRef = React.useRef(null);      // to be able to access "top level" app object
  const canvasRef = React.useRef(null);   // need to be able to refer to Canvas
  const updateMessage = function () {
    let message = model.victory ? victoryMessage : emptyMessage
    return message
  }

  // identify WHAT STATE you monitor
  React.useEffect(() => {
    redrawCanvas(model, canvasRef.current, appRef.current)
  }, [model, redraw])

  const handleClick = (e) => {
    const canvasRect = canvasRef.current.getBoundingClientRect();
    // normalizing RAW point into localized canvas coordinates.
    let x = e.clientX - canvasRect.left
    let y = e.clientY - canvasRect.top
    //console.log('canvas left: '+ canvasRect.left +', top: '+canvasRect.top)
    //console.log(e)

    processClick(model, canvasRef.current, x, y)
    forceRedraw(redraw+1)
  }

  return (
    <div className="App">
      <p className='choose'>Choose Configuration </p>
      <canvas tabIndex="1"
        data-testid="canvas"
        className="App-canvas"
        ref={canvasRef}
        width="400"
        height="400"
        onClick={handleClick}
      />
     
      <div> 
      <button className="reset_button" onClick={(e) => {resetHandler(model, canvasRef.current); forceRedraw(redraw+1)}} >Reset</button>
      </div>
      <div>
      <button className="choose_4x4_button" onClick={(e) => {chooseConfigHandler(model, canvasRef.current, 0); forceRedraw(redraw+1) }} >4x4</button>
      <button className="choose_5x5_button" onClick={(e) => {chooseConfigHandler(model, canvasRef.current, 1); forceRedraw(redraw+1) }} >5x5</button>
      <button className="choose_6x6_button" onClick={(e) => {chooseConfigHandler(model, canvasRef.current, 2); forceRedraw(redraw+1) }} >6x6</button>
      </div>
      <div>
      <button data-testid='clockWiseRotate' className="clockWiseRotate" onClick={(e) => { rotateHandler(model, canvasRef.current, true); forceRedraw(redraw+1) }} >Clockwise</button>
      <button data-testid='counterClockWiseRotate' className="counterClockWiseRotate" onClick={(e) => { rotateHandler(model, canvasRef.current, false); forceRedraw(redraw+1) }} >CounterClockwise</button>
      </div>
      
      <button data-testid="stepCounter" className="stepCounter">Move Counter: {model.board.moveCount} </button>
      <p className="Status">{updateMessage()}</p>
    </div>
  );
}

export default App;