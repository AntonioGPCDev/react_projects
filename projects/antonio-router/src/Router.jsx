/* eslint-disable react/prop-types */
import { EVENTS } from "./utils/const.js"
import { useState, useEffect, Children } from "react"
import { match } from 'path-to-regexp'
import { getCurrentPath } from "./utils/getCurrentPath.js"

export function Router ({ children, routes = [], defaultComponent: DefaultComponent = () => <h1>Error 404</h1>}) {
  
  const [currentPath, setCurrentPath] = useState(getCurrentPath())

  useEffect (() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath())
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.addEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  let routeParams = {}

  //add routes from children <Route /> components
  const routesFromChildren = Children.map(children, ({ props, type }) => {

    const { name } = type
    const isRoute = name === 'Route'

    return isRoute ? props : null
  })

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

  const Page = routesToUse.find(({path}) => {
    if(path === currentPath) return true

    //se usa path-to-regexp
    //para poder decetar rutas dinámicas como por ejemplo
    // /search/:query
    const matcherUrl = match(path, {decode: decodeURIComponent})
    const matched = matcherUrl(currentPath)
    if(!matched) return false

    // guardar los parámetros de la url que eran dinámicos
    //y que hemos extraído con path-to-regexp
    //Ej: si url es /search/javascript comprueba matched.params.query === 'javascript'
    routeParams = matched.params // {query: 'javascript'} --> /search/javascript
    return true

  })?.Component

  return Page 
    ? <Page routeParams={routeParams} /> 
    : <DefaultComponent routeParams={routeParams} />
}