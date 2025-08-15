
import { useState } from 'react';
import styles from './ModalCreateNew.module.css';

export default function ModalCreateNew({ onClose, isOpen, onCreateBrand, content, brandOptions, onCreateModel }) {

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [fipeValue, setFipeValue] = useState("");
  const [error, setError] = useState({
    name: { haveError: false, message: null },
    brand: { haveError: false, message: null },
    fipeValue: { haveError: false, message: null }
  });

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
  };

  console.log("error", error)


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
                setName(e.target.value);
                setError();
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