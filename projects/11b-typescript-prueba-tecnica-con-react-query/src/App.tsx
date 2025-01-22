import { useState, useMemo } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { SortBy, type User } from './types.d'
import { useUsers } from './hooks/useUsers'
import { Results } from './components/Results'


function App() {

  const { isLoading, isError, users, refetch, fetchNextPage, hasNextPage } = useUsers()

  const [ showColors, setShowColors ] = useState(false)
  const [ sorting, setSorting ] = useState<SortBy>(SortBy.NONE)
  const [ filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toogleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleReset = async() => {
    await refetch()
  }

  const handleDelete = (email: string) => {
    //const filteredUsers = users.filter((user) => user.email !== email)
    //setUsers(filteredUsers)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  const filteredUsers = useMemo(() => {
    console.log('calculate filteredUsers')
    return filterCountry != null && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const sortedUsers = useMemo(() => {
    console.log('calculate sortedUsers')

    if(sorting === SortBy.NONE) return filteredUsers

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [users, sorting])
  
  return (
    <>
      <h1>Prueba Técnica React + TS</h1>
      <Results />
      <header>
        <button type="button" onClick={toggleColors}>
          Colorear filas
        </button>

        <button type="button" onClick={toogleSortByCountry}>
          {sorting === SortBy.COUNTRY ? 'No ordenar país' : 'Ordenar por país'}
        </button>

        <button type="button" onClick={handleReset}>
          Resetear al estado
        </button>

        <input placeholder='Filtra por país' onChange = {(e) =>{
          setFilterCountry(e.target.value)
        }}/>
      </header>
      <main>

        {users.length > 0 && 
          <UsersList changeSorting={handleChangeSort} deleteUser={handleDelete} 
            showColors={showColors} users={sortedUsers} />}

        {isLoading && <p>Caragando...</p>}

        {isError && <p>Ha habido un error</p>}

        {!isLoading && !isError && users.length===0 && <p>No hay usuarios</p>}
        
        {!isLoading && ! isError && hasNextPage === true && <button type="button" onClick={()=>fetchNextPage()}>Cargar más resultados</button>}
        
        {!isLoading && ! isError && hasNextPage === false && <p>No hay más resultados</p>}
      </main>
      
    </>
  )
}

export default App
