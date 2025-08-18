import { useCallback, useEffect, useState } from 'react'
import './App.css'
import Carslist from './components/CarsList/Carslist'
import Sidemenu from './components/Sidemenu/Sidemenu'

const API_URL = 'http://localhost:5000'

function App() {
  const [carsList, setCarsList] = useState([]);
  const [allCars, setAllCars] = useState([]);
  const [error, setError] = useState(null);

  const fetchCars = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/cars`)
      if (!response.ok) throw new Error('Erro ao carregar carros')
      const data = await response.json();
      setAllCars(data);      // <- mantém cópia completa
      setCarsList(data);     // <- lista exibida (pode ser filtrada)
    } catch (err) {
      setError(err.message)
    }
  }, [])

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const handleApplyFilters = useCallback((filters) => {
    let filtered = [...allCars];

    const { selectedModels, selectedBrands, doors, color, fuel, maxValue, minValue, maxYear, minYear } = filters || {};

    if (selectedModels && selectedModels.length > 0) {
      filtered = filtered.filter(car => selectedModels.includes(car.modelo_id));
    } else if (selectedBrands && selectedBrands.length > 0) {
      filtered = filtered.filter(car => selectedBrands.includes(car.marca_id));
    }

    if (doors && doors.trim() !== '') {
      const doorsNumber = Number(doors);
      if (!isNaN(doorsNumber)) {
        filtered = filtered.filter(car => car.num_portas === doorsNumber);
      }
    }

    if (color && color.trim() !== '') {
      filtered = filtered.filter(car =>
        car.cor.toLowerCase().includes(color.toLowerCase())
      );
    }

    if (fuel && fuel.trim() !== '') {
      filtered = filtered.filter(car =>
        car.combustivel.toLowerCase().includes(fuel.toLowerCase())
      );
    }

    if (minYear !== undefined && maxYear !== undefined) {
      filtered = filtered.filter(car =>
        car.ano >= minYear && car.ano <= maxYear
      );
    }

    if (minValue !== undefined && maxValue !== undefined) {
      filtered = filtered.filter(car =>
        car.valor_fipe >= minValue && car.valor_fipe <= maxValue
      );
    }

    setCarsList(filtered);
  }, [allCars]);


  // FUNÇÃO PARA DELETAR CARRO

  const handleDeleteCar = useCallback(async (carId) => {
    try {
      const response = await fetch(`${API_URL}/cars/${carId}`, {
        method: "DELETE"
      })
      if (!response.ok) throw new Error('Falha ao deletar carro');
      setAllCars(prev => prev.filter(car => car.id !== carId));
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
      setAllCars(prev => prev.map(car => car.id === carId ? updatedCar : car));
      setCarsList(prev => prev.map(car => car.id === carId ? updatedCar : car));
    } catch (error) {
      setError(error.message)
    }
  }, []);

  return (
    <div style={{ paddingTop: "15px", paddingLeft: "15px" }}>
      <h1>WS Motors - Cars List</h1>
      {error && <p>error</p>}
      <main style={{ display: "flex", padding: "15px", gap: "40px" }}>
        <Sidemenu fetchCars={fetchCars} handleApplyFilters={handleApplyFilters} />
        <Carslist carsList={carsList} onDeleteCar={handleDeleteCar} onEditCar={handleEditCar} />
      </main>
    </div>
  )
}

export default App
