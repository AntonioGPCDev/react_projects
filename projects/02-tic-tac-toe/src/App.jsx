import { useState } from "react"
import confetti from 'canvas-confetti'
import { Square } from "./components/Square.jsx"
import { TURNS } from "./constants.js"
import { checkWinnerFrom, checkEndGame } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"
import { saveGameToStorage, resetGameStorage } from "./logic/storage/index.js"

function App() {

  //Estado del tablero
  const [board, setBoard] = useState(()=> {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  //Estado del turno
  const [turn, setTurn] = useState (()=> {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })

  //Estado del ganador
  const [winner, setWinner] = useState(null)


  const updateBoard = (index) => {
    //no actualizar posición si tiene algo
    if(board[index] || winner) return

    const newBoard = [...board] //Es necesario hacer esto para que al renderizarlo sea un objeto nuevo
    newBoard[index] = turn
    setBoard(newBoard)// actualiza el estado de forma asíncrona

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)// actualiza el estado de forma asíncrona

    //Guardar partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner){ // si hay un ganador
      confetti()
      setWinner(newWinner)// actualiza el estado de forma asíncrona
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }


  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reiniciar</button>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
              <Square 
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                 {board[index]} 
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={ turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={ turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />

      
    </main>
  )
}

export default App
