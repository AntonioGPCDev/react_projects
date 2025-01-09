import {  useEffect, useState } from 'react'

const FollowMouse = () => {
  const[enabled, setEnabled] = useState(false)
  const[position, setPosition] = useState({x: 0, y: 0})

  //pointer move
  useEffect(() => {
    console.log('effect', {enabled})

    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({x: clientX, y: clientY})
    }

    if(enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    //cleanup
    // --> cuando el componente se desmonta
    // --> cuando cambian las dependencias, antes de ejecutar
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])
  
  //change body classname
  useEffect(()=>{
    document.body.classList.toggle('no-cursor', enabled)

    return() => { //cleanup method
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  return(
    <>
    <div style={{
      position:'absolute',
      backgroundColor: '#09f',
      borderRadius: '50%',
      opacity: 0.7,
      pointerEvents: 'none',
      left: -25,
      top: -25,
      width: 40,
      height: 40,
      transform: `translate(${position.x}px, ${position.y}px)`,
    }}
    />

    <button onClick={() => setEnabled(!enabled)}>
      {enabled? 'Desactivar': 'Activar' } seguir puntero
    </button>
    </>
  )
}

function App() {

  return (
    <main>
      <FollowMouse/>
    </main>
    
  )
}

export default App
