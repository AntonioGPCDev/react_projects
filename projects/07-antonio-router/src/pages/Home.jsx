import { Link } from '../Link.jsx'

export default function HomePage () {
    return (
      <>
        <h1>Home</h1>
        <p>Esta es una págiana de ejemplo para crear un React Router desde cero</p>
        <Link to='/about'>Ir a Sobre Nosotros</Link>
      </>
      
    )
  }