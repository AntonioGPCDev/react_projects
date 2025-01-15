/* eslint-disable react/prop-types */
import { Link } from '../Link.jsx'

const i18n ={
    es: {
        title: 'Sobre nosotros',
        button: 'Ir al inicio',
        description: '¡Hola! Me llamo Antonio y estoy creando un clon de React Router'
    },
    en: {
        title:'About us',
        button: 'Go home',
        description: 'Hello! My name is Antonio and I am creating a React Router clone.'
    }
}

const useI18n = (lang) => {
    return i18n[lang] || i18n.en
}

export default function AboutPage ( { routeParams }) {

    const i18n = useI18n(routeParams.lang ?? 'es')

    return (
      <>
        <h1>{i18n.title}</h1>
        <div>
          <img src='https://avatars.githubusercontent.com/u/194132028?s=400&u=ba9ce724bf22ea601e503ec8a46cd0df54f5ba8e&v=4'
            alt= 'Foto de Antonio'/>
        </div>
        <p>{i18n.description}</p>
        <Link to='/'>{i18n.button}</Link>
      </>
    )
}