
import { useEffect, useState } from 'react';
import styles from './ModalCreateNew.module.css';

export default function ModalCreateNew({ onClose, isOpen, onCreateBrand, content, brandOptions, modelOptions, onCreateModel, onCreateCar }) {

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
  const [numDoors, setNumDoors] = useState("");
  const [fipeValue, setFipeValue] = useState("");
  const [error, setError] = useState({
    name: { haveError: false, message: null },
    brand: { haveError: false, message: null },
    fipeValue: { haveError: false, message: null },
    year: { haveError: false, message: null },
    fuel: { haveError: false, message: null },
    color: { haveError: false, message: null },
    numDoors: { haveError: false, message: null },
  });

  const [filteredModels, setFilteredModels] = useState([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const handleSubmit = () => {

    if (content === "brand") {
      if (!name.trim()) {
        const errorObj = {
          haveError: true,
          message: "O nome da marca não pode estar vazio"
        }
        setError(prev => ({ ...prev, name: errorObj }))
        return;
      };
      onCreateBrand(name);
      onClose();
    };

    if (content === "model") {
      if (!name.trim()) {
        const errorObj = {
          haveError: true,
          message: "O nome do modelo não pode estar vazio"
        }
        setError(prev => ({ ...prev, name: errorObj }))

      };

      if (fipeValue === "") {
        const errorObj = {
          haveError: true,
          message: "Adicione um valor FIPE"
        }
        setError(prev => ({ ...prev, fipeValue: errorObj }))
      }

      if (brand === "") {
        const errorObj = {
          haveError: true,
          message: "Selecione uma marca"
        }
        setError(prev => ({ ...prev, brand: errorObj }))
      };

      if (brand === "" || fipeValue === "" || !name.trim()) {
        return;
      }
      onCreateModel(name, brand, fipeValue);
      onClose();
    };

    if (content === "newCar") {
      if (brand === "") {
        const errorObj = {
          haveError: true,
          message: "Selecione uma marca"
        }
        setError(prev => ({ ...prev, brand: errorObj }))
      };

      if (model === "") {
        const errorObj = {
          haveError: true,
          message: "Selecione um modelo"
        }
        setError(prev => ({ ...prev, model: errorObj }))
      };

      if (fuel === "") {
        const errorObj = {
          haveError: true,
          message: "Insira o combustível"
        }
        setError(prev => ({ ...prev, fuel: errorObj }))
      };

      if (year === "") {
        const errorObj = {
          haveError: true,
          message: "Insira o ano"
        }
        setError(prev => ({ ...prev, year: errorObj }))
      };

      if (brand === "" || model === "" || fuel === "" || year === "") {
        return;
      }
      onCreateCar(model, fuel, year, numDoors, color);
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen && isInitialLoad) {
      if (content === "model" && brandOptions.length > 0) {
        setBrand(brandOptions[0].id);
      }

      if (content === "newCar" && brandOptions.length > 0) {
        setBrand(brandOptions[0].id);

        if (modelOptions.length > 0) {
          const filtered = modelOptions.filter(model => model.marca_id == brandOptions[0].id);
          if (filtered.length > 0) {
            setModel(filtered[0].id);
          }
        }
      }

      setIsInitialLoad(false);
    }

    if (!isOpen) {
      setIsInitialLoad(true);
    }
  }, [isOpen, content, brandOptions, modelOptions, isInitialLoad]);

  useEffect(() => {
    if (content === "newCar" && brand) {
      const filtered = modelOptions.filter(model => model.marca_id == brand);
      if (filtered.length > 0) {
        setFilteredModels(filtered);
        setModel(filtered[0].id);
      } else {
        setFilteredModels([]);
        setModel("");
      }
    }
  }, [brand, modelOptions, content]);

  const generateModalContent = () => {

    // FORM PARA CRIAR MARCAS
    if (content === "brand") {
      return (
        <>
          <h2 className={styles.title}>Criar Nova Marca</h2>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nome da Marca</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError({
                  name: { haveError: false, message: null },
                  brand: { haveError: false, message: null },
                  fipeValue: { haveError: false, message: null }
                });
              }}
              placeholder="Ex: Ford"
              className={`${styles.input} ${error.name.haveError ? styles.errorInput : ''}`}
              autoFocus
            />
            {error.name.haveError && <p className={styles.errorMessage}>{error.name.message}</p>}
          </div>

          <div className={styles.buttonGroup}>
            <button
              className={`${styles.button} ${styles.cancelButton}`}
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className={`${styles.button} ${styles.confirmButton}`}
              onClick={handleSubmit}
            >
              Criar Marca
            </button>
          </div>
        </>
      )
    }

    // FORM PARA CRIAR MODELOS

    if (content === "model") {
      return (
        <>
          <h2 className={styles.title}>Criar Novo Modelo</h2>

          <div className={styles.formGroup}>
            <label className={styles.label}>Nome do Modelo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(prev => ({ ...prev, name: { haveError: false, message: "" } }));
              }}
              placeholder="Ex: UNO"
              className={`${styles.input} ${error.name.haveError ? styles.errorInput : ''}`}
              autoFocus
            />
            {error.name.haveError && <p className={styles.errorMessage}>{error.name.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Valor FIPE</label>
            <input
              type="number"
              value={fipeValue}
              onChange={(e) => {
                setFipeValue(e.target.value);
                setError(prev => ({ ...prev, fipeValue: { haveError: false, message: "" } }));
              }}
              placeholder="EX: R$200.000"
              className={`${styles.input} ${error.fipeValue.haveError ? styles.errorInput : ''}`}
              autoFocus
            />
            {error.fipeValue.haveError && <p className={styles.errorMessage}>{error.fipeValue.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Selecione a marca:</label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className={styles.select}
            >
              {brandOptions.map(brand => (
                <option key={brand.id} value={brand.id}>{brand.nome_marca}</option>
              ))}
            </select>
            {error.brand.haveError && <p className={styles.errorMessage}>{error.brand.message}</p>}
          </div>

          <div className={styles.buttonGroup}>
            <button
              className={`${styles.button} ${styles.cancelButton}`}
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className={`${styles.button} ${styles.confirmButton}`}
              onClick={handleSubmit}
            >
              Criar Modelo
            </button>
          </div>
        </>
      )
    }

    // FORM PARA CRIAR NOVOS CARROS

    if (content === "newCar") {
      return (
        <>
          <h2 className={styles.title}>Anunciar novo carro</h2>
          <div className={styles.formGroup}>
            <label className={styles.label}>Selecione a marca:</label>
            <select
              value={brand}
              onChange={(e) => {
                setBrand(e.target.value)
                setError(prev => ({ ...prev, brand: { haveError: false, message: "" } }));
              }}
              className={styles.select}
            >
              {brandOptions.map(brand => (
                <option key={brand.id} value={brand.id}>{brand.nome_marca}</option>
              ))}
            </select>
            {error.brand.haveError && <p className={styles.errorMessage}>{error.brand.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Selecione o modelo:</label>
            <select
              value={model}
              onChange={(e) => {
                setModel(e.target.value)
                setError(prev => ({ ...prev, model: { haveError: false, message: "" } }));
              }}
              className={styles.select}
              disabled={brand <= 0}
            >
              {filteredModels.map(model => (
                <option key={model.id} value={model.id}>{model.nome}</option>
              ))}
            </select>
            {error.model?.haveError && <p className={styles.errorMessage}>{error.model.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Combustível</label>
            <input
              type="text"
              value={fuel}
              onChange={(e) => {
                setFuel(e.target.value);
                setError(prev => ({ ...prev, fuel: { haveError: false, message: "" } }));
              }}
              placeholder="Ex: Gasolina"
              className={`${styles.input} ${error.fuel.haveError ? styles.errorInput : ''}`}
              autoFocus
            />
            {error.fuel.haveError && <p className={styles.errorMessage}>{error.fuel.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Ano</label>
            <input
              type="number"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setError(prev => ({ ...prev, year: { haveError: false, message: "" } }));
              }}
              placeholder="EX: 2025"
              className={`${styles.input} ${error.year.haveError ? styles.errorInput : ''}`}
              autoFocus
            />
            {error.year.haveError && <p className={styles.errorMessage}>{error.year.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Número de portas</label>
            <input
              type="number"
              value={numDoors}
              onChange={(e) => {
                setNumDoors(e.target.value);
                setError(prev => ({ ...prev, numDoors: { haveError: false, message: "" } }));
              }}
              placeholder="EX: 4"
              className={`${styles.input} ${error.year.haveError ? styles.errorInput : ''}`}
              autoFocus
            />
            {error.numDoors.haveError && <p className={styles.errorMessage}>{error.numDoors.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Cor</label>
            <input
              type="text"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
                setError(prev => ({ ...prev, fuel: { haveError: false, message: "" } }));
              }}
              placeholder="Ex: Branco"
              className={`${styles.input} ${error.fuel.haveError ? styles.errorInput : ''}`}
              autoFocus
            />
            {error.fuel.haveError && <p className={styles.errorMessage}>{error.fuel.message}</p>}
          </div>

          <div className={styles.buttonGroup}>
            <button
              className={`${styles.button} ${styles.cancelButton}`}
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className={`${styles.button} ${styles.confirmButton}`}
              onClick={handleSubmit}
            >
              Criar Novo Carro
            </button>
          </div>
        </>
      )
    }
  }

  return (
    <div className={styles.background} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        {generateModalContent()}
      </div>
    </div>
  );
};