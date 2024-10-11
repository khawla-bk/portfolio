import styles from './fireflies.module.css';

export default function Fireflies() {
  return (
    <div className={styles.fireflies}>
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className={styles.firefly}></div>
      ))}
    </div>
  );
}
