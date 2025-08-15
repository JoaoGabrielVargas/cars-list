import { useCallback, useEffect, useState } from 'react'
import './App.css'
import Carslist from './components/CarsList/Carslist'
import Sidemenu from './components/Sidemenu/Sidemenu'

const API_URL = 'http://localhost:5000'

function App() {
  const [carsList, setCarsList] = useState([])
  const [error, setError] = useState(null);

  const fetchCars = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/cars`)
      if (!response.ok) throw new Error('Erro ao carregar carros')
      setCarsList(await response.json())
    } catch (err) {
      setError(err.message)
    }
  }, [])

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  // FUNÇÃO PARA DELETAR CARRO

  const handleDeleteCar = useCallback(async (carId) => {
    try {
      const response = await fetch(`${API_URL}/cars/${carId}`, {
        method: "DELETE"
      })
      if (!response.ok) throw new Error('Falha ao deletar carro');
      setCarsList(prev => prev.filter(car => car.id !== carId));
    } catch (error) {
      setError(error.message)
      fetchCars();
    }
  }, [fetchCars])

  // FUNÇÃO PRA EDITAR CARRO

  const handleEditCar = useCallback(async (carId, updatedData) => {
    try {
      const response = await fetch(`${API_URL}/cars/${carId}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
      if (!response.ok) throw new Error('Falha ao atualizar carro')
      const updatedCar = await response.json()
      setCarsList(prev => prev.map(car => car.id === carId ? updatedCar : car))
    } catch (error) {
      setError(error.message)
    }
  }, []);

  return (
    <div style={{ paddingTop: "15px", paddingLeft: "15px" }}>
      <h1>WS Motors - Cars List</h1>
      {error && <p>error</p>}
      <main style={{ display: "flex", padding: "15px", gap: "40px" }}>
        <Sidemenu />
        <Carslist carsList={carsList} onDeleteCar={handleDeleteCar} onEditCar={handleEditCar} />
      </main>
    </div>
  )
}

export default App
