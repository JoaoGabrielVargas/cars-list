import './App.css'
import Carslist from './components/CarsList/Carslist'
import Sidemenu from './components/Sidemenu/Sidemenu'
import { carsMock } from './mock'

function App() {

  return (
    <div style={{paddingTop: "15px", paddingLeft: "15px"}}>
      <h1>WS Motors - Cars List</h1>
      <main style={{ display: "flex", padding: "15px", gap: "40px" }}>
        <Sidemenu />
        <Carslist carsMock={carsMock} />
      </main>
    </div>
  )
}

export default App
