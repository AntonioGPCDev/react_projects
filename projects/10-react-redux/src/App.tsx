import './App.css'
import { ListOfUsers } from "./components/ListOfUsers.tsx"
import { CreateNewUser } from './components/CreateNewUser.tsx'
import { Toaster } from 'sonner'

function App() {

  return (
    <>
      <ListOfUsers />
      <CreateNewUser />
      <Toaster richColors />
    /</>
  )
}

export default App
