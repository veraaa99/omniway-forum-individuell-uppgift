import { Outlet } from "react-router"
import Header from "./components/Header"
import ThreadList from "./components/ThreadList"
import UserForm from "./components/UserForm"

function App() {

  return (
    <>
      <Header />
      <main>
        <Outlet />
        <UserForm />
        <ThreadList />
      </main>
    </>
  )
}

export default App
