import Model, {Group} from './model/Model.js'
import processClick from './controller/Controller.js';
import rotateHandler from './controller/RotateController.js';
import resetHandler from './controller/ResetController.js'; //import for calculating coverage purpose
import redrawCanvas from './boundary/Boundary.js'; //import fr calculating coveage purpose
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('validate config is default one', () => {

  let m = new Model()
  expect(m.currentConfig).toEqual(0)
});

test('validate chooseConfiguration', () =>{
  let m = new Model()
  m.chooseConfiguration(1)
  expect(m.currentConfig).toEqual(1)
});

test('validate reset', () =>{
  let m = new Model()
  let origBoard = m.board
  m.resetBoard()
  expect(m.board).not.toBe(origBoard)
  
});

test('not solved by default', () =>{
  let m = new Model()
  expect(m.board.isSolved()).toEqual(false)

});

test('isSolved pass case', () =>{
  let m = new Model()
  for (let idxy = 0; idxy < m.board.size; idxy++) {
    for (let idxx = 0; idxx < m.board.size; idxx++) {
      m.board.squares[idxy][idxx].color = null
    }
  }
  expect(m.board.isSolved()).toEqual(true)
});



test('allSameColor false by default', () =>{
  let m = new Model()
  m.board.selectGroup(1, 1)
  expect(m.board.isAllSameColor(m.board.selected)).toEqual(false)
});

test('allSameColor pass case', () =>{
  let m = new Model()
  m.board.selectGroup(1, 1)
  m.board.squares[0][0].color='grey'
  m.board.squares[0][1].color='grey'
  m.board.squares[1][0].color='grey'
  m.board.squares[1][1].color='grey'
  expect(m.board.isAllSameColor(m.board.selected)).toEqual(true)
});


test('isEmpty false by default', () =>{
  let m = new Model()
  m.board.selectGroup(1, 1)
  expect(m.board.isEmpty(m.board.selected)).toEqual(false)
});

test('isEmpty pass case', () =>{
  let m = new Model()
  m.board.selectGroup(1, 1)
  m.board.squares[0][0].color=null
  m.board.squares[0][1].color=null
  m.board.squares[1][0].color=null
  m.board.squares[1][1].color=null
  expect(m.board.isAllSameColor(m.board.selected)).toEqual(true)
});

// test for controller

test('test for processClick', ()=>{
  let m = new Model()
  let canvas = []
  processClick(m, canvas, 50, 50)
  expect(m.board.selected).toEqual(new Group(1, 1))
});

test('test remove through processClick', ()=>{
  let m = new Model()
  m.board.squares[0][0].color='grey'
  m.board.squares[0][1].color='grey'
  m.board.squares[1][0].color='grey'
  m.board.squares[1][1].color='grey'

  let canvas = []
  processClick(m, canvas, 50, 50)
  expect(m.board.selected).toEqual(null)
  expect(m.board.isEmpty(new Group(1, 1))).toEqual(true)
});

// test for RotateController
test('test color clockWise rotate with empty', ()=>{
  let m = new Model()
  let squares = m.board.squares
  let moveCount = m.board.moveCount
  squares[0][0].color='red'
  squares[0][1].color= null
  squares[1][1].color='yellow'
  squares[1][0].color='grey'
  m.board.selectGroup(1, 1)


  let canvas = []
  rotateHandler(m, canvas, true)
  expect(squares[0][0].color).toEqual('grey')
  expect(squares[0][1].color).toEqual('red')
  expect(squares[1][1].color).toEqual(null)
  expect(squares[1][0].color).toEqual('yellow')
  expect(m.board.moveCount).toEqual(moveCount +1)
});

test('test color counterClockWise rotate wit null', ()=>{
  let m = new Model()
  let squares = m.board.squares
  let moveCount = m.board.moveCount
  squares[0][0].color='red'
  squares[0][1].color=null
  squares[1][1].color='yellow'
  squares[1][0].color=null
  m.board.selectGroup(1, 1)


  let canvas = []
  rotateHandler(m, canvas, false)
  expect(squares[0][0].color).toEqual(null)
  expect(squares[0][1].color).toEqual('yellow')
  expect(squares[1][1].color).toEqual(null)
  expect(squares[1][0].color).toEqual('red')
  expect(m.board.moveCount).toEqual(moveCount +1)
});



// test directly from the app
test('mimic choose configuration', () => {
  const { getByText } = render(<App />);
  const configuration_5x5_Element = getByText(/4x4/i);
  expect(configuration_5x5_Element).toBeInTheDocument();

  // must call 'npm install canvas'
  const canvasElement = screen.getByTestId('canvas');
  fireEvent.click(configuration_5x5_Element);
});

test('mimic choose configuration', () => {
  const { getByText } = render(<App />);
  const configuration_5x5_Element = getByText(/5x5/i);
  expect(configuration_5x5_Element).toBeInTheDocument();

  // must call 'npm install canvas'
  const canvasElement = screen.getByTestId('canvas');
  fireEvent.click(configuration_5x5_Element);
});

// test directly from the app
test('mimic choose configuration', () => {
  const { getByText } = render(<App />);
  const configuration_5x5_Element = getByText(/6x6/i);
  expect(configuration_5x5_Element).toBeInTheDocument();

  // must call 'npm install canvas'
  const canvasElement = screen.getByTestId('canvas');
  fireEvent.click(configuration_5x5_Element);
});

test('mimic reset', () => {
  const { getByText } = render(<App />);
  const resetElement = getByText(/Reset/i);
  expect(resetElement).toBeInTheDocument();

  // must call 'npm install canvas'
  fireEvent.click(resetElement);
});


test('mimic rotate', () => {
  const { getByText } = render(<App />);
  const moveCountElement = screen.getByTestId('stepCounter')
  expect(moveCountElement).toBeInTheDocument();
  expect(moveCountElement).toHaveTextContent('Move Counter: 0')

  const clockwiseRotateElement= screen.getByTestId('clockWiseRotate')
  expect(clockwiseRotateElement).toBeInTheDocument();

  const counterClockwiseRotateElement= screen.getByTestId('counterClockWiseRotate')
  expect(counterClockwiseRotateElement).toBeInTheDocument();

  // must call 'npm install canvas'
  const canvasElement = screen.getByTestId('canvas');
  fireEvent.click(canvasElement, { clientX: 91, clientY: 146, screenX: 91, screenY: 255})

  fireEvent.click(clockwiseRotateElement)
  expect(moveCountElement).toHaveTextContent('Move Counter: 1')

  fireEvent.click(counterClockwiseRotateElement)
  expect(moveCountElement).toHaveTextContent('Move Counter: 2')
});

