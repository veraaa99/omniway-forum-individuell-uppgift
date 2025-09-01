import ThreadList from "./components/ThreadList"
import { dummyThreads } from "./data/threads"

function App() {

  return (
    <>
      <h1 className="text-orange-600 text-center p-4">Omniway</h1>

      <ThreadList threads={dummyThreads} />
    </>
  )
}

export default App
