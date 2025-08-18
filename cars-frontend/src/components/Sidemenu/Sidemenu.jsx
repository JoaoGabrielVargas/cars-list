
import { useEffect, useState, useCallback } from 'react';
import styles from './Sidemenu.module.css';
import ModalCreateNew from '../ModalCreateNew/ModalCreateNew';

const API_URL = 'http://localhost:5000'

export default function Sidemenu({fetchCars, handleApplyFilters}) {
  const [filters, setFilters] = useState({
    selectedBrands: [],
    selectedModels: [],
    doors: '',
    color: '',
    fuelType: '',
    minYear: 1950,
    maxYear: new Date().getFullYear(),
    minValue: 0,
    maxValue: 1000000
  });

  const [brandOptions, setBrandOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);
  const [error, setError] = useState(null);
  const [showCreateNewModal, setShowCreateNewModal] = useState({
    isOpen: false,
    content: "",
  });

  const fetchBrands = async () => {
    try {
      const response = await fetch(`${API_URL}/brands`);
      if (!response.ok) throw new Error('Erro ao carregar marcas')
      setBrandOptions(await response.json())
    } catch (err) {
      setError(err.message)
    }
  };

  const fetchModels = async () => {
    try {
      const response = await fetch(`${API_URL}/models`);
      if (!response.ok) throw new Error('Erro ao carregar modelos')
      setModelOptions(await response.json())
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchBrands();
    fetchModels();
  }, []);

const handleCreateBrand = async (brandName) => {
    try {
      const response = await fetch(`${API_URL}/brands`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome_marca: brandName })
      });
      
      if (!response.ok) throw new Error('Erro ao criar marca');
      
      const createdBrand = await response.json();
      
      setBrandOptions(prev => [...prev, createdBrand]);
      
      setShowCreateNewModal({isOpen: false, content: ""});
      
    } catch (error) {
      console.error('Erro ao criar marca:', error);
      setError(error.message)
    }
  };

