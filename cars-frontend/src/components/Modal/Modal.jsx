import styles from './Modal.module.css';
import { memo, useState } from 'react';

const Modal = memo(({ toggle, content, onConfirmDelete, onSaveEdit }) => {

  // ESTADOS PARA EDITAR O CARRO
  const [formData, setFormData] = useState({
    ano: "",
    combustivel: "",
    num_portas: "",
    cor: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const generateModalContent = () => {
    if (content === "delete") {
      return (
        <div className={styles.content}>
          <div className={styles.iconContainer}>🗑️</div>
          <h3 className={styles.title}>Excluir carro</h3>
          <p className={styles.message}>Tem certeza que deseja excluir este carro permanentemente?</p>
          <div className={styles.buttonGroup}>
            <button className={`${styles.button} ${styles.cancelButton}`} onClick={toggle}>
              Cancelar
            </button>
            <button className={`${styles.button} ${styles.confirmButton}`} onClick={onConfirmDelete}>
              Confirmar
            </button>
          </div>
        </div>
      );
    }

    if (content === "edit") {
      return (
        <div className={styles.content}>
          <h3 className={styles.title}>Editar carro</h3>

          <div className={styles.formGroup}>
            <label className={styles.label}>Ano</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Ex: 2024"
              value={formData.ano}
              onChange={handleChange}
              name="ano"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Combustível</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Ex: FLEX"
              value={formData.combustivel}
              onChange={handleChange}
              name="combustivel"
            />
          </div>

           <div className={styles.formGroup}>
            <label className={styles.label}>Número de portas</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Ex: 4"
              value={formData.num_portas}
              onChange={handleChange}
              name="num_portas"
            />
          </div>

           <div className={styles.formGroup}>
            <label className={styles.label}>Cor</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Ex: Prata"
              value={formData.cor}
              onChange={handleChange}
              name="cor"
            />
          </div>

          <div className={styles.buttonGroup}>
            <button className={`${styles.button} ${styles.cancelButton}`} onClick={toggle}>
              Cancelar
            </button>
            <button className={`${styles.button} ${styles.saveButton}`} onClick={() => onSaveEdit(formData)}>
              Salvar alterações
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={styles.background} onClick={toggle}>
      <div
        className={styles.container}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={toggle}>×</button>
        {generateModalContent()}
      </div>
    </div>
  );
});

export default Modal;