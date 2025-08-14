//Componente base para lista de carros, aqui fazemos um map para iterar na lista de carros e renderizar o componente Cardcar para cada carro da lista

import Cardcar from '../CardCar/Cardcar'
import styles from './Carslist.module.css'

export default function Carslist({carsMock}) {
  return (
    <div className={styles.container}>
      <p>{`${carsMock.length} carros encontrados`}</p>
      <div className={styles.main}>
        {carsMock.map((car) => <Cardcar  car={car}/>)}
      </div>
    </div>
  )
}