const handleCreateModel = async (modelName, brand, fipe_value) => {
    try {
      const response = await fetch(`${API_URL}/models`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: modelName, marca_id: brand, valor_fipe: fipe_value })
      });
      
      if (!response.ok) throw new Error('Erro ao criar modelo');
      
      const createdModel = await response.json();
      
      setModelOptions(prev => [...prev, createdModel]);
      
      setShowCreateNewModal({isOpen: false, content: ""});
      
    } catch (error) {
      console.error('Erro ao criar modelo:', error);
      setError(error.message)
    }
  };

  const handleCreateCar = async (model, fuel, year, numDoors, color) => {
    const newCarObj = {
      ano: year,
      combustivel: fuel,
      num_portas: Number(numDoors),
      cor: color,
      modelo_id: Number(model)
    }

    try {
      const response = await fetch(`${API_URL}/cars`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCarObj)
      });
      
      if (!response.ok) throw new Error('Erro ao criar carro');
      
      fetchCars();
      setShowCreateNewModal({isOpen: false, content: ""});
      
    } catch (error) {
      console.error('Erro ao criar carro:', error);
      setError(error.message)
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  // Sidemenu.jsx
const toggleBrandSelection = (brandId) => {
  setFilters(prev => {
    const newSelectedBrands = prev.selectedBrands.includes(brandId)
      ? prev.selectedBrands.filter(id => id !== brandId)
      : [...prev.selectedBrands, brandId];
    
    return {
      ...prev,
      selectedBrands: newSelectedBrands,
      // Limpar modelos selecionados quando muda as marcas
      selectedModels: [] 
    };
  });
};

const toggleModelSelection = (modelId) => {
  setFilters(prev => ({
    ...prev,
    selectedModels: prev.selectedModels.includes(modelId)
      ? prev.selectedModels.filter(id => id !== modelId)
      : [...prev.selectedModels, modelId]
  }));
};

const filteredModels = filters.selectedBrands.length > 0
  ? modelOptions.filter(model => 
      filters.selectedBrands.includes(model.marca_id)
    )
  : [];

  //gerar anos de 1950 até o ano atual
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1949 }, (_, i) => currentYear - i);

  return (
    <div className={styles.sidemenu}>
      <div className={styles.header}>
        <button
          className={styles.newCarButton}
          onClick={() => setShowCreateNewModal({isOpen: true, content: "newCar"})}
        >
          + Anunciar novo carro
        </button>
      </div>

      <div className={styles.header}>
        <button
          className={styles.newCarButton}
          onClick={() => setShowCreateNewModal({isOpen: true, content: "brand"})}
        >
          Criar marca
        </button>
      </div>

      <div className={styles.header}>
        <button
          className={styles.newCarButton}
          onClick={() => setShowCreateNewModal({isOpen: true, content: "model"})}
        >
          Criar modelo
        </button>
      </div>

      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Marca</h3>
        <div className={styles.optionsContainer}>
          {brandOptions.map(brand => (
            <div
              key={brand.id}
              className={`${styles.optionItem} ${filters.selectedBrands.includes(brand.id) ? styles.selected : ''}`}
              onClick={() => toggleBrandSelection(brand.id)}
            >
              {brand.nome_marca}
            </div>
          ))}
        </div>
      </div>

      {filters.selectedBrands.length > 0 && (
        <div className={styles.filterSection}>
          <h3 className={styles.sectionTitle}>Modelo</h3>
          <div className={styles.optionsContainer}>
            {filteredModels.map(model => (
              <div
                key={model.id}
                className={`${styles.optionItem} ${filters.selectedModels.includes(model.id) ? styles.selected : ''}`}
                onClick={() => toggleModelSelection(model.id)}
              >
                {model.nome}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Número de Portas</h3>
        <input
          type="number"
          value={filters.doors}
          onChange={(e) => handleFilterChange('doors', e.target.value)}
          placeholder="Ex: 4"
          min="0"
          className={styles.input}
        />
      </div>

      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Cor</h3>
        <input
          type="text"
          value={filters.color}
          onChange={(e) => handleFilterChange('color', e.target.value)}
          placeholder="Digite a cor"
          className={styles.input}
        />
      </div>

      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Combustível</h3>
        <input
          type="text"
          value={filters.fuelType}
          onChange={(e) => handleFilterChange('fuelType', e.target.value)}
          placeholder="Ex: Gasolina, Álcool"
          className={styles.input}
        />
      </div>

      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Ano</h3>
        <div className={styles.rangeInputs}>
          <div className={styles.rangeField}>
            <label>De:</label>
            <select
              value={filters.minYear}
              onChange={(e) => handleFilterChange('minYear', Number(e.target.value))}
              className={styles.select}
            >
              {years.map(year => (
                <option key={`min-${year}`} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className={styles.rangeField}>
            <label>Até:</label>
            <select
              value={filters.maxYear}
              onChange={(e) => handleFilterChange('maxYear', Number(e.target.value))}
              className={styles.select}
            >
              {years.map(year => (
                <option key={`max-${year}`} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={styles.filterSection}>
        <h3 className={styles.sectionTitle}>Valor FIPE (R$)</h3>
        <div className={styles.rangeInputs}>
          <div className={styles.rangeField}>
            <label>Mínimo:</label>
            <input
              type="number"
              value={filters.minValue}
              onChange={(e) => handleFilterChange('minValue', Number(e.target.value))}
              className={styles.input}
              min="0"
            />
          </div>

          <div className={styles.rangeField}>
            <label>Máximo:</label>
            <input
              type="number"
              value={filters.maxValue}
              onChange={(e) => handleFilterChange('maxValue', Number(e.target.value))}
              className={styles.input}
              min={filters.minValue}
            />
          </div>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <button
          className={styles.applyButton}
          onClick={() => handleApplyFilters(filters)}
        >
          Aplicar Filtros
        </button>
        <button
          className={styles.resetButton}
          onClick={() => setFilters({
            selectedBrands: [],
            selectedModels: [],
            doors: '',
            color: '',
            fuelType: '',
            minYear: 1990,
            maxYear: currentYear,
            minValue: 0,
            maxValue: 500000
          })}
        >
          Limpar Filtros
        </button>
      </div>
      {showCreateNewModal.isOpen && <ModalCreateNew
        isOpen={showCreateNewModal}
        onClose={() => setShowCreateNewModal({isOpen: false, content: ""})}
        onCreateBrand={handleCreateBrand}
        content={showCreateNewModal.content}
        brandOptions={brandOptions}
        modelOptions={modelOptions}
        onCreateModel={handleCreateModel}
        onCreateCar={handleCreateCar}
      />}
    </div>
  )
}