import styles from './Cardcar.module.css'

export default function Cardcar({car}) {
  return (
    <div className={styles.container}>
      <h1>{car.nome_modelo}</h1>
      <p>{car.combustivel}</p>
      <p>{car.ano}</p>
      
    </div>
  )
}