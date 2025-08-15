//Componente base para lista de carros, aqui fazemos um map para iterar na lista de carros e renderizar o componente Cardcar para cada carro da lista

import Cardcar from '../CardCar/Cardcar'
import styles from './Carslist.module.css'
import { memo } from 'react'

const Carslist = memo(({ carsList, onDeleteCar, onEditCar }) => {
  return (
    <div className={styles.container}>
      <p>{`${carsList.length} carros encontrados`}</p>
      <div className={styles.main}>
        {carsList.map((car) => (
          <Cardcar
            car={car}
            key={car.id}
            onDeleteCar={onDeleteCar}
            onEditCar={onEditCar}
          />
        ))}
      </div>
    </div>
  )
});

export default Carslist