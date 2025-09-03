import { Outlet } from "react-router"
import Header from "./components/Header"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import ThreadList from "./components/ThreadList"

function App() {

  return (
    <>
      <Header />
      <main>
        <Outlet />
        <ThreadList />
      </main>
      <LoginForm />
      <RegisterForm />
      <ThreadList />
    </>
  )
}

export default App
