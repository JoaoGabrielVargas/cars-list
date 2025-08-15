import { useState, memo } from 'react';

import styles from './Cardcar.module.css'
import Modal from '../Modal/Modal';


const Cardcar = memo(({ car, onDeleteCar, onEditCar }) => {

  const [openModal, setOpenModal] = useState({
    isOpen: false,
    content: ""
  });

  const handleButtonClick = (content) => {
    setOpenModal({
      isOpen: !openModal.isOpen,
      content: content
    })
  }

  return (
    <div className={styles.container}>
      <h1>{car.nome_modelo}</h1>
      <h2>{car.nome_marca}</h2>
      <p>{car.combustivel}</p>
      <p>{car.ano}</p>
      <p>Qtd portas: {car.num_portas}</p>
      <p>Valor FIPE: <span className={styles.value}>{car.valor_fipe}</span></p>
      <p>Cor: {car.cor}</p>
      <div className={styles.button_container}>
        <div onClick={() => handleButtonClick('edit')} className={styles.button}>Editar</div>
        <div onClick={() => handleButtonClick('delete')} className={styles.button}>Deletar</div>
      </div>
      {openModal.isOpen && (
        <Modal
          toggle={handleButtonClick}
          content={openModal.content}
          onConfirmDelete={() => onDeleteCar(car.id)}
          onSaveEdit={(data) => {
            onEditCar(car.id, data)
            setOpenModal({ isOpen: false })
          }}
        />
      )}
    </div>
  )
});

export default Cardcar;