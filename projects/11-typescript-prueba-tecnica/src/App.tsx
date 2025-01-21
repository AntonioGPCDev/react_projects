import { useState, useEffect, useRef, useMemo } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { SortBy, type User } from './types.d'

function App() {

  const [ users, setUsers ] = useState<User[]>([])
  const [ showColors, setShowColors ] = useState(false)
  const [ sorting, setSorting ] = useState<SortBy>(SortBy.NONE)
  const [ filterCountry, setFilterCountry] = useState<string | null>(null)

  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toogleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  useEffect (() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
        originalUsers.current = res.results
      })
      .catch(err =>{
        console.error(err)
      })
  }, [])

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

  //const filteredUsers = filterCountry !== null && filterCountry.length > 0
  //  ? users.filter((user => {
  //    return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
  //  }))
  //  : users

  //const sortedUsers = sortByCountry 
  //  ? filteredUsers.toSorted((a,b) => {
  //    return a.location.country.localeCompare(b.location.country)
  //  }) 
  //  : filteredUsers

  
  return (
    <>
      <h1>Prueba Técnica React + TS</h1>
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
      <UsersList changeSorting={handleChangeSort} deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
      </main>
      
    </>
  )
}

export default App
