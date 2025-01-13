import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search, sort }) {

  const [ movies, setMovies] = useState([])
  const [ loading, setLoading ] = useState(false)
  // el error no se usa:
  const [, setError] = useState(null)
  const previousSearch = useRef(search)


  //useCallback usa por debajo el useMemo
  const getMovies = useCallback(async ({search}) => {
      if(search === previousSearch.current) return //search es ''

      try{
        setLoading(true)
        setError(null)
        previousSearch.current = search
        const newMovies = await searchMovies({ search })
        setMovies(newMovies)
      }
      catch (e) {
        setError(e.message)
      }
      finally{
        //se ejecuta en el try y en el catch
        setLoading(false)
      }

  }, [])
  
  //Se utiliza para que no vuelva a calcular toda la ordenación en este caso
  //Realmente se utiliza para guardar acciones ya realizadas
  const sortedMovies = useMemo(() => {
    if (!movies) return;
    
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
    
  }, [sort, movies])

  return { movies: sortedMovies, getMovies, loading }
}