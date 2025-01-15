/* eslint-disable react/prop-types */
import { useEffect } from "react"

export default function SearchPage ({routeParams}){

    useEffect(() => {
        document.title = `Has buscado ${routeParams.query}`

        //Aquí se pude hacer un fetch con los parámetros por ejemplo
    }, [])

    return (
        <h1>Has buscado {routeParams.query}</h1>
    )
}