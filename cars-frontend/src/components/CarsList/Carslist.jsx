//Componente base para lista de carros, aqui fazemos um map para iterar na lista de carros e renderizar o componente Cardcar para cada carro da lista

import Cardcar from '../CardCar/Cardcar'
import styles from './Carslist.module.css'
import { memo } from 'react'

const Carslist = memo(({ carsList, onDeleteCar, onEditCar }) => {
  const groupedByBrand = carsList.reduce((acc, car) => {
    if (!acc[car.nome_marca]) acc[car.nome_marca] = [];
    acc[car.nome_marca].push(car);
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      {Object.keys(groupedByBrand).map(brand => (
        <div style={{marginTop: '14px'}} key={brand}>
          <h2>{brand}</h2>
          <div className={styles.main}>
            {groupedByBrand[brand].map(car => (
              <Cardcar
                car={car}
                key={car.id}
                onDeleteCar={onDeleteCar}
                onEditCar={onEditCar}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
});

export default Carslist